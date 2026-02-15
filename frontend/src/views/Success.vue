<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

const submission = ref(null)
const isLoading = ref(true)
const errorMessage = ref('')

onMounted(async () => {
  try {
    const { id } = route.params
    const response = await axios.get(`/submissions/${id}`)
    submission.value = response.data
  } catch (error) {
    console.error('Error fetching submission:', error)
    if (error.response?.status === 404) {
      errorMessage.value = 'ไม่พบข้อมูลที่ต้องการ'
    } else {
      errorMessage.value = 'เกิดข้อผิดพลาดในการโหลดข้อมูล'
    }
  } finally {
    isLoading.value = false
  }
})

function goHome() {
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 py-8 px-4">
    <div class="max-w-2xl mx-auto">

      <!-- Loading state -->
      <div v-if="isLoading" class="text-center py-20">
        <div class="inline-block w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
        <p class="text-white mt-4 text-lg">กำลังโหลด...</p>
      </div>

      <!-- Error state -->
      <div v-else-if="errorMessage" class="text-center py-20">
        <div class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-md mx-auto">
          <p class="text-6xl mb-4">😕</p>
          <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ errorMessage }}</h2>
          <button
            @click="goHome"
            class="mt-6 bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 px-8 rounded-lg transition cursor-pointer"
          >
            🏠 กลับหน้าหลัก
          </button>
        </div>
      </div>

      <!-- Success content -->
      <div v-else-if="submission" class="space-y-6">
        <!-- Success heading -->
        <div class="text-center">
          <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">✅ ส่งผลงานสำเร็จ!</h1>
        </div>

        <!-- Heartwarming message -->
        <div class="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/30">
          <p class="text-xl md:text-2xl text-white font-medium leading-relaxed">
            {{ submission.heartwarmingMessage }}
          </p>
        </div>

        <!-- Submission card -->
        <div class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
          <!-- Photo -->
          <div class="w-full bg-gray-100">
            <img
              :src="submission.imageUrl"
              :alt="`${submission.firstName} ${submission.lastName}`"
              class="w-full max-h-96 object-contain mx-auto"
            />
          </div>

          <!-- Details -->
          <div class="p-6 space-y-4">
            <!-- Full name -->
            <h2 class="text-2xl font-bold text-gray-800">
              {{ submission.firstName }} {{ submission.lastName }}
            </h2>

            <!-- Graduation info -->
            <div class="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
              {{ submission.major }}{{ submission.graduationYear }} (พ.ศ. {{ submission.fullYears.buddhist }})
            </div>

            <!-- Description -->
            <p v-if="submission.description" class="text-gray-600 leading-relaxed">
              {{ submission.description }}
            </p>
          </div>
        </div>

        <!-- Home button -->
        <div class="text-center">
          <button
            @click="goHome"
            class="bg-white hover:bg-gray-100 text-purple-600 font-bold py-4 px-10 rounded-full text-lg transition shadow-lg cursor-pointer"
          >
            🏠 กลับหน้าหลัก
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
