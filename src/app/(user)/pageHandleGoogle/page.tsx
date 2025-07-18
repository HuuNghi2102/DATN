"use client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { redirect, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const pageHandleGoogle = () => {
  const useSearchParam = useSearchParams();
  const accessToken = useSearchParam.get("accessToken");
  const router = useRouter();

  useEffect(() => {
    if (accessToken) {
      fetchUser();
    } else {
      toast.error("Token không hợp lệ vui lòng đăng nhập lại");
      window.location.href = "/login";
    }
  }, []);

  const fetchUser = async () => {
    const res = await fetch("https://huunghi.id.vn/api/user/getUser", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const result = await res.json();

    if (res.ok) {
      const carts = localStorage.getItem("cart");
      if (carts) {
        const arrCarts = JSON.parse(carts);
        const resAddCart = await fetch(
          `https://huunghi.id.vn/api/cart/insertArrayCart`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              carts: arrCarts,
            }),
          }
        );
      }
      const user = result.user;
      localStorage.setItem("accessToken", JSON.stringify(accessToken));
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("typeToken", JSON.stringify("Bearer"));
      router.push("/user/userprofile");
    } else {
      toast.error("Token không hợp lệ vui lòng đăng nhập lại");
      router.push("/login");
    }
  };

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
};

export default pageHandleGoogle;
