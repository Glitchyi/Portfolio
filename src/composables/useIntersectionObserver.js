import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Composable for Intersection Observer API
 * Useful for lazy loading and scroll-triggered animations
 * @param {Object} options - IntersectionObserver options
 * @returns {Object} { elementRef, isIntersecting, stop }
 */
export function useIntersectionObserver(options = {}) {
  const elementRef = ref(null)
  const isIntersecting = ref(false)
  let observer = null

  const defaultOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
    ...options
  }

  onMounted(() => {
    if (!elementRef.value) return

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isIntersecting.value = entry.isIntersecting
      })
    }, defaultOptions)

    observer.observe(elementRef.value)
  })

  onUnmounted(() => {
    if (observer && elementRef.value) {
      observer.unobserve(elementRef.value)
      observer.disconnect()
    }
  })

  const stop = () => {
    if (observer && elementRef.value) {
      observer.unobserve(elementRef.value)
      observer.disconnect()
    }
  }

  return {
    elementRef,
    isIntersecting,
    stop
  }
}

