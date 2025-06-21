// File: Header.tsx
import React from 'react';
import { FaTrashAlt, FaSave } from 'react-icons/fa';

export default function HearderEdit() {
    return (
        <header className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">Chỉnh sửa Sản phẩm</h1>
                <p className="text-sm text-gray-500">Cập nhật thông tin sản phẩm #SP001</p>
            </div>
            <div className="flex gap-3">
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium border rounded-md border-gray-300 text-gray-700 hover:bg-gray-100">
                    <FaTrashAlt className="mr-2" /> Xóa sản phẩm
                </button>
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700">
                    <FaSave className="mr-2" /> Lưu thay đổi
                </button>
            </div>
        </header>
    );
}
