<script setup>
import Masonry from 'masonry-layout'
import imagesLoaded from 'imagesloaded'
import WishCard from './WishCard.vue'
import { nextTick, onMounted, ref, watch } from 'vue'

const props = defineProps({
  wishes: {
    type: Array,
    required: true,
    default: () => []
  }
})

const grid = ref(null)
let msnry = null

const initMasonry = async () => {
  await nextTick()

  if (!grid.value) return

  // ถ้ามี instance อยู่แล้ว ให้ destroy ก่อน
  if (msnry) {
    msnry.destroy()
  }

  msnry = new Masonry(grid.value, {
    itemSelector: ".masonry-item",
    columnWidth: '.masonry-sizer',
    gutter: 24,
    percentPosition: true,
    horizontalOrder: true, // เรียงซ้ายไปขวาตามลำดับ
    transitionDuration: "0.3s",
  })

  // รอให้รูปภาพโหลดเสร็จก่อน layout
  imagesLoaded(grid.value, () => {
    msnry?.layout()
  })
}

onMounted(() => {
  initMasonry()
})

watch(
  () => props.wishes,
  async () => {
    await nextTick()
    if (msnry) {
      msnry.reloadItems()
      msnry.layout()
    } else {
      await initMasonry()
    }
  },
  { deep: true }
)
</script>

<template>
  <div ref="grid" class="mx-auto">
    <!-- Sizer สำหรับกำหนดขนาด column -->
    <div class="masonry-sizer"></div>
    
    <WishCard 
      v-for="wish in wishes" 
      :key="wish.id" 
      :wish="wish"
      class="masonry-item"
    />
  </div>
</template>

<style scoped>
.masonry-sizer,
.masonry-item {
  width: 100%;
  margin-bottom: 24px;
}

@media (min-width: 640px) {
  .masonry-sizer,
  .masonry-item {
    width: calc(50% - 12px);
  }
}

@media (min-width: 1024px) {
  .masonry-sizer,
  .masonry-item {
    width: calc(33.333% - 16px);
  }
}

@media (min-width: 1280px) {
  .masonry-sizer,
  .masonry-item {
    width: calc(25% - 18px);
  }
}

@media (min-width: 1536px) {
  .masonry-sizer,
  .masonry-item {
    width: calc(20% - 19.2px);
  }
}
</style>