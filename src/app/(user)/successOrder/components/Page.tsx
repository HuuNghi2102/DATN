"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

const OrderSuccess = () => {
  const router = useRouter();
  const useSearchParam = useSearchParams();
  const idOrder = useSearchParam.get("idOrder");

  useEffect(() => {
    if (!idOrder) {
      router.push("/user/history-order");
    }
  }, [idOrder]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
        <svg
          className="w-20 h-20 mx-auto text-green-500 mb-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h1 className="text-2xl font-bold text-green-600 mb-2">
          Đặt hàng thành công!
        </h1>
        <p className="text-gray-600 mb-4">Cảm ơn bạn đã đặt hàng.</p>
        <Link
          href={`/user/detail-order?idOrder=${idOrder}`}
          className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Xem đơn hàng
        </Link>

        {idOrder && (
          <p className="text-gray-700 mb-6">
            <strong>Mã đơn hàng:</strong> #{idOrder}
          </p>
        )}

        {/* <Link
          to="/lich-su-mua-hang"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Xem đơn hàng
        </Link> */}
      </div>
    </div>
  );
};

export default OrderSuccess;
