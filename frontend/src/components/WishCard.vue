<script setup>
defineProps({
  wish: {
    type: Object,
    required: true,
    validator: (value) => {
      return value.name && value.message
    }
  }
})
</script>

<template>
  <div class="h-fit bg-linear-to-b from-white/80 to-white/50 backdrop-blur-2xl border-1 border-white rounded-3xl shadow-sm overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ">
    <!-- Image Section -->
    <div v-if="wish.image" class="w-full overflow-hidden p-4 pb-0">
      <img 
        :src="wish.image" 
        class="border-1 border-white w-full h-auto rounded-2xl object-cover"
        loading="lazy"
      />
    </div>

    <!-- Content Section -->
    <div class="p-5 text-center">
      <p class="text-indigo-600 text-base leading-relaxed mb-4">
        {{ wish.message }}
      </p>
      <p class="text-indigo-600/70 text-sm">
        - {{ wish.name }} -
      </p>
    </div>
  </div>
</template>