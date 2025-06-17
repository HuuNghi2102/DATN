'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('address');
  const [user, setUser] = useState<any>(null);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'Đặng Khoa',
      phone: '(+84) 933 950 800',
      address: '406/11 phường Thới An, Quận 12, TP.HCM',
      isDefault: true,
    },
    {
      id: 2,
      name: 'Đặng Khoa',
      phone: '(+84) 933 950 800',
      address: '213/18g, Lê Văn Khương, khu phố 1, P.Hiệp Thành, Quận 12',
      fullAddress: 'Phường Hiệp Thành, Quận 12, TP.HCM',
      isDefault: false,
    },
  ]);

  useEffect(() => {
    const defaultAddress = addresses.find(addr => addr.isDefault);
    if (defaultAddress) {
      setSelectedAddressId(defaultAddress.id);
    }
  }, [addresses]);

  useEffect(() => {
    const u = localStorage.getItem('user');
    if (u) {
      setUser(JSON.parse(u));
    }
  }, []);

  const handleSetDefault = (id: number) => {
    setAddresses(prev =>
      prev.map(addr => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
    setSelectedAddressId(id);
  };

  const menuItems = [
    { icon: 'fas fa-user', text: 'Hồ sơ của tôi', href: '/userprofile' },
    { icon: 'fas fa-clipboard-list', text: 'Đơn hàng của tôi', href: '/history-order' },
    { icon: 'fas fa-question-circle', text: 'Yêu cầu hỗ trợ', href: '/yeucauhotro' },
    { icon: 'fas fa-map-marker-alt', text: 'Sổ địa chỉ', href: '#', active: true },
    { icon: 'fas fa-ticket-alt', text: 'Vouchers', href: '/voucher' },
    { icon: 'fas fa-heart', text: 'Sản phẩm đã xem', href: '/' },
    { icon: 'fas fa-lock', text: 'Đổi mật khẩu', href: '/changePassword' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 pt-[10%]">
      {/* Font Awesome CDN */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      />

      {/* Breadcrumb */}
      <div className="bg-white border-b px-40 py-3">
        <div className="max-w-[1200px] mx-auto">
          <nav className="text-sm text-gray-600">
            <span><a href="/">Trang chủ</a></span> / <span className="font-medium">Sổ địa chỉ</span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto p-4 flex flex-col md:flex-row gap-6">
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
              Hi, {user?.ten_user || user?.name || 'Khách'}
            </div>
            <ul className="space-y-1">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link href={item.href}>
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
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-6">ĐỊA CHỈ</h2>

          <div className="space-y-4">
            {addresses.map((address) => (
              <div key={address.id} className="border rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <input
                        type="radio"
                        name="address"
                        checked={selectedAddressId === address.id}
                        onChange={() => handleSetDefault(address.id)}
                        className="w-4 h-4 accent-black"
                      />
                      <span className="font-semibold text-lg">{address.name}</span>
                      <span className="text-gray-600">{address.phone}</span>
                      <button className="text-blue-500 text-sm hover:underline">Sửa</button>
                    </div>

                    <div className="ml-7">
                      <p className="text-gray-700 mb-1">{address.address}</p>
                      {address.fullAddress && (
                        <p className="text-gray-700 mb-3">{address.fullAddress}</p>
                      )}

                      {address.isDefault && (
                        <span className="inline-block bg-black text-white px-3 py-1 rounded-full text-sm">
                          mặc định
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button className="w-full bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
              <div className="flex items-center justify-center space-x-2">
                <span className="font-medium">Nhập địa chỉ mới</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}