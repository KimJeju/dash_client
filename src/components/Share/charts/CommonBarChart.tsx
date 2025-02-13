import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ObjectValueParser } from 'components/Utils/Utils';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function CommonBarChart({
  zoneData,
  backgroundColor,
  division,
  labels,
}: {
  zoneData: any;
  backgroundColor: string;
  division: string;
  labels: string[];
}) {
  console.log(backgroundColor);
  const chartObj = ObjectValueParser(zoneData);
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: division,
        data: chartObj[0],
        backgroundColor: [
          'rgba(107, 171, 241, 0.5)',
          'rgba(105, 177, 243, 0.5)',
          'rgba(108, 187, 240, 0.5)',
          'rgba(114, 197, 238, 0.5)',
          'rgba(110, 204, 220, 0.5)',
          'rgba(69, 199, 193, 0.4)',
          'rgba(75, 192, 192, 0.4)',
        ], //bar색상
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
