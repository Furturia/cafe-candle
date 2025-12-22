<script setup>
import CakeModel from '@/components/CakeModel.vue';


</script>

<template>
   <div class="relative w-full h-full min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 overflow-hidden">
        <!-- Wavy layers -->
        <div class="absolute inset-0 opacity-30">
            <svg class="absolute bottom-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
                <path fill="#ffffff" fill-opacity="0.3" d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,149.3C960,139,1056,149,1152,144C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
            <svg class="absolute bottom-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
                <path fill="#ffffff" fill-opacity="0.2" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,208C672,213,768,203,864,186.7C960,171,1056,149,1152,154.7C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
        </div>
        
        <!-- Gradient orbs -->
        <div class="absolute top-20 -left-20 w-96 h-96 bg-gradient-to-br from-yellow-300/40 to-pink-300/40 rounded-full blur-3xl animate-pulse" style="animation-duration: 4s;"></div>
        <div class="absolute -top-20 right-10 w-80 h-80 bg-gradient-to-br from-blue-300/30 to-purple-300/30 rounded-full blur-3xl animate-pulse" style="animation-duration: 5s;"></div>
        <div class="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-br from-pink-300/35 to-purple-300/35 rounded-full blur-3xl animate-pulse" style="animation-duration: 6s;"></div>
        
        <!-- Sparkle particles -->
        <div class="absolute top-32 left-1/4 text-3xl opacity-80 animate-pulse" style="animation-duration: 2s;">✨</div>
        <div class="absolute top-1/3 right-1/4 text-2xl opacity-70 animate-bounce" style="animation-duration: 3s;">⭐</div>
        <div class="absolute bottom-1/3 left-1/3 text-xl opacity-60 animate-pulse" style="animation-duration: 2.5s;">💫</div>
        <div class="absolute bottom-40 right-1/3 text-2xl opacity-75 animate-bounce" style="animation-duration: 3.5s;">✨</div>
        
        <div class="w-full text-xl text-white font-light text-center">Cafe Candle</div>
        <div class="relative w-fit">
            <CakeModel class="relative" />
        </div></div>
</template>

<style>

</style>