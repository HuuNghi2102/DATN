"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React, { useEffect, useState } from "react";
import userInterface from "@/app/(user)/compoments/userInterface";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function OrderDetail() {
  const [user, setUser] = useState<userInterface>();
  const [order, setOrder] = useState<any>(null);
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [voucher, setVoucher] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("idOrder");

  useEffect(() => {
    const u = localStorage.getItem("user");
    const accessTokenLocal = localStorage.getItem("accessToken");
    const typeTokenLocal = localStorage.getItem("typeToken");

    if (u && accessTokenLocal && typeTokenLocal) {
      if (!orderId) {
        toast.error("Đơn hàng không tồn tại");
        router.push("/login");
      }

      const uu = JSON.parse(u);
      const accessToken = JSON.parse(accessTokenLocal);
      const typeToken = JSON.parse(typeTokenLocal);

      const fetchOrderDetail = async () => {
        try {
          const response = await fetch(
            `https://huunghi.id.vn/api/order/listOrderDetailOfUser/${orderId}`,
            {
              headers: {
                Authorization: `${typeToken} ${accessToken}`,
              },
            }
          );

          const result = await response.json();

          if (response.ok) {
            const order = result.data.orders;
            setOrder(order);
            console.log(order);
            setOrderItems(result.data.orders.detail_orders);
            if (order.id_ma_giam_gia !== null) {
              const fetchVoucher = await fetch(
                `https://huunghi.id.vn/api/voucher/getVoucher/${order.id_ma_giam_gia}`,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `${typeToken} ${accessToken}`,
                  },
                }
              );
              if (fetchVoucher.ok) {
                const result = await fetchVoucher.json();
                setVoucher(result.data.voucher);
              } else {
                toast.error("Lấy voucher không thành công");
              }
            }
            setIsLoading(false);
          }
        } catch (error) {
          console.error("Error fetching order detail:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchOrderDetail();

      setUser(uu);
    } else {
      toast.error("Vui lòng đăng nhập");
      router.push("/login");
    }
  }, [orderId]);

  const cancelOrder = async () => {
    if (!orderId) return;

    const confirmCancel = window.confirm(
      "Bạn có chắc chắn muốn hủy đơn hàng này?"
    );
    if (!confirmCancel) return;

    const accessTokenLocal = localStorage.getItem("accessToken");
    const typeTokenLocal = localStorage.getItem("typeToken");

    try {
      const res = await fetch(
        `https://huunghi.id.vn/api/order/destroyOrder/${orderId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${
              typeTokenLocal ? JSON.parse(typeTokenLocal) : ""
            } ${accessTokenLocal ? JSON.parse(accessTokenLocal) : ""}`,
          },
        }
      );

      const result = await res.json();
      if (res.ok) {
        toast.success(result.message);
        router.push("/user/history-order");
      } else {
        toast.error(result.message || "Có lỗi xảy ra khi hủy đơn hàng");
      }
    } catch (error) {
      console.error("Error canceling order:", error);
      toast.error("Có lỗi xảy ra khi hủy đơn hàng");
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "cho_xac_nhan":
        return "Chờ xác nhận";
      case "chu_y":
        return "Chờ xác nhận";
      case "dang_chuan_bi_hang":
        return "Đang chuẩn bị hàng";
      case "cho_lay_hang":
        return "Chờ lấy hàng";
      case "dang_giao":
        return "Đang giao";
      case "hoan_hang":
        return "Đã hủy";
      case "giao_thanh_cong":
        return "Đã giao";
      case "da_huy":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const redirectProduct = async (idVariant: number, idDetailOrder: number) => {
    const resProduct = await fetch(
      `https://huunghi.id.vn/api/productVariant/getProductVariant/${idVariant}`
    );
    const resultResProduct = await resProduct.json();
    router.push(
      `/product/${resultResProduct.data.product.duong_dan}?idDetailOrder=${idDetailOrder}`
    );
  };

  const menuItems = [
    { icon: "fas fa-user", text: "Hồ sơ của tôi", href: "/user/userprofile" },
    {
      icon: "fas fa-clipboard-list",
      text: "Đơn hàng của tôi",
      href: "/user/history-order",
      active: false,
    },
    {
      icon: "fas fa-question-circle",
      text: "Yêu cầu hỗ trợ",
      href: "/user/yeucauhotro",
    },
    {
      icon: "fas fa-map-marker-alt",
      text: "Sổ địa chỉ",
      href: "/user/sodiachi",
    },
    { icon: "fas fa-heart", text: "Sản phẩm đã xem", href: "/sanphamdaxem" },
    { icon: "fas fa-lock", text: "Đổi mật khẩu", href: "/user/changePassword" },
  ];

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
    <div className="min-h-screen bg-gray-100 pt-[11%]">
      {/* Font Awesome CDN */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      />

      {/* Header Navigation */}
      <div className="bg-white border-b px-40 py-3">
        <div className="max-w-[1200px] mx-auto">
          <nav className="text-sm text-gray-600">
            <span>
              <Link href="/">Trang chủ</Link>
            </span>{" "}
            /{" "}
            <span>
              <Link href="/user/history-order">Đơn hàng của tôi</Link>
            </span>{" "}
            / <span className="font-medium">Chi tiết đơn hàng</span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto p-4">
        {/* Desktop & Tablet Layout */}
        <div className="hidden md:flex gap-6">
          {/* Sidebar */}
          <div className="w-80 bg-white rounded-lg shadow-sm max-h-[520px] sticky top-44">
            <div className="p-4 border-b bg-gray-50 rounded-t-lg">
              <div className="flex items-center gap-2">
                <i className="fas fa-user text-gray-600"></i>
                <span className="font-medium">Tài khoản của bạn</span>
              </div>
            </div>

            <div className="p-2">
              <div className="text-sm text-gray-600 px-3 py-2">
                Hi, {user?.ten_user || "Người dùng"}
              </div>

              <ul className="space-y-1">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link href={item.href}>
                      <button
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors ${
                          item.active
                            ? "bg-black text-white"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <i className={`${item.icon} w-4`}></i>
                        <span className="text-sm">{item.text}</span>
                      </button>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium">
                  CHI TIẾT ĐƠN HÀNG #{order.id_don_hang}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.trang_thai_don_hang === "giao_thanh_cong"
                      ? "bg-green-100 text-green-800"
                      : order.trang_thai_don_hang === "da_huy" ||
                        order.trang_thai_don_hang === "hoan_hang"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {getStatusText(order.trang_thai_don_hang)}
                </span>
              </div>

              {/* Order Summary */}
              <div className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-3">Thông tin người nhận</h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Họ tên:</span>{" "}
                        {order.ten_nguoi_nhan}
                      </p>
                      <p>
                        <span className="font-medium">SĐT:</span>{" "}
                        {order.so_dien_thoai_nguoi_nhan}
                      </p>
                      <p>
                        <span className="font-medium">Địa chỉ:</span>{" "}
                        {order.dia_chi_nguoi_nhan}
                      </p>
                      <p>
                        <span className="font-medium">Ghi chú:</span>{" "}
                        {order.ghi_chu_don_hang || "Không có ghi chú"}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-3">Thông tin đơn hàng</h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Mã đơn hàng:</span> #
                        {order.id_don_hang}
                      </p>
                      <p>
                        <span className="font-medium">Ngày đặt:</span>{" "}
                        {new Date(order.created_at).toLocaleString("vi-VN")}
                      </p>
                      <p>
                        <span className="font-medium">
                          Phương thức thanh toán:
                        </span>{" "}
                        {order.id_phuong_thuc_thanh_toan === 1
                          ? "Thanh toán khi nhận hàng"
                          : "VNPay"}
                      </p>
                      <p>
                        <span className="font-medium">
                          Trạng thái thanh toán:
                        </span>{" "}
                        {order.trang_thai_thanh_toan === "da_thanh_toan"
                          ? "Đã thanh toán"
                          : "Chưa thanh toán"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-8">
                  <h3 className="font-medium mb-4">Sản phẩm đã đặt</h3>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="p-3 text-left text-sm font-semibold text-gray-700">
                            Sản phẩm
                          </th>
                          <th className="p-3 text-center text-sm font-semibold text-gray-700">
                            Đơn giá
                          </th>
                          <th className="p-3 text-center text-sm font-semibold text-gray-700">
                            Số lượng
                          </th>
                          <th className="p-3 text-center text-sm font-semibold text-gray-700">
                            Thành tiền
                          </th>
                          {order.trang_thai_don_hang == "giao_thanh_cong" && (
                            <th className="p-3 text-center text-sm font-semibold text-gray-700">
                              Đánh giá
                            </th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {orderItems.map((item, index) => (
                          <tr
                            key={index}
                            className={
                              index % 2 === 0 ? "bg-white" : "bg-gray-50"
                            }
                          >
                            <td className="p-3">
                              <div className="flex items-center gap-3">
                                <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden">
                                  <img
                                    src={
                                      `https://huunghi.id.vn/storage/products/${item.anh_san_pham}` ||
                                      "https://via.placeholder.com/80"
                                    }
                                    alt={item.ten_san_pham}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="font-medium">
                                    {item.ten_san_pham}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {item.mau_san_pham},{" "}
                                    {item.kich_thuoc_san_pham}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="p-3 text-center">
                              {formatPrice(item.gia_san_pham)}
                            </td>
                            <td className="p-3 text-center">
                              {item.so_luong_san_pham}
                            </td>
                            <td className="p-3 text-center font-medium">
                              {formatPrice(
                                item.gia_san_pham * item.so_luong_san_pham
                              )}
                            </td>
                            {order.trang_thai_don_hang == "giao_thanh_cong" && (
                              <td className="p-3 text-center font-medium">
                                {item.kiemtra_danhgia == 0 ? (
                                  <button
                                    onClick={() =>
                                      redirectProduct(
                                        item.id_san_pham_bien_the,
                                        item.id_chi_tiet_don_hang
                                      )
                                    }
                                    className="bg-amber-400 p-2 active:bg-amber-600 rounded-xl text-[16px]"
                                  >
                                    Đánh giá
                                  </button>
                                ) : (
                                  "Đã đánh giá"
                                )}
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Order Total */}
                <div className="flex justify-end">
                  <div className="w-full md:w-1/3">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span>Tạm tính:</span>
                        <span>
                          {formatPrice(
                            order.gia_tong_don_hang +
                              (voucher ? voucher.gia_tri_giam : 0)
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Phí vận chuyển:</span>
                        <span>{formatPrice(order.tien_ship)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Giảm giá:</span>
                        <span>
                          {voucher
                            ? formatPrice(voucher.gia_tri_giam)
                            : "Không áp dụng"}
                        </span>
                      </div>
                      <div className="flex justify-between font-medium text-lg pt-2 border-t border-gray-200 mt-2">
                        <span>Tổng cộng:</span>
                        <span>
                          {formatPrice(
                            order.gia_tong_don_hang + order.tien_ship
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Actions */}
                <div className="mt-8 flex justify-between">
                  <Link href="/user/history-order">
                    <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition">
                      <i className="fas fa-arrow-left mr-2"></i> Quay lại
                    </button>
                  </Link>

                  <div className="space-x-3">
                    {order.trang_thai_don_hang === "cho_xac_nhan" && (
                      <button
                        onClick={cancelOrder}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                      >
                        <i className="fas fa-times mr-2"></i> Hủy đơn hàng
                      </button>
                    )}

                    {order.trang_thai_thanh_toan !== "da_thanh_toan" &&
                      order.trang_thai_don_hang == "cho_xac_nhan" &&
                      order.id_phuong_thuc_thanh_toan !== 1 && (
                        <Link
                          href={`/pagePaymentVNPay?idOrder=${order.id_don_hang}`}
                        >
                          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                            <i className="fas fa-credit-card mr-2"></i> Thanh
                            toán ngay
                          </button>
                        </Link>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="bg-white rounded-lg shadow-sm">
            {/* Mobile Header */}
            <div className="p-4 border-b bg-gray-50 rounded-t-lg">
              <div className="flex items-center gap-2">
                <i className="fas fa-user text-gray-600"></i>
                <span className="font-medium">Tài khoản của bạn</span>
              </div>
            </div>

            {/* Mobile Menu */}
            <div className="p-2 border-b">
              <div className="text-sm text-gray-600 px-3 py-2">
                Hi, {user?.ten_user || "Người dùng"}
              </div>

              <ul className="space-y-1">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link href={item.href}>
                      <button
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors ${
                          item.active
                            ? "bg-black text-white"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <i className={`${item.icon} w-4`}></i>
                        <span className="text-sm">{item.text}</span>
                      </button>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile Main Content */}
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">
                  ĐƠN HÀNG #{order.id_don_hang}
                </h2>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.trang_thai_don_hang === "giao_thanh_cong"
                      ? "bg-green-100 text-green-800"
                      : order.trang_thai_don_hang === "da_huy" ||
                        order.trang_thai_don_hang === "hoan_hang"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {getStatusText(order.trang_thai_don_hang)}
                </span>
              </div>

              {/* Mobile Order Info */}
              <div className="space-y-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h3 className="font-medium mb-2">Thông tin người nhận</h3>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Họ tên:</span>{" "}
                      {order.ten_nguoi_nhan}
                    </p>
                    <p>
                      <span className="font-medium">SĐT:</span>{" "}
                      {order.so_dien_thoai_nguoi_nhan}
                    </p>
                    <p>
                      <span className="font-medium">Địa chỉ:</span>{" "}
                      {order.dia_chi_nguoi_nhan}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <h3 className="font-medium mb-2">Thông tin đơn hàng</h3>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Ngày đặt:</span>{" "}
                      {new Date(order.created_at).toLocaleString("vi-VN")}
                    </p>
                    <p>
                      <span className="font-medium">PT thanh toán:</span>{" "}
                      {order.id_phuong_thuc_thanh_toan === 1 ? "COD" : "VNPay"}
                    </p>
                    <p>
                      <span className="font-medium">TT thanh toán:</span>{" "}
                      {order.trang_thai_thanh_toan === "da_thanh_toan"
                        ? "Đã thanh toán"
                        : "Chưa thanh toán"}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Sản phẩm</h3>
                  <div className="space-y-3">
                    {orderItems.map((item, index) => (
                      <div key={index} className="flex border-b pb-3">
                        <div className="w-20 h-20 bg-gray-200 rounded overflow-hidden mr-3">
                          <img
                            src={
                              `https://huunghi.id.vn/storage/products/${item.anh_san_pham}` ||
                              "https://via.placeholder.com/80"
                            }
                            alt={item.ten_san_pham}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex">
                          <p className="font-medium">{item.ten_san_pham}</p>
                          <p className="text-sm text-gray-600">
                            {item.mau_san_pham}, {item.kich_thuoc_san_pham}
                          </p>
                          <div className="flex justify-between mt-1">
                            <span className="text-sm">
                              {formatPrice(item.gia_san_pham)} x{" "}
                              {item.so_luong_san_pham}
                            </span>
                            <span className="font-medium">
                              {formatPrice(
                                item.gia_san_pham * item.so_luong_san_pham
                              )}
                            </span>
                          </div>
                          {order.trang_thai_don_hang == "giao_thanh_cong" && (
                            <div className="p-3 text-center font-medium">
                              {item.kiemtra_danhgia == 0 ? (
                                <button
                                  onClick={() =>
                                    redirectProduct(
                                      item.id_san_pham_bien_the,
                                      item.id_chi_tiet_don_hang
                                    )
                                  }
                                  className="bg-amber-400 px-8 py-2 active:bg-amber-600 text-white rounded-xl text-[13px]"
                                >
                                  <p>Đánh giá</p>
                                </button>
                              ) : (
                                ""
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <h3 className="font-medium mb-2">Tổng cộng</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Tạm tính:</span>
                      <span>
                        {formatPrice(
                          order.gia_tong_don_hang +
                            (voucher ? voucher.gia_tri_giam : 0)
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Phí vận chuyển:</span>
                      <span>{formatPrice(order.tien_ship)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Giảm giá:</span>
                      <span>
                        {voucher
                          ? formatPrice(voucher.gia_tri_giam)
                          : "Không áp dụng"}
                      </span>
                    </div>
                    <div className="flex justify-between font-medium pt-2 border-t border-gray-200 mt-2">
                      <span>Tổng cộng:</span>
                      <span>
                        {formatPrice(order.gia_tong_don_hang + order.tien_ship)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Link href="/user/history-order">
                    <button className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 transition text-sm">
                      <i className="fas fa-arrow-left mr-1"></i> Quay lại
                    </button>
                  </Link>

                  <div className="space-x-2">
                    {order.trang_thai_don_hang === "cho_xac_nhan" && (
                      <button
                        onClick={cancelOrder}
                        className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
                      >
                        <i className="fas fa-times mr-1"></i> Hủy
                      </button>
                    )}

                    {order.trang_thai_thanh_toan !== "da_thanh_toan" &&
                      order.trang_thai_don_hang == "cho_xac_nhan" &&
                      order.id_phuong_thuc_thanh_toan !== 1 && (
                        <Link
                          href={`/pagePaymentVNPay?idOrder=${order.id_don_hang}`}
                        >
                          <button className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm">
                            <i className="fas fa-credit-card mr-1"></i> Thanh
                            toán
                          </button>
                        </Link>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
