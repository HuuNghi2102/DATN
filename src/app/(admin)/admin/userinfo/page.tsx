'use client';

import React, { useState } from 'react';

const AccountSettingsPage = () => {
  const [avatarPreview, setAvatarPreview] = useState('https://randomuser.me/api/portraits/women/45.jpg');

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
    alert('Thông tin cá nhân đã được cập nhật!');
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Mật khẩu đã được thay đổi thành công!');
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 font-sans">
      <main className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-1">Cài đặt Tài khoản</h1>
            <p className="text-sm text-gray-500">Quản lý thông tin tài khoản và bảo mật</p>
          </div>
          <button className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-100">
            <i className="fas fa-history mr-2"></i>Lịch sử hoạt động
          </button>
        </header>

        <section className="bg-white rounded-lg shadow-md mb-8 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Thông tin cá nhân</h2>
          </div>
          <form onSubmit={handleProfileSubmit} className="px-6 py-6">
            <div className="flex items-center mb-6">
              <div className="w-20 h-20 rounded-full border border-gray-300 overflow-hidden mr-6">
                <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="relative">
                <button type="button" className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm rounded hover:bg-gray-100">
                  <i className="fas fa-camera mr-2"></i> Thay đổi ảnh
                </button>
                <input type="file" accept="image/*" onChange={handleAvatarChange} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                <input type="text" defaultValue="Nguyễn Thị An" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" defaultValue="nguyenthian@example.com" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                <input type="tel" defaultValue="0987654321" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
                <input type="text" defaultValue="123 Đường ABC, Quận 1, TP.HCM" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button type="button" className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100">Hủy bỏ</button>
              <button type="submit" className="px-4 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700">
                <i className="fas fa-save mr-2"></i>Lưu thay đổi
              </button>
            </div>
          </form>
        </section>

        <section className="bg-white rounded-lg shadow-md mb-8 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Bảo mật tài khoản</h2>
          </div>
          <form onSubmit={handlePasswordSubmit} className="px-6 py-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu hiện tại</label>
              <input type="password" placeholder="Nhập mật khẩu hiện tại" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu mới</label>
                <input type="password" placeholder="Nhập mật khẩu mới" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                <small className="text-xs text-gray-500 mt-1 block">Tối thiểu 8 ký tự</small>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Xác nhận mật khẩu</label>
                <input type="password" placeholder="Nhập lại mật khẩu mới" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button type="button" className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100">Hủy bỏ</button>
              <button type="submit" className="px-4 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700">
                <i className="fas fa-lock mr-2"></i>Đổi mật khẩu
              </button>
            </div>
          </form>
        </section>

        <section className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Hành động tài khoản</h2>
          </div>
          <div className="px-6 py-6">
            <h3 className="text-base font-semibold mb-2">Xóa tài khoản</h3>
            <p className="text-sm text-gray-500 mb-4">
              Khi bạn xóa tài khoản, tất cả dữ liệu sẽ bị mất vĩnh viễn và không thể khôi phục.
              Vui lòng xác nhận mật khẩu để xóa tài khoản.
            </p>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <input type="password" placeholder="Nhập mật khẩu" className="w-full md:max-w-sm px-3 py-2 border border-gray-300 rounded-md" />
              <button type="button" className="w-full md:w-auto px-6 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700">
                <i className="fas fa-trash mr-2"></i>Xóa tài khoản
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AccountSettingsPage;
