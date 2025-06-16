'use client';
import React, { useEffect, useState } from 'react';
import userInterface from '../compoments/userInterface';
import Link from 'next/link';

export default function UserProfile() {
  const [user, setUser] = useState<userInterface>();
  const [orders,setOrders] = useState<any[]>();

  useEffect(() => {
    const u = localStorage.getItem('user');
    const accessTokenLocal = localStorage.getItem('accessToken');
    const typeTokenLocal = localStorage.getItem('typeToken'); 
    if (u && accessTokenLocal && typeTokenLocal) {
      const uu = JSON.parse(u);
      const accessToken = JSON.parse(accessTokenLocal);
      const typeToken = JSON.parse(typeTokenLocal);
      const fectchOrder = async () => {
        const responseOrder = await fetch(`https://huunghi.id.vn/api/order/listOrderOfUser`,{
          headers : {
            "Authorization" : `${typeToken} ${accessToken}`
          }
        })
        const result = await responseOrder.json();
        const orders = result.data.orders;
        setOrders(orders);
      }
      fectchOrder();
      setUser(uu);
    }else{
      alert('Vui lòng đăng nhập');
    }

  }, []);

  

  const menuItems = [
    { icon: 'fas fa-user', text: 'Hồ sơ của tôi', href: '/userprofile' },
    { icon: 'fas fa-clipboard-list', text: 'Đơn hàng của tôi', href: '/history-order' ,active: true },
    { icon: 'fas fa-question-circle', text: 'Yêu cầu hỗ trợ', href: '/yeucauhotro' },
    { icon: 'fas fa-map-marker-alt', text: 'Sổ địa chỉ', href: '/' },
    { icon: 'fas fa-ticket-alt', text: 'Vouchers', href: '/' },
    { icon: 'fas fa-heart', text: 'Sản phẩm đã xem', href: '/' },
    { icon: 'fas fa-lock', text: 'Đổi mật khẩu', href: '/changePassword' }
  ];

  return (
    <div className="min-h-screen bg-gray-100 mt-40">
      {/* Font Awesome CDN */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      />

      {/* Header Navigation */}
      <div className="bg-white border-b px-40 py-3">
        <div className="max-w-[1200px] mx-auto">
          <nav className="text-sm text-gray-600">
            <span>
              <a href="/">Trang chủ</a>
            </span>{' '}
            / <span className="font-medium">Tài khoản</span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto p-4">
        {/* Desktop & Tablet Layout */}
        <div className="hidden md:flex gap-6">
          {/* Sidebar */}
          <div className="w-80 bg-white rounded-lg shadow-sm max-h-[520px] sticky top-44">
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
    <h2 className="text-lg font-medium mb-6">ĐƠN HÀNG CỦA TÔI</h2>
    <p className="text-gray-600 mb-4">Lịch sử mua hàng của bạn</p>

    <div className="overflow-x-auto">
      <table className="w-full table-fixed border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 p-3 text-center text-sm font-semibold text-gray-700">Mã đơn hàng</th>
            <th className="border border-gray-300 p-3 text-center text-sm font-semibold text-gray-700">Tên người nhận</th>
            <th className="border border-gray-300 p-3 text-center text-sm font-semibold text-gray-700">SĐT</th>
            <th className="border border-gray-300 p-3 text-center text-sm font-semibold text-gray-700">Địa chỉ</th>
            <th className="border border-gray-300 p-3 text-center text-sm font-semibold text-gray-700">Tổng tiền</th>
            <th className="border border-gray-300 p-3 text-center text-sm font-semibold text-gray-700">Trạng thái</th>
            <th className="border border-gray-300 p-3 text-center text-sm font-semibold text-gray-700">Hành động</th>
          </tr>
        </thead>
        {orders?.map((order,index) => (
          <tbody key={index}>
            <tr>
              <td className="border border-gray-300 p-3 text-center text-black font-medium">#{order.id_don_hang}</td>
              <td className="border border-gray-300 p-3 text-center text-black">{order.ten_nguoi_nhan}</td>
              <td className="border border-gray-300 p-3 text-center text-black">{order.so_dien_thoai_nguoi_nhan}</td>
              <td className="border border-gray-300 p-3 text-center text-black">{order.dia_chi_nguoi_nhan}</td>
              <td className="border border-gray-300 p-3 text-center text-black font-medium">{order.gia_tong_don_hang.toLocaleString('vi-VN')}đ</td>
              
              <td className="border border-gray-300 p-3 text-center text-sm text-gray-800">
                Chờ xác nhận 
              </td>
              <td className="border border-gray-300 p-3 text-center">
                 <button className="text-black hover:text-gray-800 font-medium">
                    Xem chi tiết
                  </button>
                  {order.trang_thai_don_hang == 'cho_xac_nhan' && (
                    <button className="text-black hover:text-gray-800 font-medium">
                      Hủy
                    </button>
                  )}
                  {order.trang_thai_thanh_toan !== 'da_thanh_toan' && order.id_phuong_thuc_thanh_toan !== 1 && (
                    <a href={`/pagePaymentVNPay?idOrder=${order.id_don_hang}`}>
                      <button className="text-black hover:text-gray-800 font-medium">
                        Thanh toán
                      </button>
                    </a>
                    
                  )} 
              </td>
            </tr>
          </tbody>
        ))}
        
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
