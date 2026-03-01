<script setup>
defineProps({
  wish: {
    type: Object,
    required: true,
  }
})

defineEmits(['click'])
</script>

<template>
  <div
    @click="$emit('click')"
    class="group h-fit bg-white/90 backdrop-blur-xl rounded-2xl shadow-sm overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer border border-white/50"
  >
    <!-- Image Section -->
    <div v-if="wish.thumbnailUrl || wish.imageUrl" class="w-full overflow-hidden">
      <img
        :src="wish.thumbnailUrl || wish.imageUrl"
        :alt="`${wish.firstName} ${wish.lastName}`"
        class="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
    </div>

    <!-- Content Section -->
    <div class="p-4">
      <!-- Name -->
      <h3 class="font-bold text-gray-800 text-sm">
        {{ wish.firstName }} {{ wish.lastName }}
      </h3>

      <!-- Generation Badge -->
      <span class="inline-block mt-1 bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full text-[10px] font-medium">
        {{ wish.major }}{{ wish.graduationYear }}
      </span>

      <!-- Description -->
      <p
        v-if="wish.description"
        class="text-gray-500 text-xs leading-relaxed mt-2 line-clamp-3"
      >
        {{ wish.description }}
      </p>

      <!-- Heartwarming message preview -->
      <p
        v-if="wish.heartwarmingMessage"
        class="text-purple-500/80 text-[11px] mt-2 italic line-clamp-2"
      >
        "{{ wish.heartwarmingMessage }}"
      </p>
    </div>
  </div>
</template>