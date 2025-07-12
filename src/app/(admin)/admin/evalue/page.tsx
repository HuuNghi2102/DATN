'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import '@/app/globals.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import detailOrderInterface from '../components/interface/detailOrderInterface';
import userInterface from '../components/interface/userInterface';
import productInterface from '../components/interface/productInterface';

interface Review {
  id_danh_gia: number;
  noi_dung_danh_gia: string;
  id_khach_hang: number;
  diem_danh_gia: number;
  id_san_pham: number;
  id_chi_tiet_don_hang: string;
  created_at: string;
  deleted_at: string;
  detail_order: detailOrderInterface;
  user: userInterface;
}

const ReviewManagerPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(20);

  const [selectedStart,setSelectedStart] = useState<number | ''>('');
  const [selectedIdProduct, setSelectedIdProduct] = useState<number | ''>('');
  const [selectedDate, setSelectedDate] = useState<string>('');

  // Filter states
  const [ratingFilter, setRatingFilter] = useState<number | ''>('');
  const [productNameFilter, setProductNameFilter] = useState('');
  const [dateFilterType, setDateFilterType] = useState<'day' | 'month' | 'year' | ''>('');
  // const [selectedDay, setSelectedDay] = useState('');
  // const [selectedMonth, setSelectedMonth] = useState('');
  // const [selectedYear, setSelectedYear] = useState('');

  const [listProduct, setListProduct] = useState<productInterface[]>([]); 

  // Generate date options
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));

  const fetchReviews = async (page = 1) => {
    setLoading(true);
    try {
      const rawAccessToken = localStorage.getItem('accessToken');
      const rawTypeToken = localStorage.getItem('typeToken');
      if (!rawAccessToken || !rawTypeToken) return;

      const accessToken = JSON.parse(rawAccessToken);
      const typeToken = JSON.parse(rawTypeToken);
      const token = `${typeToken} ${accessToken}`;

      const response = await fetch(`https://huunghi.id.vn/api/evaluate/listEvaluate?start=${selectedStart}&idProduct=${selectedIdProduct}&date=${selectedDate}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': token,
        },
      });
      const result = await response.json();
      const rawData = Array.isArray(result?.data?.evaluates.data) ? result?.data?.evaluates.data : [];

      setTotalPages(result.data.evaluates.last_page);
      setCurrentPage(result.data.evaluates.current_page);
      setPerPage(result.data.evaluates.per_page);
      setReviews(rawData);


      const resProduct = await fetch(`https://huunghi.id.vn/api/product/getAllProduct`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': token,
        },
      });

      if(resProduct.ok){
        const resultResProduct = await resProduct.json();
        setListProduct(resultResProduct.data.product);
      }else{
        alert('Lấy sản phẩm không thành công')
      }
      
    } catch (err) {
      console.error('Lỗi API:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      fetchReviews(page);
    }
  };

  const handleClearFilters = () => {
    setRatingFilter('');
    setProductNameFilter('');
    setDateFilterType('');
    fetchReviews(1);
  };

  useEffect(() => {
    fetchReviews();
  }, [selectedDate,selectedIdProduct,selectedStart]);

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

  console.log(selectedIdProduct);

  return (
    <main className="bg-gray-100 min-h-screen p-4 md:p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý Đánh giá</h1>
        <p className="text-sm text-gray-500">Xem và quản lý đánh giá từ khách hàng</p>
      </header>

      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Star Rating Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lọc theo sao</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={selectedStart}
              onChange={(e) => setSelectedStart(Number(e.target.value) ? Number(e.target.value) : '')}
            >
              <option value="">Tất cả đánh giá</option>
              <option value="5">★★★★★ (5 sao)</option>
              <option value="4">★★★★☆ (4 sao)</option>
              <option value="3">★★★☆☆ (3 sao)</option>
              <option value="2">★★☆☆☆ (2 sao)</option>
              <option value="1">★☆☆☆☆ (1 sao)</option>
            </select>
          </div>

          {/* Product Name Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lọc theo sản phẩm</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={selectedIdProduct}
              onChange={(e) => setSelectedIdProduct(e.target.value ? Number(e.target.value) : '')}
            >
              <option value="">Chọn sản phẩm</option>
              {listProduct.map((e,i) => (
                <option key={i} value={e.id_san_pham}>{e.ten_san_pham}</option>
              ))}
            </select>
          </div>

          {/* Date Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lọc theo thời gian</label>
            <div className="space-y-2">
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value as 'day' | 'month' | 'year' | '')}
              >
                <option value="">Chọn kiểu lọc</option>
                <option value="day">Theo ngày</option>
                <option value="week">Theo tuần</option>
                <option value="month">Theo tháng</option>
                <option value="year">Theo năm</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sản phẩm</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khách hàng</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Đánh giá</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nội dung</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reviews.length > 0 ? (
                reviews.map((rev) => (
                  <tr key={rev.id_danh_gia} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">#{rev.id_danh_gia}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <Image 
                          src={`https://huunghi.id.vn/storage/products/${rev.detail_order.anh_san_pham}`} 
                          width={40} 
                          height={40} 
                          className="rounded mr-3 object-cover" 
                          alt={rev.detail_order.ten_san_pham}
                        />
                        <span className="line-clamp-1">{rev.detail_order.ten_san_pham}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <Image 
                          src={rev.user.anh_dai_dien_user 
                            ? `https://huunghi.id.vn/storage/avatars/${rev.user.anh_dai_dien_user}` 
                            : `https://hoseiki.vn/wp-content/uploads/2025/03/avatar-mac-dinh-3.jpg`} 
                          width={32} 
                          height={32} 
                          className="rounded-full mr-2 object-cover" 
                          alt={rev.user.ten_user}
                        />
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
                    <td className="px-4 py-3 max-w-xs whitespace-pre-wrap text-sm">
                      <div className="line-clamp-2">{rev.noi_dung_danh_gia}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {new Date(rev.created_at).toLocaleDateString('vi-VN')}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                    Không tìm thấy đánh giá nào phù hợp
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {reviews.length > 0 && (
          <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-700">
              Hiển thị <span className="font-medium">{(currentPage - 1) * perPage + 1}</span> đến{' '}
              <span className="font-medium">{Math.min(currentPage * perPage, (currentPage - 1) * perPage + reviews.length)}</span>{' '}
              trong tổng số <span className="font-medium">{totalPages * perPage}</span> đánh giá
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
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
                    className={`px-3 py-1 rounded-md ${currentPage === pageNum ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                Sau
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ReviewManagerPage;