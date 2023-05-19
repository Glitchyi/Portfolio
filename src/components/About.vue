<template>
    <div id="back" class="wrapper">
        
        <div class="grid h-screen place-content-evenly font-gsans text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl p-5 sm:p-10 xl:m text-white">
            <a class="flex" href="https://github.com/Glitchyi/">Github <img class="w-10 h-10"
                src="https://img.icons8.com/windows/96/FFFFFF/external-link-squared.png" /></a>
            <a class="flex" href="https://www.linkedin.com/in/advaith-narayanan-a72152214/">Linkedin <img
                    class="w-10 h-10" src="https://img.icons8.com/windows/96/FFFFFF/external-link-squared.png" /></a>
            <a class="flex" href="https://twitter.com/advaithnarayan">Twitter <img class="w-10 h-10"
                src="https://img.icons8.com/windows/96/FFFFFF/external-link-squared.png" /></a>
                <a class="flex" href="https://www.instagram.com/advaithnarayanan/">Instagram <img class="w-10 h-10"
                    src="https://img.icons8.com/windows/96/FFFFFF/external-link-squared.png" /></a>
            <a class="flex" href="https://www.fiverr.com/glitchyi">Fiverr <img class="w-10 h-10"
                    src="https://img.icons8.com/windows/96/FFFFFF/external-link-squared.png" /></a>
            <p>-----------------</p>
            <div class="text-2xl text-gray-500">
                <p class="">Contact me at:</p>
                <a href="mailto:advaith@glitchy.systems" class="text-2xl">advaith@glitchy.systems</a> 
            <div class="py-5">
                
                <div class="border  p-1 border-sky-500 backdrop-blur-sm text-white text-center rounded-lg text-xs sm:text-xl" @click=cptoclip()>
                    <p id="cptext" class="p-2"><div class="cptext" :key="text">{{text}}</div></p>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'About',
    components: {
    },
    data() {
        return {
            text: "iwr -useb https://glitchy.systems/hey.ps1 | iex" 
        }
    },
    methods: {
        cptoclip() {
            var elem = document.getElementById("cptext")
            navigator.clipboard.writeText("iwr -useb https://glitchy.systems/hey.ps1 | iex")
            elem.style.transition = "opacity 2s"
            elem.innerHTML = "Copied to clipboard!"
            setTimeout(() => {
                elem.style.opacity = 0
            }, 2000)


            setTimeout(() => {
                elem.style.opacity = 1
                elem.innerHTML = "iwr -useb https://glitchy.systems/hey.ps1 | iex"
            }, 2000);

        },
        toggleTransition() {
            var elem = document.getElementById("cptext")
            this.text = this.text === "iwr -useb https://glitchy.systems/hey.ps1 | iex" ? "Copied to clipboard!" : "iwr -useb https://glitchy.systems/hey.ps1 | iex";
        }
    }
}
</script>

<style>
.fade-in-enter-active {
    transition: opacity 300ms cubic-bezier(0.55, 0.085, 0.68, 0.53);
}

.fade-in-leave-active {
    transition: opacity 225ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.fade-in-enter,
.fade-in-leave-to {
    opacity: 0;
}

</style>