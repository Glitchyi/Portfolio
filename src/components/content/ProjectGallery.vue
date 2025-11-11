<template>
    <div class="images-container flex flex-col overflow-clip">
        <section ref="section1" class="flex flex-row justify-evenly">
            <img src="../../assets/images/1row1.webp" alt="">
            <img src="../../assets/images/2row1.webp" alt="">
            <img src="../../assets/images/3row1.webp" alt="">
            <img src="../../assets/images/4row1.webp" alt="">
        </section>
        <section ref="section2" class="flex flex-row justify-evenly">
            <img src="../../assets/images/1row2.webp" alt="">
            <img src="../../assets/images/2row2.webp" alt="">
            <img src="../../assets/images/3row2.webp" alt="">
            <img src="../../assets/images/4row2.webp" alt="">
        </section>
        <section ref="section3" class="flex flex-row justify-evenly">
            <img src="../../assets/images/1row3.webp" alt="">
            <img src="../../assets/images/2row3.webp" alt="">
            <img src="../../assets/images/3row3.webp" alt="">
            <img src="../../assets/images/4row3.webp" alt="">
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const section1 = ref(null)
const section2 = ref(null)
const section3 = ref(null)

onMounted(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    const mm = gsap.matchMedia()
    mm.add("(min-width: 768px)", () => {
        const sections = [section1.value, section2.value, section3.value]
        
        sections.forEach((section, index) => {
            if (!section) return
            
            gsap.fromTo(
                section,
                { x: index === 1 ? '90%' : '-80%', opacity: 0.05 },
                {
                    x: `${index === 1 ? '5%' : '-5%'}`,
                    opacity: 1,
                    duration: 1,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 90%',
                        end: 'bottom 70%',
                        scrub: 0.5,
                        toggleActions: "play reset none reset",
                    },
                }
            )
        })
    })
})
</script>

<style scoped>
.images-container section {
    padding: 30px;
}

.images-container section img {
    width: 40vh;
}

@media screen and (max-width: 768px) {
    .images-container {
        border: 2.5rem solid transparent;
    }
    
    .images-container section img {
        width: 20vh;
    }
    
    .images-container section {
        padding: 0px;
    }
    
    .images-container section:nth-child(1) {
        padding: 0px;
        transform: translate(-60px);
    }
    
    .images-container section:nth-child(2) {
        padding: 0px;
        transform: translate(-120px);
    }
    
    .images-container section:nth-child(3) {
        padding: 0px;
        transform: translate(-180px);
    }
}
</style>

