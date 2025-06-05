'use client'
import React, { useState } from 'react';

export default function ResponsiveCheckout() {
  const [customerInfo, setCustomerInfo] = useState({
    gender: 'Nam',
    fullName: '',
    phone: '',
    address: '',
    deliveryMethod: 'Giao đến tận nơi',
    city: 'Hồ Chí Minh',
    district: 'Chọn quận',
    ward: 'Chọn phường/xã',
    street: '',
    note: '',
    cardNumber: '',
    agreeToPolicy: false
  });

  const handleInputChange = (field:string, value:string) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4 sm:px-6 lg:px-8 mt-40">
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Product Summary */}
            <div className="p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Thanh toán</h2>
            <div className="flex items-center space-x-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-lg flex-shrink-0">
                    <img 
                        src="/assets/images/zz.webp" 
                        alt="Áo Thun Nam ICONIDENIM Double Stripes ICDN"
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-medium text-gray-900 truncate">
                        Áo Thun Nam ICONIDENIM Double Stripes ICDN
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-gray-500">Giá</span>
                        <span className="text-sm sm:text-base font-medium text-gray-900">299,000₫</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Tổng</span>
                        <span className="text-sm sm:text-base font-medium text-gray-900">299,000₫</span>
                    </div>
                </div>
            </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 sm:p-6">
                {/* Customer Information */}
                <div className="space-y-6">
                    <div>
                    <h3 className="text-base font-medium text-gray-900 mb-4">Thông tin khách hàng</h3>
                    
                    {/* Gender Selection */}
                    <div className="flex space-x-4 mb-4">
                        <label className="flex items-center">
                            <input
                            type="radio"
                            name="gender"
                            value="Nam"
                            checked={customerInfo.gender === 'Nam'}
                            onChange={(e) => handleInputChange('gender', e.target.value)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">Nam</span>
                        </label>
                        <label className="flex items-center">
                            <input
                            type="radio"
                            name="gender"
                            value="Nữ"
                            checked={customerInfo.gender === 'Nữ'}
                            onChange={(e) => handleInputChange('gender', e.target.value)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">Nữ</span>
                        </label>
                    </div>

                    {/* Form Fields */}
                        <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Họ và tên*"
                            value={customerInfo.fullName}
                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                        
                        <input
                            type="text"
                            placeholder="Số điện thoại*"
                            value={customerInfo.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                        
                        <input
                            type="text"
                            placeholder="Địa chỉ"
                            value={customerInfo.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                        </div>
                    </div>
                </div>

                {/* Delivery Information */}
                <div className="space-y-6">
                    <div>
                        <h3 className="text-base font-medium text-gray-900 mb-4">Hình thức nhận</h3>
                        
                        {/* Delivery Method */}
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
                            <label className="flex items-center">
                                <input
                                type="radio"
                                name="deliveryMethod"
                                value="Giao đến tận nơi"
                                checked={customerInfo.deliveryMethod === 'Giao đến tận nơi'}
                                onChange={(e) => handleInputChange('deliveryMethod', e.target.value)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                />
                                <span className="ml-2 text-sm text-gray-700">Giao đến tận nơi</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                type="radio"
                                name="deliveryMethod"
                                value="Nhận tại cửa hàng"
                                checked={customerInfo.deliveryMethod === 'Nhận tại cửa hàng'}
                                onChange={(e) => handleInputChange('deliveryMethod', e.target.value)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                />
                                <span className="ml-2 text-sm text-gray-700">Nhận tại cửa hàng</span>
                            </label>
                        </div>

                        {/* Location Selects */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <select
                            value={customerInfo.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        >
                            <option>Hồ Chí Minh</option>
                            <option>Hà Nội</option>
                            <option>Đà Nẵng</option>
                        </select>
                        
                        <select
                            value={customerInfo.district}
                            onChange={(e) => handleInputChange('district', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        >
                            <option>Chọn quận</option>
                            <option>Quận 1</option>
                            <option>Quận 2</option>
                            <option>Quận 3</option>
                        </select>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <select
                            value={customerInfo.ward}
                            onChange={(e) => handleInputChange('ward', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        >
                            <option>Chọn phường/xã</option>
                            <option>Phường 1</option>
                            <option>Phường 2</option>
                            <option>Phường 3</option>
                        </select>
                        
                        <input
                            type="text"
                            placeholder="Số nhà, đường"
                            value={customerInfo.street}
                            onChange={(e) => handleInputChange('street', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                        </div>

                        {/* Note */}
                        <div className="flex items-center space-x-2 mb-4">
                        <span className="text-sm text-gray-700">📝</span>
                        <input
                            type="text"
                            placeholder="Mã giảm giá"
                            value={customerInfo.note}
                            onChange={(e) => handleInputChange('note', e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                        </div>
                    </div>
                </div>
            </div>

          {/* Payment Section */}
            <div className="p-4 sm:p-6 border-t border-gray-200">
                <div className="space-y-6">
                <h3 className="text-base font-medium text-gray-900">THANH TOÁN</h3>
                <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">PHƯƠNG THỨC THANH TOÁN</h4>
                    <div className="flex items-center space-x-2 mb-4">
                    <input
                        type="checkbox"
                        name="paymentMethod"
                        id="cash"
                        defaultChecked
                        className="h-4 w-4  border-gray-300"
                    />
                    <label htmlFor="cash" className="text-sm text-gray-700">Thẻ tín dụng hoặc thẻ ghi nợ</label>
                    
                    {/* Payment Icons */}
                    <div className="flex space-x-1 ml-4">
                        <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                            VISA
                        </div>
                        <div className="w-8 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center">
                            💳
                        </div>
                        <div className="w-8 h-5 bg-red-500 rounded text-white text-xs flex items-center justify-center">
                            MC
                        </div>
                        <div className="w-8 h-5 bg-blue-800 rounded text-white text-xs flex items-center justify-center">
                            PP
                        </div>
                    </div>
                    </div>

                    <input
                    type="text"
                    placeholder="Số thẻ*"
                    value={customerInfo.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm mb-4"
                    />

                    <div className="flex items-start space-x-2 mb-6">
                    <input
                        type="checkbox"
                        id="policy"
                        checked={customerInfo.agreeToPolicy}
                        onChange={(e:any) => handleInputChange('agreeToPolicy', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5"
                    />
                    <label htmlFor="policy" className="text-xs text-gray-600 leading-relaxed">
                        Thanh toán bằng tiền mặt
                    </label>
                    </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center py-4 border-t border-gray-200">
                    <span className="text-base font-medium text-gray-900">Tổng</span>
                    <span className="text-lg font-semibold text-red-600">299,000₫</span>
                </div>

                {/* Agreement */}
                <div className="flex items-start space-x-2 mb-6">
                    <input
                    type="checkbox"
                    id="agreement"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5"
                    />
                    <label htmlFor="agreement" className="text-xs text-gray-600 leading-relaxed">
                    Tôi đồng ý với chính sách xử lý dữ liệu cá nhân của verse style
                    </label>
                </div>

                {/* Checkout Button */}
                <button className="w-full bg-black text-white py-3 px-4 rounded-md font-medium hover:bg-gray-800 transition duration-200 text-sm sm:text-base">
                    THANH TOÁN
                </button>
                </div>
            </div>
            </div>
        </div>
    </div>
  );
}