<script setup>
import WishCard from './WishCard.vue'

defineProps({
  wishes: {
    type: Array,
    required: true,
    default: () => []
  }
})
</script>

<template>
  <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <WishCard 
      v-for="wish in wishes" 
      :key="wish.id" 
      :wish="wish"
    />
  </div>
</template>