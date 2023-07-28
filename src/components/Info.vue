<template>
    <div class="rid  place-content-evenly font-gsans text-white" >
        <scrolltext/>
        <images/>
        <introtext/>
    </div>
</template>
<script>
import images from './images.vue';
import Swiper from './swiper.vue';
import scrolltext from './scrolltext.vue';
import introtext from './introtext.vue';
export default {
    name: 'Info',
    components: { Swiper, scrolltext ,images, introtext},
}
</script>

