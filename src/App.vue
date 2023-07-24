<template>
  <HomeVue @button-clicked="loadContent" />
  <ContentVue v-if="load" />
</template>

<script setup>
import HomeVue from "./components/Landing.vue";
import ContentVue from "./components/Content.vue";
</script>
<script>
export default {
  components: {
    HomeVue,
    ContentVue,
  },
  data() {
    return {
      load: false,
    };
  },
  methods: {
    loadContent() {
      this.load=!this.load;
      setTimeout(() => {
        window.scrollTo(0,100);
        console.log("Scrolling");
      }, 500);
    },
  },
};
</script>
