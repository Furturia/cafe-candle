/**
 * Resize an image file and return a base64 data URL.
 * Uses canvas to downscale the image while preserving aspect ratio.
 *
 * @param {File|Blob} file - The image file to resize
 * @param {Object} options
 * @param {number} [options.maxWidth=1024] - Maximum width in pixels
 * @param {number} [options.maxHeight=1024] - Maximum height in pixels
 * @param {number} [options.quality=0.7] - JPEG quality (0-1)
 * @returns {Promise<string>} Base64 data URL (image/jpeg)
 */
export function resizeImage(file, { maxWidth = 1024, maxHeight = 1024, quality = 0.8 } = {}) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("ไม่สามารถอ่านไฟล์รูปภาพได้"));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error("ไม่สามารถโหลดรูปภาพได้"));
      img.onload = () => {
        let { width, height } = img;

        // Calculate new dimensions preserving aspect ratio
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(dataUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Create a small thumbnail for list/card views.
 * @param {File|Blob} file - The image file
 * @returns {Promise<string>} Base64 data URL (~5-15KB)
 */
export function createThumbnail(file) {
  return resizeImage(file, { maxWidth: 400, maxHeight: 400, quality: 0.7 });
}
