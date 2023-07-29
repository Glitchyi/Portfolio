<template>
    <div id="content">
        <div class="rid  place-content-evenly font-gsans text-white">
            <Pagetitle/>
            <Images />
            <Introtext />
            <Projects/>
        </div>
        <div class="px-20 pt-20 flex text-white justify-center">
            
            <p class="text-6xl font-gsans"><hr>Hey, maybe get in touch some time!! (⁠◍⁠•⁠ᴗ⁠•⁠◍⁠)⁠❤<hr></p>
            
        </div>
        <AboutVue />
    </div>
</template>
<script>
import AboutVue from './About.vue';
import Images from './content/Images.vue';
import Swiper from './content/swiper.vue';
import Pagetitle from './content/Pagetitle.vue';
import Projects from './content/Projects.vue';
import Introtext from './content/Introtext.vue';
export default {
    name: 'Content',
    components: {
        AboutVue, Swiper, Pagetitle, Images, Introtext,Projects
    },
}
</script>
<style>
div#content {
    background: linear-gradient(158deg, #2C0057 0%, #04001D 55.57%);
}
</style>