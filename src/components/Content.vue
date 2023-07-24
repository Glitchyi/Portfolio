<template>
    <div class="" style="background: linear-gradient(135deg, #2C0057 0%, #04001D 69.79%);">
        <InfoVue />
        <AboutVue />
    </div>
</template>
<script>
import AboutVue from './About.vue';
import InfoVue from './Info.vue';
export default{
    name: 'content',
    components:{
        AboutVue,
        InfoVue
    }
}
</script>