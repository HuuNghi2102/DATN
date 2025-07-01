'use client';

import React, { useState } from 'react';
import '@/app/globals.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const ReviewManagerPage = () => {
  const [reviews, setReviews] = useState([
    {
      id: '#DG001',
      product: 'Áo thun nam cổ tròn',
      image: 'https://ressmedia.com/wp-content/uploads/2022/04/Anh-3-4.jpg',
      customer: 'Trần Văn Nam',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      stars: 5,
      content: 'Áo rất đẹp, chất liệu tốt, mặc thoáng mát. Tôi rất hài lòng với sản phẩm này.',
      date: '15/05/2023',
      status: 'pending'
    },
    {
      id: '#DG002',
      product: 'Quần jean nữ ống suông',
      image: 'https://via.placeholder.com/40',
      customer: 'Lê Thị Hương',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      stars: 4,
      content: 'Quần đẹp nhưng hơi dài so với chiều cao của tôi. Chất liệu tốt, form chuẩn.',
      date: '10/05/2023',
      status: 'pending'
    },
    {
      id: '#DG003',
      product: 'Váy liền thun cổ vuông',
      image: 'https://via.placeholder.com/40',
      customer: 'Phạm Thu Trang',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      stars: 3,
      content: 'Váy đẹp nhưng chất liệu hơi dày, mặc mùa hè hơi nóng. Màu sắc đúng như hình.',
      date: '05/05/2023',
      status: 'pending'
    },
    {
      id: '#DG004',
      product: 'Áo thun nam cổ tròn',
      image: 'https://via.placeholder.com/40',
      customer: 'Nguyễn Văn Tú',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
      stars: 2,
      content: 'Áo bị lỗi đường may, có vài chỗ bị lộ chỉ. Size hơi nhỏ so với thông số.',
      date: '28/04/2023',
      status: 'pending'
    },
    {
      id: '#DG005',
      product: 'Váy liền thun cổ vuông',
      image: 'https://via.placeholder.com/40',
      customer: 'Đỗ Thị Mai',
      avatar: 'https://randomuser.me/api/portraits/women/23.jpg',
      stars: 1,
      content: 'Sản phẩm không giống hình, màu sắc khác xa so với mô tả. Chất liệu kém, không xứng đáng với giá tiền.',
      date: '20/04/2023',
      status: 'pending'
    }
  ]);

  const [editingReview, setEditingReview] = useState(null);

  const updateStatus = (index, newStatus) => {
    const updated = [...reviews];
    updated[index].status = newStatus;
    setReviews(updated);
    setEditingReview(null);
  };

  return (
    <main className="bg-gray-100 min-h-screen p-6">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quản lý Đánh giá</h1>
          <p className="text-sm text-gray-500">Xem và quản lý đánh giá của khách hàng</p>
        </div>
        <button className="border border-gray-300 px-4 py-2 text-sm rounded hover:bg-gray-100">
          <i className="fas fa-file-export mr-2"></i> Xuất file
        </button>
      </header>

      <div className="flex flex-wrap gap-4 mb-6">
        {[{ label: 'Lọc theo:', options: ['Tất cả sản phẩm', 'Áo thun nam cổ tròn', 'Quần jean nữ ống suông', 'Váy liền thun cổ vuông'] }, { label: 'Đánh giá:', options: ['Tất cả', '5 sao', '4 sao', '3 sao', '2 sao', '1 sao'] }, { label: 'Trạng thái:', options: ['Tất cả', 'Đã duyệt', 'Chờ duyệt', 'Từ chối'] },].map((group, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="text-sm text-gray-700 whitespace-nowrap">{group.label}</span>
            <select className="border border-gray-300 rounded px-2 py-1 text-sm">
              {group.options.map((opt, i) => (
                <option key={i} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-3">Mã ĐG</th>
              <th className="text-left px-4 py-3">Sản phẩm</th>
              <th className="text-left px-4 py-3">Khách hàng</th>
              <th className="text-left px-4 py-3">Đánh giá</th>
              <th className="text-left px-4 py-3">Nội dung</th>
              <th className="text-left px-4 py-3">Ngày đánh giá</th>
              <th className="text-left px-4 py-3">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((rev, idx) => (
              <tr key={idx} className="border-t">
                <td className="px-4 py-3 whitespace-nowrap">{rev.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <img src={rev.image} className="w-10 h-10 rounded mr-3 object-cover" alt="product" />
                    <span>{rev.product}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <img src={rev.avatar} className="w-8 h-8 rounded-full mr-2 object-cover" alt="customer" />
                    <span>{rev.customer}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-yellow-400 flex">
                    {[...Array(rev.stars)].map((_, i) => <i key={i} className="fas fa-star"></i>)}
                    {[...Array(5 - rev.stars)].map((_, i) => <i key={i} className="fas fa-star text-gray-300"></i>)}
                  </div>
                </td>
                <td className="px-4 py-3 max-w-sm whitespace-pre-wrap">{rev.content}</td>
                <td className="px-4 py-3 whitespace-nowrap">{rev.date}</td>
                <td className="px-4 py-3">
                  <button onClick={() => setEditingReview({ ...rev, index: idx })} className="text-blue-600 hover:underline text-xs">Chỉnh sửa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingReview && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Cập nhật đánh giá {editingReview.id}</h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Trạng thái</label>
                <select
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={editingReview.status}
                  onChange={(e) => setEditingReview({ ...editingReview, status: e.target.value })}
                >
                  <option value="approved">Đã duyệt</option>
                  <option value="pending">Chờ duyệt</option>
                  <option value="rejected">Từ chối</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setEditingReview(null)} className="px-4 py-2 text-sm text-gray-700 border rounded hover:bg-gray-100">Hủy</button>
                <button onClick={() => updateStatus(editingReview.index, editingReview.status)} className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded">Cập nhật</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ReviewManagerPage;