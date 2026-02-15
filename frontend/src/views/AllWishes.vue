<script setup>
import { ref, onMounted } from "vue";
import WishCard from "../components/WishCard.vue";
import axios from "axios";

const isLoading = ref(true);
const wishes = ref([]);
const errorMessage = ref("");

// Modal state for viewing a wish
const selectedWish = ref(null);

const fetchWishes = async () => {
  isLoading.value = true;
  errorMessage.value = "";
  try {
    const response = await axios.get("/submissions");
    wishes.value = response.data;
  } catch (error) {
    console.error("Error fetching wishes:", error);
    errorMessage.value = "ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง";
  } finally {
    isLoading.value = false;
  }
};

const openWish = (wish) => {
  selectedWish.value = wish;
};

const closeWish = () => {
  selectedWish.value = null;
};

onMounted(() => {
  fetchWishes();
});
</script>

<template>
  <div
    class="relative min-h-screen w-full p-4 sm:p-8 h-full bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400"
  >
    <!-- Gradient orbs -->
    <div
      class="-z-50 absolute top-20 -left-20 w-96 h-96 bg-gradient-to-br from-yellow-300/40 to-pink-300/40 rounded-full blur-3xl animate-pulse"
      style="animation-duration: 4s"
    ></div>
    <div
      class="-z-50 absolute -top-20 right-10 w-80 h-80 bg-gradient-to-br from-blue-300/30 to-purple-300/30 rounded-full blur-3xl animate-pulse"
      style="animation-duration: 5s"
    ></div>
    <div
      class="-z-50 absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-br from-pink-300/35 to-purple-300/35 rounded-full blur-3xl animate-pulse"
      style="animation-duration: 6s"
    ></div>

    <!-- Sparkle particles -->
    <div class="z-0 absolute top-32 left-1/4 text-3xl opacity-80 animate-pulse" style="animation-duration: 2s">✨</div>
    <div class="z-0 absolute top-1/3 right-1/4 text-2xl opacity-70 animate-bounce" style="animation-duration: 3s">⭐</div>
    <div class="z-0 absolute bottom-1/3 left-1/3 text-xl opacity-60 animate-pulse" style="animation-duration: 2.5s">💫</div>
    <div class="z-0 absolute bottom-40 right-1/3 text-2xl opacity-20 animate-bounce" style="animation-duration: 3.5s">✨</div>

    <!-- Main Content -->
    <main class="relative z-10 w-full mx-auto py-6 md:py-8 max-w-7xl">
      <!-- Page Title with Share Button -->
      <div class="flex items-center justify-between mb-6 md:mb-8">
        <div>
          <div class="text-2xl md:text-3xl font-bold text-white">All Wishes</div>
          <p class="text-white/70 text-sm mt-1" v-if="!isLoading && wishes.length > 0">
            {{ wishes.length }} wishes shared
          </p>
        </div>

        <RouterLink :to="{ name: 'FormPage' }">
          <button
            class="z-50 inline-flex cursor-pointer items-center gap-2 text-purple-500 bg-white/80 border-white border-1 px-4 py-2.5 rounded-full shadow-md hover:shadow-xl transition-all duration-300 text-sm md:text-base lg:text-xl font-semibold hover:scale-105 active:scale-95"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
            </svg>
            <span class="hidden sm:inline bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">Share your wish</span>
            <span class="sm:hidden bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">Share</span>
          </button>
        </RouterLink>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-20">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
        <p class="text-white mt-4 font-light text-lg">กำลังโหลดคำอวยพร...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="errorMessage" class="text-center py-16 bg-white/20 backdrop-blur-sm rounded-3xl">
        <p class="text-6xl mb-4">😕</p>
        <p class="text-white text-xl font-medium mb-2">{{ errorMessage }}</p>
        <button
          @click="fetchWishes"
          class="mt-4 bg-white/80 hover:bg-white text-purple-600 font-medium py-2 px-6 rounded-full transition cursor-pointer"
        >
          ลองใหม่อีกครั้ง
        </button>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="wishes.length === 0"
        class="text-center py-16 bg-white/20 backdrop-blur-sm rounded-3xl"
      >
        <p class="text-6xl mb-4">💬</p>
        <p class="text-white text-xl font-medium mb-2">ยังไม่มีคำอวยพร</p>
        <p class="text-white/80 text-sm mb-6">เป็นคนแรกที่แชร์คำอวยพร! 💫</p>
        <RouterLink :to="{ name: 'FormPage' }">
          <button class="bg-white/80 hover:bg-white text-purple-600 font-semibold py-3 px-8 rounded-full transition cursor-pointer">
            ✨ Share your wish
          </button>
        </RouterLink>
      </div>

      <!-- Gallery Grid -->
      <div
        v-else
        class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-5 space-y-4 sm:space-y-5"
      >
        <WishCard
          v-for="wish in wishes"
          :key="wish.id"
          :wish="wish"
          class="break-inside-avoid"
          @click="openWish(wish)"
        />
      </div>
    </main>

    <!-- Detail Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="selectedWish"
          class="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          @click.self="closeWish"
        >
          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 scale-95 translate-y-4"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 scale-100 translate-y-0"
            leave-to-class="opacity-0 scale-95 translate-y-4"
          >
            <div
              v-if="selectedWish"
              class="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              <!-- Modal Image -->
              <div v-if="selectedWish.imageUrl" class="w-full bg-gray-100">
                <img
                  :src="selectedWish.imageUrl"
                  :alt="`${selectedWish.firstName} ${selectedWish.lastName}`"
                  class="w-full max-h-80 object-cover"
                />
              </div>

              <!-- Modal Content -->
              <div class="p-6 space-y-4">
                <!-- Name & Gen -->
                <div>
                  <h3 class="text-xl font-bold text-gray-800">
                    {{ selectedWish.firstName }} {{ selectedWish.lastName }}
                  </h3>
                  <span class="inline-block mt-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                    {{ selectedWish.major }}{{ selectedWish.graduationYear }} (พ.ศ. {{ selectedWish.fullYears?.buddhist }})
                  </span>
                </div>

                <!-- Heartwarming Message -->
                <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                  <p class="text-purple-700 text-sm leading-relaxed italic">
                    "{{ selectedWish.heartwarmingMessage }}"
                  </p>
                </div>

                <!-- Description -->
                <p v-if="selectedWish.description" class="text-gray-600 text-sm leading-relaxed">
                  {{ selectedWish.description }}
                </p>

                <!-- Close Button -->
                <button
                  @click="closeWish"
                  class="w-full mt-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-xl transition cursor-pointer"
                >
                  ปิด
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
