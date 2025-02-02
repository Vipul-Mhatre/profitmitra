"use client";

import React, { useEffect, useState } from 'react';
import Background from './components/Background';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  BarElement,
} from 'chart.js';
import { Pie, Line, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, LineElement, PointElement, Filler, BarElement);

interface StockData {
  symbol: string;
  price: number;
  change: number;
  volume: number;
}

const HomePage = () => {
  const [stockData, setStockData] = useState<StockData[]>([]);

  useEffect(() => {
    async function fetchStockData() {
      const mockData: StockData[] = [
        { symbol: 'AAPL', price: 150.25, change: 1.2, volume: 3000000 },
        { symbol: 'GOOGL', price: 2750.32, change: -0.3, volume: 1500000 },
        { symbol: 'AMZN', price: 3450.00, change: 2.5, volume: 1800000 },
        { symbol: 'TSLA', price: 720.10, change: -1.0, volume: 2000000 },
        { symbol: 'HDFC', price: 2650.00, change: 1.5, volume: 800000 },
        { symbol: 'INFY', price: 1450.00, change: 0.5, volume: 950000 },
        { symbol: 'TCS', price: 3200.00, change: 0.0, volume: 500000 },
        { symbol: 'RELIANCE', price: 2450.00, change: 3.0, volume: 1200000 },
      ];
      setStockData(mockData);
    }

    fetchStockData();
  }, []);

  const colors = [
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 159, 64, 0.6)',
    'rgba(201, 203, 207, 0.6)',
    'rgba(255, 99, 132, 0.6)',
  ];

  const pieData = {
    labels: stockData.map(stock => stock.symbol),
    datasets: [
      {
        label: 'Stock Price Distribution',
        data: stockData.map(stock => stock.price),
        backgroundColor: colors,
        borderColor: colors.map(color => color.replace('0.6', '1')),
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: stockData.map(stock => stock.symbol),
    datasets: [
      {
        label: 'Stock Volume',
        data: stockData.map(stock => stock.volume),
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.3,
      },
    ],
  };

  const barData = {
    labels: stockData.map(stock => stock.symbol),
    datasets: [
      {
        label: 'Stock Price Change (%)',
        data: stockData.map(stock => stock.change),
        backgroundColor: colors,
        borderColor: colors.map(color => color.replace('0.6', '1')),
        borderWidth: 1,
      },
    ],
  };

  const histogramData = {
    labels: stockData.map(stock => stock.symbol),
    datasets: [
      {
        label: 'Price Distribution',
        data: stockData.map(stock => stock.price),
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Calculate analytics
  const averagePrice = (stockData.reduce((sum, stock) => sum + stock.price, 0) / stockData.length).toFixed(2);
  const totalPriceChange = stockData.reduce((sum, stock) => sum + stock.change, 0).toFixed(2);
  const totalVolumeTraded = stockData.reduce((sum, stock) => sum + stock.volume, 0).toLocaleString();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Background />
      <h1 className="text-3xl font-bold mb-4 text-black">Your Personalized Investment Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stockData.map((stock) => (
          <div key={stock.symbol} className="p-4 bg-white shadow rounded-lg hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-black">{stock.symbol}</h2>
            <p className="text-lg">Price: <span className="font-bold">${stock.price.toFixed(2)}</span></p>
            <p className={stock.change >= 0 ? 'text-green-600' : 'text-red-600'}>
              {stock.change >= 0 ? '+' : '-'}{Math.abs(stock.change).toFixed(2)}%
            </p>
            <p>Volume: {stock.volume.toLocaleString()}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="w-[20vw]">
          <h2 className="text-2xl font-bold mb-4 text-black">Stock Price Distribution</h2>
          <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: true }} />
        </div>

        <div className="w-full md:w-1/2 h-48">
          <h2 className="text-2xl font-bold mb-4 text-black">Stock Volume Trend</h2>
          <Line data={lineData} options={{ responsive: true, maintainAspectRatio: true }} />
        </div>
      </div>

      <div className="mt-8 flex flex-col md:flex-row justify-between gap-4">
        <div className="w-full md:w-1/2 h-48">
          <h2 className="text-2xl font-bold mb-4 text-black">Stock Price Change</h2>
          <Bar data={barData} options={{ responsive: true, maintainAspectRatio: true }} />
        </div>

        <div className="w-full md:w-1/2 h-48">
          <h2 className="text-2xl font-bold mb-4 text-black">Price Histogram</h2>
          <Bar data={histogramData} options={{ responsive: true, maintainAspectRatio: true }} />
        </div>
      </div>
      <br />
      <br />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div className="p-4 bg-blue-100 shadow rounded-lg">
    <h2 className="text-xl font-semibold text-black">Average Stock Price</h2>
    <p className="text-lg font-bold text-red-500">${averagePrice}</p> {/* Added text-red-500 */}
  </div>

  <div className="p-4 bg-blue-100 shadow rounded-lg">
    <h2 className="text-xl font-semibold text-black">Total Price Change (%)</h2>
    <p className="text-lg font-bold text-red-500">{totalPriceChange}%</p> {/* Added text-red-500 */}
  </div>

  <div className="p-4 bg-blue-100 shadow rounded-lg">
    <h2 className="text-xl font-semibold text-black">Total Volume Traded</h2>
    <p className="text-lg font-bold text-red-500">{totalVolumeTraded}</p> {/* Added text-red-500 */}
  </div>
</div>

    </div>
  );
};

export default HomePage;
