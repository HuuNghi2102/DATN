'use client';
import React, { useEffect, useState } from 'react';
import { User, MapPin, Package, HelpCircle, Gift, Shield, Plus } from 'lucide-react';

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
      isDefault: true
    },
    {
      id: 2,
      name: 'Đặng Khoa',
      phone: '(+84) 933 950 800',
      address: '213/18g, Lê Văn Khương, khu phố 1, P.Hiệp Thành, Quận 12',
      fullAddress: 'Phường Hiệp Thành, Quận 12, TP.HCM',
      isDefault: false
    }
  ]);

  // Đồng bộ selectedAddressId với địa chỉ mặc định
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

  const menuItems = [
    { id: 'profile', icon: User, label: 'Hồ sơ của tôi' },
    { id: 'orders', icon: Package, label: 'Đơn hàng của tôi' },
    { id: 'support', icon: HelpCircle, label: 'Yêu cầu hỗ trợ' },
    { id: 'address', icon: MapPin, label: 'Sổ địa chỉ' },
    { id: 'vouchers', icon: Gift, label: 'Vouchers' },
    { id: 'password', icon: Shield, label: 'Đổi mật khẩu' }
  ];

  const handleSetDefault = (id: number) => {
    setAddresses(prev =>
      prev.map(addr => ({
        ...addr,
        isDefault: addr.id === id
      }))
    );
    setSelectedAddressId(id);
  };

  return (
    <div className="min-h-screen bg-gray-100 mt-40">
      {/* Breadcrumb */}
      <div className="bg-white border-b px-4 py-3">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm text-gray-600">
            <span><a href="/">Trang chủ</a></span> / <span className="font-medium">Yêu cầu hỗ trợ</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-80 bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
                <span className="text-lg font-medium">Hi, {user?.name || 'Chí Hải'}</span>
              </div>
            </div>

            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? 'bg-black text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
            {activeTab === 'address' && (
              <>
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

                  <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors">
                    <div className="flex items-center justify-center space-x-2">
                      <Plus className="w-5 h-5" />
                      <span className="font-medium">Nhập địa chỉ mới</span>
                    </div>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
