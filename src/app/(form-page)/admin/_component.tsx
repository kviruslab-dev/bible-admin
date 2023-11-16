'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const ChartBox = () => {
  // ! label , data 만 받으면 될 듯
  const data = {
    labels: ['노이사', '노기정', '노마크'],
    datasets: [
      {
        label: '투표 현황',
        data: [12, 19, 3],
        backgroundColor: ['rgba(255, 99, 132)', 'rgba(54, 162, 235)', 'rgba(255, 206, 86)'],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        labels: {
          // This more specific font property overrides the global property
          font: {
            size: 16,
          },
        },
      },
      tooltip: {
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 14,
        },
        footerFont: {
          // size: 10, // there is no footer by default
        },
        callbacks: {
          title: () => {
            return 'title이랑 label 위치 변경!';
          },
          label: (item: any) => {
            const count = item.dataset.data[item.dataIndex];
            const label = item.label;
            const info = ` ${label} : ${count}`;
            return info;
          },
        },
      },
    },
  };

  return (
    <div className="h-2/6 py-5 flex justify-center">
      {/* <Doughnut data={data} options={options} /> */}
      {/* <Line
        datasetIdKey='id'
        data={{
          labels: ['Jun', 'Jul', 'Aug'],
          datasets: [
            {
              id: 1,
              label: '',
              data: [5, 6, 7],
            },
            {
              id: 2,
              label: '',
              data: [3, 2, 1],
            },
          ],
        }}
      /> */}
    </div>
  );
};
