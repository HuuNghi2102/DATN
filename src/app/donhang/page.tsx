'use client';
import React, { useEffect, useState } from 'react';

interface User {
  id_user: number;
  ten_user: string;
  anh_dai_dien_user: string;
  email_user: string;
  email_verified_at: string;
  mat_khau_user: string;
  dia_chi_user: string;
  sdt_user: string;
  ma_otp: number;
  trang_thai: number;
  id_vai_tro: number;
  remember_token: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export default function UserProfile() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const u = localStorage.getItem('user');
    if (u) {
      const uu = JSON.parse(u);
      setUser(uu);
    }
  }, []);

  const menuItems = [
    { icon: 'fas fa-user', text: 'Hồ sơ của tôi' },
    { icon: 'fas fa-clipboard-list', text: 'Đơn hàng của tôi', active: true },
    { icon: 'fas fa-question-circle', text: 'Yêu cầu hỗ trợ' },
    { icon: 'fas fa-map-marker-alt', text: 'Sổ địa chỉ' },
    { icon: 'fas fa-ticket-alt', text: 'Vouchers' },
    { icon: 'fas fa-heart', text: 'Sản phẩm đã xem' },
    { icon: 'fas fa-lock', text: 'Đổi mật khẩu' }
  ];

  return (
    <div className="min-h-screen bg-gray-100 mt-40">
      {/* Font Awesome CDN */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      />

      {/* Header Navigation */}
      <div className="bg-white border-b px-4 py-3">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm text-gray-600">
            <span>
              <a href="/">Trang chủ</a>
            </span>{' '}
            / <span className="font-medium">Tài khoản</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        {/* Desktop & Tablet Layout */}
        <div className="hidden md:flex gap-6">
          {/* Sidebar */}
          <div className="w-80 bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b bg-gray-50 rounded-t-lg">
              <div className="flex items-center gap-2">
                <i className="fas fa-user text-gray-600"></i>
                <span className="font-medium">Tài khoản của bạn</span>
              </div>
            </div>

            <div className="p-2">
              <div className="text-sm text-gray-600 px-3 py-2">
                Hi, {user?.ten_user || 'Người dùng'}
              </div>

              <ul className="space-y-1">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <button
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors ${
                        item.active
                          ? 'bg-black text-white'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <i className={`${item.icon} w-4`}></i>
                      <span className="text-sm">{item.text}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

         
       
{/* Main Content */}
<div className="flex-1 bg-white rounded-lg shadow-sm">
  <div className="p-6">
    <h2 className="text-lg font-medium mb-6">ĐƠN HÀNG CỦA TÔI</h2>
    <p className="text-gray-600 mb-4">Lịch sử mua hàng của bạn</p>

    <div className="overflow-x-auto">
      <table className="w-full table-fixed border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 p-3 text-center text-sm font-semibold text-gray-700">Mã đơn hàng</th>
            <th className="border border-gray-300 p-3 text-center text-sm font-semibold text-gray-700">Tên người nhận</th>
            <th className="border border-gray-300 p-3 text-center text-sm font-semibold text-gray-700">SĐT</th>
            <th className="border border-gray-300 p-3 text-center text-sm font-semibold text-gray-700">Email</th>
            <th className="border border-gray-300 p-3 text-center text-sm font-semibold text-gray-700">Địa chỉ</th>
            <th className="border border-gray-300 p-3 text-center text-sm font-semibold text-gray-700">Tổng tiền</th>
            <th className="border border-gray-300 p-3 text-center text-sm font-semibold text-gray-700">Chi tiết</th>
            <th className="border border-gray-300 p-3 text-center text-sm font-semibold text-gray-700">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 p-3 text-center text-black font-medium">#1</td>
            <td className="border border-gray-300 p-3 text-center text-black">Chi Hải</td>
            <td className="border border-gray-300 p-3 text-center text-black">0365999809</td>
            <td className="border border-gray-300 p-3 text-center text-black whitespace-pre-wrap break-words">
              chihai@gmail.com
            </td>
            <td className="border border-gray-300 p-3 text-center text-black">406/7H</td>
            <td className="border border-gray-300 p-3 text-center text-black font-medium">299.000đ</td>
            <td className="border border-gray-300 p-3 text-center">
              <button className="text-black hover:text-gray-800 font-medium">
                Xem chi tiết
              </button>
            </td>
            <td className="border border-gray-300 p-3 text-center text-sm text-gray-800">
              Chờ xác nhận
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>



        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="bg-white rounded-lg shadow-sm">
            {/* Mobile Header */}
            <div className="p-4 border-b bg-gray-50 rounded-t-lg">
              <div className="flex items-center gap-2">
                <i className="fas fa-user text-gray-600"></i>
                <span className="font-medium">Tài khoản của bạn</span>
              </div>
            </div>

            {/* Mobile Menu */}
            <div className="p-2 border-b">
              <div className="text-sm text-gray-600 px-3 py-2">
                Hi, {user?.ten_user || 'Người dùng'}
              </div>

              <ul className="space-y-1">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <button
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors ${
                        item.active
                          ? 'bg-black text-white'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <i className={`${item.icon} w-4`}></i>
                      <span className="text-sm">{item.text}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile Main Content */}
            <div className="p-4">
              <h2 className="text-lg font-medium mb-6">ĐƠN HÀNG CỦA TÔI</h2>
              <p className="text-gray-600">Chức năng đang được phát triển...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
