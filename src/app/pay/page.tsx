'use client'
import React, { useState } from 'react';

const PayPage = () => {
  const [selectedDiscount, setSelectedDiscount] = useState('');
  const [orderInfo, setOrderInfo] = useState({
    name: '',
    phone: '0965736195',
    address: '0965736195, 70000, Vietnam',
    paymentMethod: 'cod',
    location: ''
  });

  const discountOptions = [
    { label: 'Giảm 100,000đ', value: '100000' },
    { label: 'Giảm 70,000đ', value: '70000' },
    { label: 'Giảm 30,000đ', value: '30000' },
    { label: 'Giảm 10%', value: '10%' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-[12%]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Order Form */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Delivery Information */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center space-x-4 w-80 h-auto">
                            <img src="/assets/images/LogoAgain.png" alt="160Store" className="h-20" />
                        </div> 
                    <h3 className="text-lg font-semibold mb-4">Thông tin giao hàng</h3>
                    
                    <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                        <i className="fas fa-user text-gray-500"></i>
                        </div>
                        <div>
                        <p className="text-gray-600">()</p>
                        <p className="text-blue-500 cursor-pointer hover:underline">Đăng xuất</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Thêm địa chỉ mới</label>
                            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                <option>{orderInfo.address}</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Họ và tên</label>
                            <input
                                type="text"
                                value={orderInfo.name}
                                onChange={(e) => setOrderInfo({...orderInfo, name: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập họ và tên"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Số điện thoại</label>
                            <input
                                type="text"
                                value={orderInfo.phone}
                                onChange={(e) => setOrderInfo({...orderInfo, phone: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Địa chỉ</label>
                            <input
                                type="text"
                                placeholder='Địa chỉ'
                                value={orderInfo.location}
                                onChange={(e) => setOrderInfo({...orderInfo, location: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-3 gap-2">
                            <select
                                // value={selectedProvince}
                                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                                <option >Chọn tỉnh/thành phố</option>
                                <option > TP.Hồ Chí Minh   </option>
                            </select>
                            
                            <select
                                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                                <option value="">Chọn Quận/huyện</option>
                                <option> Quận 1 </option>
                            </select>
                            <select
                                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                                <option value="">Chọn Phường/xã</option>
                                <option> An Phú Đông  </option>
                            </select>
                        </div>

                        </div>
                    </div>
                    {/* Shipping Method */}
                    <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">Phương thức vận chuyển</h3>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                        <i className="fas fa-file-alt text-gray-400 text-2xl"></i>
                        </div>
                        <p className="text-gray-500">Vui lòng chọn tỉnh / thành để có danh sách phương thức vận chuyển.</p>
                    </div>
                    </div>
                    {/* Payment Method */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold mb-4">Phương thức thanh toán</h3>
                        <div className="space-y-3">
                            <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                            <input
                                type="radio"
                                name="payment"
                                value="cod"
                                checked={orderInfo.paymentMethod === 'cod'}
                                onChange={(e) => setOrderInfo({...orderInfo, paymentMethod: e.target.value})}
                                className="mr-3"
                            />
                            <i className="fas fa-money-bill-wave text-blue-500 mr-3"></i>
                            <span>Thanh toán khi giao hàng (COD)</span>
                            </label>

                            <div className="ml-8 text-sm text-gray-600">
                            <p>Hiện tại là thành viên Silver hoặc Gold/Diamond, nhận viền áo cộng điểm giảm giá khi mua các sản phẩm.</p>
                            <p className="text-blue-500">- Freeship đơn từ 399K</p>
                            </div>
                            <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                            <input
                                type="radio"
                                name="payment"
                                value="vnpay"
                                checked={orderInfo.paymentMethod === 'vnpay'}
                                onChange={(e) => setOrderInfo({...orderInfo, paymentMethod: e.target.value})}
                                className="mr-3"
                            />
                                <img src="https://hstatic.net/0/0/global/design/seller/image/payment/vnpay_new.svg?v=6" width={50} height={50} alt="" />
                                <span> Thanh toán VNPay</span>
                            </label>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4">
                        <button className="px-6 py-3 text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-50">
                            Giỏ hàng
                        </button>
                        <button className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                            Hoàn tất đơn hàng
                        </button>
                    </div>
                </div>
            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow p-6 sticky top-44">
                <div className="flex items-center mb-6">
                    <img 
                    src="/assets/images/zz.webp" 
                    alt="Product" 
                    className="w-12 h-12  rounded-lg mr-4"
                    />
                    <div className="flex-1">
                    <h4 className="font-medium">Mũ Lưỡi Trai Nam ICONDENIMV</h4>
                    <p className="text-sm text-gray-600">Predator</p>
                    <p className="text-sm text-gray-500">Màu đen</p>
                    </div>
                    <span className="font-semibold">249,000đ</span>
                </div>
                    <hr className='mb-2' />
                <div className="flex items-center justify-between mb-4">
                    <input
                    type="text"
                    placeholder="Mã giảm giá"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mr-4"
                    />
                    <button className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500">
                    Sử dụng
                    </button>
                </div>
                
                <div className="mb-4">
                    <p className="text-blue-500 cursor-pointer hover:underline mb-3">
                    <i className="fas fa-plus mr-2"></i>Xem thêm mã giảm giá
                    </p>
                    <div className="flex flex-wrap gap-2">
                    {discountOptions.map((option, index) => (
                        <button
                        key={index}
                        onClick={() => setSelectedDiscount(option.value)}
                        className={`px-3 py-1 border rounded-full text-sm transition-colors ${
                            selectedDiscount === option.value
                            ? 'border-blue-500 text-blue-500 bg-blue-50'
                            : 'border-blue-300 text-blue-600 hover:border-blue-500'
                        }`}
                        >
                        {option.label}
                        </button>
                    ))}
                    </div>
                </div>
                    <hr className='mb-2' />
                <h3 className="text-lg font-semibold mb-4">Chương trình khách hàng thân thiết</h3> 
                    <hr className='mb-2' />
                <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                    <span>Tạm tính</span>
                    <span>249,000đ</span>
                    </div>
                    <div className="flex justify-between">
                    <span>Phí vận chuyển</span>
                    <span>—</span>
                    </div>
                    <hr className='mb-2' />
                    <div className="flex justify-between font-semibold text-lg">
                    <span>Tổng cộng</span>
                    <span>249,000đ</span>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
  );
};

export default PayPage;