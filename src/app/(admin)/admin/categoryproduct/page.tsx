'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash, faPencil, faPlus, faEdit, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import categoryInterface from "../types/category";
import { getAPICategories, addCategories, editCategories, hiddenCate } from "../services/categoryService";
import React, { useState, useEffect } from 'react';
import '@/app/globals.css';
type FormData = {
  name: string;
  slug: string;
  description: string;
  parent: string;
};

const CategoryPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    slug: '',
    description: '',
    parent: '',
  });
  const [categoryList, setCategoryList] = useState<categoryInterface[]>([]);
  useEffect(() => {
    const FetchCate = async () => {
      try {
        const data = await getAPICategories();
        setCategoryList(data);
      } catch (error) {
        console.log(error);
      }
    }
    FetchCate();
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parentId = formData.parent ? parseInt(formData.parent) : null;

    const payload = {
      ten_loai: formData.name,
      duong_dan: formData.slug,
      mota_loai: formData.description,
      id_danh_muc_cha: parentId,
    };

    try {
      if (editingSlug) {
        // SỬA DANH MỤC
        const result = await editCategories(editingSlug, payload);
        console.log("✅ Đã cập nhật:", result);
      } else {
        // THÊM MỚI
        const result = await addCategories(payload);
        console.log("✅ Đã thêm:", result);
      }

      // Làm mới lại danh sách
      const data = await getAPICategories();
      setCategoryList(data);

      // Reset form
      setFormData({ name: '', slug: '', description: '', parent: '' });
      setEditingSlug(null);
      setShowForm(false);
    } catch (error) {
      console.error("❌ Lỗi khi lưu danh mục:", error);
    }
  };
  const handleEdit = (slugToEdit: string) => {
    const category = categoryList.find((cat) => cat.duong_dan === slugToEdit);
    if (!category) return;

    setFormData({
      name: category.ten_loai,
      slug: category.duong_dan,
      description: category.mota_loai || '',
      parent: category.id_danh_muc_cha?.toString() || '',
    });

    setEditingSlug(slugToEdit); // Đánh dấu đang sửa
    setShowForm(true); // Mở form
  };


  const buildCategoryTree = (
    categories: categoryInterface[],
    parentId: number | null = null
  ): React.ReactElement[] => {
    // Lấy ra các danh mục con có id_danh_muc_cha bằng parentId
    const children = categories.filter(cat => cat.id_danh_muc_cha === parentId);

    return children.map(cat => {
      // Kiểm tra xem danh mục này có danh mục con hay không
      const hasChildren = categories.some(c => c.id_danh_muc_cha === cat.id_loai_san_pham);

      return (
        <li key={cat.duong_dan} className="mb-2">
          <div className="flex items-center justify-between bg-gray-50 px-3 py-1 rounded hover:bg-gray-100">
            <span className={`font-medium ${cat.trang_thai === 0 ? 'text-gray-400 italic opacity-70' : ''}`}>
              {cat.ten_loai}
            </span>
          </div>

          {/* Đệ quy nếu có danh mục con */}
          {hasChildren && (
            <ul className="ml-6 mt-1 border-l-2 border-gray-200 pl-4">
              {buildCategoryTree(categories, cat.id_loai_san_pham)}
            </ul>
          )}
        </li>
      );
    });
  };


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quản lý Danh Mục</h1>
          <p className="text-sm text-gray-500">Thêm mới và quản lý danh mục sản phẩm</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setFormData({ name: '', slug: '', description: '', parent: '' });
              setEditingSlug(null);
              setShowForm(true);
            }}
            className="px-4 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            <FontAwesomeIcon icon={faPlus} /> Thêm mới
          </button>
        </div>
      </header>

      {showForm && (
        <div className="bg-white rounded shadow p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {editingSlug ? 'Chỉnh sửa danh mục' : 'Thông tin danh mục'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Tên danh mục</label>
              <input type="text" id="name" value={formData.name} onChange={handleInputChange} className="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-sm" placeholder="Ví dụ: Áo thun nam" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Đường dẫn</label>
              <input type="text" id="slug" value={formData.slug} onChange={handleInputChange} className="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-sm" placeholder="Ví dụ: ao-thun-nam" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Mô tả danh mục</label>
              <textarea id="description" value={formData.description} onChange={handleInputChange} className="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-sm" rows={3} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Danh mục cha</label>
              <select id="parent" value={formData.parent} onChange={handleInputChange} className="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-sm">
                <option value="">Không có (danh mục gốc)</option>
                {categoryList
                  .filter((cat) => cat.duong_dan !== formData.slug)
                  .map((cat) => (
                    <option key={cat.duong_dan} value={cat.id_loai_san_pham}>
                      {cat.ten_loai}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border border-gray-300 text-sm rounded hover:bg-gray-100">Hủy bỏ</button>
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700">
                <i className="fas fa-save mr-1"></i> {editingSlug ? 'Cập nhật' : 'Lưu danh mục'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded shadow p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Danh sách danh mục</h2>
        <table className="w-full text-sm border-t">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-2">Tên danh mục</th>
              <th className="text-left p-2">Đường dẫn</th>
              <th className="text-left p-2">Mô tả</th>
              <th className="text-left p-2">Danh mục cha</th>
              <th className="text-left p-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {categoryList.map((cat) => (
              <tr
                key={cat.id_loai_san_pham}
                className={`border-t ${cat.trang_thai === 0 ? 'text-gray-400 italic opacity-70' : ''}`}
              >
                <td className="p-2">{cat.ten_loai}</td>
                <td className="p-2">{cat.duong_dan}</td>
                <td className="p-2">{cat.mota_loai}</td>
                <td className="p-2">
                  {cat.id_danh_muc_cha
                    ? categoryList.find((c) => c.id_loai_san_pham === cat.id_danh_muc_cha)?.ten_loai || 'Không rõ'
                    : '-'}
                </td>
                <td className="p-2 flex gap-2">
                  <button className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:border-indigo-500 text-indigo-600">
                    <FontAwesomeIcon icon={faPencil} />
                  </button>
                  <button onClick={async () => {
                    const confirmChange = confirm("Bạn có chắc chắn muốn ẩn|hiện danh mục này?");
                    if (!confirmChange) return;
                    const success = await hiddenCate(cat.duong_dan);
                    if (!success) {
                      alert("❌ Đổi trạng thái thất bại");
                    } else {
                      alert("✅ Đổi trạng thái thành công");
                      const updated = await getAPICategories();
                      setCategoryList(updated);
                    }
                  }} className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:border-red-500 text-red-600">
                    {cat.trang_thai === 0 ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Xem dạng cây</h2>
        <ul className="ml-4">{buildCategoryTree(categoryList)}</ul>
      </div>
    </div>
  );
};

export default CategoryPage;
