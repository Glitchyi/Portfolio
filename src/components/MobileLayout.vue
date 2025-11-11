<template>
  <div class="md:hidden min-h-screen flex flex-col">
    <!-- Top Section: Vanta Background -->
    <div class="wrapper flex-1 flex flex-col justify-start px-10 text-white font-gsans relative overflow-hidden min-h-screen">
      <div ref="vantaContainer" class="vanta-background"></div>
      <div class="grid h-screen place-content-around relative z-10">
        <div class="flex flex-col justify-start">
          <!-- Profile Image -->
          <div class="cur mx-10 flex flex-col justify-start">
            <img 
              id="profile"
              class="profile-image cur rounded-full w-3/4" 
              src="../assets/profile.gif" 
              alt="Profile Pic" 
            />
          </div>
          
          <!-- Name and Tagline -->
          <div class="cur mx-10 flex flex-col justify-start text-white font-gsans">
            <h1 id="name" class="my-5 font-bold leading-none text-4xl lg:text-8xl lg:mt-20 text-left">
              ADVAITH<br />NARAYANAN
            </h1>
            <p id="tagline" class="font-bold text-xl lg:text-4xl text-left text-[#4dfdef]">
              @SWE at IBM Kochi |<br />
              Computer Enthusiast |<br />
              頭いい
            </p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Bottom Section: Dark Purple with Social Links -->
    <div class="bg-[#04001d] px-6 py-8 pb-safe text-white font-gsans">
      <div class="flex flex-col gap-4">
        <!-- Social Links -->
        <div class="flex flex-col gap-3">
          <a 
            v-for="link in socialLinks" 
            :key="link.name"
            :href="link.url" 
            class="flex items-center gap-2 text-white hover:text-teal-300 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{{ link.name }}</span>
            <img 
              class="w-4 h-4" 
              src="https://img.icons8.com/windows/96/FFFFFF/external-link-squared.png" 
              :alt="`${link.name} link`" 
            />
          </a>
        </div>
        
        <!-- Separator -->
        <hr class="border-gray-600 my-2" />
        
        <!-- Contact Section -->
        <div class="flex flex-col gap-2">
          <p class="text-white">Contact me at:</p>
          <a 
            href="mailto:advaith@glitchy.systems" 
            class="text-[#6b7280] hover:text-gray-300 transition-colors"
          >
            advaith@glitchy.systems
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useVanta } from '../composables/useVanta'

const vantaContainer = ref(null)

// Lighter vanta colors for mobile
useVanta(vantaContainer, {
  highlightColor: 0x4dfdef,
  midtoneColor: 0x1a5d7e,
  lowlightColor: 0x0a4d6e,
  baseColor: 0x2d8ba3,
  blurFactor: 0.90,
  speed: 2.50,
  zoom: 0.70
})

const socialLinks = [
  { name: 'Github', url: 'https://github.com/Glitchyi/' },
  { name: 'Linkedin', url: 'https://www.linkedin.com/in/glitchy/' },
  { name: 'Twitter', url: 'https://twitter.com/advaithnarayan' },
  { name: 'Instagram', url: 'https://www.instagram.com/advaithnarayanan/' },
  { name: 'Telegram', url: 'https://t.me/Glitchyie' }
]
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
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3));
  border-radius: 50% !important;
  aspect-ratio: 1 / 1 !important;
  object-fit: cover;
  flex-shrink: 0;
}

.pb-safe {
  padding-bottom: max(2rem, env(safe-area-inset-bottom));
}
</style>

