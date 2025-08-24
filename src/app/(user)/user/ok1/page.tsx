'use client'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React, { useEffect, useState } from 'react';
import userInterface from '../../compoments/userInterface';
import Link from 'next/link';

interface FormData{
  name: string,
  email : string,
  phone: string,
  address : string,
}

export default function UserProfile() {
  // const [token, setToken] = useState<string>()
  const [user, setUser] = useState<userInterface>()
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email : '',
    phone: '',
    address : '',
  });
useEffect(() => {
  const u = localStorage.getItem('user');
  const accessTokenLocal = localStorage.getItem('accessToken');
  const typeTokenLocal = localStorage.getItem('typeToken');
  if(u && accessTokenLocal && typeTokenLocal){
    const uu = JSON.parse(u);
    setUser(uu);
  }else{
    toast.error('Vui lòng đăng nhập')
  }
}, []);

useEffect(()=>{
  if(user){
    setFormData({
    name : user.ten_user || '',
    email : user.email_user || '',
    phone : user.sdt_user || '',
    address : user.dia_chi_user || ''
  });
  setIsLoading(false);
  }
},[user]);
  

  const updateUserProfile = async () => {
    if(formData.name == '' || formData.email == '' || formData.phone == '' || formData.address == ''){
      toast.error('Bạn vui lòng điền đẩy đủ thông tin');
      return
    }
    const tokenLocal = localStorage.getItem('accessToken');
    if(tokenLocal){
      const token = JSON.parse(tokenLocal);
      const res = await fetch('https://huunghi.id.vn/api/user/changeImformationUser',{
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
          'Authorization' : `Bearer ${token}`
        },
        body : JSON.stringify({
          name : formData.name,
          phone : formData.phone,
          address : formData.address,
        })
      });
     const result = await res.json();

if (result.status === true) {
  localStorage.setItem('user', JSON.stringify(result.data.user));
  toast.success('Cập nhật thành công');
} else {
  toast.error(result.message || 'Cập nhật thất bại');
}

    }else{
      toast.error('Bạn chưa đăng nhập');
    }      
  }

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const menuItems = [
    { icon: 'fas fa-user', text: 'Hồ sơ của tôi', href: '/user/userprofile', active: true },
    { icon: 'fas fa-clipboard-list', text: 'Đơn hàng của tôi', href: '/user/history-order' },
    { icon: 'fas fa-question-circle', text: 'Yêu cầu hỗ trợ', href: '/user/yeucauhotro' },
    { icon: 'fas fa-map-marker-alt', text: 'Sổ địa chỉ', href: '/user/sodiachi' },
    { icon: 'fas fa-ticket-alt', text: 'Vouchers', href: '/' },
    { icon: 'fas fa-heart', text: 'Sản phẩm đã xem', href: '/' },
    { icon: 'fas fa-lock', text: 'Đổi mật khẩu', href: '/user/changePassword' }
  ];

  if (isLoading) {
        return (
        <div
            id="loading-screen"
            className="fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-500"
        >
            <div className="flex flex-col items-center space-y-6">
            {/* Logo hoặc icon tùy chọn */}
            <div className="text-3xl font-semibold tracking-widest text-black uppercase">VERVESTYLE</div>

            {/* Vòng quay */}
            <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>

            {/* Nội dung loading */}
            <p className="text-sm text-gray-700 tracking-wide">Đang khởi động trải nghiệm của bạn...</p>
            </div>
        </div>
        )
    }

  return (
    <div className="min-h-screen bg-gray-100 pt-[11%]">
      {/* Font Awesome CDN */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      />
      
      {/* Header Navigation */}
      <div className="bg-white border-b px-40 py-3 ">
        <div className="max-w-[1200px] mx-auto">
          <nav className="text-sm text-gray-600">
            <span><a href="/">Trang chủ</a></span> / <span className="font-medium">Tài khoản</span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto p-4">
        {/* Desktop & Tablet Layout */}
        <div className="hidden md:flex gap-6">
          {/* Sidebar */}
          <div className="w-80 bg-white rounded-lg shadow-sm max-h-[530px] sticky top-40">
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
          <div className="flex-1 bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <h2 className="text-lg font-medium mb-6">HỒ SƠ CỦA TÔI</h2>
              
              <div className="grid grid-cols-1  gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tên
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số điện thoại
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Địa Chỉ
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button onClick={updateUserProfile} className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
                  CẬP NHẬT
                </button>
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
                Hi, Võ Chí Hải
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
            {/* Mobile Form */}
            <div className="p-4">
              <h2 className="text-lg font-medium mb-6">HỒ SƠ CỦA TÔI</h2>
              
              <div className="space-y-4">                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <button className="w-full px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
                  CẬP NHẬT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}