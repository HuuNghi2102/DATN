"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaPrint,
  FaCheck,
  FaArrowLeft,
} from "react-icons/fa";
import orderInterface from "../../../components/interface/orderInterface";
import voucherInterface from "../../../components/interface/voucherInterface";
import detailOrder from "../../../components/interface/detailOrderInterface";
import { toast } from "react-toastify";

interface OrderItem {
  id_san_pham: number;
  ma_san_pham: string;
  ten_san_pham: string;
  so_luong: number;
  gia_ban: number;
  hinh_anh?: string;
}

interface OrderInterface {
  id_don_hang: number;
  ten_nguoi_nhan: string;
  so_dien_thoai_nguoi_nhan: string;
  dia_chi_nguoi_nhan: string;
  ten_nguoi_gui: string;
  so_dien_thoai_nguoi_gui: string;
  dia_chi_nguoi_gui: string;
  trang_thai_don_hang: string;
  statusClass: string;
  chi_tiet_don_hang: OrderItem[];
  phi_van_chuyen: number;
  phuong_thuc_thanh_toan: string;
  ghi_chu: string;
  gia_tam_tinh: number;
  giam_gia: number;
  gia_tong_don_hang: number;
  created_at: string;
}

const OrderDetailShipper = () => {
  const router = useRouter();
  const useParam = useParams();
  const { idOrder } = useParam;
  const [order, setOrder] = useState<orderInterface>();
  const [voucher, setVoucher] = useState<voucherInterface>();
  const [detailOrders, setDetailOrder] = useState<detailOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [typeToken, setTypeToken] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const returStatus = (status: string) => {
    switch (status) {
      case "cho_xac_nhan":
        return `Chờ xác nhận`;
      case "chu_y":
        return `Chú ý`;
      case "dang_chuan_bi_hang":
        return `Đang chuẩn bị hàng`;
      case "cho_lay_hang":
        return `Chờ lấy hàng`;
      case "dang_giao":
        return `Đang giao`;
      case "hoan_hang":
        return `Hoàn hàng`;
      case "giao_thanh_cong":
        return `Giao thành công`;
      case "da_huy":
        return `Đã hủy`;
      default:
        return `Chờ xác nhận`;
    }
  };

  const nextSatatusOrder = (status: string) => {
    switch (status) {
      case "cho_lay_hang":
        return [
          { className: "green", nextStatus: "dang_giao", status: "Nhận đơn" },
        ];
      case "dang_giao":
        return [
          { className: "yellow", nextStatus: "hoan_hang", status: "Hoàn hàng" },
          {
            className: "green",
            nextStatus: "giao_thanh_cong",
            status: "Giao hàng",
          },
        ];
      case "hoan_hang":
        return [
          { className: "yellow", nextStatus: "da_huy", status: "Trả hàng" },
        ];
      case "giao_thanh_cong":
        return [];
      case "da_huy":
        return [];
      default:
        return [];
    }
  };

  const positionMap = (position: string) => {
    console.log(position);
    router.push(
      `https://www.google.com/maps/dir/?api=1&destination=${position}`
    );
  };

  const getPaymentMethod = (idPayment: number) => {
    switch (idPayment) {
      case 1:
        return "Thanh Toán Khi Nhận Hàng";
      case 2:
        return "PayPal";
      case 3:
        return "VNPay";
      default:
        return "Thanh Toán Khi Nhận Hàng";
    }
  };

  const fetchDefaultData = async () => {
    if (!idOrder) {
      toast.error("Đơn hàng không tồn tại");
      router.push("/admin/shipper");
      return;
    }

    const accessTokenLocal = localStorage.getItem("accessToken");
    const typeTokenLocal = localStorage.getItem("typeToken");
    const userLocal = localStorage.getItem("user");

    if (accessTokenLocal && typeTokenLocal && userLocal) {
      setAccessToken(JSON.parse(accessTokenLocal));
      setTypeToken(JSON.parse(typeTokenLocal));

      const user = JSON.parse(userLocal);
      if (user.id_vai_tro == 1 || user.id_vai_tro == 3) {
        const resGetOrder = await fetch(
          `https://huunghi.id.vn/api/order/getOrderAdmin/${idOrder}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${JSON.parse(typeTokenLocal)} ${JSON.parse(
                accessTokenLocal
              )}`,
            },
          }
        );

        if (resGetOrder.ok) {
          const resultGetOrder = await resGetOrder.json();
          const currentOrder = resultGetOrder.data.order;
          setOrder(currentOrder);
          if (currentOrder.id_ma_giam_gia) {
            const resGetVoucher = await fetch(
              `https://huunghi.id.vn/api/voucher/getVoucher/${currentOrder.id_ma_giam_gia}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `${JSON.parse(typeTokenLocal)} ${JSON.parse(
                    accessTokenLocal
                  )}`,
                },
              }
            );

            if (resGetOrder.ok) {
              const resultGetOrder = await resGetVoucher.json();
              const getVoucher = resultGetOrder.data.voucher;
              setVoucher(getVoucher);
            } else {
              toast.error("Lấy mã giảm giá không thành công");
            }
          }

          setOrder(currentOrder);
          setDetailOrder(resultGetOrder.data.order.detail_orders);
          setIsLoading(false);
        } else {
          toast.error("Đơn hàng không tồn tại");
          router.push("/admin/orders");
        }
      } else {
        router.push("/user/userprofile");
      }
    } else {
      router.push("/user/login");
    }
  };

  useEffect(() => {
    fetchDefaultData();
  }, []);

  const updateStatus = async (orderId: number, newStatus: string) => {
    const confirm = window.confirm(
      "Bạn có chắc chắn muốn cập nhật đơn hàng này?"
    );
    if (confirm) {
      const resChangeStatusOrder = await fetch(
        `https://huunghi.id.vn/api/order/changeStatusOrderAdmin/${orderId}?status=${newStatus}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${typeToken} ${accessToken}`,
          },
        }
      );
      if (resChangeStatusOrder.ok) {
        if (order) {
          setOrder({ ...order, trang_thai_don_hang: newStatus });
        }
        // setTotalCateOrder(newStatus);
      } else {
        toast("Cập nhật không thành công");
      }
    }
  };

  if (isLoading) {
    return (
      <main className="p-4 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-3xl text-indigo-600 mb-3"></i>
          <p className="text-gray-600">Đang tải thông tin đơn hàng...</p>
        </div>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="p-4 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Không tìm thấy thông tin đơn hàng</p>
          <button
            onClick={() => router.push("/shipper/order-management")}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Quay lại danh sách đơn hàng
          </button>
        </div>
      </main>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={() => window.history.back()}
            className="mr-4 p-2 rounded-full hover:bg-gray-200"
          >
            <FaArrowLeft className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Chi tiết đơn hàng #DH{order.id_don_hang}
            </h1>
            <p className="text-sm text-gray-500">
              Thông tin chi tiết đơn hàng cần giao
            </p>
          </div>
        </div>

        <div className="bg-white shadow rounded-xl overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Thông tin đơn hàng
            </h2>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium`}
            >
              {returStatus(order.trang_thai_don_hang)}
            </span>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">
                  Thông tin người nhận
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold">{order.ten_nguoi_nhan}</p>
                  <p className="text-gray-600">
                    {order.so_dien_thoai_nguoi_nhan}
                  </p>
                  <p className="text-gray-600 mt-2">
                    {order.dia_chi_nguoi_nhan}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">
                  Thông tin người gửi
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold">Nguyễn Thanh Sang</p>
                  <p className="text-gray-600">0963004872</p>
                  <p className="text-gray-600 mt-2">
                    Trung Mỹ Tây 3 Phường Trung Mỹ Tây Quận 12
                  </p>
                </div>
              </div>
            </div>

            <h3 className="font-medium text-gray-700 mb-2">Sản phẩm</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                      Sản phẩm
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                      Số lượng
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                      Đơn giá
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                      Thành tiền
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {detailOrders.map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-md overflow-hidden">
                            {item.anh_san_pham ? (
                              <img
                                src={`https://huunghi.id.vn/storage/products/${item.anh_san_pham}`}
                                alt={item.ten_san_pham}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="h-full w-full bg-gray-300 flex items-center justify-center">
                                <span className="text-xs text-gray-500">
                                  No image
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <p className="font-medium text-gray-900">
                              {item.ten_san_pham}
                            </p>
                            <p className="text-gray-500 text-sm">
                              {item.id_chi_tiet_don_hang}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {item.so_luong_san_pham}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {item.gia_san_pham.toLocaleString("vi-VN")} đ
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {(
                          item.gia_san_pham * item.so_luong_san_pham
                        ).toLocaleString("vi-VN")}{" "}
                        đ
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">
                  Thông tin vận chuyển
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600">
                    <span className="font-medium">Phí vận chuyển:</span>{" "}
                    {order.tien_ship.toLocaleString("vi-VN")} đ
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Phương thức thanh toán:</span>{" "}
                    {getPaymentMethod(order.id_phuong_thuc_thanh_toan)}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Ghi chú:</span>{" "}
                    {order.ghi_chu_don_hang ? order.ghi_chu_don_hang : "Không"}
                  </p>
                  <p className="text-gray-600 mt-2">
                    <span className="font-medium">Ngày tạo đơn:</span>{" "}
                    {new Date(order.created_at).toLocaleString("vi-VN")}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">
                  Tổng thanh toán
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">Tạm tính:</span>
                    <span className="font-medium">
                      {(
                        order.gia_tong_don_hang +
                        order.tien_ship +
                        (voucher?.gia_tri_giam ? voucher?.gia_tri_giam : 0)
                      ).toLocaleString("vi-VN")}{" "}
                      đ
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">Phí vận chuyển:</span>
                    <span className="font-medium">
                      {order.tien_ship.toLocaleString("vi-VN")} đ
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">Giảm giá:</span>
                    <span className="font-medium text-red-500">
                      {(voucher?.gia_tri_giam
                        ? voucher?.gia_tri_giam
                        : 0
                      ).toLocaleString("vi-VN")}{" "}
                      đ
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-t border-gray-200 mt-2 pt-2">
                    <span className="text-gray-900 font-semibold">
                      Tổng cộng:
                    </span>
                    <span className="text-indigo-600 font-bold">
                      {order.gia_tong_don_hang.toLocaleString("vi-VN")} đ
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {!["giao_thanh_cong", "da_huy", "cho_lay_hang"].includes(
          order.trang_thai_don_hang
        ) && (
          <div className="bg-white shadow rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Thao tác</h2>
            </div>
            <div className="p-6 flex flex-wrap gap-4">
              <button
                onClick={() => positionMap(order.dia_chi_nguoi_nhan)}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 flex items-center"
              >
                <FaMapMarkerAlt className="mr-2" /> Xem bản đồ
              </button>
              <button
                onClick={() =>
                  (window.location.href = `tel:${order.so_dien_thoai_nguoi_nhan}`)
                }
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 flex items-center"
              >
                <FaPhone className="mr-2" /> Gọi khách hàng
              </button>

              {nextSatatusOrder(order.trang_thai_don_hang).map((e, i) => (
                <button
                  key={i}
                  onClick={() => updateStatus(order.id_don_hang, e.nextStatus)}
                  className={`px-4 py-2 text-white rounded hover:bg-opacity-90 flex items-center ${
                    e.className === "green"
                      ? "bg-green-600"
                      : e.className === "yellow"
                      ? "bg-yellow-600"
                      : "bg-gray-600"
                  }`}
                >
                  <FaCheck className="mr-2" /> {e.status}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetailShipper;
