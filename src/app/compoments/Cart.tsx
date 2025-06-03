'use client'
import React, { useState } from 'react';

const CartPage = () => {
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');


  const products = [
    {
      id: 1,
      name: 'Áo Polo Nam',
      price: '389.000đ',
      image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=300&h=300&fit=crop',
      badge: 'Siêu Hot'
    },
    {
      id: 2,
      name: 'Áo Thun',
      price: '319.000đ',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
      badge: 'Siêu Hot'
    },
    {
      id: 3,
      name: 'Quần Short',
      price: '349.000đ',
      image: 'https://images.unsplash.com/photo-1506629905607-48d47d8f4f04?w=300&h=300&fit=crop',
      badge: 'Siêu Hot'
    },
    {
      id: 4,
      name: 'Quần Jean',
      price: '689.000đ',
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop',
      badge: 'Siêu Hot'
    },
    {
      id: 5,
      name: 'Quần Jean',
      price: '689.000đ',
      image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&h=300&fit=crop',
      badge: 'Siêu Hot'
    }
  ];
  const cartItems = [
  {
    name: "Áo thun xanh",
    size: "M",
    color: "Xanh",
    quantity: 2,
    price: 150000,
    image: "/assets/images/zz.webp",
  },
  {
    name: "Quần jean đen",
    size: "L",
    color: "Đen",
    quantity: 1,
    price: 350000,
    image: "/assets/images/zzz.webp",
  },
  ];
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
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Giỏ hàng:</h2>
                <span className="text-blue-600 cursor-pointer hover:underline text-sm sm:text-base">
                  {cartItems.length} Sản phẩm
                </span>
              </div>

              {cartItems.length === 0 ? (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-blue-800 text-sm">
                    Bạn được giảm 10% tối đa 10K, mua thêm 599.000đ nữa để giảm ngay 50K!
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    Giỏ hàng của bạn đang trống. Mời bạn mua thêm sản phẩm{" "}
                    <span className="text-blue-600 cursor-pointer hover:underline">
                      <a href="/productPage">tại đây</a>
                    </span>.
                  </p>
                </div>
              ) : (
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div key={index} className="flex items-start gap-4 border-b pb-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="text-sm sm:text-base font-medium text-gray-800">{item.name}</h3>
                    <p className=''>
                    Giá:{(item.price).toLocaleString('vi-VN')}₫
                    </p>
                    <p className="text-sm text-gray-500">
                      Size: {item.size} | Màu: {item.color}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        // onClick={() => decreaseQuantity(index)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="text-sm text-gray-600">{item.quantity}</span>
                      <button
                        // onClick={() => increaseQuantity(index)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                    
                    <p className="text-base float-end font-semibold text-gray-900 mt-2">

                      Tổng tiền: {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                    </p>
                  </div>
                    <button
                      // onClick={() => removeItem(index)}
                    className="mt-2 text-red-500 text-sm hover:underline">
                      X
                    </button>
                </div>
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
                  <span>Tiếp tục mua hàng</span>
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