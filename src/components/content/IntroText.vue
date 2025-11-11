<template>
    <div class="px-6 pt-8 lg:px-16 lg:pt-12 text-2xl lg:text-4xl lg:mt-20 w-full font-gsans flex flex-col items-center hidden md:flex intro-text-container overflow-x-hidden">
        <div class="w-full max-w-5xl">
            <div class="mb-8 text-center md:text-left">
                <p class="mb-6 leading-relaxed text-white">
                    Hi there! <span class="font-semibold">I</span>'m <span class="font-semibold">Advaith Narayanan</span>, currently {{ age.years }} years and {{ age.days }} days old and getting older. <span class="font-semibold">I</span> identify as a <s class="text-gray-500">webview</s> native Keralite.
                </p>
                <p class="mb-6 leading-relaxed text-white">
                    <span class="font-semibold">I</span>'m a curious person who loves 
                    <EasterEggIcon 
                        icon-type="music"
                        :icon-component="Music" 
                        tooltip=""
                    />
                    listening to music and tinkering with computers. <span class="font-semibold">I</span> spend a lot of time working with 
                    <EasterEggIcon 
                        icon-type="server"
                        :icon-component="Server" 
                        tooltip=""
                    />
                    servers (think of them as powerful computers that run websites and apps 24/7), 
                    <EasterEggIcon 
                        icon-type="linux"
                        :icon-component="Terminal" 
                        tooltip=""
                    />
                    Linux systems (the operating system that powers most of the internet), and 
                    <EasterEggIcon 
                        icon-type="raspberry"
                        :icon-component="Cpu" 
                        tooltip=""
                    />
                    building my own home lab infrastructure. <span class="font-semibold">I</span>'m also really into 
                    <EasterEggIcon 
                        icon-type="electronics"
                        :icon-component="Zap" 
                        tooltip=""
                    />
                    electronics—<span class="font-semibold">I</span> enjoy making <span class="font-semibold">my</span> own cables, soldering circuits, and working with microcontrollers. Coming from a computer science background, <span class="font-semibold">I</span>'m passionate about technology and love pushing hardware to its limits. <span class="font-semibold">I</span> maintain a clean desk setup with 
                    <EasterEggIcon 
                        icon-type="monitor"
                        :icon-component="Monitor" 
                        tooltip=""
                    />
                    dual monitors and enjoy experimenting with everything <span class="font-semibold">I</span> can get <span class="font-semibold">my</span> hands on.
                </p>
                <p class="mb-6 leading-relaxed text-white">
                    Currently, <span class="font-semibold">I</span>'m diving deep into 
                    <EasterEggIcon 
                        icon-type="telemetry"
                        :icon-component="Activity" 
                        tooltip=""
                    />
                    telemetry (collecting and analyzing data from systems to understand how they're performing), 
                    <EasterEggIcon 
                        icon-type="gitops"
                        :icon-component="GitBranch" 
                        tooltip=""
                    />
                    Argo CD & Kubernetes (tools that help deploy and manage applications automatically), and setting up infrastructure at home. When <span class="font-semibold">I</span>'m not coding, you'll find <span class="font-semibold">me</span> listening to music on <span class="font-semibold">my</span> 
                    <EasterEggIcon 
                        icon-type="speakers"
                        :icon-component="Speaker" 
                        tooltip=""
                    />
                    studio monitor speakers, working on home infrastructure projects, or tinkering with electronics like making custom cables and soldering circuits.
                </p>
            </div>
        </div>
        <br>
        <hr class="my-6 lg:my-8 w-full">
        <br>
        <div class="w-full">
            <Interests />
        </div>
        <br>
        <hr class="my-6 lg:my-8 w-full">
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Interests from './Interests.vue'
import EasterEggIcon from './EasterEggIcon.vue'
import { 
    Music, 
    Server, 
    Terminal, 
    Cpu, 
    Zap, 
    Monitor, 
    Activity, 
    GitBranch,
    Speaker
} from 'lucide-vue-next'

const now = new Date()
const past = new Date(2003, 6, 28)
const totalSeconds = Math.floor((now - past) / 1000)
const years = Math.floor(totalSeconds / (60 * 60 * 24 * 365.25))
const remainingSeconds = totalSeconds - (years * 60 * 60 * 24 * 365.25)
const days = Math.floor(remainingSeconds / (60 * 60 * 24))

const age = { years, days }

onMounted(() => {
    gsap.registerPlugin(ScrollTrigger)
})
</script>

<style scoped>
</style>
