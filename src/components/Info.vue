<template>
    <div class="rid h-screen place-content-evenly font-gsans text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl p-5 sm:p-10 xl:m text-white bg-slate-800">
        Hello {{ name }}
        <LineChart/>
    </div>
</template>
<script>

import LineChart from './BarChart.vue'

export default {
    name: 'Info',
    components: { LineChart },
}
</script>