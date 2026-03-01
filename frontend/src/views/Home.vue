<script setup>
import CakeModel from '@/components/CakeModel.vue'
import { RouterLink } from 'vue-router';
</script>

<template>
  <div
    class="relative w-full p-8 h-full min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 overflow-hidden"
  >
    <!-- Wavy layers -->
    <div class="pointer-events-none -z-50 absolute inset-0 opacity-30">
      <svg
        class="absolute bottom-0 w-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#ffffff"
          fill-opacity="0.3"
          d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,149.3C960,139,1056,149,1152,144C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
      <svg
        class="absolute bottom-0 w-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#ffffff"
          fill-opacity="0.2"
          d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,208C672,213,768,203,864,186.7C960,171,1056,149,1152,154.7C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>

    <!-- Gradient orbs -->
    <div
      class="pointer-events-none absolute top-20 -left-20 w-96 h-96 bg-gradient-to-br from-yellow-300/40 to-pink-300/40 rounded-full blur-3xl animate-pulse"
      style="animation-duration: 4s"
    ></div>
    <div
      class="pointer-events-none absolute -top-20 right-10 w-80 h-80 bg-gradient-to-br from-blue-300/30 to-purple-300/30 rounded-full blur-3xl animate-pulse"
      style="animation-duration: 5s"
    ></div>
    <div
      class="pointer-events-none absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-br from-pink-300/35 to-purple-300/35 rounded-full blur-3xl animate-pulse"
      style="animation-duration: 6s"
    ></div>

    <!-- Sparkle particles -->
    <div
      class="pointer-events-none absolute top-32 left-1/4 text-3xl opacity-80 animate-pulse"
      style="animation-duration: 2s"
    >
      ✨
    </div>
    <div
      class="pointer-events-none absolute top-1/3 right-1/4 text-2xl opacity-70 animate-bounce"
      style="animation-duration: 3s"
    >
      ⭐
    </div>
    <div
      class="pointer-events-none absolute bottom-1/3 left-1/3 text-xl opacity-60 animate-pulse"
      style="animation-duration: 2.5s"
    >
      💫
    </div>
    <div
      class="pointer-events-none z-0 absolute bottom-40 right-1/3 text-2xl opacity-20 animate-bounce"
      style="animation-duration: 3.5s"
    >
      ✨
    </div>

    <div class="w-full text-xl text-white font-light text-center mb-4">
      Cafe Candle
    </div>

    <div class="z-50 text-white text-center flex flex-col items-center gap-4">
      <h1 class="text-xl md:text-4xl font-bold">SIT 30 TH ANNIVERSARY !</h1>
      <p class="text-sm w-full md:text-xl lg:w-[40%]">
        A cozy space for friends, alumni, and the SIT family to create unique
        candle cakes in the workshop, show off their creations, and share warm
        wishes for SIT’s 30th anniversary.
      </p>
    </div>
    <div class="-space-y-6">
      <div class="translate-y-16 w-full mx-auto max-w-md">
        <!-- Left bubble -->
        <div class="flex justify-start">
          <div
            class="relative bg-white rounded-2xl px-4 py-2 text-xl shadow-md"
          >
            🥰🎂🎉
            <!-- tail -->
            <div
              class="absolute left-2 -bottom-1 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white"
            ></div>
          </div>
        </div>

        <!-- Right bubble -->
        <div class="flex justify-end">
          <div
            class="relative bg-white rounded-2xl px-4 py-2 text-purple-600 shadow-md"
          >
            Happy 30th SIT!
            <!-- tail -->
            <div
              class="absolute right-2 -bottom-1 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white"
            ></div>
          </div>
        </div>
      </div>
      <div class="w-full relative flex items-center justify-center mx-auto">
        <CakeModel
          class="pointer-events-none relative overflow-hidden mx-auto"
        />
      </div>
    </div>

    <RouterLink :to="{ name: 'AllWishes' }" class="relative z-[200] block">
      <button
        class="text-lg cursor-pointer mx-auto text-center px-12 py-4 mt-0 sm:mt-10 rounded-full bg-white text-purple-500 sm:text-xl font-medium flex items-center gap-4 shadow-[0_0_0_4px_rgba(255,255,255,0.4)] hover:shadow-[0_0_0_6px_rgba(255,255,255,0.5)] transition-all duration-300"
      >
        Get started
        <span class="text-2xl">→</span>
      </button>
    </RouterLink>
  </div>
</template>

<style></style>
