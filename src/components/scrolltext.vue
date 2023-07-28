<template>
    <div ref="box"
        class="rapper flex justify-center flex-col whitespace-nowrap text-6xl sm:text-7xl lg:text-xxl md:text-9xl landing-none">
        HELLO! HELLO! HELLO! HELLO HELLO
    </div>
    <div ref="box2">

    </div>
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

  
<style></style>