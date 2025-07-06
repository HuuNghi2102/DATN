'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GET_BANNER_URL = 'http://huunghi.id.vn/api/banner/getBannerIndex';
const POST_BANNER_URL = 'http://huunghi.id.vn/api/banner/addBanner';
const DELETE_BANNER_URL = 'http://huunghi.id.vn/api/banner/deleteBanner/';

interface Banner {
  id: number;
  link_banner: string;
  created_at: string;
}

const BannerManagerPage = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: '',
    position: '',
    status: 'Đang hoạt động',
    image: null as File | null,
  });

  const fetchBanners = () => {
    const token = localStorage.getItem('accessToken');
    setLoading(true);
    axios
      .get(GET_BANNER_URL, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setBanners(res.data?.data?.banners || []))
      .catch((err) => console.error('Lỗi load API:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setForm((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    if (!token) return alert('Vui lòng đăng nhập lại.');

    const data = new FormData();
    data.append('title', form.title);
    data.append('position', form.position);
    data.append('status', form.status);
    if (!form.image) return alert('Vui lòng chọn ảnh banner');
    data.append('image', form.image);

    try {
      await axios.post(POST_BANNER_URL, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });

      setShowForm(false);
      setForm({ title: '', position: '', status: 'Đang hoạt động', image: null });
      fetchBanners(); // ✅ Tải lại danh sách từ server để dữ liệu đúng
    } catch (err: any) {
      const message = err.response?.data
        ? JSON.stringify(err.response.data)
        : 'Lỗi không xác định';
      alert('❌ Gửi API thất bại: ' + message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc chắn muốn xoá banner này?')) return;
    const token = localStorage.getItem('accessToken');

    try {
      await axios.delete(`${DELETE_BANNER_URL}${id}`, {
        headers: { Authorization: `Bearer ${JSON.parse(token!)}` },
      });
      fetchBanners(); // ✅ Tải lại danh sách sau khi xoá
    } catch (err) {
      console.error('❌ Lỗi xoá banner:', err);
      alert('Không thể xoá banner. Kiểm tra lại quyền hoặc trạng thái server.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-700">Quản lý Banner</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          {showForm ? 'Đóng' : '+ Thêm banner'}
        </button>
      </header>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded shadow p-6 mb-8 grid gap-4 md:grid-cols-2"
        >
          <input
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            placeholder="Tiêu đề"
            className="border p-2 rounded w-full"
          />
          <select
            name="position"
            value={form.position}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="">-- Vị trí hiển thị --</option>
            <option value="top">Đầu trang</option>
            <option value="middle">Giữa trang</option>
            <option value="popup">Popup</option>
            <option value="mobile">Mobile</option>
            <option value="sidebar">Sidebar</option>
          </select>

          <div className="col-span-2">
            <label
              htmlFor="image-upload"
              className="block border border-dashed p-6 text-center text-gray-600 rounded cursor-pointer hover:bg-gray-50"
            >
              Chọn ảnh banner (JPG, PNG)
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            {form.image && (
              <div className="mt-4 text-center">
                <img
                  src={URL.createObjectURL(form.image)}
                  alt="preview"
                  className="w-40 h-24 object-cover rounded mx-auto border"
                />
              </div>
            )}
          </div>

          <div className="col-span-2 text-right">
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
              Lưu banner
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <div className="bg-white shadow rounded overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 font-medium">Hình ảnh</th>
                <th className="p-3 font-medium">Tiêu đề</th>
                <th className="p-3 font-medium">Ngày tạo</th>
                <th className="p-3 font-medium">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {banners.map((banner) => (
                <tr key={banner.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">
                    <img
                      src={`https://huunghi.id.vn/storage/banners/${banner.link_banner}`}
                      alt="Banner"
                      className="w-32 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="p-3">{banner.link_banner}</td>
                  <td className="p-3">
                    {banner.created_at
                      ? new Date(banner.created_at).toLocaleString()
                      : 'N/A'}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(banner.id)}
                      className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                    >
                      Xoá
                    </button>
                  </td>
                </tr>
              ))}
              {banners.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    Chưa có banner nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BannerManagerPage;
