var admin = require("firebase-admin");
const { getFirestore, Timestamp } = require("firebase-admin/firestore");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

var db = getFirestore();

// --- Tiny 1x1 placeholder image (base64 JPEG) ---
// In real usage these would be actual photos; here we use colored placeholders
function generatePlaceholderImage() {
  // Minimal valid JPEG base64 (~600 bytes) - a small pink/purple square
  return "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsKCwsMDhEQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wgARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAAB//EABUBAQEAAAAAAAAAAAAAAAAAAAX/2gAMAwEAAhADEAAAAUf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAEFAn//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAEDAQE/AX//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAECAQE/AX//xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAY/An//xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAE/IX//2gAMAwEAAgADAAAAEH//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAEDAQE/EH//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAECAQE/EH//xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAE/EH//2Q==";
}

// --- Mock data: 50 submissions with Thai names ---
var submissions = [
  { firstName: "สมชาย", lastName: "วงศ์สวัสดิ์", graduationYear: 55, major: "IT", description: "คิดถึง SIT มากครับ สมัยเรียนสนุกมาก" },
  { firstName: "สมหญิง", lastName: "พันธุ์ทอง", graduationYear: 58, major: "CS", description: "ขอให้คณะเจริญรุ่งเรืองตลอดไปค่ะ" },
  { firstName: "กันตพงศ์", lastName: "เจริญสุข", graduationYear: 62, major: "IT", description: "สุขสันต์วันครบรอบ 30 ปี SIT ครับ!" },
  { firstName: "ปนัดดา", lastName: "แสงจันทร์", graduationYear: 60, major: "DSI", description: "ความทรงจำที่ดีที่สุดคือตอนทำโปรเจคจบ" },
  { firstName: "ธนกฤต", lastName: "รุ่งเรือง", graduationYear: 66, major: "IT", description: null },
  { firstName: "พิมพ์ชนก", lastName: "ศรีสุวรรณ", graduationYear: 64, major: "CS", description: "คิดถึงอาจารย์ทุกท่านค่ะ" },
  { firstName: "ภูมิพัฒน์", lastName: "อุดมศักดิ์", graduationYear: 50, major: "IT", description: "20 กว่าปีแล้ว ยังภูมิใจที่เป็นลูก SIT" },
  { firstName: "กัญญาณัฐ", lastName: "บุญประเสริฐ", graduationYear: 67, major: "DSI", description: "เพิ่งจบใหม่ค่ะ คิดถึงเพื่อนๆ มาก" },
  { firstName: "ชัยวัฒน์", lastName: "มงคลพร", graduationYear: 45, major: "IT", description: "รุ่นบุกเบิก SIT ครับ ดีใจที่คณะเติบโตมากขนาดนี้" },
  { firstName: "อภิญญา", lastName: "ทองดี", graduationYear: 63, major: "CS", description: "สุขสันต์ครบรอบ 30 ปีค่ะ" },
  { firstName: "วรัญญู", lastName: "สุขสำราญ", graduationYear: 56, major: "IT", description: "ขอให้คณะเรามีแต่ความสุข" },
  { firstName: "นภัสสร", lastName: "วิไลลักษณ์", graduationYear: 61, major: "DSI", description: "คิดถึง Canteen ของ SIT จังเลย" },
  { firstName: "พีรพัฒน์", lastName: "กิตติธร", graduationYear: 59, major: "CS", description: null },
  { firstName: "ชุติมา", lastName: "สุวรรณชาติ", graduationYear: 65, major: "IT", description: "ขอให้รุ่นน้องทุกคนประสบความสำเร็จนะคะ" },
  { firstName: "ธีรภัทร", lastName: "พงษ์พิพัฒน์", graduationYear: 52, major: "IT", description: "ภาคภูมิใจที่เป็นศิษย์เก่า SIT ครับ" },
  { firstName: "ปวีณ์ธิดา", lastName: "ราชบุรี", graduationYear: 68, major: "DSI", description: "ยังเรียนอยู่ค่ะ แต่อยากร่วมอวยพร" },
  { firstName: "นรินทร์", lastName: "เกษมสุข", graduationYear: 48, major: "IT", description: "รุ่นเก๋า SIT มาร่วมอวยพรครับ" },
  { firstName: "ศิริลักษณ์", lastName: "อนันต์เจริญ", graduationYear: 57, major: "CS", description: "ขอให้คณะเจริญรุ่งเรืองไปอีก 30 ปี" },
  { firstName: "อดิศร", lastName: "แก้วมณี", graduationYear: 54, major: "IT", description: null },
  { firstName: "มนัสนันท์", lastName: "ชัยนราทร", graduationYear: 66, major: "CS", description: "ขอบคุณ SIT ที่ให้โอกาสที่ดีค่ะ" },
  { firstName: "ภาณุวัฒน์", lastName: "ไพศาลสุข", graduationYear: 53, major: "IT", description: "คิดถึงสมัยทำ Lab ดึกๆ ครับ" },
  { firstName: "รุจิรา", lastName: "พรหมวิหาร", graduationYear: 62, major: "DSI", description: "SIT เปลี่ยนชีวิตฉันค่ะ" },
  { firstName: "เมธัส", lastName: "สิริมงคล", graduationYear: 67, major: "IT", description: "เพิ่งจบมา รู้สึกขอบคุณมากครับ" },
  { firstName: "จิราพัชร", lastName: "ดวงแก้ว", graduationYear: 60, major: "CS", description: null },
  { firstName: "ปิยะ", lastName: "วัฒนาสกุล", graduationYear: 46, major: "IT", description: "รุ่นบุกเบิกยุคแรกๆ ครับ ขอให้เจริญก้าวหน้า" },
  { firstName: "ณัฐธิดา", lastName: "บุญยงค์", graduationYear: 64, major: "DSI", description: "ขอบคุณอาจารย์ทุกท่านที่สอนค่ะ" },
  { firstName: "สิรวิชญ์", lastName: "จันทร์เพ็ญ", graduationYear: 58, major: "CS", description: "คิดถึงเพื่อนร่วมรุ่นมากครับ" },
  { firstName: "พรพิมล", lastName: "สมบูรณ์ศิลป์", graduationYear: 55, major: "IT", description: "วันดีๆ ที่ SIT จะอยู่ในใจตลอดไป" },
  { firstName: "กิตติพงศ์", lastName: "ทรัพย์มาก", graduationYear: 61, major: "IT", description: null },
  { firstName: "อรวรรณ", lastName: "สุขสันต์ศิริ", graduationYear: 63, major: "DSI", description: "HBD SIT 30 ปีค่ะ" },
  { firstName: "ณัฐวุฒิ", lastName: "พิทักษ์ชัย", graduationYear: 49, major: "IT", description: "25 ปีแล้วที่จบ ยังรักคณะเหมือนเดิม" },
  { firstName: "สุพิชฌาย์", lastName: "รัตนโกสินทร์", graduationYear: 65, major: "CS", description: "อวยพรจากใจค่ะ ขอให้คณะเจริญตลอดไป" },
  { firstName: "ทศพร", lastName: "เลิศวิมล", graduationYear: 51, major: "IT", description: "รุ่นเก่าส่งกำลังใจมาครับ" },
  { firstName: "ชลธิชา", lastName: "จงดี", graduationYear: 66, major: "DSI", description: null },
  { firstName: "วรภัทร", lastName: "ศุภผล", graduationYear: 57, major: "CS", description: "SIT is the best! ภูมิใจครับ" },
  { firstName: "กรรณิกา", lastName: "พิพัฒน์กุล", graduationYear: 59, major: "IT", description: "คิดถึงงาน Freshy ทุกปีเลยค่ะ" },
  { firstName: "ธราเทพ", lastName: "นิธิกร", graduationYear: 42, major: "IT", description: "รุ่นแรกๆ ของคณะครับ ขอให้คณะเจริญยิ่งๆ ขึ้นไป" },
  { firstName: "ปาริชาต", lastName: "ลีลาศิลป์", graduationYear: 64, major: "CS", description: "ขอส่งความรักและกำลังใจให้คณะค่ะ" },
  { firstName: "ศุภกิจ", lastName: "มหาวงษ์", graduationYear: 56, major: "IT", description: null },
  { firstName: "ดลพร", lastName: "อมรรัตน์", graduationYear: 68, major: "DSI", description: "น้องใหม่ค่ะ แต่รัก SIT มากๆ" },
  { firstName: "อานนท์", lastName: "กรุงเทพมหานคร", graduationYear: 47, major: "IT", description: "ศิษย์เก่ารุ่นเก๋าครับ ดีใจที่คณะเข้มแข็ง" },
  { firstName: "ปภาวรินทร์", lastName: "เทียนสว่าง", graduationYear: 63, major: "CS", description: "สู้ๆ นะคะน้องๆ SIT" },
  { firstName: "วีระพล", lastName: "สุทธิพงษ์", graduationYear: 54, major: "IT", description: "16 ปีแล้ว ยังคิดถึง SIT เสมอ" },
  { firstName: "กมลชนก", lastName: "รักษ์ธรรม", graduationYear: 61, major: "DSI", description: null },
  { firstName: "พลากร", lastName: "มั่นคง", graduationYear: 67, major: "IT", description: "เพิ่งจบปีนี้ครับ ขอบคุณ SIT" },
  { firstName: "สิริยากร", lastName: "ฉายแสง", graduationYear: 60, major: "CS", description: "ขอให้คณะผลิตบัณฑิตที่มีคุณภาพต่อไปค่ะ" },
  { firstName: "ไกรวิชญ์", lastName: "ศักดิ์ศรี", graduationYear: 52, major: "IT", description: "ส่งกำลังใจจากต่างประเทศครับ ภูมิใจในความเป็น SIT" },
  { firstName: "เบญจมาศ", lastName: "ทิพย์สุข", graduationYear: 65, major: "DSI", description: "HBD SIT 30 ปีค่ะ รักนะ" },
  { firstName: "ปฐมพงษ์", lastName: "วิชัยดิษฐ", graduationYear: 43, major: "IT", description: "ตำนานศิษย์เก่า SIT ครับ ขอให้สืบทอดความดีต่อไป" },
  { firstName: "วริศรา", lastName: "ปิ่นทอง", graduationYear: 66, major: "CS", description: "คิดถึงมุมนั่งอ่านหนังสือใน SIT ค่ะ" },
];

var thumbnailPlaceholder = generatePlaceholderImage();
var fullImagePlaceholder = generatePlaceholderImage();

// Seed data
async function seed() {
  console.log("🌱 Starting seed: 50 submissions...\n");

  for (var i = 0; i < submissions.length; i++) {
    var obj = submissions[i];
    try {
      // Create main document
      var docRef = await db.collection("submissions").add({
        firstName: obj.firstName,
        lastName: obj.lastName,
        graduationYear: obj.graduationYear,
        major: obj.major,
        description: obj.description || null,
        thumbnailUrl: thumbnailPlaceholder,
        createdAt: Timestamp.now(),
      });

      // Create subcollection for full-size image
      await db
        .collection("submissions")
        .doc(docRef.id)
        .collection("images")
        .doc("full")
        .set({
          imageUrl: fullImagePlaceholder,
        });

      console.log(
        `✅ [${i + 1}/50] ${obj.firstName} ${obj.lastName} (${obj.major}${obj.graduationYear}) → ${docRef.id}`
      );
    } catch (error) {
      console.error(
        `❌ [${i + 1}/50] ${obj.firstName} ${obj.lastName}: ${error.message}`
      );
    }
  }

  console.log("\n🎉 Seed complete!");
}

seed();
