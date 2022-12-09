import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import './App.css';
import { subLabel } from './plugins';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  subLabel
);

function App() {
  return (
    <div className='App container mx-auto'>
      <h1 className='text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-xl sm:tracking-tight text-left'>
        資産推移
      </h1>
      <br className='padding-10' />
      <Bar options={options} data={data} />
    </div>
  );
}

export const options = {
  responsive: true,
  options: {
    layout: {
      padding: {
        top: 10,
        bottom: 30,
      },
    },
    scales: {
      x: {
        ticks: {
          margin: 100,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  },
  plugins: {
    subLabel: {
      labels: [2021],
      numberOfBar: [2],
    },
    legend: {
      position: 'top',
      align: 'start',
      title: {
        padding: {
          bottom: 20,
        },
      },
    },
    title: {
      display: false,
      text: 'Assets Growings',
    },
    tooltip: {
      enabled: true,
    },
  },
};

const labels = [
  '2021.12',
  '2022.1',
  '2022.2',
  '2022.3',
  '2022.4',
  '2022.5',
  '2022.6',
  '2022.7',
  '2022.8',
  '2022.9',
  '2022.10',
  '2022.11',
];

const dataSets = [
  labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
];

export const data = {
  labels,
  datasets: [
    {
      id: 1,
      barPercentage: 1,
      label: 'Assets Values',
      data: dataSets[0],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      id: 2,
      barPercentage: 1,
      borderSkipped: false,
      label: 'Estimated Values',
      data: dataSets[1],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export default App;
