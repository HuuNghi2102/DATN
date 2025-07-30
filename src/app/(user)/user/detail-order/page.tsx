import React, { Suspense } from "react";
import OrderDetail from "./component/OrderDetail";

export default function Page() {
  return (
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
      <OrderDetail />
    </Suspense>
  );
}
