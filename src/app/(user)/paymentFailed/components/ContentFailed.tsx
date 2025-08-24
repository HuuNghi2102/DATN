"use client";
import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const PaymentFailed = () => {
  const searchParams = useSearchParams();
  const idOrder = searchParams.get("idOrder");

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-[11%]">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full text-center">
        <img className="w-40 ml-28" src="/assets/images/image.png" alt="" />
        <h1 className="text-2xl font-semibold text-red-500 mb-2">
          Thanh toán thất bại!
        </h1>
        <p className="text-gray-700 mb-6 text-sm leading-relaxed">
          Đã có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại hoặc
          kiểm tra lại đơn hàng của bạn.
        </p>

        <div className="flex justify-center gap-3">
          <Link
            href={`user/detail-order?idOrder=${idOrder}`}
            className="px-4 py-2 border border-black text-black rounded-lg hover:bg-black hover:text-white transition"
          >
            Lịch sử mua hàng
          </Link>
          <Link
            href={`/pagePaymentVNPay?idOrder=${idOrder}`}
            className="px-4 py-2 bg-amber-400 border border-black text-black rounded-lg hover:bg-white hover:text-black transition"
          >
            Thử lại
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
