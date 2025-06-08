'use client';
import React, { useEffect, useState } from 'react';

export default function SupportRequestWithSidebar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const u = localStorage.getItem('user');
    if (u) {
      const uu = JSON.parse(u);
      setUser(uu);
    }
  }, []);

  const menuItems = [
    { icon: 'fas fa-user', text: 'Hồ sơ của tôi' },
    { icon: 'fas fa-clipboard-list', text: 'Đơn hàng của tôi' },
    { icon: 'fas fa-question-circle', text: 'Yêu cầu hỗ trợ', active: true },
    { icon: 'fas fa-map-marker-alt', text: 'Sổ địa chỉ' },
    { icon: 'fas fa-ticket-alt', text: 'Vouchers' },
    { icon: 'fas fa-heart', text: 'Sản phẩm đã xem' },
    { icon: 'fas fa-lock', text: 'Đổi mật khẩu' }
  ];

  return (
    <div className="min-h-screen bg-gray-100 mt-40">
      {/* Font Awesome */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      />

      {/* Breadcrumb */}
      <div className="bg-white border-b px-4 py-3">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm text-gray-600">
            <span><a href="/">Trang chủ</a></span> / <span className="font-medium">Yêu cầu hỗ trợ</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-4 flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-80 bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b bg-gray-50 rounded-t-lg">
            <div className="flex items-center gap-2">
              <i className="fas fa-user text-gray-600"></i>
              <span className="font-medium">Tài khoản của bạn</span>
            </div>
          </div>
          <div className="p-2">
            <div className="text-sm text-gray-600 px-3 py-2">
              Hi, {user?.ten_user || 'Khách'}
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
        <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Thông tin phiếu yêu cầu</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loại yêu cầu: yêu cầu hỗ trợ
            </label>
            <textarea
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Nội dung"
            />
          </div>

          <div className="flex space-x-3">
            <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
              Gửi
            </button>
            <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors">
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
