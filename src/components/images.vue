<template>
    <div id="galary" class="flex flex-col justfy-evenly w-full">
        <section class="flex flex-row justify-evenly">
            <img src="../assets/images/1row1.webp" alt="">
            <img src="../assets/images/2row1.webp" alt="">
            <img src="../assets/images/3row1.webp" alt="">
            <img src="../assets/images/4row1.webp" alt="">
        </section>
        <section class="flex flex-row justify-evenly">
            <img src="../assets/images/1row2.webp" alt="">
            <img src="../assets/images/2row2.webp" alt="">
            <img src="../assets/images/3row2.webp" alt="">
            <img src="../assets/images/4row2.webp" alt="">
        </section>
        <section class="flex flex-row justify-evenly">
            <img src="../assets/images/1row3.webp" alt="">
            <img src="../assets/images/2row3.webp" alt="">
            <img src="../assets/images/3row3.webp" alt="">
            <img src="../assets/images/4row3.webp" alt="">
        </section>
    </div>
</template>

<script>
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger"; 
export default {
    mounted() {
        gsap.registerPlugin(ScrollTrigger); // Register the ScrollTrigger plugin
        let mm = gsap.matchMedia();
        mm.add("(min-width: 768px)", () => {
            gsap.utils.toArray('section').forEach((section, index) => {
                console.log(section, index);
                gsap.fromTo(
                    section,
                    { x: index == 1 ? '90%' : '-80%', opacity: 0.05 }, // Move the element from the left and set initial opacity to 0
                    {
                        x: `${index == 1 ? '5%' : '-5%'}`,
                        opacity: 1,
                        duration: 1,
                        scrollTrigger: {
                            trigger: section,
                            start: `top 80%`,
                            end: 'bottom 30%',
                            scrub: 0.5, toggleActions: "play reset none reset",
                        },
                    },
                )
            });
        });


    },
};
</script>
<style>
@media screen and (max-width: 768px) {
    section img{
        width: 10vh;
    }
}
</style>