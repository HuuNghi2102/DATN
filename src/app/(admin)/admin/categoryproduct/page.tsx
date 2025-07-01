'use client';

import React, { useState, useEffect } from 'react';
import '@/app/globals.css';

const CategoryPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    parent: '',
  });

  const categories = [
    { name: 'Thời trang nam', slug: 'thoi-trang-nam', description: 'Các sản phẩm thời trang dành cho nam giới', parent: '' },
    { name: 'Áo thun nam', slug: 'ao-thun-nam', description: 'Áo thun các loại dành cho nam giới', parent: 'Thời trang nam' },
    { name: 'Quần jean nam', slug: 'quan-jean-nam', description: 'Quần jean các loại dành cho nam giới', parent: 'Thời trang nam' },
    { name: 'Thời trang nữ', slug: 'thoi-trang-nu', description: 'Các sản phẩm thời trang dành cho nữ giới', parent: '' },
    { name: 'Váy đầm', slug: 'vay-dam', description: 'Các loại váy đầm thời trang nữ', parent: 'Thời trang nữ' },
    { name: 'Phụ kiện', slug: 'phu-kien', description: 'Các phụ kiện thời trang', parent: '' },
  ];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (id === 'name') {
      const slug = value.toLowerCase().replace(/ /g, '-').replace(/[^À-ỹa-z0-9-]/gi, '');
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Danh mục đã được lưu thành công!');
    setShowForm(false);
    setFormData({ name: '', slug: '', description: '', parent: '' });
  };

  const buildCategoryTree = (categories, parent = '') => {
    return categories
      .filter((cat) => cat.parent === parent)
      .map((cat) => (
        <li key={cat.slug} className="mb-1">
          <div className="flex items-center justify-between px-2 py-1 rounded hover:bg-gray-100">
            <span>{cat.name}</span>
            <div className="flex gap-2">
              <button className="p-1 text-gray-600 hover:text-indigo-600"><i className="fas fa-pencil-alt"></i></button>
              <button className="p-1 text-gray-600 hover:text-red-600"><i className="fas fa-trash"></i></button>
            </div>
          </div>
          <ul className="ml-4">
            {buildCategoryTree(categories, cat.name)}
          </ul>
        </li>
      ));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quản lý Danh Mục</h1>
          <p className="text-sm text-gray-500">Thêm mới và quản lý danh mục sản phẩm</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100">
            <i className="fas fa-file-export mr-2"></i> Xuất file
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            <i className="fas fa-plus mr-2"></i> Thêm mới
          </button>
        </div>
      </header>

      {showForm && (
        <div className="bg-white rounded shadow p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Thông tin danh mục</h2>
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
              <textarea id="description" value={formData.description} onChange={handleInputChange} className="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-sm" rows="4" placeholder="Mô tả chi tiết danh mục..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Danh mục cha</label>
              <select id="parent" value={formData.parent} onChange={handleInputChange} className="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-sm">
                <option value="">Không có (danh mục gốc)</option>
                <option value="Thời trang nam">Thời trang nam</option>
                <option value="Thời trang nữ">Thời trang nữ</option>
                <option value="Phụ kiện">Phụ kiện</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border border-gray-300 text-sm rounded hover:bg-gray-100">Hủy bỏ</button>
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700">
                <i className="fas fa-save mr-1"></i> Lưu danh mục
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
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, idx) => (
              <tr key={idx} className="border-t">
                <td className="p-2">{cat.name}</td>
                <td className="p-2">{cat.slug}</td>
                <td className="p-2">{cat.description}</td>
                <td className="p-2">{cat.parent || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Xem dạng cây</h2>
        <ul className="ml-4">
          {buildCategoryTree(categories)}
        </ul>
      </div>
    </div>
  );
};

export default CategoryPage;
