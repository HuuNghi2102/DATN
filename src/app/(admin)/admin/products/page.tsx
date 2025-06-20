'use client';

import { FaBars, FaPlus } from 'react-icons/fa';
import ProductForm from './ProductForm';
import ProductList from './ProductList';

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-semibold">Quản lý Sản phẩm</h1>
          <p className="text-sm text-gray-500">Thêm mới và quản lý kho sản phẩm</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-indigo-500 text-white rounded font-medium text-sm hover:bg-indigo-600 flex items-center">
            <FaPlus className="mr-2" />
            <span>Thêm mới</span>
          </button>
        </div>
      </header>

      <ProductForm />
      <ProductList />
    </div>
  );
}
