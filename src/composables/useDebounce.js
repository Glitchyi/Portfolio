import { ref, onUnmounted } from 'vue'

/**
 * Composable for debouncing function calls
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export function useDebounce(fn, delay = 300) {
  let timeoutId = null
  
  const debouncedFn = (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      fn(...args)
    }, delay)
  }
  
  onUnmounted(() => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
  })
  
  return debouncedFn
}

/**
 * Composable for throttling function calls
 * @param {Function} fn - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export function useThrottle(fn, limit = 300) {
  let inThrottle = false
  
  const throttledFn = (...args) => {
    if (!inThrottle) {
      fn(...args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
  
  return throttledFn
}

