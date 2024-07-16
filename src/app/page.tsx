"use client"; // Đánh dấu là Client Component

import React, { useEffect, useState } from 'react';
import MyChart from './Chart'; // Đảm bảo đường dẫn đúng

interface Booking {
  service: {
    name: string;
  };
  quantity: number;
}

const Page = () => {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://interview-test-be.onrender.com/bookings');
      const result: Booking[] = await response.json();
      const formattedData = result.map((item: Booking) => ({
        name: item.service.name,
        value: item.quantity,
      }));
      setData(formattedData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Booking Statistics</h1>
      <MyChart data={data} />
    </div>
  );
};

export default Page;
