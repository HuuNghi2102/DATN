'use client';

import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const OrderManager = () => {
  const [orders, setOrders] = useState([
    {
      id: '#DH20230001',
      customer: 'Trần Văn Bình',
      phone: '0345 678 901',
      products: [
        { name: 'Áo thun nam cổ tròn', variant: 'Đỏ / Size L × 2', img: 'https://via.placeholder.com/40' },
        { name: 'Quần jean nam', variant: 'Xanh / Size 32 × 1', img: 'https://via.placeholder.com/40' }
      ],
      date: '2023-06-15',
      total: '850.000đ',
      status: 'Đang giao'
    },
    {
      id: '#DH20230002',
      customer: 'Lê Thị Mai',
      phone: '0987 654 321',
      products: [
        { name: 'Váy liền thun cổ vuông', variant: 'Trắng / Size M × 1', img: 'https://via.placeholder.com/40' }
      ],
      date: '2023-06-14',
      total: '350.000đ',
      status: 'Đã giao'
    },
    {
      id: '#DH20230003',
      customer: 'Phạm Văn Đức',
      phone: '0912 345 678',
      products: [
        { name: 'Áo sơ mi nam trắng', variant: 'Trắng / Size XL × 3', img: 'https://via.placeholder.com/40' },
        { name: 'Cà vạt lụa cao cấp', variant: 'Xanh navy × 1', img: 'https://via.placeholder.com/40' }
      ],
      date: '2023-06-13',
      total: '1.250.000đ',
      status: 'Đang giao'
    },
    {
      id: '#DH20230004',
      customer: 'Nguyễn Thị Hương',
      phone: '0903 123 456',
      products: [
        { name: 'Áo khoác jean nữ', variant: 'Xanh / Size M × 1', img: 'https://via.placeholder.com/40' }
      ],
      date: '2023-06-12',
      total: '550.000đ',
      status: 'Đã hủy'
    },
    {
      id: '#DH20230005',
      customer: 'Đỗ Minh Khôi',
      phone: '0978 901 234',
      products: [
        { name: 'Quần tây nam cao cấp', variant: 'Đen / Size 34 × 2', img: 'https://via.placeholder.com/40' },
        { name: 'Áo vest nam', variant: 'Xám / Size L × 1', img: 'https://via.placeholder.com/40' }
      ],
      date: '2023-06-10',
      total: '3.450.000đ',
      status: 'Đang xử lý'
    }
  ]);

  const [newOrder, setNewOrder] = useState({ customer: '', phone: '', products: '', total: '' });
  const [showForm, setShowForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const updateStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => order.id === orderId ? { ...order, status: newStatus } : order));
  };

  const handlePrint = (orderId) => {
    alert(`In hóa đơn cho đơn hàng ${orderId}`);
  };

  const handleAddOrder = () => {
    const productArray = newOrder.products.split(',').map(p => ({ name: p.trim(), variant: '', img: 'https://via.placeholder.com/40' }));
    const newId = `#DH2023${Math.floor(10000 + Math.random() * 90000)}`;
    setOrders([...orders, { ...newOrder, id: newId, date: new Date().toISOString().slice(0, 10), products: productArray, status: 'Chờ xử lý' }]);
    setNewOrder({ customer: '', phone: '', products: '', total: '' });
    setShowForm(false);
  };

  const getBadgeClass = (status) => {
    const base = 'inline-block px-2 py-1 text-xs rounded-full';
    switch (status) {
      case 'Chờ xử lý': return `${base} bg-yellow-100 text-yellow-700`;
      case 'Đang xử lý': return `${base} bg-emerald-100 text-emerald-700`;
      case 'Đang giao': return `${base} bg-indigo-100 text-indigo-700`;
      case 'Đã giao': return `${base} bg-green-100 text-green-700`;
      case 'Đã hủy': return `${base} bg-red-100 text-red-700`;
      default: return `${base} bg-gray-100 text-gray-600`;
    }
  };

  return (
    <main className="p-4 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quản lý đơn hàng</h1>
          <p className="text-sm text-gray-500">Xem và quản lý tất cả đơn hàng của cửa hàng</p>
        </div>
        <div className="flex gap-2">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-100 text-sm">
            <i className="fas fa-file-export mr-2"></i> Xuất file
          </button>
          <button onClick={() => setShowForm(true)} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-sm">
            <i className="fas fa-plus mr-2"></i> Tạo đơn
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-white p-4 rounded shadow mb-4">
          <h2 className="text-lg font-semibold mb-2">Tạo đơn hàng mới</h2>
          <div className="space-y-3">
            <input type="text" placeholder="Tên khách hàng" value={newOrder.customer} onChange={e => setNewOrder({ ...newOrder, customer: e.target.value })} className="border p-2 rounded w-full" />
            <input type="text" placeholder="Số điện thoại" value={newOrder.phone} onChange={e => setNewOrder({ ...newOrder, phone: e.target.value })} className="border p-2 rounded w-full" />
            <textarea placeholder="Danh sách sản phẩm (mỗi sản phẩm cách nhau bởi dấu phẩy)" value={newOrder.products} onChange={e => setNewOrder({ ...newOrder, products: e.target.value })} className="border p-2 rounded w-full"></textarea>
            <input type="text" placeholder="Tổng tiền (vd: 1.250.000đ)" value={newOrder.total} onChange={e => setNewOrder({ ...newOrder, total: e.target.value })} className="border p-2 rounded w-full" />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded">Hủy</button>
              <button onClick={handleAddOrder} className="px-4 py-2 bg-indigo-600 text-white rounded">Thêm đơn</button>
            </div>
          </div>
        </div>
      )}

      {selectedOrder && (
        <div className="bg-white p-4 rounded shadow mb-4">
          <h2 className="text-lg font-semibold mb-2">Chi tiết đơn hàng {selectedOrder.id}</h2>
          <p><strong>Khách hàng:</strong> {selectedOrder.customer} ({selectedOrder.phone})</p>
          <p><strong>Ngày đặt:</strong> {selectedOrder.date}</p>
          <p><strong>Tổng tiền:</strong> {selectedOrder.total}</p>
          <p><strong>Trạng thái:</strong> <span className={getBadgeClass(selectedOrder.status)}>{selectedOrder.status}</span></p>
          <div className="mt-3 space-y-2">
            {selectedOrder.products.map((p, i) => (
              <div key={i} className="flex gap-2 items-center">
                <img src={p.img} alt={p.name} className="w-10 h-10 rounded object-cover" />
                <div>
                  <div className="font-medium">{p.name}</div>
                  <div className="text-sm text-gray-500">{p.variant}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-right">
            <button onClick={() => setSelectedOrder(null)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded">Đóng</button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Mã đơn</th>
              <th className="p-3 text-left">Khách hàng</th>
              <th className="p-3 text-left">Sản phẩm</th>
              <th className="p-3 text-left">Ngày đặt</th>
              <th className="p-3 text-left">Tổng tiền</th>
              <th className="p-3 text-left">Trạng thái</th>
              <th className="p-3 text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="border-t">
                <td className="p-3 font-medium text-gray-800">{order.id}</td>
                <td className="p-3">
                  <div className="font-semibold text-sm">{order.customer}</div>
                  <div className="text-xs text-gray-500">{order.phone}</div>
                </td>
                <td className="p-3">
                  {order.products.map((p, i) => (
                    <div key={i} className="flex items-center gap-2 mb-1">
                      <img src={p.img} alt={p.name} className="w-10 h-10 rounded object-cover" />
                      <div>
                        <div className="text-sm font-medium">{p.name}</div>
                        <div className="text-xs text-gray-500">{p.variant}</div>
                      </div>
                    </div>
                  ))}
                </td>
                <td className="p-3">{order.date}</td>
                <td className="p-3">{order.total}</td>
                <td className="p-3">
                  <span className={getBadgeClass(order.status)}>{order.status}</span>
                </td>
                <td className="p-3 flex flex-wrap gap-1">
                  {order.status === 'Chờ xử lý' && (
                    <button title="Xác nhận" onClick={() => updateStatus(order.id, 'Đang xử lý')} className="action-btn text-yellow-600"><i className="fas fa-check"></i></button>
                  )}
                  {order.status === 'Đang xử lý' && (
                    <button title="Giao hàng" onClick={() => updateStatus(order.id, 'Đang giao')} className="action-btn text-blue-600"><i className="fas fa-truck"></i></button>
                  )}
                  {order.status === 'Đang giao' && (
                    <button title="Đã giao" onClick={() => updateStatus(order.id, 'Đã giao')} className="action-btn text-green-600"><i className="fas fa-check-circle"></i></button>
                  )}
                  {order.status !== 'Đã hủy' && order.status !== 'Đã giao' && (
                    <button title="Hủy đơn" onClick={() => updateStatus(order.id, 'Đã hủy')} className="action-btn text-red-600"><i className="fas fa-times"></i></button>
                  )}
                  {order.status === 'Đã giao' && (
                    <button title="In hóa đơn" onClick={() => handlePrint(order.id)} className="action-btn text-gray-600"><i className="fas fa-print"></i></button>
                  )}
                  <button title="Xem chi tiết" onClick={() => setSelectedOrder(order)} className="action-btn text-gray-500"><i className="fas fa-eye"></i></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default OrderManager;
