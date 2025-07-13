"use client";

import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useRouter } from "next/navigation";
import orderInterface from "../components/interface/orderInterface";
import Link from "next/link";

const OrderManager = () => {
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

  const router = useRouter();
  const [orders, setOrders] = useState<orderInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("");
  const [newOrder, setNewOrder] = useState({
    customer: "",
    phone: "",
    products: "",
    total: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const setTotalCateOrder = (status: string) => {
    switch (status) {
      case "cho_xac_nhan":
      case "chu_y":
        setCountAttention(countAttention + 1);
        setCountWaitConfirm(countWaitConfirm - 1);
        break;
      case "dang_chuan_bi_hang":
        setCountPrepareOrder(countPrepareOrder + 1);
        setCountWaitConfirm(countWaitConfirm - 1);
        break;
      case "cho_lay_hang":
        setCountPrepareOrder(countPrepareOrder - 1);
        setCountWaitGetOrder(countWaitGetOrder + 1);
        break;
      case "dang_giao":
        setCountInProgress(countInProgress + 1);
        setCountWaitGetOrder(countWaitGetOrder - 1);
        break;
      case "hoan_hang":
        break;
      case "giao_thanh_cong":
        break;
      case "da_huy":
        setCountReturn(countReturn - 1);
        setCountDestroy(countDestroy + 1);
        break;
      default:
    }
  };

  const fetchDefaultData = async () => {
    const accessTokenLocal = localStorage.getItem("accessToken");
    const typeTokenLocal = localStorage.getItem("typeToken");
    const userLocal = localStorage.getItem("user");

    if (accessTokenLocal && typeTokenLocal && userLocal) {
      setAccessToken(JSON.parse(accessTokenLocal));
      setTypeToken(JSON.parse(typeTokenLocal));
      const user = JSON.parse(userLocal);

      if (user.id_vai_tro == 1) {
        const resOrders = await fetch(
          `https://huunghi.id.vn/api/order/getAllOrders?status=${activeTab}&page=${currentPage}&codeOrder=${searchQuery}`,
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

  const handleSearch = () => {
    console.log(searchQuery);
    fetchDefaultData();
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    fetchDefaultData();
  }, [activeTab, currentPage]);

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
        console.log(newStatus);
        if (activeTab == "") {
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
        setTotalCateOrder(newStatus);
      } else {
        alert("Cập nhật không thành công");
      }
    }
  };

  const handlePrint = (orderId: number) => {
    alert(`In hóa đơn cho đơn hàng ${orderId}`);
  };

  const handleAddOrder = () => {
    const productArray = newOrder.products.split(",").map((p) => ({
      name: p.trim(),
      variant: "",
      img: "https://via.placeholder.com/40",
    }));

    const newId = `#DH${new Date().getFullYear()}${Math.floor(
      10000 + Math.random() * 90000
    )}`;

    // setOrders([...orders, {
    //   ...newOrder,
    //   id: newId,
    //   date: new Date().toISOString().slice(0, 10),
    //   products: productArray,
    //   status: 'Chờ xác nhận'
    // }]);

    setNewOrder({ customer: "", phone: "", products: "", total: "" });
    setShowForm(false);
  };

  const getBadgeClass = (status: string) => {
    const base =
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (status) {
      case "cho_xac_nhan":
        return `${base} bg-yellow-100 text-yellow-800`;
      case "chu_y":
        return `${base} bg-orange-100 text-orange-800`;
      case "dang_chuan_bi_hang":
        return `${base} bg-blue-100 text-blue-800`;
      case "cho_lay_hang":
        return `${base} bg-indigo-100 text-indigo-800`;
      case "dang_giao":
        return `${base} bg-purple-100 text-purple-800`;
      case "hoan_hang":
        return `${base} bg-pink-100 text-pink-800`;
      case "giao_thanh_cong":
        return `${base} bg-green-100 text-green-800`;
      case "da_huy":
        return `${base} bg-red-100 text-red-800`;
      default:
        return `${base} bg-gray-100 text-gray-800`;
    }
  };

  const returStatus = (status: string) => {
    switch (status) {
      case "":
        return `Tất cả đơn hàng`;
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

  const getStatusActions = (status: string, checkReturn: number) => {
    // console.log(status);
    switch (status) {
      case "cho_xac_nhan":
        return [
          {
            action: "confirm",
            icon: "check",
            color: "green",
            codeNextStatus: "dang_chuan_bi_hang",
            nextStatus: "Đang chuẩn bị hàng",
            title: "Xác nhận đơn",
          },
          {
            action: "confirm",
            icon: "exclamation-triangle",
            color: "yellow",
            codeNextStatus: "chu_y",
            nextStatus: "Chú ý",
            title: "Chú ý",
          },
          {
            action: "cancel",
            icon: "times",
            color: "red",
            codeNextStatus: "da_huy",
            nextStatus: "Đã hủy",
            title: "Hủy đơn hàng",
          },
        ];
      case "chu_y":
        return [
          {
            action: "confirm",
            icon: "check",
            color: "green",
            codeNextStatus: "dang_chuan_bi_hang",
            nextStatus: "Đang chuẩn bị hàng",
            title: "Xác nhận đơn",
          },
          {
            action: "cancel",
            icon: "times",
            color: "red",
            codeNextStatus: "da_huy",
            nextStatus: "Đã hủy",
            title: "Hủy đơn hàng",
          },
        ];
      case "dang_chuan_bi_hang":
        return [
          {
            action: "ready",
            icon: "box",
            color: "blue",
            codeNextStatus: "cho_lay_hang",
            nextStatus: "Chờ lấy hàng",
            title: "Đã chuẩn bị xong",
          },
          {
            action: "cancel",
            icon: "times",
            color: "red",
            codeNextStatus: "da_huy",
            nextStatus: "Đã hủy",
            title: "Hủy đơn hàng",
          },
        ];
      case "cho_lay_hang":
        return [
          // { action: 'ship', icon: 'truck', color: 'purple',  codeNextStatus : "dang_giao", nextStatus: 'Đang giao', title: 'Bắt đầu giao hàng' },
          {
            action: "cancel",
            icon: "times",
            color: "red",
            codeNextStatus: "da_huy",
            nextStatus: "Đã hủy",
            title: "Hủy đơn hàng",
          },
        ];
      case "dang_giao":
        return [
          // { action: 'delivered', icon: 'check-circle', color: 'green', nextStatus: 'Giao thành công', title: 'Đã giao thành công' },
          // { action: 'return', icon: 'undo', color: 'pink', nextStatus: 'Đang hoàn hàng', title: 'Trả hàng/hoàn hàng' }
        ];
      case "hoan_hang":
        return [
          // { action: 'returned', icon: 'reply', color: 'gray', codeNextStatus : "da_huy", nextStatus: 'Đã hủy', title: 'Xác nhận đã hoàn hàng' }
        ];
      case "giao_thanh_cong":
        return [
          // { action: 'print', icon: 'print', color: 'gray', title: 'In hóa đơn' }
        ];
      case "da_huy":
        if (checkReturn) {
          return [];
        } else {
          return [
            {
              action: "returned",
              icon: "reply",
              color: "gray",
              codeNextStatus: "da_huy",
              nextStatus: "Đã hủy",
              title: "Xác nhận đã hoàn hàng",
            },
          ];
        }

      default:
        return [];
    }
  };

  // const filteredOrders = getOrdersByStatus(activeTab).filter(order => {
  //   if (!searchQuery) return true;
  //   const query = searchQuery.toLowerCase();
  //   return (
  //     order.id.toLowerCase().includes(query) ||
  //     order.customer.toLowerCase().includes(query) ||
  //     order.phone.toLowerCase().includes(query) ||
  //     order.products.some(p => p.name.toLowerCase().includes(query))
  //   );
  // });

  const statusTabs = [
    {
      status: "Tất cả đơn hàng",
      codeStatus: "",
      icon: "list",
      totalOrder: totalOrder,
    },
    {
      status: "Chờ xác nhận",
      codeStatus: "cho_xac_nhan",
      icon: "hourglass-half",
      totalOrder: countWaitConfirm,
    },
    {
      status: "Chú ý",
      codeStatus: "chu_y",
      icon: "exclamation",
      totalOrder: countAttention,
    },
    {
      status: "Đang chuẩn bị hàng",
      codeStatus: "dang_chuan_bi_hang",
      icon: "box",
      totalOrder: countPrepareOrder,
    },
    {
      status: "Chờ lấy hàng",
      codeStatus: "cho_lay_hang",
      icon: "boxes",
      totalOrder: countWaitGetOrder,
    },
    {
      status: "Đang giao",
      codeStatus: "dang_giao",
      icon: "truck",
      totalOrder: countInProgress,
    },
    {
      status: "Đang hoàn hàng",
      codeStatus: "hoan_hang",
      icon: "undo",
      totalOrder: countReturn,
    },
    {
      status: "Giao thành công",
      codeStatus: "giao_thanh_cong",
      icon: "check-circle",
      totalOrder: countSuccess,
    },
    {
      status: "Đã hủy",
      codeStatus: "da_huy",
      icon: "times-circle",
      totalOrder: countDestroy,
    },
  ];

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
    <main className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Quản lý đơn hàng
            </h1>
            <p className="text-sm text-gray-500">
              Tổng quan và quản lý tất cả đơn hàng của cửa hàng
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <div className="relative flex-1">
              <form
                onSubmit={(e: any) => {
                  e.preventDefault();
                  handleSearch();
                }}
              >
                <input
                  type="text"
                  placeholder="Tìm kiếm đơn hàng DH123"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </form>
              <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            </div>

            <div className="flex gap-2">
              <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm">
                <i className="fas fa-plus"></i>
                <span className="hidden sm:inline">Đơn Hàng Hoàn Tiền</span>
              </button>
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm"
              >
                <i className="fas fa-plus"></i>
                <span className="hidden sm:inline">Tạo đơn</span>
              </button>
            </div>
          </div>
        </div>

        {/* New Order Form */}
        {showForm && (
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Tạo đơn hàng mới
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên khách hàng
                </label>
                <input
                  type="text"
                  placeholder="Nhập tên khách hàng"
                  value={newOrder.customer}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, customer: e.target.value })
                  }
                  className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Số điện thoại
                </label>
                <input
                  type="text"
                  placeholder="Nhập số điện thoại"
                  value={newOrder.phone}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, phone: e.target.value })
                  }
                  className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Danh sách sản phẩm
                </label>
                <textarea
                  placeholder="Mỗi sản phẩm cách nhau bởi dấu phẩy (vd: Áo thun nam, Quần jeans)"
                  value={newOrder.products}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, products: e.target.value })
                  }
                  className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-24"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tổng tiền
                </label>
                <input
                  type="text"
                  placeholder="Vd: 1.250.000đ"
                  value={newOrder.total}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, total: e.target.value })
                  }
                  className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleAddOrder}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <i className="fas fa-check"></i>
                Thêm đơn hàng
              </button>
            </div>
          </div>
        )}

        {/* Status Tabs */}
        <div className="mb-6">
          <div className="w-full overflow-x-auto pb-2">
            <div className="flex">
              {statusTabs.map((tab) => {
                return (
                  <button
                    key={tab.status}
                    onClick={() => {
                      setActiveTab(tab.codeStatus);
                      setCurrentPage(1);
                    }}
                    className={`flex-1 flex items-center justify-center px-3 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors min-w-fit mx-0.5 ${
                      activeTab === tab.codeStatus
                        ? "bg-indigo-600 text-white shadow-md"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {/* Khi không active - chỉ hiện icon + số lượng */}
                    {activeTab !== tab.codeStatus && (
                      <div className="flex items-center justify-between w-full px-3">
                        <span className="flex-1"></span> {/* Spacer bên trái */}
                        <div className="flex items-center gap-x-2">
                          <i className={`fas fa-${tab.icon}`}></i>
                          {tab.totalOrder > 0 && (
                            <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full text-xs">
                              {tab.totalOrder}
                            </span>
                          )}
                        </div>
                        <span className="flex-1"></span> {/* Spacer bên phải */}
                      </div>
                    )}

                    {/* Khi active - hiện đầy đủ icon + tên + số lượng */}
                    {activeTab === tab.codeStatus && (
                      <div className="flex items-center justify-between w-full px-3">
                        <i className={`fas fa-${tab.icon}`}></i>
                        <span className="truncate max-w-[100px] mx-2 text-center">
                          {returStatus(tab.status)}
                        </span>
                        {tab.totalOrder > 0 && (
                          <span className="bg-white text-indigo-600 px-1.5 py-0.5 rounded-full text-xs">
                            {tab.totalOrder}
                          </span>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Tổng đơn hàng
                </p>
                <p className="text-2xl font-bold mt-1">{totalOrder}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <i className="fas fa-shopping-bag"></i>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Chờ xác nhận
                </p>
                <p className="text-2xl font-bold mt-1">{countWaitConfirm}</p>
              </div>
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <i className="fas fa-hourglass-half"></i>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Đang giao</p>
                <p className="text-2xl font-bold mt-1">
                  {countInProgress + countReturn}
                </p>
              </div>
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <i className="fas fa-truck"></i>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Thành công</p>
                <p className="text-2xl font-bold mt-1">{countSuccess}</p>
              </div>
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <i className="fas fa-check-circle"></i>
              </div>
            </div>
          </div>
        </div>
        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Mã đơn
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Khách hàng
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Địa chỉ
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Ngày đặt
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tổng tiền
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Trạng thái
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr
                      key={order.id_don_hang}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-indigo-600">
                          #DH{order.id_don_hang}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {order.ten_nguoi_nhan}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.so_dien_thoai_nguoi_nhan}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col space-y-2 text-sm">
                          {order.dia_chi_nguoi_nhan.slice(0, 30)}...
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.created_at).toLocaleDateString("vi-VN")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.gia_tong_don_hang.toLocaleString("vi-VN")} VNĐ
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={getBadgeClass(order.trang_thai_don_hang)}
                        >
                          {returStatus(order.trang_thai_don_hang)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end items-center space-x-2">
                          {getStatusActions(
                            order.trang_thai_don_hang,
                            order.kiem_tra_hoan_hang
                          ).map((action, index) => (
                            <button
                              key={index}
                              onClick={() =>
                                action.action === "print"
                                  ? handlePrint(order.id_don_hang)
                                  : updateStatus(
                                      order.id_don_hang,
                                      action.codeNextStatus != undefined
                                        ? action.codeNextStatus
                                        : ""
                                    )
                              }
                              className={`p-2 rounded-full ${
                                action.color === "green"
                                  ? "text-green-600 hover:bg-green-50"
                                  : action.color === "red"
                                  ? "text-red-600 hover:bg-red-50"
                                  : action.color === "blue"
                                  ? "text-blue-600 hover:bg-blue-50"
                                  : action.color === "purple"
                                  ? "text-purple-600 hover:bg-purple-50"
                                  : action.color === "pink"
                                  ? "text-pink-600 hover:bg-pink-50"
                                  : "text-gray-600 hover:bg-gray-50"
                              } transition-colors`}
                              title={action.title}
                            >
                              <i className={`fas fa-${action.icon}`}></i>
                            </button>
                          ))}
                          <Link
                            href={`/admin/orders/detai-order/${order.id_don_hang}`}
                          >
                            <button
                              // onClick={() => setSelectedOrder(order)}
                              className="p-2 rounded-full text-indigo-600 hover:bg-indigo-50 transition-colors"
                              title="Xem chi tiết"
                            >
                              <i className="fas fa-eye"></i>
                            </button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <i className="fas fa-box-open text-4xl mb-3"></i>
                        <p className="text-lg font-medium">
                          Không tìm thấy đơn hàng nào
                        </p>
                        <p className="text-sm mt-1">
                          Không có đơn hàng nào phù hợp với tiêu chí tìm kiếm
                        </p>
                        <button
                          onClick={() => {
                            setActiveTab("");
                            setSearchQuery("");
                          }}
                          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
                        >
                          Xem tất cả đơn hàng
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* Phân Trang */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-white">
          {/* Hiển thị <span className="font-medium">{(currentPage - 1) * perPage + 1}</span> đến{' '} */}
          <div className="text-sm text-gray-600">
            Hiển thị{" "}
            <span className="font-medium">
              {(currentPage - 1) * perPage + 1}
            </span>{" "}
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
              onClick={() => handlePageChange(currentPage - 1)}
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
    </main>
  );
};

export default OrderManager;
