import { onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'

export function useVanta(elementRef, options = {}) {
  const vantaEffect = ref(null)

  const defaultOptions = {
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    highlightColor: 0x4dfdef,
    midtoneColor: 0x1a5d7e,
    lowlightColor: 0x0a4d6e,
    baseColor: 0x2d8ba3,
    blurFactor: 0.90,
    speed: 2.50,
    zoom: 0.70,
    ...options
  }

  onMounted(async () => {
    if (!elementRef.value) return

    try {
      // Import the fog effect module
      const fogModule = await import('vanta/dist/vanta.fog.min.js')
      
      // The module might export the effect function directly or as default
      // It might also attach to window.VANTA
      let fogEffect = null
      
      if (window.VANTA && typeof window.VANTA.FOG === 'function') {
        // If VANTA is available on window (UMD module)
        fogEffect = window.VANTA.FOG
      } else if (fogModule.default && typeof fogModule.default === 'function') {
        // If default export is the function directly
        fogEffect = fogModule.default
      } else if (fogModule.default && typeof fogModule.default.FOG === 'function') {
        // If default export has FOG method
        fogEffect = fogModule.default.FOG
      } else if (typeof fogModule === 'function') {
        // If module itself is the function
        fogEffect = fogModule
      } else {
        console.error('Vanta module structure:', fogModule)
        throw new Error('Could not find Vanta FOG effect function')
      }
      
      if (typeof fogEffect !== 'function') {
        throw new Error('Fog effect is not a function')
      }
      
      vantaEffect.value = fogEffect({
        ...defaultOptions,
        el: elementRef.value,
        THREE: THREE
      })
    } catch (error) {
      console.error('Failed to load Vanta.js:', error)
    }
  })

  onUnmounted(() => {
    if (vantaEffect.value) {
      vantaEffect.value.destroy()
      vantaEffect.value = null
    }
  })

  return {
    vantaEffect
  }
}

