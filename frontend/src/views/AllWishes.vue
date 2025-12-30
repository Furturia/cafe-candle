<script setup>
import { ref } from "vue";
import WishModel from "../components/WishModel.vue";
import FormWishes from "./FormWishes.vue";

const isLoading = ref(false);

// Mock Data
const mockWishes = ref([
  {
    id: 1,
    name: "Sarah",
    message:
      "A cozy space for friends, alumni, and the SIT family to create unique candle cakes in the workshop, show off their creations, and share warm wishes for SIT's 30th.",
    image:
      "https://images.unsplash.com/photo-1514517521153-1be72277b32f?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "John",
    message:
      "A cozy space for friends, alumni, and the SIT family to create unique candle cakes in the workshop, show off their creations, and share warm wishes for SIT's 30th.",
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Emma",
    message:
      "A cozy space for friends, alumni, and the SIT family to create unique candle cakes in the workshop, show off their creations, and share warm wishes for SIT's 30th.",
    image:
      "https://images.unsplash.com/photo-1514517521153-1be72277b32f?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Michael",
    message:
      "A cozy space for friends, alumni, and the SIT family to create unique candle cakes in the workshop, show off their creations, and share warm wishes for SIT's 30th.",
    image:
      "https://images.unsplash.com/photo-1481391243133-f96216dcb5d2?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    name: "Lisa",
    message:
      "A cozy space for friends, alumni, and the SIT family to create unique candle cakes in the workshop, show off their creations, and share warm wishes for SIT's 30th.",
  },
  {
    id: 6,
    name: "David",
    message:
      "A cozy space for friends, alumni, and the SIT family to create unique candle cakes in the workshop, show off their creations, and share warm wishes for SIT's 30th.",
  },
  {
    id: 4,
    name: "Michael",
    message:
      "A cozy space for friends, alumni, and the SIT family to create unique candle cakes in the workshop, show off their creations, and share warm wishes for SIT's 30th.",
    image:
      "https://images.unsplash.com/photo-1481391243133-f96216dcb5d2?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Michael",
    message:
      "A cozy space for friends, alumni, and the SIT family to create unique candle cakes in the workshop, show off their creations, and share warm wishes for SIT's 30th.",
    image:
      "https://images.unsplash.com/photo-1481391243133-f96216dcb5d2?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Michael",
    message:
      "A cozy space for friends, alumni, and the SIT family to create unique candle cakes in the workshop, show off their creations, and share warm wishes for SIT's 30th.",
    image:
      "https://images.unsplash.com/photo-1481391243133-f96216dcb5d2?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Michael",
    message:
      "A cozy space for friends, alumni, and the SIT family to create unique candle cakes in the workshop, show off their creations, and share warm wishes for SIT's 30th.",
    image:
      "https://images.unsplash.com/photo-1481391243133-f96216dcb5d2?w=400&h=300&fit=crop",
  },
]);
</script>

<template>
  <div
    class="relative min-h-screen w-full p-8 h-full bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400"
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
    <div
      class="z-0 absolute top-32 left-1/4 text-3xl opacity-80 animate-pulse"
      style="animation-duration: 2s"
    >
      ✨
    </div>
    <div
      class="z-0 absolute top-1/3 right-1/4 text-2xl opacity-70 animate-bounce"
      style="animation-duration: 3s"
    >
      ⭐
    </div>
    <div
      class="z-0 absolute bottom-1/3 left-1/3 text-xl opacity-60 animate-pulse"
      style="animation-duration: 2.5s"
    >
      💫
    </div>
    <div
      class="z-0 absolute bottom-40 right-1/3 text-2xl opacity-20 animate-bounce"
      style="animation-duration: 3.5s"
    >
      ✨
    </div>
    <!-- Title -->
    <div class="w-full text-xl text-white font-light text-center mb-4">
      Cafe Candle
    </div>

    <!-- Main Content -->
    <main class="w-full mx-auto py-6 md:py-8 max-w-7xl">
      <div class="flex gap-1 text-white/70 text-lg mb-8">
        <RouterLink
          class="z-50 hover:underline hover:underline-offset-4"
          :to="{ name: 'home' }"
        >
          Home </RouterLink
        >>
        <RouterLink
          class="z-50 hover:underline hover:underline-offset-4"
          :to="{ name: 'AllWishes' }"
        >
          All wishes </RouterLink
        >
      </div>
      <!-- Page Title with Share Button -->
      <div class="flex items-center justify-between mb-6 md:mb-8">
        <div class="text-xl md:text-2xl text-white">All wishes</div>

        <RouterLink :to="{ name: 'FormWishes' }">
          <!-- Share Button -->
          <button
            class="z-50 inline-flex cursor-pointer items-center gap-2 text-purple-500 bg-white/80 border-white border-1 px-4 py-2.5 rounded-full shadow-md hover:shadow-xl transition-all duration-300 text-sm md:text-base lg:text-xl font-semibold hover:scale-105 active:scale-95"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              />
            </svg>
            <span
              class="hidden sm:inline bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent"
              >Share your wish</span
            >
            <span
              class="sm:hidden bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent"
              >Share</span
            >
          </button>
        </RouterLink>
      </div>

      <!-- Wishes Model -->
      <WishModel
        class="w-full mx-auto"
        v-if="!isLoading && mockWishes.length > 0"
        :wishes="mockWishes"
      />

      <!-- Loading State -->
      <!-- <div v-if="isLoading" class="text-center py-16">
        <div
          class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"
        ></div>
        <p class="text-white mt-4 font-light">กำลังโหลดคำอวยพร...</p>
      </div> -->

      <!-- Empty State -->
      <!-- <div
        v-else-if="mockWishes.length === 0"
        class="text-center py-16 bg-white/20 backdrop-blur-sm rounded-3xl"
      >
        <svg
          class="w-20 h-20 mx-auto text-white/50 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
          />
        </svg>
        <p class="text-white text-xl font-medium mb-2">ยังไม่มีคำอวยพร</p>
        <p class="text-white/80 text-sm">เป็นคนแรกที่แชร์คำอวยพร! 💫</p>
      </div> -->
    </main>
  </div>
</template>
