"use client"
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
const CartPage = () => {
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const { state, dispatch } = useCart();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Font Awesome CDN */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
      />

      {/* Header */}
      <header className="bg-white shadow-sm border-b mt-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <nav className="flex space-x-8">
              <a href="/" className="text-gray-600 hover:text-gray-900">Trang chủ</a>
              <a href="#" className="text-blue-600 font-medium">Giỏ hàng</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
<h1 className="text-xl font-bold mb-4">Giỏ Hàng</h1>
      {state.cart.length === 0 ? (
        <p>Giỏ hàng trống</p>
      ) : (
        <div className="space-y-4">
          {state.cart.map((item, index) => (
            <li key={index} className="flex items-center space-x-4 border-b pb-4">
              <img
                src={`https://huunghi.id.vn/storage/products/${item.anh_san_pham}`}
                alt={item.ten_san_pham}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <p className="font-semibold">{item.ten_san_pham}</p>
                <p className="text-sm text-gray-600">Màu: {item.mau_san_pham} | Size: {item.kich_thuoc_san_pham}</p>
                <p className="text-sm">Số lượng: {item.so_luong_san_pham}</p>
                <p className="text-sm font-bold">{item.gia_san_pham.toLocaleString('vi-VN')}đ</p>
              </div>
              <button
                onClick={() => dispatch({
                  type: 'REMOVE_FROM_CART',   payload: {
                  id_variant: item.id_san_pham_bien_the,
                  size: item.kich_thuoc_san_pham,
                  color: item.mau_san_pham,
                }}
                  
                  )}
                className="text-red-500 text-sm hover:underline"
              >
                Xoá
              </button>
            </li>
          ))}
        </div>
      )}
            </div>
          </div>

          {/* Checkout Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin đơn hàng</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tạm tính:</span>
                  <span className="text-gray-900">0đ</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Giá giảm:</span>
                  <span className="text-gray-900">0đ</span>
                </div>
                <div className="flex justify-between text-sm font-semibold">
                  <span className="text-gray-900">Tổng tiền:</span>
                  <span className="text-gray-900">0đ</span>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <i className="fas fa-truck text-gray-600"></i>
                  <span className="font-medium text-gray-900">Ước tính thời gian giao hàng</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                  <select
                    value={selectedProvince}
                    onChange={(e) => setSelectedProvince(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="">Chọn tỉnh/thành phố</option>
                    <option value="hanoi">Hà Nội</option>
                    <option value="hcm">TP. Hồ Chí Minh</option>
                    <option value="danang">Đà Nẵng</option>
                  </select>
                  
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="">Chọn Quận/huyện</option>
                    <option value="quan1">Quận 1</option>
                    <option value="quan2">Quận 2</option>
                    <option value="quan3">Quận 3</option>
                  </select>
                </div>
              </div>

              {/* Order Notes */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Ghi chú đơn hàng</h4>
                <textarea
                  placeholder="Ghi chú"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm h-16 resize-none mb-3"
                />
                <input
                  type="text"
                  placeholder="Nhập mã khuyến mãi (nếu có)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Checkout Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                  THANH TOÁN NGAY
                </button>
                <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
                  <i className="fas fa-shopping-cart"></i>
                  <a href="/">
                  <span>Tiếp tục mua hàng</span>
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;