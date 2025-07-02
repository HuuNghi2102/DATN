'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import '@/app/globals.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

interface Review {
  id: string;
  product: string;
  image: string;
  customer: string;
  avatar: string;
  stars: number;
  content: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

const ReviewManagerPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://huunghi.id.vn/api/evaluate/listEvaluate');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Chuyển đổi dữ liệu từ API để phù hợp với interface Review
        const formattedReviews = data.map((item: any) => ({
          id: item.id_evaluate || 'N/A',
          product: item.product_name || 'Không có tên',
          image: item.product_image || '/default-product-image.jpg',
          customer: item.customer_name || 'Khách hàng ẩn danh',
          avatar: item.customer_avatar || '/default-avatar.jpg',
          stars: item.star ? parseInt(item.star) : 0,
          content: item.content || 'Không có nội dung',
          date: item.date_evaluate ? new Date(item.date_evaluate).toLocaleDateString() : 'Không rõ ngày',
          status: item.status === 'approved' ? 'approved' : 
                 item.status === 'rejected' ? 'rejected' : 'pending'
        }));
        
        setReviews(formattedReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
       
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div
        id="loading-screen"
        className="fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-500"
      >
        <div className="flex flex-col items-center space-y-6">
          <div className="text-3xl font-semibold tracking-widest text-black uppercase">VERVESTYLE</div>
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-gray-700 tracking-wide">Đang khởi động trải nghiệm của bạn...</p>
        </div>
      </div>
    );
  }

  const updateStatus = (id: string, newStatus: 'pending' | 'approved' | 'rejected') => {
    setReviews((prev) =>
      prev.map((review) =>
        review.id === id ? { ...review, status: newStatus } : review
      )
    );
    setEditingReview(null);
  };

  // Phần còn lại của component giữ nguyên
  return (
    <main className="bg-gray-100 min-h-screen p-6">
    <header className="mb-6">
      <h1 className="text-2xl font-bold text-gray-800">Quản lý Đánh giá</h1>
      <p className="text-sm text-gray-500">Xem và quản lý đánh giá của khách hàng</p>
    </header>

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
          {reviews.map((rev) => (
            <tr key={rev.id} className="border-t">
              <td className="px-4 py-3 whitespace-nowrap">{rev.id}</td>
              <td className="px-4 py-3">
                <div className="flex items-center">
                  <Image
                    src={rev.image}
                    width={40}
                    height={40}
                    className="rounded mr-3 object-cover"
                    alt={`Hình sản phẩm ${rev.product}`}
                  />
                  <span>{rev.product}</span>
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center">
                  <Image
                    src={rev.avatar}
                    width={32}
                    height={32}
                    className="rounded-full mr-2 object-cover"
                    alt={`Avatar của ${rev.customer}`}
                  />
                  <span>{rev.customer}</span>
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="text-yellow-400 flex">
                  {[...Array(rev.stars)].map((_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
                  {[...Array(5 - rev.stars)].map((_, i) => (
                    <i key={i} className="fas fa-star text-gray-300"></i>
                  ))}
                </div>
              </td>
              <td className="px-4 py-3 max-w-sm whitespace-pre-wrap">{rev.content}</td>
              <td className="px-4 py-3 whitespace-nowrap">{rev.date}</td>
              <td className="px-4 py-3">
                <button
                  onClick={() => setEditingReview(rev)}
                  className="text-blue-600 hover:underline text-xs"
                >
                  Chỉnh sửa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {editingReview && (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-4">
            Cập nhật đánh giá {editingReview.id}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Trạng thái
              </label>
              <select
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={editingReview.status}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setEditingReview({
                    ...editingReview,
                    status: e.target.value as 'pending' | 'approved' | 'rejected',
                  })
                }
              >
                <option value="approved">Đã duyệt</option>
                <option value="pending">Chờ duyệt</option>
                <option value="rejected">Từ chối</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setEditingReview(null)}
                className="px-4 py-2 text-sm text-gray-700 border rounded hover:bg-gray-100"
              >
                Hủy
              </button>
              <button
                onClick={() => updateStatus(editingReview.id, editingReview.status)}
                className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </main>
  );
};

export default ReviewManagerPage;