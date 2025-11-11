<template>
  <div id="back" class="wrapper relative hidden md:block">
    <div ref="vantaContainer" class="vanta-background"></div>
    <div class="grid h-screen place-content-around relative z-10">
      <div class="flex flex-col items-center lg:items-start justify-center lg:justify-start lg:mt-5 xl:justify-evenly lg:flex-row lg:items-center">
        <div class="cur mx-10 flex flex-col justify-center items-center lg:items-start">
          <img class="profile-image cur rounded-full w-3/4 max-w-sm lg:max-w-lg xl:max-w-xl aspect-square object-cover" src="../assets/profile.gif" alt="Profile Pic" />
        </div>
        <div class="cur mx-10 flex flex-col justify-center items-center lg:items-start text-white font-gsans">
          <p class="my-5 font-bold leading-none text-4xl lg:text-8xl lg:mt-0 name-text text-center lg:text-left">
            ADVAITH <br />
            NARAYANAN
          </p>
          <p class="font-bold text-xl lg:text-4xl tagline-text text-center lg:text-left">
            Software Developer at IBM Kochi |<br />
            Computer Enthusiast |<br />頭いい
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useVanta } from '../composables/useVanta'

const vantaContainer = ref(null)

useVanta(vantaContainer, {
  highlightColor: 0x4dfdef,
  midtoneColor: 0x1a5d7e,
  lowlightColor: 0x0a4d6e,
  baseColor: 0x2d8ba3,
  blurFactor: 0.90,
  speed: 2.50,
  zoom: 0.70
})
</script>

<style scoped>
.wrapper {
  position: relative;
  overflow: hidden;
}

.vanta-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.profile-image {
  border-radius: 50% !important;
  aspect-ratio: 1 / 1;
  object-fit: cover;
}

#down-arrow {
  transition: opacity 1s;
}
</style>