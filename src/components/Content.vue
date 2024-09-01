<template>
    <div id="content">
        <div class="rid  place-content-evenly font-gsans text-white">
            <div class="hidden md:block" >
                <Pagetitle/>
            </div>
            <Images class="hidden md:block" />
            <Introtext />
        </div>
    </div>
</template>
<script>
import Images from './content/Images.vue';
import Pagetitle from './content/Pagetitle.vue';
import Introtext from './content/Introtext.vue';
export default {
    name: 'Content',
    components: {
        Pagetitle, Images, Introtext
    },
}
</script>
<style>
div#content {
    background: linear-gradient(158deg, #2C0057 0%, #04001D 55.57%);
}
</style>