<script setup>
import { ref } from "vue";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();
const isMenuOpen = ref(false);

const navLinks = [
  { name: "home", label: "Home", icon: "🏠" },
  { name: "AllWishes", label: "All Wishes", icon: "💌" },
  { name: "FormPage", label: "Submit", icon: "✨" },
];

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<template>
  <nav
    class="sticky top-0 z-[100] w-full backdrop-blur-xl bg-white/15 border-b border-white/20 shadow-lg shadow-purple-500/5"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-14 sm:h-16">
        <!-- Brand -->
        <RouterLink
          :to="{ name: 'home' }"
          class="flex items-center gap-2 group"
          @click="closeMenu"
        >
          <span class="text-2xl">🕯️</span>
          <span
            class="text-lg sm:text-xl font-semibold text-white tracking-wide group-hover:text-yellow-200 transition-colors duration-300"
          >
            Cafe Candle
          </span>
        </RouterLink>

        <!-- Desktop Nav Links -->
        <div class="hidden md:flex items-center gap-1">
          <RouterLink
            v-for="link in navLinks"
            :key="link.name"
            :to="{ name: link.name }"
            class="relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
            :class="
              route.name === link.name
                ? 'bg-white/25 text-white shadow-inner shadow-white/10'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            "
          >
            <span class="mr-1.5">{{ link.icon }}</span>
            {{ link.label }}
          </RouterLink>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMenu"
          class="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 cursor-pointer"
        >
          <div class="flex flex-col gap-1.5 items-center justify-center">
            <span
              class="block w-5 h-0.5 bg-white rounded-full transition-all duration-300"
              :class="
                isMenuOpen ? 'rotate-45 translate-y-[4px]' : ''
              "
            ></span>
            <span
              class="block w-5 h-0.5 bg-white rounded-full transition-all duration-300"
              :class="isMenuOpen ? 'opacity-0' : ''"
            ></span>
            <span
              class="block w-5 h-0.5 bg-white rounded-full transition-all duration-300"
              :class="
                isMenuOpen ? '-rotate-45 -translate-y-[4px]' : ''
              "
            ></span>
          </div>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2 max-h-0"
      enter-to-class="opacity-100 translate-y-0 max-h-60"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 max-h-60"
      leave-to-class="opacity-0 -translate-y-2 max-h-0"
    >
      <div
        v-show="isMenuOpen"
        class="md:hidden overflow-hidden backdrop-blur-xl bg-white/10 border-t border-white/10"
      >
        <div class="px-4 py-3 space-y-1">
          <RouterLink
            v-for="link in navLinks"
            :key="link.name"
            :to="{ name: link.name }"
            @click="closeMenu"
            class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300"
            :class="
              route.name === link.name
                ? 'bg-white/20 text-white'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            "
          >
            <span class="text-lg">{{ link.icon }}</span>
            {{ link.label }}
          </RouterLink>
        </div>
      </div>
    </Transition>
  </nav>
</template>
