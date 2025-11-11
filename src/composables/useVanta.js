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
      const VANTA = (await import('vanta/dist/vanta.fog.min.js')).default
      
      vantaEffect.value = VANTA({
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

