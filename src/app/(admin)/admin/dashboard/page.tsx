'use client';

import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const Dashboard = () => {
  const [data, setData] = useState({
    revenueToday: 0,
    revenueMonth: 0,
    newCustomers: 0,
    newOrders: 0,
  });

  const [chartData, setChartData] = useState([]);

  // useEffect(() => {
  //   fetch('/api/dashboard')
  //     .then((res) => res.json())
  //     .then((json) => {
  //       setData(json);
  //       setChartData(json.chartData || []);
  //     })
  //     .catch((err) => console.error('Lỗi khi tải dữ liệu:', err));
  // }, []);

  const stats = [
    {
      icon: 'fa-shopping-bag',
      label: 'Doanh thu hôm nay',
      value: `${data.revenueToday.toLocaleString('vi-VN')}₫`,
      color: 'bg-indigo-100 text-indigo-600',
    },
    {
      icon: 'fa-chart-line',
      label: 'Doanh thu tháng',
      value: `${data.revenueMonth.toLocaleString('vi-VN')}₫`,
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: 'fa-users',
      label: 'Khách hàng mới',
      value: data.newCustomers,
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      icon: 'fa-shopping-cart',
      label: 'Đơn hàng mới',
      value: data.newOrders,
      color: 'bg-red-100 text-red-600',
    },
  ];

  const orderStatus = [
    { name: 'Trần Văn An', code: '#DH20230025', time: '15 phút trước', price: '850.000₫', status: 'Đã giao', badge: 'bg-green-500' },
    { name: 'Lê Thị Mai', code: '#DH20230026', time: '30 phút trước', price: '1.250.000₫', status: 'Đang xử lý', badge: 'bg-indigo-300' },
    { name: 'Phạm Văn Đức', code: '#DH20230027', time: '1 giờ trước', price: '550.000₫', status: 'Đang giao', badge: 'bg-emerald-400' },
    { name: 'Nguyễn Thị Hương', code: '#DH20230028', time: '2 giờ trước', price: '1.450.000₫', status: 'Đã hủy', badge: 'bg-red-400' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <main className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500">Tổng quan hoạt động cửa hàng</p>
          </div>
          <div className="flex gap-3">
            <button className="inline-flex items-center px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-100">
              <i className="fas fa-calendar-alt mr-2"></i> Hôm nay
            </button>
            <button className="inline-flex items-center px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded hover:bg-indigo-700">
              <i className="fas fa-download mr-2"></i> Báo cáo
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4 flex items-center">
              <div className={`w-12 h-12 flex items-center justify-center rounded ${stat.color} mr-4`}>
                <i className={`fas ${stat.icon} text-lg`}></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold">{stat.value}</h3>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex justify-between items-center px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">Doanh thu 7 ngày gần nhất</h2>
            <select className="border text-sm rounded px-2 py-1">
              <option value="7">7 ngày</option>
              <option value="30">30 ngày</option>
              <option value="90">90 ngày</option>
            </select>
          </div>
          <div className="p-6 w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <Line type="monotone" dataKey="doanhThu" stroke="#6366f1" strokeWidth={2} />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="ngay" />
                <YAxis tickFormatter={(value) => `${(value / 1e6).toFixed(1)} triệu`} />
                <Tooltip formatter={(value) => `${value.toLocaleString('vi-VN')}₫`} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow mb-6">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">Hoạt động gần đây</h2>
          </div>
          <div className="p-6 space-y-6 relative before:absolute before:left-5 before:top-0 before:bottom-0 before:w-0.5 before:bg-gray-200">
            {[
              { time: '10 phút trước', text: 'Đơn hàng #DH20230025 đã được giao thành công' },
              { time: '25 phút trước', text: 'Nguyễn Văn Bình đã đặt đơn hàng mới #DH20230026' },
              { time: '1 giờ trước', text: 'Sản phẩm "Áo thun nam" đã được cập nhật kho' },
              { time: '2 giờ trước', text: 'Thêm 5 sản phẩm mới vào danh mục "Thời trang nam"' },
              { time: '3 giờ trước', text: 'Đơn hàng #DH20230024 đã được xác nhận' },
            ].map((item, idx) => (
              <div key={idx} className="relative pl-10">
                <div className="absolute left-3 top-1 w-4 h-4 bg-indigo-600 border-4 border-white rounded-full"></div>
                <div className="text-sm text-gray-500 mb-1">{item.time}</div>
                <p className="text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold">Đơn hàng gần đây</h2>
            <a href="#" className="text-sm text-indigo-600 hover:underline">Xem tất cả</a>
          </div>
          <div className="p-6 space-y-4">
            {orderStatus.map((order, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{order.code} - {order.name}</p>
                  <p className="text-xs text-gray-500">{order.time} • {order.price}</p>
                </div>
                <span className={`text-xs text-white px-2 py-1 rounded-full ${order.badge}`}>{order.status}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;