<template>
  <div ref="vantaContainer" class="vanta-background"></div>
</template>

<script setup>
import { ref } from 'vue'
import { useVanta } from '../composables/useVanta'

const vantaContainer = ref(null)

useVanta(vantaContainer, {
  highlightColor: 0x5f7c1,
  midtoneColor: 0x114164,
  lowlightColor: 0x475acd,
  baseColor: 0x9d93,
  blurFactor: 0.90,
  speed: 2.50,
  zoom: 0.70
})
</script>

<style scoped>
.vanta-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>


