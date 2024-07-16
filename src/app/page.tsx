"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const MyChart = dynamic(() => import('./Chart'), { ssr: false }); 

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
        const response = await fetch('http://localhost:4000/bookings?page=1&limit=5');
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
