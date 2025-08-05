"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VNPayPaymentForm = () => {
  const [order, setOrder] = useState<any>();
  const useSearchParam = useSearchParams();
  const idOrder = useSearchParam.get("idOrder");
  const router = useRouter();

  useEffect(() => {
    const userLocal = localStorage.getItem("user");
    const accessTokenLocal = localStorage.getItem("accessToken");
    const typeTokenLocal = localStorage.getItem("typeToken");

    if (
      userLocal &&
      accessTokenLocal &&
      typeTokenLocal &&
      !Number.isNaN(idOrder)
    ) {
      const fetchOrder = async () => {
        const res = await fetch(
          `https://huunghi.id.vn/api/order/getOrder/${idOrder}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${JSON.parse(typeTokenLocal)} ${JSON.parse(
                accessTokenLocal
              )}`,
            },
          }
        );
        const result = await res.json();

        if (res.ok) {
          const order = result.data.order;
          if (
            order.trang_thai_thanh_toan != "chua_thanh_toan" ||
            order.trang_thai_don_hang != "cho_xac_nhan"
          ) {
            toast.error("Đơn hàng không hợp lệ");
            router.push("/userprofile");
          }
          setFormData({
            ...formData,
            amount: order.gia_tong_don_hang + order.tien_ship,
            id_order: order.id_don_hang,
          });
        } else {
          toast.error("Đơn hàng không tồn tại!");
          router.push("/cart");
        }
      };
      fetchOrder();
    } else {
      if (Number.isNaN(idOrder)) {
        toast.error("Đơn hàng không tồn tại!");
        router.push("/cart");
      }
      toast.error("Vui lòng đăng nhập trước!");
      router.push("/login");
    }
  }, []);

  const [formData, setFormData] = useState({
    amount: 0,
    bankCode: "",
    language: "vn",
    id_order: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const res = await fetch(`https://huunghi.id.vn/api/vnpay/createOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_order: formData.id_order,
        amount: formData.amount,
        language: formData.language,
        bankCode: formData.bankCode,
      }),
    });

    const result = await res.json();

    // console.log(result);

    if (res.ok) {
      router.push(result);
    } else {
      toast.error("Thanh toán không thành công");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-8 px-4 sm:mt-36">
      {" "}
      {/* Thêm pt-24 để tránh header */}
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800">
              Tạo mới đơn hàng
            </h3>
            <div className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              VNPAY
            </div>
          </div>

          <form
            onSubmit={(e: any) => {
              handleSubmit();
              e.preventDefault();
            }}
            className="space-y-6"
          >
            {/* Amount Input */}
            <div className="space-y-2">
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Số tiền <span className="text-red-500">*</span>
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500">₫</span>
                </div>
                <input
                  className="block w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  id="amount"
                  name="amount"
                  type="number"
                  value={formData.amount}
                  //   onChange={handleChange}
                  min="1"
                  max="100000000"
                  required
                  disabled
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Nhập số tiền từ 10,000đ đến 100,000,000đ
              </p>
            </div>

            {/* Payment Methods */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800 pb-2 border-b border-gray-200">
                Chọn phương thức thanh toán
              </h4>

              <div className="space-y-3">
                <h5 className="text-sm font-medium text-gray-700 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1 text-indigo-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Cách 1: Chuyển hướng sang Cổng VNPAY
                </h5>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <input
                    type="hidden"
                    id="vnpayqr_default"
                    name="idOrder"
                    value={formData.id_order}
                    checked={formData.bankCode === ""}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <input
                    type="radio"
                    id="vnpayqr_default"
                    name="bankCode"
                    value=""
                    checked={formData.bankCode === ""}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <label
                    htmlFor="vnpayqr_default"
                    className="ml-3 block text-sm text-gray-700"
                  >
                    Cổng thanh toán VNPAYQR
                  </label>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h5 className="text-sm font-medium text-gray-700 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1 text-indigo-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                  Cách 2: Thanh toán trực tiếp
                </h5>

                <div className="grid gap-3">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <input
                      type="radio"
                      id="vnpayqr"
                      name="bankCode"
                      value="VNPAYQR"
                      checked={formData.bankCode === "VNPAYQR"}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <label
                      htmlFor="vnpayqr"
                      className="ml-3 block text-sm text-gray-700"
                    >
                      <span className="font-medium">Ứng dụng VNPAYQR</span>
                      <p className="text-xs text-gray-500 mt-1">
                        Quét mã QR qua ứng dụng VNPAY
                      </p>
                    </label>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <input
                      type="radio"
                      id="vnbank"
                      name="bankCode"
                      value="VNBANK"
                      checked={formData.bankCode === "VNBANK"}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <label
                      htmlFor="vnbank"
                      className="ml-3 block text-sm text-gray-700"
                    >
                      <span className="font-medium">ATM/Tài khoản nội địa</span>
                      <p className="text-xs text-gray-500 mt-1">
                        40 ngân hàng nội địa hỗ trợ
                      </p>
                    </label>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <input
                      type="radio"
                      id="intcard"
                      name="bankCode"
                      value="INTCARD"
                      checked={formData.bankCode === "INTCARD"}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <label
                      htmlFor="intcard"
                      className="ml-3 block text-sm text-gray-700"
                    >
                      <span className="font-medium">Thẻ quốc tế</span>
                      <p className="text-xs text-gray-500 mt-1">
                        Visa, Mastercard, JCB
                      </p>
                    </label>
                  </div>
                </div>

                <input
                  type="hidden"
                  name="id_order"
                  value={formData.id_order}
                />
              </div>
            </div>

            {/* Language Selection */}
            <div className="space-y-3">
              <h5 className="text-sm font-medium text-gray-700">
                Ngôn ngữ giao diện:
              </h5>

              <div className="flex space-x-4">
                <label className="flex-1 cursor-pointer">
                  <input
                    type="radio"
                    id="lang_vn"
                    name="language"
                    value="vn"
                    checked={formData.language === "vn"}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="p-3 border border-gray-300 rounded-lg text-center peer-checked:border-indigo-500 peer-checked:bg-indigo-50 peer-checked:ring-1 peer-checked:ring-indigo-500 transition-all">
                    <span className="block text-sm font-medium text-gray-700">
                      Tiếng Việt
                    </span>
                  </div>
                </label>

                <label className="flex-1 cursor-pointer">
                  <input
                    type="radio"
                    id="lang_en"
                    name="language"
                    value="en"
                    checked={formData.language === "en"}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="p-3 border border-gray-300 rounded-lg text-center peer-checked:border-indigo-500 peer-checked:bg-indigo-50 peer-checked:ring-1 peer-checked:ring-indigo-500 transition-all">
                    <span className="block text-sm font-medium text-gray-700">
                      English
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              Thanh toán ngay
            </button>
          </form>
        </div>

        <div className="px-8 py-4 bg-gray-50 border-t border-gray-200">
          <footer className="text-center text-xs text-gray-500">
            <p>Bảo mật bởi VNPAY &copy; {new Date().getFullYear()}</p>
            <div className="flex justify-center space-x-4 mt-2">
              <span className="hover:text-indigo-600 cursor-pointer">
                Điều khoản
              </span>
              <span className="hover:text-indigo-600 cursor-pointer">
                Bảo mật
              </span>
              <span className="hover:text-indigo-600 cursor-pointer">
                Trợ giúp
              </span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default VNPayPaymentForm;
