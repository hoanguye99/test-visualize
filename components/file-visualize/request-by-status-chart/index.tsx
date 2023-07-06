import React from 'react'
import { MasterData, TestCaseDetail } from '..'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import dayjs from 'dayjs'
import { memo } from 'react'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartDataLabels,
  Tooltip,
  Legend
)

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  maxBarThickness: 37,
  // barThickness: 25,
  borderRadius: 2,
  layout: {
    padding: {
      top: 25,
      bottom: 25,
      right: 50,
      left: 25,
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Response Code',
        padding: 2,
        font: {
          size: 14,
          weight: '500',
        },
      },
      grid: {
        drawBorder: false,
        display: false,
      },
      stacked: true,
      // ticks: {
      //   color: '#95aac9',
      // },
    },
    y: {
      title: {
        display: true,
        text: 'Quantity',
        padding: 2,
        font: {
          size: 14,
          weight: '500',
        },
      },
      beginAtZero: true,
      stacked: true,
      // grid: {
      //   // drawBorder: true,
      //   // display: false,
      // },
      ticks: {
        font: {
          size: 10,
        },
      },
    },
  },
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        padding: 20,
        usePointStyle: true,
      },
    },
    datalabels: {
      color: 'black',
      font: {
        weight: 'bold' as const,
        size: 14,
      },
      // padding: 6,
      anchor: 'start' as const,
      align: 'end' as const,
      display: function (context: any) {
        var dataset = context.dataset
        var count = dataset.data.length
        var value = dataset.data[context.dataIndex]
        // return value as number > count * 1.5;
        return (
          typeof value === 'number' && (value as number) !== 0 && count < 40
        )
      },
    },
  },
}

interface RequestByStatusChartProps {
  data: MasterData
}

const RequestByStatusChart = (props: RequestByStatusChartProps) => {
  const codeOccurrencePass = countCodeOccurrences(props.data.results, 'pass')
  const codeOccurrenceFailed = countCodeOccurrences(
    props.data.results,
    'failed'
  )
  const data = {
    labels: Object.keys(codeOccurrencePass),
    datasets: [
      {
        label: 'pass',
        data: Object.values(codeOccurrencePass),
        backgroundColor: '#22c55e',
        // borderColor: '#2c7be5',
      },
      {
        label: 'fail',
        data: Object.values(codeOccurrenceFailed),
        backgroundColor: '#f87171',
        // borderColor: '#2c7be5',
      },
    ],
  }
  return <Bar className="h-[460px]" options={options} data={data} />
}

// Count Pass or Failed Test Case Per Response Code {"200":201,"201":24,"400":7,"401":4}
function countCodeOccurrences(arr: TestCaseDetail[], type: 'pass' | 'failed') {
  const resultType = type === 'pass'
  return arr.reduce((count: Record<string, number>, element) => {
    const code = element.responseCode.code
    const testCasesPerResult = Object.values(element.tests).filter(
      (val) => val === resultType
    ).length
    count[code] = (count[code] || 0) + testCasesPerResult
    return count
  }, {})
}

export default memo(RequestByStatusChart)
