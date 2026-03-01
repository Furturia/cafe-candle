import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  setDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/config/firebase.js";
import { enhanceSubmission } from "@/utils/submissionHelper.js";
import { resizeImage, createThumbnail } from "@/utils/imageResizer.js";

const COLLECTION_NAME = "submissions";

/**
 * Validate submission data before sending to Firestore
 * @param {Object} data - Form data
 * @param {File} imageFile - Image file
 * @returns {string[]} Array of error messages (empty if valid)
 */
function validateSubmission(data, imageFile) {
  const errors = [];

  if (!data.firstName || data.firstName.trim().length < 2) {
    errors.push("กรุณากรอกชื่อ (อย่างน้อย 2 ตัวอักษร)");
  }
  if (!data.lastName || data.lastName.trim().length < 2) {
    errors.push("กรุณากรอกนามสกุล (อย่างน้อย 2 ตัวอักษร)");
  }

  const yearVal = parseInt(data.graduationYear, 10);
  if (isNaN(yearVal) || yearVal < 40 || yearVal > 99) {
    errors.push("รหัสรุ่นต้องเป็นตัวเลข 2 หลัก ระหว่าง 40-99");
  }

  const validMajors = ["IT", "CS", "DSI"];
  if (!data.major || !validMajors.includes(data.major)) {
    errors.push("กรุณาเลือกสาขา (IT, CS, DSI)");
  }

  if (data.description && data.description.length > 500) {
    errors.push("คำบรรยายต้องไม่เกิน 500 ตัวอักษร");
  }

  if (!imageFile) {
    errors.push("กรุณาอัพโหลดรูปภาพ");
  } else {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(imageFile.type)) {
      errors.push("อนุญาตเฉพาะไฟล์ JPG, PNG, WebP เท่านั้น");
    }
    if (imageFile.size > 5 * 1024 * 1024) {
      errors.push("ขนาดไฟล์ต้องไม่เกิน 5MB");
    }
  }

  return errors;
}

/**
 * Create a new submission
 * - Stores thumbnail (small ~5-15KB) in the main document for list views
 * - Stores full-size image in subcollection submissions/{id}/images/full
 *
 * @param {Object} data - { firstName, lastName, graduationYear, major, description }
 * @param {File} imageFile - Image file to upload
 * @returns {Promise<{ id: string, data: Object }>}
 */
export async function createSubmission(data, imageFile) {
  // Validate
  const errors = validateSubmission(data, imageFile);
  if (errors.length > 0) {
    throw new Error(errors.join("\n"));
  }

  // Generate thumbnail and full-size image in parallel
  const [thumbnailUrl, imageUrl] = await Promise.all([
    createThumbnail(imageFile),
    resizeImage(imageFile, { maxWidth: 1024, maxHeight: 1024, quality: 0.8 }),
  ]);

  // Save main document with thumbnail (small payload)
  const docData = {
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    graduationYear: parseInt(data.graduationYear, 10),
    major: data.major,
    description: data.description ? data.description.trim() : null,
    thumbnailUrl,
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, COLLECTION_NAME), docData);

  // Save full-size image in subcollection
  await setDoc(doc(db, COLLECTION_NAME, docRef.id, "images", "full"), {
    imageUrl,
  });

  // Return enhanced data (with full image for immediate display on Success page)
  const enhanced = enhanceSubmission({
    id: docRef.id,
    ...docData,
    imageUrl,
  });
  return { id: docRef.id, data: enhanced };
}

/**
 * Get all submissions ordered by creation date (newest first).
 * Returns main document fields only (with thumbnail, NOT full image).
 *
 * @returns {Promise<Object[]>} Array of enhanced submissions
 */
export async function getAllSubmissions() {
  const q = query(
    collection(db, COLLECTION_NAME),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data();
    return enhanceSubmission({ id: docSnap.id, ...data });
  });
}

/**
 * Get a single submission by Firestore document ID.
 * Fetches the main document + full-size image from subcollection.
 *
 * @param {string} id - Firestore document ID
 * @returns {Promise<Object>} Enhanced submission with full imageUrl
 */
export async function getSubmissionById(id) {
  const docSnap = await getDoc(doc(db, COLLECTION_NAME, id));

  if (!docSnap.exists()) {
    throw new Error("ไม่พบข้อมูล");
  }

  const data = docSnap.data();

  // Try to get the full-size image from subcollection
  let imageUrl = data.thumbnailUrl; // fallback to thumbnail
  try {
    const imgSnap = await getDoc(
      doc(db, COLLECTION_NAME, id, "images", "full")
    );
    if (imgSnap.exists()) {
      imageUrl = imgSnap.data().imageUrl;
    }
  } catch {
    // If subcollection read fails, use thumbnail as fallback
  }

  return enhanceSubmission({ id: docSnap.id, ...data, imageUrl });
}
