<template>
    <div class="px-10 pt-10 lg:px-20 text-2xl lg:text-4xl lg:mt-20 w-full ">
        <div class="banter flex justify-evenly">
            <div class="md:w-1/2 ">
                Hi there! I'm Advaith Narayanan,
                Currently {{ age.years }} years and {{ age.days }} days, getting older
                Identify as a <s>webview</s> native Keralite.
                <p class="pconly">Also, I kinda type somtimes → </p>
            </div>

            <div class="pconly">
                Latest Monkey Type <br>Speed<br>
                <div class="flex justify-start items-baseline">
                    <p class="text-4xl lg:text-8xl">{{ wpm }}</p> wpm
                </div>
            </div>

        </div>
        <br>
        <hr>
        <br>
        <Technicaldetails />
        <br>
        <hr>
    </div>
</template>
<script setup>
let d = new Date();
const now = new Date();
const past = new Date(2003, 6, 28); // January 1, 2003
const totalSeconds = Math.floor((now - past) / 1000);
const years = Math.floor(totalSeconds / (60 * 60 * 24 * 365.25));
const remainingSeconds = totalSeconds - (years * 60 * 60 * 24 * 365.25);
const days = Math.floor(remainingSeconds / (60 * 60 * 24));

const age = { years: years, days: days };
</script>
<script>
import Technicaldetails from './Technicaldetails.vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


let wpm = ':)⠀';
fetch('https://api.monkeytype.com/results/last', {
    method: 'GET',
    headers: {
        'Authorization': `ApeKey ${import.meta.env.VITE_MONKEYTYPE_API_KEY}`,
    },
}).then(res => res.json()).then(data => {
    wpm = data.data.wpm;
}).catch(err => {
})
export default {
    mounted() {
        gsap.registerPlugin(ScrollTrigger);

    },
    data() {
        return {
            wpm,
        }
    },
    components: {
        Technicaldetails,
    }
}
</script>