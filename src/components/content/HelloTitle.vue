<template>
    <div ref="box"
        class="page-title pt-10 flex justify-center flex-col whitespace-nowrap text-6xl sm:text-8xl md:text-9xl lg:text-xxl xl:text-[20rem] font-gsans font-black landing-none">
        HELLO! HELLO! HELLO! HELLO! HELLO!
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const box = ref(null)

onMounted(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    const mm = gsap.matchMedia()
    mm.add("(min-width: 768px)", () => {
        if (!box.value) return
        
        gsap.fromTo(
            box.value,
            { x: '-80%', opacity: 0.05 },
            {
                x: '-30%',
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: box.value,
                    start: 'top 100%',
                    ease: "expo",
                    end: 'bottom -20%',
                    scrub: 0.5,
                },
            }
        )
    })
})
</script>

<style scoped>
.page-title {
    font-size: clamp(3rem, 8vw, 24rem);
    line-height: 1;
    font-weight: 900;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

@media (max-width: 768px) {
    .page-title {
        position: relative;
        right: 40%;
        font-size: clamp(2.5rem, 10vw, 6rem);
    }
}

@media (min-width: 1280px) {
    .page-title {
        font-size: 24rem;
    }
}
</style>

