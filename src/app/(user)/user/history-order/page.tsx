"use client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import userInterface from "@/app/(user)/compoments/userInterface";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserProfile() {
  const router = useRouter();
  const [user, setUser] = useState<userInterface>();
  const [orders, setOrders] = useState<any[]>([]);
  const [reload, setReload] = useState<boolean>(true);
  const [selectedStatus, setSelectedStatus] = useState<string>("tat_ca");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const u = localStorage.getItem("user");
    const accessTokenLocal = localStorage.getItem("accessToken");
    const typeTokenLocal = localStorage.getItem("typeToken");
    if (u && accessTokenLocal && typeTokenLocal) {
      const uu = JSON.parse(u);
      const accessToken = JSON.parse(accessTokenLocal);
      const typeToken = JSON.parse(typeTokenLocal);
      const fectchOrder = async () => {
        const responseOrder = await fetch(
          `https://huunghi.id.vn/api/order/listOrderOfUser`,
          {
            headers: {
              Authorization: `${typeToken} ${accessToken}`,
            },
          }
        );
        const result = await responseOrder.json();
        const orders = result.data.orders;
        setOrders(orders);
        setIsLoading(false);
      };
      fectchOrder();
      setUser(uu);
    } else {
      toast.error("Vui lòng đăng nhập");
      router.push("/login");
    }
  }, [reload]);

  const destroyOrder = async (idOrder: number) => {
    const accessTokenLocal = localStorage.getItem("accessToken");
    const typeTokenLocal = localStorage.getItem("typeToken");
    const res = await fetch(
      `https://huunghi.id.vn/api/order/destroyOrder/${idOrder}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${typeTokenLocal ? JSON.parse(typeTokenLocal) : ""} ${
            accessTokenLocal ? JSON.parse(accessTokenLocal) : ""
          }`,
        },
      }
    );
    const result = await res.json();
    setReload(!reload);
    toast.success(result.message);
  };

  const menuItems = [
    { icon: "fas fa-user", text: "Hồ sơ của tôi", href: "/user/userprofile" },
    {
      icon: "fas fa-clipboard-list",
      text: "Đơn hàng của tôi",
      href: "/user/history-order",
      active: true,
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
    {
      icon: "fas fa-heart",
      text: "Sản phẩm đã xem",
      href: "/user/sanphamdaxem",
    },
    { icon: "fas fa-lock", text: "Đổi mật khẩu", href: "/user/changePassword" },
  ];

  const filteredOrders =
    selectedStatus === "tat_ca"
      ? orders
      : selectedStatus === "cho_xac_nhan"
      ? orders?.filter(
          (order) =>
            order.trang_thai_don_hang === "cho_xac_nhan" ||
            order.trang_thai_don_hang === "dang_chuan_bi_hang"
        )
      : orders?.filter((order) => order.trang_thai_don_hang === selectedStatus);

  const statusTabs = [
    { label: "Tất cả", value: "tat_ca" },
    { label: "Đang xử lý", value: "cho_xac_nhan" },
    { label: "Đang giao hàng", value: "dang_giao" },
    { label: "Đã giao hàng", value: "giao_thanh_cong" },
    { label: "Đã Hủy", value: "da_huy" },
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
    <div className="min-h-screen bg-gray-100 max-md:pt[190px] max-sm:pt-[120px]">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      />

      <div className="bg-white border-b lg:pt-[180px] max-lg:pt-[190px] max-sm:pt-[90px]">
        <div className="max-w-[1200px] mx-auto">
          <nav className="text-sm text-gray-600 whitespace-nowrap p-3">
            <span>
              <a href="/">Trang chủ</a>
            </span>{" "}
            / <span className="font-medium">Tài khoản</span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto py-4">
        <div className=" md:flex gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-80 bg-white rounded-lg shadow-sm max-h-[530px] lg:sticky top-40">
            <div className="p-4 border-b bg-gray-50 rounded-t-lg">
              <div className="flex items-center gap-2">
                <i className="fas fa-user text-gray-600"></i>
                <span className="font-medium">Tài khoản của bạn</span>
              </div>
            </div>
            <div className="p-2">
              <div className="text-sm text-gray-600 px-3 py-2">
                Hi, {user?.ten_user || "Khách"}
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
              <h2 className="text-lg font-medium mb-2">ĐƠN HÀNG CỦA TÔI</h2>
              <p className="text-gray-600 mb-4">Lịch sử mua hàng của bạn</p>

              {/* Tab Trạng thái */}
              <div className="flex gap-6 border-b mb-6">
                {statusTabs.map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => setSelectedStatus(tab.value)}
                    className={`pb-2 border-b-2 ${
                      selectedStatus === tab.value
                        ? "border-black text-black font-semibold"
                        : "border-transparent text-gray-600 hover:text-black"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full table-fixed border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 p-3 text-center text-sm font-semibold text-gray-700">
                        Mã đơn hàng
                      </th>
                      <th className="border border-gray-300 p-3 text-center text-sm font-semibold text-gray-700">
                        Tên người nhận
                      </th>
                      <th className="border border-gray-300 p-3 text-center text-sm font-semibold text-gray-700">
                        SĐT
                      </th>
                      <th className="border border-gray-300 p-3 text-center text-sm font-semibold text-gray-700">
                        Tổng tiền
                      </th>
                      <th className="border border-gray-300 p-3 text-center text-sm font-semibold text-gray-700">
                        Trạng thái
                      </th>
                      <th className="border border-gray-300 p-3 text-center text-sm font-semibold text-gray-700">
                        Hành động
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders?.map((order, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 p-3 text-center text-black font-medium">
                          #{order.id_don_hang}
                        </td>
                        <td className="border border-gray-300 p-3 text-center text-black">
                          {order.ten_nguoi_nhan}
                        </td>
                        <td className="border border-gray-300 p-3 text-center text-black whitespace-nowrap overflow-hidden text-ellipsis">
                          {order.so_dien_thoai_nguoi_nhan}
                        </td>
                        <td className="border border-gray-300 p-3 text-center text-black font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                          {(
                            order.gia_tong_don_hang + order.tien_ship
                          ).toLocaleString("vi-VN")}
                          đ
                        </td>
                        <td className="border border-gray-300 p-3 text-center text-sm text-gray-800">
                          {order.trang_thai_don_hang === "cho_xac_nhan" &&
                            "Chờ xác nhận"}
                          {order.trang_thai_don_hang === "chu_y" &&
                            "Chờ xác nhận"}
                          {order.trang_thai_don_hang === "dang_chuan_bi_hang" &&
                            "Đang chuẩn bị hàng"}
                          {order.trang_thai_don_hang === "cho_lay_hang" &&
                            "Chờ lấy hàng"}
                          {order.trang_thai_don_hang === "dang_giao" &&
                            "Đang giao"}
                          {order.trang_thai_don_hang === "hoan_hang" &&
                            "Đã hủy"}
                          {order.trang_thai_don_hang === "giao_thanh_cong" &&
                            "Đã giao"}
                          {order.trang_thai_don_hang === "da_huy" && "Đã hủy"}
                        </td>
                        <td className="border border-gray-300 p-3 text-center">
                          <div className="flex flex-col items-center gap-2">
                            <Link
                              href={`/user/detail-order?idOrder=${order.id_don_hang}`}
                            >
                              <button
                                className="text-black font-medium"
                                title="Xem chi tiết"
                              >
                                <i className="fa-solid fa-eye"></i>
                              </button>
                            </Link>
                            {order.trang_thai_don_hang === "cho_xac_nhan" && (
                              <button
                                onClick={() => destroyOrder(order.id_don_hang)}
                                className="text-red-500 font-medium"
                                title="Hủy đơn"
                              >
                                <i className="fa-solid fa-trash"></i>
                              </button>
                            )}
                            {order.trang_thai_thanh_toan !== "da_thanh_toan" &&
                              order.trang_thai_don_hang == "cho_xac_nhan" &&
                              order.id_phuong_thuc_thanh_toan !== 1 && (
                                <a
                                  href={`/pagePaymentVNPay?idOrder=${order.id_don_hang}`}
                                  className="block"
                                >
                                  <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded-lg text-sm">
                                    Thanh toán
                                  </button>
                                </a>
                              )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredOrders.length === 0 && (
                  <p className="text-center py-6 text-gray-500">
                    Không có đơn hàng nào.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
