"use client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const PaymentSuccess = () => {
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const useParam = useSearchParams();
  const router = useRouter();
  const id = useParam.get("idOrder");
  useEffect(() => {
    if (id) {
      fetchOrder();
    } else {
      toast.error("Đơn hàng không tồn tại!");
      router.push("/user/history-order");
    }
  }, []);

  const fetchOrder = async () => {
    const accessTokenLocal = localStorage.getItem("accessToken");
    const typeTokenLocal = localStorage.getItem("typeToken");
    const userLocal = localStorage.getItem("user");
    if (accessTokenLocal && typeTokenLocal && userLocal) {
      const res = await fetch(
        `https://huunghi.id.vn/api/order/getOrder/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${JSON.parse(typeTokenLocal)} ${JSON.parse(
              accessTokenLocal
            )}`,
          },
        }
      );

      if (res.ok) {
        const result = await res.json();
        setOrder(result.data.order);
        setIsLoading(false);
      } else {
        toast.error("Đơn hàng không tồn tại!");
        router.push("/user/history-order");
      }
    } else {
      toast.error("Vui lòng đăng nhập!");
      router.push("/login");
    }
  };

  const handleViewOrder = () => {
    router.push(`/detail-order?idOrder=${order.id_don_hang}`);
  };

  if (isLoading) {
    return (
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
    );
  }

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
        <h1 className="text-2xl font-bold text-black mb-2">
          Thanh toán thành công!
        </h1>
        <p className="text-gray-600 mb-4">Cảm ơn bạn đã mua hàng.</p>
        {order && (
          <div className="mb-2 text-gray-700">
            <strong>Mã đơn hàng:</strong> #{order.id_don_hang}
          </div>
        )}
        {order && (
          <div className="mb-2 text-gray-700">
            <strong>Tổng đơn hàng:</strong>{" "}
            {(order.gia_tong_don_hang + order.tien_ship).toLocaleString(
              "vi-VN"
            )}
            đ
          </div>
        )}

        {/* {transactionId && (
          <div className="mb-6 text-gray-700">
            <strong>Mã giao dịch:</strong> #{transactionId}
          </div>
        )} */}
        <Link
          href={`/user/detail-order?idOrder=${order?.id_don_hang}`}
          className="inline-block px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-white border hover:border-black  hover:text-black transition"
        >
          Xem đơn hàng
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
