<template>
    <div class="flex flex-col justify-normal gap-8 text-xl select-none font-gsans pb-8">
        Honestly, I'm not a web dev ¯\_(ツ)_/¯ 
        but, I do indulge in:
        <p class="text-gray opacity-50 hidden md:block">Try hovering</p>
        <p class="text-gray text-sm opacity-50 md:hidden block">Try clicking</p>
        <div class="flex justify-start">
            <div class="text-2xl select-none md:text-3xl lg:text-5xl xl:text-7xl flex flex-col gap-4 w-full overflow-x-hidden">
                <div 
                    v-for="(interest, index) in interests" 
                    :key="index"
                    class="interest-item relative overflow-hidden"
                >
                    <div class="interest-cover absolute inset-0 flex items-center pl-2 md:pl-5 whitespace-nowrap z-10">
                        {{ interest.title }}
                    </div>
                    <div class="interest-content pl-2 md:pl-5 bg-white text-black flex items-center overflow-x-auto whitespace-normal break-words">
                        <span class="text-sm md:text-base lg:text-lg xl:text-xl">{{ interest.content }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import interestsData from '../../data/interests.json'

const interests = ref([])

onMounted(() => {
    interests.value = interestsData
})
</script>

<style scoped>
.interest-item {
    height: auto;
    min-height: 1.5em;
    width: 100%;
    max-width: 100%;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    margin-bottom: 0.5rem;
}

.interest-cover {
    background: linear-gradient(158deg, #2C0057 0%, #04001D 55.57%);
    color: white;
    height: 100%;
    opacity: 1;
    transition: opacity 0.3s ease;
    overflow: hidden;
}

.interest-item:hover .interest-cover {
    opacity: 0;
}

.interest-content {
    height: auto;
    min-height: 1.5em;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    display: flex;
    align-items: flex-start;
    max-width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none;
    -ms-overflow-style: none;
    word-wrap: break-word;
    word-break: break-word;
    flex-wrap: wrap;
}

.interest-content::-webkit-scrollbar {
    display: none;
}

@media screen and (max-width: 768px) {
    .interest-item {
        height: 2em;
    }
    
    .interest-content {
        height: 2em;
        min-height: 2em;
    }
}
</style>

