"use client"; // Đánh dấu là Client Component

import { Column } from '@ant-design/charts';

const MyChart = ({ data }) => {
  const config = {
    data,
    xField: 'name',
    yField: 'value',
    columnWidth: 20,
    title: {
      visible: true,
      text: 'Booking Statistics',
    },
  };

  return <Column {...config} />;
};

export default MyChart;
