"use client";
import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

const OrderSuccess = () => {
  const [orderId, setOrderId] = useState(null);

  //   useEffect(() => {
  //     const params = new URLSearchParams(window.location.search);
  //     setOrderId(params.get("order_id")); // ví dụ: ?order_id=123
  //   }, []);

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
        <a
          href="/user/history-order"
          className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Xem đơn hàng
        </a>

        {orderId && (
          <p className="text-gray-700 mb-6">
            <strong>Mã đơn hàng:</strong> #{orderId}
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
