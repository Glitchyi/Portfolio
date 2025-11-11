<template>
    <div class="typing-speed-section hidden md:block w-full py-16 px-6 lg:px-16">
        <div class="max-w-6xl mx-auto">
            <div class="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
                <div class="flex items-center gap-3 md:gap-4">
                    <span class="text-2xl lg:text-3xl font-gsans text-white">Also, I kinda type sometimes</span>
                    <span class="arrow-pointer text-3xl lg:text-5xl text-white">→</span>
                </div>
                
                <div class="flex flex-col items-center md:items-end">
                    <div class="text-xl lg:text-2xl mb-2 text-gray-400 font-gsans">Latest Monkey Type</div>
                    <div class="text-xl lg:text-2xl mb-4 text-gray-400 font-gsans">Speed</div>
                    <div class="flex items-baseline gap-2">
                        <p class="text-5xl lg:text-9xl font-bold text-white font-gsans">{{ wpm }}</p>
                        <span class="text-2xl lg:text-4xl text-gray-400 font-gsans">wpm</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const wpm = ref(':) ')

onMounted(() => {
    fetch('https://wpm.glitchy.systems/', {
        method: 'GET'
    })
        .then(res => res.json())
        .then(data => {
            wpm.value = data.wpm.toString()
        })
        .catch(() => {
            wpm.value = ':) '
        })
})
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

