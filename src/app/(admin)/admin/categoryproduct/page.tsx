"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash, faPencil, faPlus, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import categoryInterface from "../types/category";
import { getAPICategories, addCategories, editCategories, hiddenCate } from "../services/categoryService";
import React, { useState, useEffect, useRef } from 'react';
import '@/app/globals.css';
import { toast } from "react-toastify";

type FormData = {
  name: string;
  slug: string;
  description: string;
  parent: string;
};

const CategoryPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    slug: "",
    description: "",
    parent: "",
  });
  const [errors, setErrors] = useState({
    nameCate: "",
    slug: "",
  });
  const [categoryList, setCategoryList] = useState<categoryInterface[]>([]);

  const formRef = useRef<HTMLDivElement | null>(null); // ref để scroll tới form

  useEffect(() => {
    const FetchCate = async () => {
      try {
        const data = await getAPICategories();
        setCategoryList(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    FetchCate();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const scrollToForm = () => {
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
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
        const result = await editCategories(editingSlug, payload);
        if (result.errors) {
          setErrors({
            nameCate: result.errors.nameCate || "",
            slug: result.errors.slug || ""
          });
        }
      } else {
        const result = await addCategories(payload);
        if (result?.errors) {
          setErrors({
            nameCate: result.errors.nameCate || "",
            slug: result.errors.slug || ""
          });
        } else {
          setFormData({ name: '', slug: '', description: '', parent: '' });
          setEditingSlug(null);
          setShowForm(false);
        }
      }
      const data = await getAPICategories();
      setCategoryList(data);
    } catch (error: any) {
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
    setEditingSlug(slugToEdit);
    setShowForm(true);
    scrollToForm();
  };

  const buildCategoryTree = (
    categories: categoryInterface[],
    parentId: number | null = null
  ): React.ReactElement[] => {
    const children = categories.filter(cat => cat.id_danh_muc_cha === parentId);
    return children.map(cat => {
      const hasChildren = categories.some(c => c.id_danh_muc_cha === cat.id_loai_san_pham);
      return (
        <li key={cat.duong_dan} className="mb-2">
          <div className="flex items-center justify-between bg-gray-50 px-3 py-1 rounded hover:bg-gray-100">
            <span className={`font-medium ${cat.trang_thai === 0 ? 'text-gray-400 italic opacity-70' : ''}`}>
              {cat.ten_loai}
            </span>
          </div>
          {hasChildren && (
            <ul className="ml-6 mt-1 border-l-2 border-gray-200 pl-4">
              {buildCategoryTree(categories, cat.id_loai_san_pham)}
            </ul>
          )}
        </li>
      );
    });
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-500">
        <div className="flex flex-col items-center space-y-6">
          <div className="text-3xl font-semibold tracking-widest text-black uppercase">
            VERVESTYLE
          </div>
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-gray-700 tracking-wide">
            Đang khởi động trải nghiệm của bạn...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <header className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quản lý Danh Mục</h1>
          <p className="text-sm text-gray-500">Thêm mới và quản lý danh mục sản phẩm</p>
        </div>
        <button
          onClick={() => {
            setFormData({ name: "", slug: "", description: "", parent: "" });
            setEditingSlug(null);
            setShowForm(true);
            scrollToForm();
          }}
          className="px-4 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          <FontAwesomeIcon icon={faPlus} /> Thêm mới
        </button>
      </header>

      {showForm && (
        <div ref={formRef} className="bg-white rounded shadow p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {editingSlug ? "Chỉnh sửa danh mục" : "Thông tin danh mục"}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Tên danh mục</label>
              <input
                maxLength={255}
                type="text"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
              {errors.nameCate && <p className="text-red-500 text-sm mt-1">{errors.nameCate}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Đường dẫn</label>
              <input
                maxLength={255}
                type="text"
                id="slug"
                value={formData.slug}
                onChange={handleInputChange}
                className="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
              {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug}</p>}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Mô tả danh mục</label>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-sm"
                rows={3}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Danh mục cha</label>
              <select
                id="parent"
                value={formData.parent}
                onChange={handleInputChange}
                className="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-sm"
              >
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
            <div className="md:col-span-2 flex justify-end gap-2">
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border border-gray-300 text-sm rounded hover:bg-gray-100">
                Hủy bỏ
              </button>
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700">
                {editingSlug ? "Cập nhật" : "Lưu danh mục"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded shadow p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Danh sách danh mục</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-t">
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
                <tr key={cat.id_loai_san_pham} className={`border-t ${cat.trang_thai === 0 ? 'text-gray-400 italic opacity-70' : ''}`}>
                  <td className="p-2">{cat.ten_loai}</td>
                  <td className="p-2">{cat.duong_dan}</td>
                  <td className="p-2">{cat.mota_loai}</td>
                  <td className="p-2">
                    {cat.id_danh_muc_cha
                      ? categoryList.find((c) => c.id_loai_san_pham === cat.id_danh_muc_cha)?.ten_loai || 'Không rõ'
                      : '-'}
                  </td>
                  <td className="p-2 flex gap-2">
                    <button onClick={() => handleEdit(cat.duong_dan)} className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:border-indigo-500 text-indigo-600">
                      <FontAwesomeIcon icon={faPencil} />
                    </button>
                    <button
                      onClick={async () => {
                        const confirmChange = confirm("Bạn có chắc chắn muốn ẩn|hiện danh mục này?");
                        if (!confirmChange) return;
                        const success = await hiddenCate(cat.duong_dan);
                        if (!success) {
                          toast.error("Đổi trạng thái thất bại");
                        } else {
                          toast.success("Đổi trạng thái thành công");
                          const updated = await getAPICategories();
                          setCategoryList(updated);
                        }
                      }}
                      className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:border-red-500 text-red-600"
                    >
                      {cat.trang_thai === 0 ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Xem dạng cây</h2>
        <ul className="ml-4">{buildCategoryTree(categoryList)}</ul>
      </div>
    </div>
  );
};

export default CategoryPage;
