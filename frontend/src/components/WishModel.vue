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
  <div class="mx-auto grid
      grid-cols-[repeat(auto-fill,minmax(260px,1fr))]
      gap-6
      auto-rows-auto
      [grid-auto-flow:dense]">
    <WishCard 
      v-for="wish in wishes" 
      :key="wish.id" 
      :wish="wish"
    />
  </div>
</template>