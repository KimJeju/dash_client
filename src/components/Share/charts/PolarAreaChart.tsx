import React from 'react';
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import { ObjectValueParser } from 'components/Utils/Utils';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export function PolarAreaChart({ zoneData, labels }: { zoneData: any; labels: string[] }) {
  const chartObj = ObjectValueParser(zoneData);

  const data = {
    labels: labels,
    datasets: [
      {
        label: '평균 체류시간 ( 분 )',
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

  return <PolarArea data={data} />;
}
