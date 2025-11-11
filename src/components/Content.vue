<template>
    <div id="content">
        <div class="rid place-content-evenly font-gsans text-white">
            <div class="hidden md:block">
                <HelloTitle />
            </div>
            <ProjectGallery class="hidden md:block" />
            <IntroText />
            <TypingSpeed />
        </div>
    </div>
</template>

<script setup>
import ProjectGallery from './content/ProjectGallery.vue'
import HelloTitle from './content/HelloTitle.vue'
import IntroText from './content/IntroText.vue'
import TypingSpeed from './content/TypingSpeed.vue'
</script>

<style>
div#content {
    background: linear-gradient(158deg, #2C0057 0%, #04001D 55.57%);
}
</style>