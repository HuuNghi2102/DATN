"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import orderInterface from "../components/interface/orderInterface";
import {
  FaEye,
  FaMapMarkerAlt,
  FaPhone,
  FaFilter,
  FaSyncAlt,
  FaPrint,
  FaCheck,
} from "react-icons/fa";
import Link from "next/link";

//array status order of shipper
const statusOrderOfShipper = [
  { status: "Tất cả đơn hàng", codeStatus: "" },
  { status: "Đơn hàng chờ nhận", codeStatus: "cho_lay_hang" },
  { status: "Đang giao", codeStatus: "dang_giao" },
  { status: "Đang hoàn hàng", codeStatus: "hoan_hang" },
  { status: "Giao thành công", codeStatus: "giao_thanh_cong" },
  { status: "Giao thất bại", codeStatus: "da_huy" },
];

const OrderManagement = () => {
  const [totalOrder, setTotalOrder] = useState<number>(0);
  const [countWaitConfirm, setCountWaitConfirm] = useState<number>(0);
  const [countAttention, setCountAttention] = useState<number>(0);
  const [countPrepareOrder, setCountPrepareOrder] = useState<number>(0);
  const [countWaitGetOrder, setCountWaitGetOrder] = useState<number>(0);
  const [countInProgress, setCountInProgress] = useState<number>(0);
  const [countReturn, setCountReturn] = useState<number>(0);
  const [countSuccess, setCountSuccess] = useState<number>(0);
  const [countDestroy, setCountDestroy] = useState<number>(0);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(20);

  const [typeToken, setTypeToken] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const [openOrder, setOpenOrder] = useState<string | null>(null);
  const toggleOrderDetails = (id: string) =>
    setOpenOrder(openOrder === id ? null : id);
  const [selectedStatus, setSelectedStatus] = useState<string>("cho_lay_hang");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<orderInterface[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchDefaultData = async () => {
    const accessTokenLocal = localStorage.getItem("accessToken");
    const typeTokenLocal = localStorage.getItem("typeToken");
    const userLocal = localStorage.getItem("user");

    if (accessTokenLocal && typeTokenLocal && userLocal) {
      setAccessToken(JSON.parse(accessTokenLocal));
      setTypeToken(JSON.parse(typeTokenLocal));
      const user = JSON.parse(userLocal);

      if (user.id_vai_tro == 3) {
        const resOrders = await fetch(
          `https://huunghi.id.vn/api/order/getAllOrders?status=${selectedStatus}&page=${currentPage}&codeOrder=${searchQuery}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${JSON.parse(typeTokenLocal)} ${JSON.parse(
                accessTokenLocal
              )}`,
            },
          }
        );

        const resultOrder = await resOrders.json();

        if (resOrders.ok) {
          const listOrder = resultOrder.data.orders.data;
          setOrders(listOrder);

          setTotalPages(resultOrder.data.orders.last_page);
          setCurrentPage(resultOrder.data.orders.current_page);
          setPerPage(resultOrder.data.orders.per_page);

          setTotalOrder(resultOrder.data.countAll);
          setCountWaitConfirm(resultOrder.data.countWaitConfirm);
          setCountAttention(resultOrder.data.countAttention);
          setCountPrepareOrder(resultOrder.data.countPrepareOrder);
          setCountWaitGetOrder(resultOrder.data.countWaitGetOrder);
          setCountInProgress(resultOrder.data.countInProgress);
          setCountReturn(resultOrder.data.countReturn);
          setCountSuccess(resultOrder.data.countSuccess);
          setCountDestroy(resultOrder.data.countDestroy);
          setIsLoading(false);
        } else {
          alert("Lấy danh sách đơn hàng thành công");
        }
      } else {
        router.push("/user/userprofile");
      }
    } else {
      router.push("/login");
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const positionMap = (position: string) => {
    console.log(position);
    router.push(
      `https://www.google.com/maps/dir/?api=1&destination=${position}`
    );
  };

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
        if (selectedStatus == "") {
          setOrders(
            orders.map((o) =>
              o.id_don_hang == orderId
                ? { ...o, trang_thai_don_hang: newStatus }
                : o
            )
          );
        } else {
          setOrders(orders.filter((o, i) => o.id_don_hang != orderId));
        }
        // setTotalCateOrder(newStatus);
      } else {
        alert("Cập nhật không thành công");
      }
    }
  };

  useEffect(() => {
    fetchDefaultData();
  }, [selectedStatus]);

  if (isLoading) {
    return (
      <main className="p-4 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-3xl text-indigo-600 mb-3"></i>
          <p className="text-gray-600">Đang tải dữ liệu đơn hàng...</p>
        </div>
      </main>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-4 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              Quản Lý Đơn Hàng
            </h1>
            <p className="text-sm text-gray-500">Danh sách đơn hàng cần giao</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <button className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100 flex items-center">
              <FaFilter className="mr-2" /> Lọc
            </button>
            <button className="px-4 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center">
              <FaSyncAlt className="mr-2" /> Làm mới
            </button>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto mb-6">
          {statusOrderOfShipper.map((status, i) => (
            <button
              key={i}
              className={`px-4 py-2 text-sm border rounded-full whitespace-nowrap ${
                selectedStatus === status.codeStatus
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => setSelectedStatus(status.codeStatus)}
            >
              {status.status}
            </button>
          ))}
        </div>

        <div className="bg-white shadow rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Danh sách đơn hàng
            </h2>
            <span className="text-sm text-gray-500">
              Tổng: <strong>{orders.length}</strong> đơn hàng
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr className="text-left text-gray-600">
                  <th className="px-6 py-3 font-medium">Mã ĐH</th>
                  <th className="px-6 py-3 font-medium">Khách hàng</th>
                  <th className="px-6 py-3 font-medium">Địa chỉ</th>
                  <th className="px-6 py-3 font-medium">Tổng tiền</th>
                  <th className="px-6 py-3 font-medium">Trạng thái</th>
                  <th className="px-6 py-3 font-medium">Thao tác</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {orders.map((order) => (
                  <React.Fragment key={order.id_don_hang}>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">
                        #DH{order.id_don_hang}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold">
                          {order.ten_nguoi_nhan}
                        </div>
                        <div className="text-xs text-gray-500">
                          {order.so_dien_thoai_nguoi_nhan}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {order.dia_chi_nguoi_nhan.slice(0, 45) + "..."}
                      </td>
                      <td className="px-6 py-4">
                        {order.gia_tong_don_hang.toLocaleString("vi-VN")}VNĐ
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block text-white px-3 bg-green-500 py-1 rounded-full text-xs font-medium ${order.trang_thai_don_hang}`}
                        >
                          {returStatus(order.trang_thai_don_hang)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 flex-nowrap flex-row ">
                          <Link
                            href={`/admin/shipper/detail-order/${order.id_don_hang}`}
                          >
                            <button className="p-2 border rounded hover:bg-gray-100">
                              <FaEye />
                            </button>
                          </Link>
                          <button
                            onClick={() =>
                              positionMap(order.dia_chi_nguoi_nhan)
                            }
                            className="p-2 border rounded hover:bg-gray-100"
                          >
                            <FaMapMarkerAlt />
                          </button>
                          <Link href={`tel:${order.so_dien_thoai_nguoi_nhan}`}>
                            <button className="p-2 border rounded hover:bg-gray-100">
                              <FaPhone />
                            </button>
                          </Link>
                          {nextSatatusOrder(order.trang_thai_don_hang).map(
                            (e, i) => (
                              <button
                                onClick={() =>
                                  updateStatus(order.id_don_hang, e.nextStatus)
                                }
                                key={i}
                                className={`px-3 py-2 text-xs bg-${e.className}-600 text-white rounded hover:bg-${e.className}-700 font-medium whitespace-nowrap`}
                              >
                                {e.status}
                              </button>
                            )
                          )}
                        </div>
                      </td>
                    </tr>
                    {/* {openOrder === order.id && (
                      <tr>
                        <td colSpan={6} className="bg-gray-50 p-6">
                          <div className="grid gap-4">
                            {order.details.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden">
                                  <img src="https://via.placeholder.com/50" alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium">{item.name}</div>
                                  <div className="text-xs text-gray-500">{item.variant}</div>
                                </div>
<div className="font-semibold">{item.price}</div>
                              </div>
                            ))}
                            <div className="mt-4 border-t pt-4 text-sm text-gray-700">
                              <div className="flex justify-between"><span>Tạm tính:</span><span>{order.summary.subtotal}</span></div>
                              <div className="flex justify-between"><span>Phí vận chuyển:</span><span>{order.summary.shipping}</span></div>
                              {order.summary.discount && <div className="flex justify-between"><span>Giảm giá:</span><span>{order.summary.discount}</span></div>}
                              <div className="flex justify-between font-semibold mt-2"><span>Tổng cộng:</span><span>{order.summary.total}</span></div>
                            </div>
                            <div className="text-sm text-gray-700">
                              <div><strong>Thời gian đặt:</strong> {order.delivery.time}</div>
                              <div><strong>Ghi chú:</strong> {order.delivery.note}</div>
                            </div>
                            <div className="flex justify-end gap-2 mt-2">
                              <button className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100 flex items-center">
                                <FaPrint className="mr-2" />In hóa đơn
                              </button>
                              <button className="px-4 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center">
                                <FaCheck className="mr-2" />{order.status === 'Chờ nhận' ? 'Nhận đơn' : 'Hoàn thành'}
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )} */}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Phân Trang */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-white">
        {/* Hiển thị <span className="font-medium">{(currentPage - 1) * perPage + 1}</span> đến{' '} */}
        <div className="text-sm text-gray-600">
          Hiển thị{" "}
          <span className="font-medium">{(currentPage - 1) * perPage + 1}</span>{" "}
          đến{" "}
          <span className="font-medium">
            {Math.min(
              currentPage * perPage,
              orders.length + (currentPage - 1) * perPage
            )}
          </span>{" "}
          trong tổng số <span className="font-medium">{totalOrder}</span> đơn
          hàng
        </div>
        <div className="flex space-x-2">
          <button
            // onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md border ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Trước
          </button>

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-3 py-1 rounded-md border ${
                  currentPage === pageNum
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          {totalPages > 5 && currentPage < totalPages - 2 && (
            <span className="px-3 py-1">...</span>
          )}

          {totalPages > 5 && currentPage < totalPages - 2 && (
            <button
              onClick={() => handlePageChange(totalPages)}
              className={`px-3 py-1 rounded-md border ${
                currentPage === totalPages
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {totalPages}
            </button>
          )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md border ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Sau
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
