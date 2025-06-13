'use client'
import React, { useEffect, useState } from "react";


const PaymentSuccess = () => {
  const [orderId, setOrderId] = useState(100);
  const [transactionId, setTransactionId] = useState(2000000);

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     setOrderId(params.get("order_id"));
//     setTransactionId(params.get("transaction"));
//   }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
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
        <h1 className="text-2xl font-bold text-green-600 mb-2">Thanh toán thành công!</h1>
        <p className="text-gray-600 mb-4">Cảm ơn bạn đã mua hàng.</p>

        {orderId && (
          <div className="mb-2 text-gray-700">
            <strong>Mã đơn hàng:</strong> #{orderId}
          </div>
        )}
        {transactionId && (
          <div className="mb-6 text-gray-700">
            <strong>Mã giao dịch:</strong> #{transactionId}
          </div>
        )}

        <a
          href="/lich-su-mua-hang"
          className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Xem đơn hàng
        </a>
      </div>
    </div>
  );
};

export default PaymentSuccess;
