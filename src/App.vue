<template>
  <!-- Mobile Layout - Simple -->
  <MobileLayout />
  
  <!-- Desktop Layout - Full Experience -->
  <div class="hidden md:block">
    <Landing />
    <Content />
    <Suspense>
      <template #default>
        <Terminal />
      </template>
      <template #fallback>
        <div class="w-full py-20 flex justify-center">
          <div class="text-white">Loading terminal...</div>
        </div>
      </template>
    </Suspense>
    <Suspense>
      <template #default>
        <NetworkTopology />
      </template>
      <template #fallback>
        <div class="w-full py-20 flex justify-center">
          <div class="text-white">Loading network visualization...</div>
        </div>
      </template>
    </Suspense>
    <AboutVue />
  </div>
</template>

<script setup>
import { defineAsyncComponent, Suspense } from 'vue'
import Landing from "./components/Landing.vue"
import AboutVue from './components/About.vue'
import Content from "./components/Content.vue"
import MobileLayout from "./components/MobileLayout.vue"
import { register } from "swiper/element/bundle"

// Lazy load heavy desktop components
const Terminal = defineAsyncComponent(() => import("./components/desktop/Terminal.vue"))
const NetworkTopology = defineAsyncComponent(() => import("./components/desktop/NetworkTopology.vue"))

register()
</script>

