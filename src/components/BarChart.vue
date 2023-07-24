<template>
  <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale)

export default {
  name: 'LineChart',
  components: { Line },
  data() {
    return {
      chartData: {
        labels: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15"
        ],
        datasets: [
          {
            label: "WPM",
            data: [
              83,
              84,
              87,
              81,
              77,
              74,
              63,
              66,
              67,
              69,
              68,
              69,
              65,
              63,
              60
            ],
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: false
          },
          {
            label: "Raw WPM",
            data: [
              96,
              84,
              96,
              84,
              96,
              72,
              12,
              84,
              72,
              96,
              48,
              84,
              24,
              48,
              96
            ],
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            fill: false
          },
          {
            label: "Errors",
            data: [
              0,
              0,
              0,
              1,
              2,
              1,
              1,
              0,
              0,
              0,
              0,
              0,
              1,
              0,
              2
            ],
            borderColor: "rgba(54, 162, 235, 1)",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            fill: false
          }
        ]
      },
      chartOptions: {
        responsive: true,
   
      }
    }
  }
}
</script>
