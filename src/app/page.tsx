"use client"; // Đánh dấu là Client Component

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'; // Sử dụng dynamic import

const MyChart = dynamic(() => import('./Chart'), { ssr: false }); // Chỉ sử dụng ở phía client

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
      try {
        const response = await fetch(`${process.env.API_URL}/bookings`);
        const result: Booking[] = await response.json();
        const formattedData = result.map((item: Booking) => ({
          name: item.service.name,
          value: item.quantity,
        }));
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
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
