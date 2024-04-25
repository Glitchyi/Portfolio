<template>
    <div id="content">
        <div class="rid  place-content-evenly font-gsans text-white">
            <Pagetitle/>
            <Images />
            <Introtext />
        </div>
        <AboutVue />
    </div>
</template>
<script>
import AboutVue from './About.vue';
import Images from './content/Images.vue';
import Pagetitle from './content/Pagetitle.vue';
import Introtext from './content/Introtext.vue';
export default {
    name: 'Content',
    components: {
        AboutVue, Pagetitle, Images, Introtext
    },
}
</script>
<style>
div#content {
    background: linear-gradient(158deg, #2C0057 0%, #04001D 55.57%);
}
</style>