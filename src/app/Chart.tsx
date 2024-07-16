"use client";

import { Column } from '@ant-design/charts';

interface DataItem {
  name: string;
  value: number;
}

interface MyChartProps {
  data: DataItem[];
}

const MyChart: React.FC<MyChartProps> = ({ data }) => {
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
