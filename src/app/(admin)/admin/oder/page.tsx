
"use client";

import { useState } from "react";

export default function AdminPostManagement() {
  const [posts, setPosts] = useState([
    {
      id: "#BV001",
      title: "Hướng dẫn sử dụng sản phẩm mới",
      slug: "huong-dan-su-dung",
      category: "Tin tức",
      date: "15/06/2023",
      status: true,
      thumbnail: "https://via.placeholder.com/40"
    },
    {
      id: "#BV002",
      title: "Khuyến mãi mùa hè 2023",
      slug: "khuyen-mai-mua-he",
      category: "Khuyến mãi",
      date: "10/06/2023",
      status: true,
      thumbnail: "https://via.placeholder.com/40"
    },
    {
      id: "#BV003",
      title: "Bài viết chưa hoàn thiện",
      slug: "bai-viet-dang-draft",
      category: "Blog",
      date: "05/06/2023",
      status: false,
      thumbnail: "https://via.placeholder.com/40"
    },
    {
      id: "#BV004",
      title: "Sự kiện ra mắt sản phẩm mới",
      slug: "su-kien-ra-mat",
      category: "Sự kiện",
      date: "01/06/2023",
      status: true,
      thumbnail: "https://via.placeholder.com/40"
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const toggleStatus = (index) => {
    const updated = [...posts];
    updated[index].status = !updated[index].status;
    setPosts(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowForm(false);
    setShowConfirmation(true);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Quản lý Bài viết</h1>
          <p className="text-gray-500 text-sm">Tạo mới và quản lý các bài viết trên website</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded text-sm font-medium text-gray-700 bg-white shadow">
            <i className="fas fa-file-export mr-2"></i>Xuất file
          </button>
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded text-sm font-medium"
            onClick={() => {
              setShowForm(true);
              setShowConfirmation(false);
            }}
          >
            <i className="fas fa-plus mr-2"></i>Thêm mới
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-white rounded shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Thêm bài viết mới</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1">Tiêu đề bài viết</label>
              <input type="text" placeholder="Nhập tiêu đề bài viết" className="w-full border px-3 py-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Đường dẫn (URL)</label>
              <div className="flex">
                <span className="px-3 py-2 bg-gray-100 border border-r-0 rounded-l text-sm text-gray-500">https://example.com/</span>
                <input type="text" className="w-full border px-3 py-2 rounded-r" placeholder="duong-dan-bai-viet" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Nội dung bài viết</label>
              <textarea rows="6" className="w-full border px-3 py-2 rounded"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Ảnh đại diện</label>
              <input type="file" className="w-full border px-3 py-2 rounded" />
            </div>
            <div className="flex items-center gap-3">
              <input id="postStatus" type="checkbox" className="h-5 w-5" />
              <label htmlFor="postStatus">Riêng tư</label>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="px-4 py-2 border rounded text-sm font-medium text-gray-700 bg-white shadow"
                onClick={() => setShowForm(false)}
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded text-sm font-medium"
              >
                <i className="fas fa-save mr-2"></i>Lưu bài viết
              </button>
            </div>
          </form>
        </div>
      )}

      {showConfirmation && (
        <div className="bg-white rounded shadow p-6 mb-6 text-center">
          <div className="text-green-500 text-4xl mb-4">
            <i className="fas fa-check-circle"></i>
          </div>
          <h2 className="text-xl font-semibold mb-2">Bài viết đã được lưu thành công!</h2>
          <p className="text-gray-600 mb-4">Bài viết của bạn đã được lưu vào hệ thống. Bạn có thể xem trước bài viết hoặc tiếp tục chỉnh sửa nếu cần.</p>
          <div className="grid gap-1 text-left text-sm bg-gray-50 border rounded p-4 max-w-lg mx-auto mb-4">
            <p><strong>Tiêu đề:</strong> Hướng dẫn sử dụng sản phẩm mới</p>
            <p><strong>Đường dẫn:</strong> https://example.com/huong-dan-su-dung</p>
            <p><strong>Danh mục:</strong> Tin tức</p>
            <p><strong>Trạng thái:</strong> <span className="text-green-600">Công khai</span></p>
            <p><strong>Ngày đăng:</strong> 15/06/2023 - 14:30</p>
          </div>
          <div className="flex justify-center gap-2">
            <button className="px-4 py-2 border rounded text-sm text-gray-700 bg-white shadow">
              <i className="fas fa-edit mr-2"></i>Chỉnh sửa bài viết
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded text-sm font-medium">
              <i className="fas fa-eye mr-2"></i>Xem trước
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded text-sm font-medium">
              <i className="fas fa-list mr-2"></i>Danh sách bài viết
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Tiêu đề</th>
              <th className="px-4 py-2 text-left">Đường dẫn</th>
              <th className="px-4 py-2 text-left">Danh mục</th>
              <th className="px-4 py-2 text-left">Ngày đăng</th>
              <th className="px-4 py-2 text-left">Trạng thái</th>
              <th className="px-4 py-2 text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={post.id} className="border-t">
                <td className="px-4 py-3 font-medium text-gray-800">{post.id}</td>
                <td className="px-4 py-3 flex items-center gap-3">
                  <img src={post.thumbnail} alt="Bài viết" className="w-10 h-10 rounded object-cover" />
                  <span>{post.title}</span>
                </td>
                <td className="px-4 py-3 text-gray-700">{post.slug}</td>
                <td className="px-4 py-3 text-gray-700">{post.category}</td>
                <td className="px-4 py-3 text-gray-700">{post.date}</td>
                <td className="px-4 py-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={post.status}
                      onChange={() => toggleStatus(index)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </td>
                <td className="px-4 py-3">
                  <button className="text-indigo-600 hover:text-indigo-800 mr-2">
                    <i className="fas fa-pencil-alt"></i>
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
