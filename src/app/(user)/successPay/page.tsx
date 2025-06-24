'use client'
import React, { useEffect, useState } from "react";


const PaymentSuccess = () => {
  const [orderId, setOrderId] = useState(100);
  const [transactionId, setTransactionId] = useState(2000000);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-black px-4 pt-[11%]">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
        <svg
          className="w-20 h-20 mx-auto bg-green-500 rounded-full text-white mb-4"
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
        <h1 className="text-2xl font-bold text-black mb-2">Thanh toán thành công!</h1>
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
          href="/user/history-order"
          className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-white border hover:border-black  hover:text-black transition"
        >
          Xem đơn hàng
        </a>
      </div>
    </div>
  );
};

export default PaymentSuccess;
