'use client';

import React, { useState } from 'react';
import { FaEye, FaMapMarkerAlt, FaPhone, FaFilter, FaSyncAlt, FaPrint, FaCheck } from 'react-icons/fa';

const orders = [
  {
    id: 'DH001',
    customer: 'Nguyễn Thị An',
    phone: '0389 123 456',
    address: '123 Đường Lê Lợi, Q.1, TP.HCM',
    total: '1.250.000đ',
    status: 'Chờ nhận',
    statusClass: 'bg-indigo-100 text-indigo-800',
    details: [
      { name: 'Áo thun nam cổ tròn', variant: 'Đỏ / Size L - Số lượng: 2', price: '500.000đ' },
      { name: 'Quần jean nam ống đứng', variant: 'Xanh / Size 32 - Số lượng: 1', price: '750.000đ' }
    ],
    summary: {
      subtotal: '1.250.000đ',
      shipping: '20.000đ',
      discount: '-50.000đ',
      total: '1.220.000đ'
    },
    delivery: {
      time: '14:30, 15/06/2023',
      note: 'Giao giờ hành chính, gọi trước khi giao'
    }
  },
  {
    id: 'DH002',
    customer: 'Lê Văn Bình',
    phone: '0903 456 789',
    address: '456 Đường Nguyễn Huệ, Q.1, TP.HCM',
    total: '850.000đ',
    status: 'Đang giao',
    statusClass: 'bg-yellow-100 text-yellow-800',
    details: [
      { name: 'Váy liền thun cổ vuông', variant: 'Trắng / Size M - Số lượng: 1', price: '350.000đ' },
      { name: 'Túi xách nữ da mềm', variant: 'Đen - Số lượng: 1', price: '500.000đ' }
    ],
    summary: {
      subtotal: '850.000đ',
      shipping: 'Miễn phí',
      total: '850.000đ'
    },
    delivery: {
      time: '09:15, 14/06/2023',
      note: 'Giao buổi chiều từ 14h-17h'
    }
  },
  {
    id: 'DH003',
    customer: 'Phạm Thị Cúc',
    phone: '0912 345 678',
    address: '789 Đường Cách Mạng Tháng 8, Q.3, TP.HCM',
    total: '1.500.000đ',
    status: 'Hoàn thành',
    statusClass: 'bg-green-100 text-green-800',
    details: [
      { name: 'Giày thể thao nam', variant: 'Đen / Size 42 - Số lượng: 1', price: '1.200.000đ' },
      { name: 'Tất thể thao', variant: 'Trắng - Số lượng: 3', price: '300.000đ' }
    ],
    summary: {
      subtotal: '1.500.000đ',
      shipping: 'Miễn phí',
      total: '1.500.000đ'
    },
    delivery: {
      time: '16:45, 12/06/2023',
      note: 'Giao thành công lúc 10:30, 14/06/2023'
    }
  }
];

const OrderManagement = () => {
  const [openOrder, setOpenOrder] = useState<string | null>(null);
  const toggleOrderDetails = (id: string) => setOpenOrder(openOrder === id ? null : id);

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-4 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Quản Lý Đơn Hàng</h1>
            <p className="text-sm text-gray-500">Danh sách đơn hàng cần giao</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <button className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100 flex items-center">
              <FaFilter className="mr-2" /> Lọc
            </button>
            <button className="px-4 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center">
              <FaSyncAlt className="mr-2" /> Làm mới
            </button>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto mb-6">
          {['Tất cả', 'Chờ nhận', 'Đang giao', 'Đã giao', 'Hoàn thành', 'Đã hủy', 'Giao thất bại'].map((status) => (
            <button
              key={status}
              className={`px-4 py-2 text-sm border rounded-full whitespace-nowrap ${status === 'Tất cả' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="bg-white shadow rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Danh sách đơn hàng</h2>
            <span className="text-sm text-gray-500">Tổng: <strong>{orders.length}</strong> đơn hàng</span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr className="text-left text-gray-600">
                  <th className="px-6 py-3 font-medium">Mã ĐH</th>
                  <th className="px-6 py-3 font-medium">Khách hàng</th>
                  <th className="px-6 py-3 font-medium">Địa chỉ</th>
                  <th className="px-6 py-3 font-medium">Tổng tiền</th>
                  <th className="px-6 py-3 font-medium">Trạng thái</th>
                  <th className="px-6 py-3 font-medium">Thao tác</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {orders.map((order) => (
                  <React.Fragment key={order.id}>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">#{order.id}</td>
                      <td className="px-6 py-4">
                        <div className="font-semibold">{order.customer}</div>
                        <div className="text-xs text-gray-500">{order.phone}</div>
                      </td>
                      <td className="px-6 py-4">{order.address}</td>
                      <td className="px-6 py-4">{order.total}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${order.statusClass}`}>{order.status}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 flex-nowrap flex-row flex-wrap">
                          <button className="p-2 border rounded hover:bg-gray-100" onClick={() => toggleOrderDetails(order.id)}><FaEye /></button>
                          <button className="p-2 border rounded hover:bg-gray-100"><FaMapMarkerAlt /></button>
                          <button className="p-2 border rounded hover:bg-gray-100"><FaPhone /></button>
                          <button className="px-3 py-2 text-xs bg-green-600 text-white rounded hover:bg-green-700 font-medium whitespace-nowrap">{order.status === 'Chờ nhận' ? 'Nhận đơn' : 'Đã giao'}</button>
                        </div>
                      </td>
                    </tr>
                    {openOrder === order.id && (
                      <tr>
                        <td colSpan={6} className="bg-gray-50 p-6">
                          <div className="grid gap-4">
                            {order.details.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden">
                                  <img src="https://via.placeholder.com/50" alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium">{item.name}</div>
                                  <div className="text-xs text-gray-500">{item.variant}</div>
                                </div>
                                <div className="font-semibold">{item.price}</div>
                              </div>
                            ))}
                            <div className="mt-4 border-t pt-4 text-sm text-gray-700">
                              <div className="flex justify-between"><span>Tạm tính:</span><span>{order.summary.subtotal}</span></div>
                              <div className="flex justify-between"><span>Phí vận chuyển:</span><span>{order.summary.shipping}</span></div>
                              {order.summary.discount && <div className="flex justify-between"><span>Giảm giá:</span><span>{order.summary.discount}</span></div>}
                              <div className="flex justify-between font-semibold mt-2"><span>Tổng cộng:</span><span>{order.summary.total}</span></div>
                            </div>
                            <div className="text-sm text-gray-700">
                              <div><strong>Thời gian đặt:</strong> {order.delivery.time}</div>
                              <div><strong>Ghi chú:</strong> {order.delivery.note}</div>
                            </div>
                            <div className="flex justify-end gap-2 mt-2">
                              <button className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100 flex items-center">
                                <FaPrint className="mr-2" />In hóa đơn
                              </button>
                              <button className="px-4 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center">
                                <FaCheck className="mr-2" />{order.status === 'Chờ nhận' ? 'Nhận đơn' : 'Hoàn thành'}
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
