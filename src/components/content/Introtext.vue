<template>
    <div class="flex justify-evenly p-10 lg:px-20 text-2xl lg:text-4xl lg:mt-20 w-full ">
        <div>
            Hi there! I'm Advaith Narayanan,<br>
                Currently {{ age }}, getting older<br>
                Identify as a <s>webview</s> native Keralite.<br>
                <p class="pconly">Also, I kinda type somtimes → </p>
        </div>
        <div class="pconly">
            Latest Monkey Type <br>Speed<br>
            <div class="flex justify-start items-baseline">
                <p class="text-4xl lg:text-8xl">{{ wpm }}</p> wpm
            </div>
        </div>
    </div>
</template>
<script setup>
let d = new Date();
const age = d.getFullYear() - 2003;
</script>
<script>
    let wpm = 75;
    fetch('https://api.monkeytype.com/results/last',{
        method: 'GET',
        headers: {
            'Authorization': import.meta.env.VITE_MONKEYTYPE_API_KEY,
        },
    }).then(res => res.json()).then(data => {
        wpm =data.data.wpm;
    });
    export default {
        setup() {
            return {
                wpm,
            }
        }
    }
</script>