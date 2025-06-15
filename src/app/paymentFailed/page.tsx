import React from "react";
// import { Link } from "react-router-dom";

const PaymentFailed = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
        <svg
          className="w-20 h-20 mx-auto text-red-500 mb-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <h1 className="text-2xl font-bold text-red-600 mb-2">Thanh toán thất bại!</h1>
        <p className="text-gray-600 mb-4">Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại hoặc kiểm tra lại đơn hàng của bạn.</p>

        <div className="flex justify-center gap-4 mt-6">
          {/* <Link
            to="/lich-su-mua-hang"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
          >
            Lịch sử mua hàng
          </Link>
          <Link
            to="/thanh-toan"
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Thử lại
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
