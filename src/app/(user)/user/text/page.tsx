"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const areaData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 800 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 1000 },
  { name: "May", value: 750 },
  { name: "Jun", value: 900 },
];

const pieData = [
  { name: "Sản phẩm A", value: 35 },
  { name: "Sản phẩm B", value: 25 },
  { name: "Sản phẩm C", value: 20 },
  { name: "Khác", value: 20 },
];

const COLORS = ["#4ade80", "#60a5fa", "#facc15", "#f87171"];

export default function StatsPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-[11%]">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Thống kê tổng quan
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Biểu đồ miền */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Doanh thu hàng tháng</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={areaData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#4ade80"
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Biểu đồ hình tròn */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Tỷ lệ sản phẩm bán ra</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
