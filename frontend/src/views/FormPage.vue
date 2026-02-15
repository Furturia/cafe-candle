<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

// Form data
const firstName = ref('')
const lastName = ref('')
const graduationYear = ref('')
const major = ref('')
const description = ref('')

// Major options
const majorOptions = [
  { value: 'IT', label: 'IT - เทคโนโลยีสารสนเทศ' },
  { value: 'CS', label: 'CS - วิทยาการคอมพิวเตอร์' },
  { value: 'DSI', label: 'DSI - นวัตกรรมบริการดิจิทัล' },
]

// Image state
const imageFile = ref(null)
const imagePreview = ref(null)

// Camera state
const showCamera = ref(false)
const videoRef = ref(null)
const canvasRef = ref(null)
const stream = ref(null)

// UI state
const isLoading = ref(false)
const showModal = ref(false)
const modalTitle = ref('')
const modalMessage = ref('')

// Validation
function validateForm() {
  const errors = []

  if (!firstName.value || firstName.value.trim().length < 2) {
    errors.push('กรุณากรอกชื่อ (อย่างน้อย 2 ตัวอักษร)')
  }
  if (!lastName.value || lastName.value.trim().length < 2) {
    errors.push('กรุณากรอกนามสกุล (อย่างน้อย 2 ตัวอักษร)')
  }

  const yearVal = parseInt(graduationYear.value, 10)
  if (!graduationYear.value || isNaN(yearVal) || yearVal < 40 || yearVal > 99) {
    errors.push('รหัสรุ่นต้องเป็นตัวเลข 2 หลัก ระหว่าง 40-99 (เช่น 66)')
  }

  if (!major.value) {
    errors.push('กรุณาเลือกสาขา')
  }

  if (description.value && description.value.length > 500) {
    errors.push('คำบรรยายต้องไม่เกิน 500 ตัวอักษร')
  }

  if (!imageFile.value) {
    errors.push('กรุณาอัพโหลดรูปภาพ')
  }

  return errors
}

// File upload handler
function handleFileUpload(event) {
  const file = event.target.files[0]
  if (!file) return

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    showErrorModal('ประเภทไฟล์ไม่ถูกต้อง', 'อนุญาตเฉพาะไฟล์ JPG, PNG, WebP เท่านั้น')
    event.target.value = ''
    return
  }

  if (file.size > 5 * 1024 * 1024) {
    showErrorModal('ไฟล์ใหญ่เกินไป', 'ขนาดไฟล์ต้องไม่เกิน 5MB')
    event.target.value = ''
    return
  }

  imageFile.value = file
  const reader = new FileReader()
  reader.onload = (e) => {
    imagePreview.value = e.target.result
  }
  reader.readAsDataURL(file)
}

// Camera capture
async function openCamera() {
  try {
    showCamera.value = true
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    })
    stream.value = mediaStream
    // Wait for DOM to update before assigning srcObject
    setTimeout(() => {
      if (videoRef.value) {
        videoRef.value.srcObject = mediaStream
      }
    }, 100)
  } catch (error) {
    console.error('Camera error:', error)
    showErrorModal('ไม่สามารถเปิดกล้องได้', 'กรุณาตรวจสอบสิทธิ์การเข้าถึงกล้อง')
    showCamera.value = false
  }
}

function capturePhoto() {
  if (!videoRef.value || !canvasRef.value) return

  const video = videoRef.value
  const canvas = canvasRef.value
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight

  const ctx = canvas.getContext('2d')
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

  canvas.toBlob((blob) => {
    if (blob) {
      const file = new File([blob], `camera-${Date.now()}.jpg`, { type: 'image/jpeg' })
      imageFile.value = file
      imagePreview.value = canvas.toDataURL('image/jpeg')
    }
    closeCamera()
  }, 'image/jpeg', 0.9)
}

function closeCamera() {
  if (stream.value) {
    stream.value.getTracks().forEach(track => track.stop())
    stream.value = null
  }
  showCamera.value = false
}

function removeImage() {
  imageFile.value = null
  imagePreview.value = null
  // Reset file input
  const fileInput = document.querySelector('input[type="file"]')
  if (fileInput) fileInput.value = ''
}

function showErrorModal(title, message) {
  modalTitle.value = title
  modalMessage.value = message
  showModal.value = true
}

// Form submission
async function submitForm() {
  const errors = validateForm()
  if (errors.length > 0) {
    showErrorModal('กรุณาตรวจสอบข้อมูล', errors.join('\n'))
    return
  }

  isLoading.value = true

  try {
    const formData = new FormData()
    formData.append('firstName', firstName.value.trim())
    formData.append('lastName', lastName.value.trim())
    formData.append('graduationYear', graduationYear.value)
    formData.append('major', major.value)
    if (description.value) formData.append('description', description.value.trim())
    formData.append('image', imageFile.value)

    const response = await axios.post('/submissions', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    router.push({ name: 'Success', params: { id: response.data.id } })
  } catch (error) {
    console.error('Submit error:', error)
    const message = error.response?.data?.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'
    showErrorModal('เกิดข้อผิดพลาด', message)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="relative min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 py-8 px-4 overflow-hidden">
    <!-- Wavy layers -->
    <div class="pointer-events-none -z-50 absolute inset-0 opacity-30">
      <svg class="absolute bottom-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path fill="#ffffff" fill-opacity="0.3"
          d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,149.3C960,139,1056,149,1152,144C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
        </path>
      </svg>
      <svg class="absolute bottom-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path fill="#ffffff" fill-opacity="0.2"
          d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,208C672,213,768,203,864,186.7C960,171,1056,149,1152,154.7C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
        </path>
      </svg>
    </div>

    <!-- Gradient orbs -->
    <div class="absolute top-20 -left-20 w-96 h-96 bg-gradient-to-br from-yellow-300/40 to-pink-300/40 rounded-full blur-3xl animate-pulse" style="animation-duration: 4s"></div>
    <div class="absolute -top-20 right-10 w-80 h-80 bg-gradient-to-br from-blue-300/30 to-purple-300/30 rounded-full blur-3xl animate-pulse" style="animation-duration: 5s"></div>
    <div class="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-br from-pink-300/35 to-purple-300/35 rounded-full blur-3xl animate-pulse" style="animation-duration: 6s"></div>

    <!-- Sparkle particles -->
    <div class="absolute top-32 left-1/4 text-3xl opacity-80 animate-pulse" style="animation-duration: 2s">✨</div>
    <div class="absolute top-1/3 right-1/4 text-2xl opacity-70 animate-bounce" style="animation-duration: 3s">🕯️</div>
    <div class="absolute bottom-1/3 left-1/3 text-xl opacity-60 animate-pulse" style="animation-duration: 2.5s">💫</div>

    <div class="relative z-10 max-w-2xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="text-5xl sm:text-6xl mb-4">🕯️</div>
        <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">ส่งผลงานของคุณ</h1>
        <p class="text-white/90 text-base sm:text-lg">
          A cozy space for friends, alumni, and the SIT family to create unique
          candle cakes in the workshop, show off their creations, and share warm
          wishes for SIT's 30th anniversary.
        </p>
      </div>

      <!-- Form Card -->
      <div class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8">
        <form @submit.prevent="submitForm" class="space-y-6">

          <!-- First Name -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">ชื่อ <span class="text-red-500">*</span></label>
            <input
              v-model="firstName"
              type="text"
              placeholder="กรอกชื่อ"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition text-gray-800"
            />
          </div>

          <!-- Last Name -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">นามสกุล <span class="text-red-500">*</span></label>
            <input
              v-model="lastName"
              type="text"
              placeholder="กรอกนามสกุล"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition text-gray-800"
            />
          </div>

          <!-- Graduation Year -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">
              รหัสรุ่น (2 หลักแรกของรหัสนักศึกษา) <span class="text-red-500">*</span>
            </label>
            <input
              v-model="graduationYear"
              type="number"
              min="40"
              max="99"
              placeholder="เช่น 66"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition text-gray-800"
            />
            <p class="text-xs text-gray-500 mt-1">ตัวอย่าง: รหัสนักศึกษา 66130500065 ให้กรอก 66</p>
          </div>

          <!-- Major -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">สาขา <span class="text-red-500">*</span></label>
            <select
              v-model="major"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition bg-white appearance-none cursor-pointer text-gray-800"
            >
              <option value="" disabled>เลือกสาขา</option>
              <option v-for="opt in majorOptions" :key="opt.value" :value="opt.value">
                {{ opt.label }}
              </option>
            </select>
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">คำบรรยาย <span class="text-gray-400">(ไม่บังคับ)</span></label>
            <textarea
              v-model="description"
              rows="4"
              maxlength="500"
              placeholder="แชร์ความทรงจำดีๆ สมัยเรียนที่ SIT..."
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition resize-none text-gray-800"
            ></textarea>
            <p class="text-xs text-gray-500 text-right">{{ description.length }}/500</p>
          </div>

          <!-- Image Upload Section -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">รูปภาพ <span class="text-red-500">*</span></label>

            <!-- Upload buttons -->
            <div class="flex gap-3 mb-4" v-if="!imagePreview">
              <label class="flex-1 cursor-pointer bg-purple-100 hover:bg-purple-200 text-purple-700 font-medium py-3 px-4 rounded-lg text-center transition">
                <span class="text-lg">📁</span> เลือกไฟล์
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  @change="handleFileUpload"
                  class="hidden"
                />
              </label>
              <button
                type="button"
                @click="openCamera"
                class="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-3 px-4 rounded-lg text-center transition cursor-pointer"
              >
                <span class="text-lg">📷</span> ถ่ายรูป
              </button>
            </div>

            <p class="text-xs text-gray-500 mb-3" v-if="!imagePreview">รองรับไฟล์ JPG, PNG, WebP ขนาดไม่เกิน 5MB</p>

            <!-- Image Preview -->
            <div v-if="imagePreview" class="relative">
              <img :src="imagePreview" alt="Preview" class="w-full max-h-64 object-contain rounded-lg border border-gray-200" />
              <button
                type="button"
                @click="removeImage"
                class="mt-2 bg-red-100 hover:bg-red-200 text-red-700 font-medium py-2 px-4 rounded-lg transition cursor-pointer"
              >
                🗑️ ลบรูป
              </button>
            </div>

            <!-- Camera Modal -->
            <div v-if="showCamera" class="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
              <div class="bg-white rounded-2xl p-4 w-full max-w-lg">
                <video ref="videoRef" autoplay playsinline class="w-full rounded-lg bg-black"></video>
                <canvas ref="canvasRef" class="hidden"></canvas>
                <div class="flex gap-3 mt-4">
                  <button
                    type="button"
                    @click="capturePhoto"
                    class="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-lg transition cursor-pointer"
                  >
                    📸 ถ่าย
                  </button>
                  <button
                    type="button"
                    @click="closeCamera"
                    class="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-lg transition cursor-pointer"
                  >
                    ❌ ปิด
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 rounded-lg text-lg transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {{ isLoading ? 'กำลังส่ง...' : 'ส่งผลงาน' }}
          </button>
        </form>
      </div>


    </div>

    <!-- Validation Error Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" @click.self="showModal = false">
      <div class="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <h3 class="text-xl font-bold text-red-600 mb-3">{{ modalTitle }}</h3>
        <p class="text-gray-700 whitespace-pre-line mb-6">{{ modalMessage }}</p>
        <button
          @click="showModal = false"
          class="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 rounded-lg transition cursor-pointer"
        >
          ปิด
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Remove number input spinners */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
