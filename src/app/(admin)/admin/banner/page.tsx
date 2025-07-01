'use client';

import React, { useState } from 'react';
import '@/app/globals.css';

const BannerManagerPage = () => {
  const [banners, setBanners] = useState([
    {
      id: '#BN001',
      image: 'https://via.placeholder.com/120x60',
      title: 'Giảm giá mùa hè lên đến 50%',
      position: 'Banner đầu trang',
      period: '01/06/2023 - 30/06/2023',
      remaining: 'Còn 5 ngày',
      status: 'Đang chạy',
      badge: 'success'
    },
    {
      id: '#BN002',
      image: 'https://via.placeholder.com/120x60',
      title: 'Sản phẩm mới ra mắt',
      position: 'Banner giữa trang',
      period: '15/05/2023 - 15/06/2023',
      remaining: 'Đã kết thúc',
      status: 'Đã dừng',
      badge: 'danger'
    },
    {
      id: '#BN003',
      image: 'https://via.placeholder.com/120x60',
      title: 'Ưu đãi đặc biệt tháng 6',
      position: 'Popup',
      period: '01/06/2023 - 30/06/2023',
      remaining: 'Chưa bắt đầu',
      status: 'Chờ duyệt',
      badge: 'warning'
    },
    {
      id: '#BN004',
      image: 'https://via.placeholder.com/120x60',
      title: 'Flash sale cuối tuần',
      position: 'Mobile',
      period: '10/06/2023 - 11/06/2023',
      remaining: 'Đang chạy',
      status: 'Đang chạy',
      badge: 'success'
    }
  ]);

  const [showForm, setShowForm] = useState(false);

  const badgeClass = type => {
    switch (type) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'danger': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const positions = [
    { value: 'top', label: 'Banner đầu trang', icon: 'arrow-up' },
    { value: 'middle', label: 'Banner giữa trang', icon: 'align-center' },
    { value: 'bottom', label: 'Banner cuối trang', icon: 'arrow-down' },
    { value: 'sidebar', label: 'Banner sidebar', icon: 'columns' },
    { value: 'popup', label: 'Popup', icon: 'window-maximize' },
    { value: 'mobile', label: 'Mobile', icon: 'mobile-alt' }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <header className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quản lý Banner</h1>
          <p className="text-sm text-gray-500">Thêm mới và quản lý banner quảng cáo</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100">
            <i className="fas fa-file-export mr-2"></i> Xuất file
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700" onClick={() => setShowForm(true)}>
            <i className="fas fa-plus mr-2"></i> Thêm mới
          </button>
        </div>
      </header>

      {showForm && (
        <div className="bg-white rounded shadow p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Thông tin Banner</h2>
          <form className="grid gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tiêu đề banner</label>
              <input type="text" className="form-control w-full border p-2 rounded" placeholder="Ví dụ: Giảm giá mùa hè" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Đường dẫn khi click</label>
              <input type="text" className="form-control w-full border p-2 rounded" placeholder="Ví dụ: /san-pham-giam-gia" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mô tả ngắn</label>
              <textarea className="form-control w-full border p-2 rounded" placeholder="Mô tả ngắn về banner..." rows="3"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Vị trí hiển thị</label>
              <div className="grid grid-cols-3 gap-2">
                {positions.map(pos => (
                  <button type="button" key={pos.value} className="border rounded p-2 text-center hover:border-indigo-600">
                    <i className={`fas fa-${pos.icon} text-lg`}></i>
                    <div className="text-sm mt-1">{pos.label}</div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Hình ảnh banner</label>
              <div className="border border-dashed p-6 text-center text-gray-600 rounded">
                <i className="fas fa-cloud-upload-alt text-2xl mb-2"></i>
                <p>Kéo thả hình ảnh vào đây hoặc click để chọn</p>
                <p className="text-xs text-gray-500">Định dạng: JPG, PNG, GIF. Kích thước tối đa: 5MB</p>
                <input type="file" className="hidden" accept="image/*" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Ngày bắt đầu</label>
                <input type="datetime-local" className="form-control w-full border p-2 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Ngày kết thúc</label>
                <input type="datetime-local" className="form-control w-full border p-2 rounded" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Trạng thái</label>
              <select className="form-control w-full border p-2 rounded">
                <option>Đang hoạt động</option>
                <option>Tạm dừng</option>
                <option>Chờ duyệt</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" className="px-4 py-2 border border-gray-300 rounded text-sm" onClick={() => setShowForm(false)}>Hủy bỏ</button>
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded text-sm">Lưu banner</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded shadow">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Danh sách Banner</h2>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            {banners.length} banner đang hoạt động
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                {['Mã Banner', 'Hình ảnh', 'Tiêu đề', 'Vị trí', 'Thời gian', 'Trạng thái', 'Thao tác'].map((th, i) => (
                  <th key={i} className="px-4 py-3 font-medium text-gray-700 border-b border-gray-200">{th}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {banners.map((banner) => (
                <tr key={banner.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 border-b border-gray-200">{banner.id}</td>
                  <td className="px-4 py-4 border-b border-gray-200">
                    <div className="w-28 h-14 rounded overflow-hidden">
                      <img src={banner.image} alt="Banner" className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="px-4 py-4 border-b border-gray-200">{banner.title}</td>
                  <td className="px-4 py-4 border-b border-gray-200">{banner.position}</td>
                  <td className="px-4 py-4 border-b border-gray-200">
                    <div className="text-xs text-gray-700">
                      <div>{banner.period}</div>
                      <div className="text-gray-500">{banner.remaining}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4 border-b border-gray-200">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${badgeClass(banner.badge)}`}>{banner.status}</span>
                  </td>
                  <td className="px-4 py-4 border-b border-gray-200">
                    <div className="flex gap-2">
                      {['pencil-alt', 'trash'].map((icon, i) => (
                        <button key={i} className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 text-gray-500">
                          <i className={`fas fa-${icon}`}></i>
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BannerManagerPage;
