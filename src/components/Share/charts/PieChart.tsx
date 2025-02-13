import React from 'react';
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { ObjectValueParser } from 'components/Utils/Utils';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export function PieChart({ zoneData, title }: { zoneData: any; title: string }) {
  const chartObj = ObjectValueParser(zoneData);
  let labels = chartObj[1];
  const data = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: chartObj[0],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Doughnut data={data} />;
}
