<template>
    <div id="content">
        <InfoVue/>
        <AboutVue/>
    </div>
</template>
<script>
import InfoVue from './Info.vue';
import AboutVue from './About.vue';

export default{
    name: 'Content',
    components: {
        InfoVue,
        AboutVue,
    },
}
</script>
<style>
div#content{
    background: linear-gradient(158deg, #2C0057 0%, #04001D 55.57%);
}
</style>