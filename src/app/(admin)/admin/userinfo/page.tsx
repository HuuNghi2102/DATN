'use client';

import React, { useState } from 'react';

const AccountSettingsPage = () => {
  const [avatarPreview, setAvatarPreview] = useState('https://randomuser.me/api/portraits/women/45.jpg');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Nguyễn Thị An',
    email: 'nguyenthian@example.com',
    phone: '0987654321',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    role: 'Khách hàng',
    joinDate: '15/02/2023',
    status: 'Hoạt động',
    verified: true,
    lastLogin: 'Hôm nay, 14:30',
    loyaltyPoints: 1250,
    orderCount: 12,
    membershipLevel: 'Vàng'
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingProfile(false);
    alert('Thông tin cá nhân đã được cập nhật!');
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingPassword(false);
    alert('Mật khẩu đã được thay đổi thành công!');
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getRoleIcon = () => {
    switch(profileData.role) {
      case 'Admin': return <i className="fas fa-crown text-purple-500"></i>;
      case 'Shipper': return <i className="fas fa-motorcycle text-blue-500"></i>;
      default: return <i className="fas fa-user text-green-500"></i>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <main className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Tài khoản của tôi</h1>
            <p className="text-gray-500 mt-1">Quản lý thông tin cá nhân và cài đặt tài khoản</p>
          </div>
          <button className="mt-4 md:mt-0 flex items-center px-4 py-2.5 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            <i className="fas fa-history mr-2 text-gray-400"></i>
            Lịch sử hoạt động
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Summary */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <img 
                    src={avatarPreview} 
                    alt="Avatar" 
                    className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md"
                  />
                  <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-1.5 rounded-full cursor-pointer hover:bg-blue-600 transition-colors">
                    <i className="fas fa-camera text-xs"></i>
                    <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                  </label>
                </div>
                <h2 className="text-lg font-semibold text-gray-800">{profileData.name}</h2>
                <p className="text-gray-500 text-sm">{profileData.email}</p>
                
                <div className="mt-3 flex items-center">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    profileData.role === 'Admin' ? 'bg-purple-100 text-purple-800' :
                    profileData.role === 'Shipper' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {getRoleIcon()} {profileData.role}
                  </span>
                  {profileData.verified && (
                    <span className="ml-2 text-green-500" title="Đã xác minh">
                      <i className="fas fa-check-circle"></i>
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Thành viên từ:</span>
                  <span className="text-gray-700 font-medium">{profileData.joinDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Trạng thái:</span>
                  <span className={`font-medium ${
                    profileData.status === 'Hoạt động' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {profileData.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Đăng nhập cuối:</span>
                  <span className="text-gray-700 font-medium">{profileData.lastLogin}</span>
                </div>
              </div>
            </div>

            {/* Account Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-md font-semibold text-gray-800 mb-4">Thống kê tài khoản</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-blue-50 text-blue-500 mr-3">
                      <i className="fas fa-shopping-bag text-sm"></i>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Đơn hàng</p>
                      <p className="font-medium text-gray-800">{profileData.orderCount}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-yellow-50 text-yellow-500 mr-3">
                      <i className="fas fa-coins text-sm"></i>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Điểm tích lũy</p>
                      <p className="font-medium text-gray-800">{profileData.loyaltyPoints}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-amber-50 text-amber-500 mr-3">
                      <i className="fas fa-medal text-sm"></i>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Hạng thành viên</p>
                      <p className="font-medium text-gray-800">{profileData.membershipLevel}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <i className="fas fa-user-circle text-blue-500 mr-2"></i>
                  Thông tin cá nhân
                </h2>
                {!isEditingProfile ? (
                  <button 
                    onClick={() => setIsEditingProfile(true)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                  >
                    <i className="fas fa-edit mr-1"></i> Chỉnh sửa
                  </button>
                ) : (
                  <button 
                    onClick={() => setIsEditingProfile(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </div>

              {isEditingProfile ? (
                <form onSubmit={handleProfileSubmit} className="px-6 py-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
                      <input 
                        type="text" 
                        name="name"
                        value={profileData.name}
                        onChange={handleProfileChange}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input 
                        type="email" 
                        name="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={profileData.phone}
                        onChange={handleProfileChange}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ</label>
                      <input 
                        type="text" 
                        name="address"
                        value={profileData.address}
                        onChange={handleProfileChange}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500" 
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 mt-6">
                    <button 
                      type="button" 
                      onClick={() => setIsEditingProfile(false)}
                      className="px-4 py-2.5 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      Hủy bỏ
                    </button>
                    <button 
                      type="submit" 
                      className="px-4 py-2.5 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                      Lưu thay đổi
                    </button>
                  </div>
                </form>
              ) : (
                <div className="px-6 py-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Họ và tên</label>
                      <p className="text-gray-800 font-medium">{profileData.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                      <p className="text-gray-800 font-medium">{profileData.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Số điện thoại</label>
                      <p className="text-gray-800 font-medium">{profileData.phone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Địa chỉ</label>
                      <p className="text-gray-800 font-medium">{profileData.address}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Security Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <i className="fas fa-shield-alt text-blue-500 mr-2"></i>
                  Bảo mật tài khoản
                </h2>
                {!isEditingPassword ? (
                  <button 
                    onClick={() => setIsEditingPassword(true)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                  >
                    <i className="fas fa-edit mr-1"></i> Đổi mật khẩu
                  </button>
                ) : (
                  <button 
                    onClick={() => setIsEditingPassword(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </div>

              {isEditingPassword ? (
                <form onSubmit={handlePasswordSubmit} className="px-6 py-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu hiện tại</label>
                      <input 
                        type="password" 
                        placeholder="Nhập mật khẩu hiện tại" 
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500" 
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu mới</label>
                        <input 
                          type="password" 
                          placeholder="Nhập mật khẩu mới" 
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500" 
                        />
                        <p className="text-xs text-gray-500 mt-2">Tối thiểu 8 ký tự</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Xác nhận mật khẩu</label>
                        <input 
                          type="password" 
                          placeholder="Nhập lại mật khẩu mới" 
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500" 
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 mt-6">
                    <button 
                      type="button" 
                      onClick={() => setIsEditingPassword(false)}
                      className="px-4 py-2.5 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      Hủy bỏ
                    </button>
                    <button 
                      type="submit" 
                      className="px-4 py-2.5 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                      Cập nhật mật khẩu
                    </button>
                  </div>
                </form>
              ) : (
                <div className="px-6 py-6">
                  <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-100">
                    <i className="fas fa-check-circle text-green-500 mr-3 text-lg"></i>
                    <div>
                      <p className="font-medium text-green-800">Tài khoản được bảo mật</p>
                      <p className="text-sm text-green-600">Mật khẩu của bạn đã được thiết lập an toàn</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountSettingsPage;