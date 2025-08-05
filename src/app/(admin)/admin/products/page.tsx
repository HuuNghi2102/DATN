"use client";
import { FaBars, FaPlus } from "react-icons/fa";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import { Suspense, useState } from "react";

export default function ProductsPage() {
  const [flagAdd, setFlagAdd] = useState<boolean>(false);
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const changeFlagAddProduct = () => {
    setFlagAdd(!flagAdd);
  };

  const handleOpenForm = () => {
    setIsOpenForm(!isOpenForm);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-semibold">Quản lý Sản phẩm</h1>
          <p className="text-sm text-gray-500">
            Thêm mới và quản lý kho sản phẩm
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => handleOpenForm()}
            className="px-4 py-2 bg-indigo-500 text-white rounded font-medium text-sm hover:bg-indigo-600 flex items-center"
          >
            <FaPlus className="mr-2" />
            <span>Thêm mới</span>
          </button>
        </div>
      </header>
      <ProductForm
        onChangeStatusForm={() => setIsOpenForm(false)}
        isOpenForm={isOpenForm}
        onProductAdded={changeFlagAddProduct}
      />
      <Suspense
        fallback={
          <div
            id="loading-screen"
            className="fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-500"
          >
            <div className="flex flex-col items-center space-y-6">
              {/* Logo hoặc icon tùy chọn */}
              <div className="text-3xl font-semibold tracking-widest text-black uppercase">
                VERVESTYLE
              </div>

              {/* Vòng quay */}
              <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>

              {/* Nội dung loading */}
              <p className="text-sm text-gray-700 tracking-wide">
                Đang khởi động trải nghiệm của bạn...
              </p>
            </div>
          </div>
        }
      >
        <ProductList changeFlag={flagAdd} />
      </Suspense>
    </div>
  );
}
