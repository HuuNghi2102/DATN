
"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash, faPencil, faPlus } from '@fortawesome/free-solid-svg-icons';
import articleInterface from "../types/article";
import { getAPIArticle } from "../services/articleService";
export default function AdminPostManagement() {
  const [posts, setPosts] = useState<articleInterface[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);


  const handleSubmit = (e: any) => {
    e.preventDefault();
    setShowForm(false);
    setShowConfirmation(true);
  };
  // fetch show
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await getAPIArticle();
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchArticle();
  })
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Quản lý Bài viết</h1>
          <p className="text-gray-500 text-sm">Tạo mới và quản lý các bài viết trên website</p>
        </div>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded text-sm font-medium"
            onClick={() => {
              setShowForm(true);
              setShowConfirmation(false);
            }}
          >
            <FontAwesomeIcon icon={faPlus} />Thêm mới
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
              <textarea className="w-full border px-3 py-2 rounded"></textarea>
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
              <th className="px-4 py-2 text-left">Nội dung</th>
              <th className="px-4 py-2 text-left">Ngày đăng</th>
              <th className="px-4 py-2 text-left">Trạng thái</th>
              <th className="px-4 py-2 text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-3 font-medium text-gray-800">{post.id_bai_viet}</td>
                <td className="px-4 py-3 flex items-center gap-3">
                  <img src={`https://huunghi.id.vn/storage/posts/${post.anh_bai_viet}`} alt="Bài viết" className="w-10 h-10 rounded object-cover" />
                  <span>{post.ten_bai_viet}</span>
                </td>
                <td className="px-4 py-3 text-gray-700">{post.duong_dan}</td>
                <td className="px-4 py-3 text-gray-700">{post.noi_dung_bai_viet}</td>
                <td className="px-4 py-3 text-gray-700">{new Date(post.created_at).toLocaleDateString('vi-VN')}</td>
                <td >
                  <label
                    className={`relative inline-flex text-xs items-center px-3 py-1 text-white rounded-full cursor-pointer 
                      ${post.trang_thai === 1 ? 'bg-green-500' : 'bg-red-500'}`}
                  >
                    {post.trang_thai === 1 ? 'Hoạt động' : 'Không hoạt động'}
                  </label>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:border-indigo-500 text-indigo-600">
                      <FontAwesomeIcon icon={faPencil} />
                    </button>
                    <button className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:border-red-500 text-red-600">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
