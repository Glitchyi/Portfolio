<template>
    <div class="flex justify-center text-xxl underline">PROJECTS</div>
</template> 

<script>
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger"; // Import the ScrollTrigger plugin

export default {
    mounted() {
        gsap.registerPlugin(ScrollTrigger);
        let mm = gsap.matchMedia();
        mm.add("(min-width: 768px)", () => {
            gsap.fromTo(
            this.$refs.box,
            { x: '-80%', opacity: 0.05 }, 
            {
                x: '-30%',
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: this.$refs.box,
                    start: 'top 100%',
                    ease: "expo", 
                    end: 'bottom -20%',
                    scrub: 0.5,
                },
            },
        );
        });



    },
};
</script>