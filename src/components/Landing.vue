<template>
  <div id="back" class="wrapper">
    <div class="grid h-screen place-content-around">
      <div class="flex flex-col justify-start lg:mt-5 xl:justify-evenly lg:flex-row">
        <div class="cur mx-10 flex flex-col justify-start">
          <img id="profile" class="cur" src="../assets/profile.gif" alt="Profile Pic" />
        </div>
        <div class="cur mx-10 flex flex-col justify-start font-gsans">
          <p class="my-5 font-bold leading-none text-4xl lg:text-8xl lg:mt-20" id="name">
            ADVAITH <br />
            NARAYANAN
          </p>
          <p class="font-bold text-xl lg:text-4xl" id="tagline">
            Student at MITS |<br />
            Computer Enthusiast |<br />頭いい
          </p>
        </div>
      </div>
    </div>
  
  </div>
</template>
<script>
export default {
  data() {
    return {
      showElement: true,
    };
  },
};
</script>
<style>
#down-arrow {
  transition: opacity 1s ;
}
</style>