// File: Header.tsx
import React from "react";
import { FaTrashAlt, FaSave } from "react-icons/fa";

export default function HearderEdit() {
  return (
    <header className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Chỉnh sửa Sản phẩm
        </h1>
        <p className="text-sm text-gray-500">
          Cập nhật thông tin sản phẩm #SP001
        </p>
      </div>
      <div className="flex gap-3"></div>
    </header>
  );
}
