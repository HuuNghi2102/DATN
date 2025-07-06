'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import '@/app/globals.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { json } from 'stream/consumers';

import detailOrderInterface from '../components/interface/detailOrderInterface';
import userInterface from '../components/interface/userInterface';

interface Review {
  id_danh_gia: number;
  noi_dung_danh_gia: string;
  id_khach_hang: number;
  diem_danh_gia : number;
  id_san_pham: number;
  id_chi_tiet_don_hang: string;
  created_at: string;
  deleted_at: string;
  detail_order : detailOrderInterface;
  user : userInterface;
}


const ReviewManagerPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(20);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const rawAccessToken = localStorage.getItem('accessToken');
        const rawTypeToken = localStorage.getItem('typeToken');
        if (!rawAccessToken || !rawTypeToken) {
          console.warn('⚠️ accessToken hoặc typeToken chưa được lưu trong localStorage.');
          return;
        }

        const accessToken = JSON.parse(rawAccessToken);
        const typeToken = JSON.parse(rawTypeToken);
        const token = `${typeToken} ${accessToken}`;

        const response = await fetch('https://huunghi.id.vn/api/evaluate/listEvaluate', {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token,
          },
        });

        
        const contentType = response.headers.get('content-type') || '';

        if (response.status === 401) {
          console.error('🚫 401 Unauthorized:', response.text());
          return;
        }

        if (!response.ok) {
          console.error(`❌ Lỗi ${response.status}:`,response.text());
          return;
        }

        if (!contentType.includes('application/json')) {
          console.warn('⚠️ Phản hồi không phải JSON:', response.text());
          return;
        }

        const result = await response.json();
        setTotalPages(result.data.evaluates.last_page);
        setCurrentPage(result.data.evaluates.current_page);
        setPerPage(result.data.evaluates.per_page);

        const rawData = Array.isArray(result?.data?.evaluates.data) ? result?.data?.evaluates.data : [];
        const user = result?.data?.evaluates.data.user;
        const detailOrder = result?.data?.evaluates.data.detail_order;
        
      
      if (!rawData) {
        console.warn('⚠️ Không tìm thấy danh sách đánh giá:', result.data);
        setReviews([]);
        return;
      }

        setReviews(rawData);

      } catch (error) {
        console.error('❌ Lỗi khi gọi API:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);


  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <div className="flex flex-col items-center space-y-6">
          <div className="text-3xl font-semibold tracking-widest text-black uppercase">VERVESTYLE</div>
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-gray-700 tracking-wide">Đang tải đánh giá...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-gray-100 min-h-screen p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý Đánh giá</h1>
        <p className="text-sm text-gray-500">Xem và xử lý phản hồi từ khách hàng</p>
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
              <th className="text-left px-4 py-3">Ngày</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((rev) => (
              <tr key={rev.id_danh_gia} className="border-t">
                <td className="px-4 py-3">#DG{rev.id_danh_gia}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <Image src={`https://huunghi.id.vn/storage/products/${rev.detail_order.anh_san_pham}`} width={40} height={40} className="rounded mr-3 object-cover" alt="" />
                    <span>{rev.detail_order.ten_san_pham}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <Image src={ rev.user.anh_dai_dien_user ? `https://huunghi.id.vn/storage/avatars/${rev.user.anh_dai_dien_user}` : `https://hoseiki.vn/wp-content/uploads/2025/03/avatar-mac-dinh-3.jpg`} width={32} height={32} className="rounded-full mr-2 object-cover" alt="" />
                    <span>{rev.user.ten_user}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-yellow-400 flex">
                    {[...Array(rev.diem_danh_gia)].map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                    {[...Array(5 - rev.diem_danh_gia)].map((_, i) => (
                      <i key={i} className="fas fa-star text-gray-300"></i>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 max-w-sm whitespace-pre-wrap">{rev.noi_dung_danh_gia}</td>
                <td className="px-4 py-3">{new Date(rev.created_at).toLocaleDateString('vi-VN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Phân Trang */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-white">
        {/* Hiển thị <span className="font-medium">{(currentPage - 1) * perPage + 1}</span> đến{' '} */}
        <div className="text-sm text-gray-600">
          Hiển thị <span className="font-medium">{(currentPage - 1) * perPage + 1}</span> đến{' '}
          <span className="font-medium">{Math.min(currentPage * perPage, reviews.length + (currentPage - 1) * perPage)}</span>{' '}
          trong tổng số <span className="font-medium">{100}</span> đơn hàng
        </div>
        <div className="flex space-x-2">
          <button
            // onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md border ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
          >
            Trước
          </button>

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-3 py-1 rounded-md border ${currentPage === pageNum ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                {pageNum}
              </button>
            );
          })}

          {totalPages > 5 && currentPage < totalPages - 2 && (
            <span className="px-3 py-1">...</span>
          )}

          {totalPages > 5 && currentPage < totalPages - 2 && (
            <button
              onClick={() => handlePageChange(totalPages)}
              className={`px-3 py-1 rounded-md border ${currentPage === totalPages ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              {totalPages}
            </button>
          )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md border ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
          >
            Sau
          </button>
        </div>
      </div>
    </main>
  );
};

export default ReviewManagerPage
