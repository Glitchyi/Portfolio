<template>
    <section class="typing-speed-section hidden md:block w-full py-16 px-6 lg:px-16" aria-label="Typing speed statistics">
        <div class="max-w-6xl mx-auto">
            <div class="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
                <div class="flex items-center gap-3 md:gap-4">
                    <span 
                        class="text-2xl lg:text-3xl font-gsans text-white cursor-pointer hover:underline transition-all"
                        @click="openMonkeytypeProfile"
                    >
                        Also, I kinda type sometimes
                    </span>
                    <span class="arrow-pointer text-3xl lg:text-5xl text-white" aria-hidden="true">→</span>
                </div>
                
                <div class="flex flex-col items-center md:items-end">
                    <div class="text-xl lg:text-2xl mb-2 text-gray-400 font-gsans">Latest Monkey Type</div>
                    <div class="text-xl lg:text-2xl mb-4 text-gray-400 font-gsans">Speed</div>
                    <div class="flex items-baseline gap-2">
                        <p class="text-5xl lg:text-9xl font-bold text-white font-gsans" aria-live="polite">{{ wpm }}</p>
                        <span class="text-2xl lg:text-4xl text-gray-400 font-gsans">wpm</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const wpm = ref(':) ')
let abortController = null

const fetchTypingSpeed = async () => {
    // Cancel previous request if still pending
    if (abortController) {
        abortController.abort()
    }
    
    abortController = new AbortController()
    
    try {
        const response = await fetch('https://wpm.glitchy.systems/', {
            method: 'GET',
            signal: abortController.signal,
            // Add timeout
            headers: {
                'Accept': 'application/json',
            }
        })
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        if (data && typeof data.wpm !== 'undefined') {
            wpm.value = data.wpm.toString()
        }
    } catch (error) {
        // Silently handle errors (network issues, aborted requests, etc.)
        if (error.name !== 'AbortError') {
            console.warn('Failed to fetch typing speed:', error)
        }
        wpm.value = ':) '
    }
}

onMounted(() => {
    fetchTypingSpeed()
})

onUnmounted(() => {
    // Cleanup: abort any pending requests
    if (abortController) {
        abortController.abort()
    }
})

const openMonkeytypeProfile = () => {
    window.open('https://monkeytype.com/profile/Glitchyie', '_blank')
}
</script>

<style scoped>
.arrow-pointer {
    display: inline-block;
    transition: transform 0.3s ease;
}

.typing-speed-section:hover .arrow-pointer {
    transform: translateX(0.5rem);
}
</style>

