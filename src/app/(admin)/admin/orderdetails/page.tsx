'use client';

import React, { useState } from 'react';
import '@/app/globals.css';

const OrderDetailPage = () => {
  const [trackingCode, setTrackingCode] = useState('GHN123456789');
  const [deliveryStatus, setDeliveryStatus] = useState('Đang vận chuyển');
  const [orderNote, setOrderNote] = useState('');

  const handleUpdateShipping = () => {
    alert(`Cập nhật vận chuyển với mã: ${trackingCode}, trạng thái: ${deliveryStatus}`);
  };

  const handleCancelOrder = () => {
    const confirm = window.confirm('Bạn có chắc muốn hủy đơn hàng này không?');
    if (confirm) {
      alert('Đơn hàng đã được hủy.');
    }
  };

  const handleUpdateNote = () => {
    alert(`Cập nhật ghi chú đơn hàng: ${orderNote}`);
  };

  return (
    <div className="min-h-screen font-sans bg-gray-100 p-8">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Chi tiết đơn hàng #DH12345</h1>
          <p className="text-sm text-gray-500">Ngày đặt hàng: 15/06/2023 - 10:30 AM</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100">
            <i className="fas fa-print mr-2"></i> In đơn
          </button>
          <button
            onClick={handleUpdateNote}
            className="btn btn-primary px-4 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            <i className="fas fa-pen mr-2"></i> Cập nhật
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-sm text-gray-500 mb-1">Tổng giá trị</h3>
          <p className="text-xl font-semibold text-gray-900">2,450,000₫</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-sm text-gray-500 mb-1">Phương thức thanh toán</h3>
          <p className="text-xl font-semibold text-gray-900">Chuyển khoản</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-sm text-gray-500 mb-1">Trạng thái đơn hàng</h3>
          <p className="text-xl font-semibold text-gray-900 mb-1">Đang giao hàng</p>
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
            Đã vận chuyển
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded shadow">
            <div className="border-b border-gray-200 p-4">
              <h2 className="text-lg font-semibold text-gray-800">Thông tin khách hàng</h2>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[['Họ tên', 'Trần Văn Nam'], ['Số điện thoại', '0987654321'], ['Email', 'nam.tran@example.com'], ['Địa chỉ', 'Số 123, đường ABC, quận 1, TP.HCM']].map(([label, value], index) => (
                <div key={index}>
                  <label className="text-sm text-gray-500">{label}</label>
                  <p className="font-medium text-gray-800">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded shadow">
            <div className="border-b border-gray-200 p-4">
              <h2 className="text-lg font-semibold text-gray-800">Sản phẩm đã đặt</h2>
            </div>
            <div className="p-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium text-gray-700">Sản phẩm</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-700">Số lượng</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-700">Đơn giá</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-700">Tổng</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(4)].map((_, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="px-4 py-3">
                        <div className="flex gap-3 items-center">
                          <img src="https://via.placeholder.com/48" alt="Sản phẩm" className="w-12 h-12 rounded object-cover" />
                          <div>
                            <p className="font-medium text-gray-800">Sản phẩm {idx + 1}</p>
                            <p className="text-xs text-gray-500">Màu: Trắng - Size: M</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">1</td>
                      <td className="px-4 py-3">500,000₫</td>
                      <td className="px-4 py-3">500,000₫</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Ghi chú đơn hàng</h2>
            <textarea
              className="w-full border border-gray-300 rounded p-2 text-sm"
              rows={3}
              placeholder="Nhập ghi chú..."
              value={orderNote}
              onChange={(e) => setOrderNote(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Tổng thanh toán</h2>
            <table className="w-full text-sm">
              <tbody>
                {[['Tạm tính:', '2,450,000₫'], ['Phí vận chuyển:', '30,000₫'], ['Giảm giá:', '-150,000₫'], ['Tổng cộng:', '2,330,000₫']].map(([label, value], idx) => (
                  <tr key={idx} className={idx === 3 ? 'font-semibold text-gray-800' : ''}>
                    <td className="text-gray-500">{label}</td>
                    <td className="text-right font-medium">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={handleCancelOrder}
                className="px-4 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600"
              >
                <i className="fas fa-times mr-1"></i> Hủy đơn hàng
              </button>
              <button
                onClick={handleUpdateShipping}
                className="px-4 py-2 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700"
              >
                <i className="fas fa-truck mr-1"></i> Cập nhật vận chuyển
              </button>
            </div>
          </div>

          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Thông tin vận chuyển</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Mã vận đơn</label>
                <input
                  type="text"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded text-sm"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Trạng thái</label>
                <select
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded text-sm"
                  value={deliveryStatus}
                  onChange={(e) => setDeliveryStatus(e.target.value)}
                >
                  <option>Chờ xử lý</option>
                  <option>Đang vận chuyển</option>
                  <option>Đã giao</option>
                  <option>Đã hủy</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
