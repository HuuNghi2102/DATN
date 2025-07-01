'use client';

import React, { useState } from 'react';
import '@/app/globals.css';

const AdminSettings = () => {
  const [adminName, setAdminName] = useState('Admin Premium');
  const [adminEmail, setAdminEmail] = useState('admin@demo.vn');
  const [phoneNumber, setPhoneNumber] = useState('0123456789');
  const [language, setLanguage] = useState('vi');
  const [theme, setTheme] = useState('light');

  const handleSave = () => {
    const data = { adminName, adminEmail, phoneNumber, language, theme };
    console.log('Lưu thông tin admin:', data);
    alert('Đã lưu cài đặt!');
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow-md mt-8">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Cài đặt quản trị viên</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tên quản trị viên</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ngôn ngữ</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="vi">Tiếng Việt</option>
            <option value="en">Tiếng Anh</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Chế độ hiển thị</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="light">Sáng</option>
            <option value="dark">Tối</option>
          </select>
        </div>

        <button
          onClick={handleSave}
          className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded"
        >
          Lưu cài đặt
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
