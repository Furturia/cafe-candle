<script setup>
import { RouterView, useRoute } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import { computed } from 'vue';

const route = useRoute();
const showNavbar = computed(() => true);
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400">
    <Navbar v-if="showNavbar" />
    <RouterView />
  </div>
</template>

<style scoped>

</style>
