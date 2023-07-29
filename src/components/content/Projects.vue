<template>
    <div class="flex flex-col justify-normal text-xl">
        <div class="flex justify-start">
            <img class="px-20 pconly h-20 md:h-64 lg:h-full" src="../../assets/projects.svg" alt="">
            <div class="projs flex flex-col justify-evenly lg:text-5xl">
                <div class="">
                    <h1><a class="underline text-hyperlink hover:text-cyan" href="https://shreshta.pages.dev">SHRESHTA WEBSITE</a></h1>
                    <p class="text-sm lg:text-xl w-2/3">Celebrating a decade of stardust and blues, Muthoot Institute Of Technology and Science presents SHRESHTA'23, an event enriched with the essence of culture and technology. The techno-cultural fest fosters the best of everything. Together we learn, create, and innovate as our team develops a website for the event using Reactjs. The website incorporates industry standard web techonolgies and has an automated development environment which makes use of containerisation and serverless cloud technologies to achive the same.</p>
                </div>
                
                <div class="">
                    <h1 class="uppercase underline"><a class="text-hyperlink hover:text-cyan" href="https://github.com/Glitchyi/Lets-Git-Started">Let's Git Started</a></h1>
                    <p class="text-sm lg:text-xl w-2/3">A beginner friendly workshop covering Git & GitHub concepts and a brief intro into the Open Source world and Hacktoberfest, along with a open to all repository that anyone can contibute to</p>
                </div>
                
                <div class="">
                    <h1 class="underlin"><a class="text-hyperlink hover:text-cyan" href="">PRAMANAM</a></h1>
                    <p class="text-sm lg:text-xl w-2/3">A simple PDF reaser application made with <a class="text-hyperlink hover:text-cyan" href="https://tauri.app">Tauri.app</a>, It makes use of PDF.js to render the files. Still currently in development</p>
                </div>
                
                <div class="">
                    <h1 class="underline uppercase"><a class="text-hyperlink hover:text-cyan" href="https://prevnt.vercel.app/">Drug Aware</a></h1>
                    <p class="text-sm lg:text-xl w-2/3">Drug abuse is a growing problem that affects individuals, families, and communities. To address this issue, we propose the development of a mobile app called DrugAware. This app aims to provide information about drug abuse, its effects, and ways to prevent and report it. In addition, the app will use data analytics to identify patterns of drug abuse, which can help law enforcement agencies to take preventive measures. The app also includes a chatbot to help users identify drugs and medications.</p>
                </div>

                <div class="">
                    <h1 class="underline uppercase "><a class="text-hyperlink hover:text-cyan" href="https://github.com/Glitchyi/file-oru-friendine">file-oru-friendine</a></h1>
                    <p class="text-sm lg:text-xl w-2/3">This project is an attempt to replicate a file websits making use of plain JS and HTML with a backend in rust, this was a project to learn the esssentials of pure JS as well as the various web frameworks in the rust ecosystesm </p>
                </div>
    
            </div>
        </div>
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
            gsap.utils.toArray('.projs').forEach((sims, index) => {
                gsap.fromTo(
                    '.projs',
                    { x: '-60%', opacity: 0.05 }, // Move the element from the left and set initial opacity to 0
                    {
                        x: `0%`,
                        opacity: 1,
                        scrollTrigger: {
                            trigger: sims,
                            start: `top 100%`,
                            end: 'bottom 90%',
                            scrub: 0.5, 
                            triggerOnce: true,
                        },
                    },
                )
            });
        });


    },
};
</script>

