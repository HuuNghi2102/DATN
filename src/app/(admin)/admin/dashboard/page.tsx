"use client";
import { map } from "jquery";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "../components/interface/imageInterface";
// import voucherInterface from "../components/interface/voucherInterface";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Link from "next/link";

interface voucherInterface {
  id_ma_giam_gia: number;
  ma_giam_gia: string;
  loai_giam_gia: string;
  gia_tri_giam: number;
  gia_tri_don_hang: number;
  ngay_bat_dau: string;
  ngay_het_han: string;
  trang_thai: number;
  created_at: string | number;
  updated_at: string | number;
  deleted_at: string | number;
  order_count: number;
}

interface Product {
  id_san_pham: number;
  ten_san_pham: string;
  duong_dan: string;
  gia_chua_giam: number;
  phan_tram_giam: number;
  gia_da_giam: number;
  mo_ta_san_pham: string;
  trang_thai: number;
  id_loai_san_pham: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  variant_orders_count: number;
  images: Image[];
  product_variants_sum_so_luong: number;
}

interface revenue {
  month: number;
  revenue: number;
}

interface data {
  name: string;
  value: number;
}

const Dashboard = () => {
  const router = useRouter();
  const [dayData, setDayData] = useState<string>("day");

  const [pointStart, setPointStart] = useState({
    all: 0,
    one: 0,
    two: 0,
    three: 0,
    four: 0,
    five: 0,
  });

  const [productBestSeller, setProductBestSeller] = useState<Product[]>([]);
  const [productBestSellerAsc, setProductBestSellerAsc] = useState<Product[]>(
    []
  );
  const [listVoucher, setListVoucher] = useState<voucherInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDefaultData = async () => {
    setIsLoading(true);

    const accessTokenLocal = localStorage.getItem("accessToken");
    const typeTokenLocal = localStorage.getItem("typeToken");
    const userLocal = localStorage.getItem("user");

    if (accessTokenLocal && typeTokenLocal && userLocal) {
      const user = JSON.parse(userLocal);

      if (user.id_vai_tro == 1) {
        //
        const doanhThuThang = await fetch(
          "https://huunghi.id.vn/api/function/baocao",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${JSON.parse(typeTokenLocal)} ${JSON.parse(
                accessTokenLocal
              )}`,
            },
          }
        );
        if (doanhThuThang.ok) {
          const result = await doanhThuThang.json();
          const getOk = result.data.doanhThu.map((e: any) => ({
            month: "Tháng " + e.month,
            revenue: e.revenue,
          }));
          setRevenueData(getOk);
        } else {
          alert("Lấy dữ liệu daonh thu tháng không thành công");
        }

        //
        const resQuantityOfOrderForStatusOrder = await fetch(
          "https://huunghi.id.vn/api/function/quantityOfOrderForStatusOrder",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${JSON.parse(typeTokenLocal)} ${JSON.parse(
                accessTokenLocal
              )}`,
            },
          }
        );
        if (resQuantityOfOrderForStatusOrder.ok) {
          const resultResQuantityOfOrderForStatusOrder =
            await resQuantityOfOrderForStatusOrder.json();
          const getOk = [
            {
              name: "Thành công",
              value: resultResQuantityOfOrderForStatusOrder.data.success,
            },
            {
              name: "Đang xử lý",
              value: resultResQuantityOfOrderForStatusOrder.data.processing,
            },
            {
              name: "Đang giao",
              value: resultResQuantityOfOrderForStatusOrder.data.inProgress,
            },
            {
              name: "Đã hủy",
              value: resultResQuantityOfOrderForStatusOrder.data.destroy,
            },
          ];
          setOrderStatusData(getOk);
        } else {
          alert("Lấy dữ liệu daonh thu tháng không thành công");
        }

        //
        const resProductBestSeller = await fetch(
          "https://huunghi.id.vn/api/product/getBestSalerProducts",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${JSON.parse(typeTokenLocal)} ${JSON.parse(
                accessTokenLocal
              )}`,
            },
          }
        );
        if (resProductBestSeller.ok) {
          const resultResProductBestSeller = await resProductBestSeller.json();
          console.log(resultResProductBestSeller.data.productBestSeller);
          setProductBestSeller(
            resultResProductBestSeller.data.productBestSeller
          );
        } else {
          alert("Lấy dữ liệu sản phẩm bán chạy không thành công");
        }

        //
        const resProductBestSellerAsc = await fetch(
          "https://huunghi.id.vn/api/product/getBestSalerProducts?by=asc",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${JSON.parse(typeTokenLocal)} ${JSON.parse(
                accessTokenLocal
              )}`,
            },
          }
        );
        if (resProductBestSellerAsc.ok) {
          const resultResProductBestSellerAsc =
            await resProductBestSellerAsc.json();
          console.log(resultResProductBestSellerAsc.data.productBestSeller);
          setProductBestSellerAsc(
            resultResProductBestSellerAsc.data.productBestSeller
          );
        } else {
          alert("Lấy dữ liệu sản phẩm bán chạy không thành công");
        }

        const resPointEvalues = await fetch(
          "https://huunghi.id.vn/api/function/getPointEvalues",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${JSON.parse(typeTokenLocal)} ${JSON.parse(
                accessTokenLocal
              )}`,
            },
          }
        );
        if (resPointEvalues.ok) {
          const resultResPointEvalues = await resPointEvalues.json();
          console.log(resultResPointEvalues.data.productBestSeller);
          setPointStart({
            all: parseInt(resultResPointEvalues.data.all),
            one: parseInt(resultResPointEvalues.data.oneStart),
            two: parseInt(resultResPointEvalues.data.twoStart),
            three: parseInt(resultResPointEvalues.data.threeStart),
            four: parseInt(resultResPointEvalues.data.fourStart),
            five: parseInt(resultResPointEvalues.data.fiveStart),
          });
        } else {
          alert("Lấy dữ liệu sản phẩm bán chạy không thành công");
        }

        const resDataOrder = await fetch(
          `https://huunghi.id.vn/api/function/dataOrder?day=${dayData}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${JSON.parse(typeTokenLocal)} ${JSON.parse(
                accessTokenLocal
              )}`,
            },
          }
        );
        if (resDataOrder.ok) {
          const resultResDataOrder = await resDataOrder.json();
          console.log(resultResDataOrder);
          setData({
            totalOrders: resultResDataOrder.data.countOrder,
            todayOrders: 24,
            revenue: resultResDataOrder.data.countDoanhThu,
            todayRevenue: 1250000,
            newCustomers: resultResDataOrder.data.newUser,
            lowStockProducts: resultResDataOrder.data.inventory,
            activeCoupons: resultResDataOrder.data.disCount,
            pendingOrders: resultResDataOrder.data.orderProcess,
          });
        } else {
          alert("Lấy dữ liệu data báo cáo");
        }

        const resDiscount = await fetch(
          `https://huunghi.id.vn/api/function/getDiscountExpiringSoon`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${JSON.parse(typeTokenLocal)} ${JSON.parse(
                accessTokenLocal
              )}`,
            },
          }
        );
        if (resDiscount.ok) {
          const resultResDiscount = await resDiscount.json();
          setListVoucher(resultResDiscount.data.discount);
        } else {
          alert("Lấy dữ liệu data báo cáo");
        }

        setIsLoading(false);
      } else {
        router.push("/user/userprofile");
      }
    } else {
      router.push("/login");
    }
  };

  useEffect(() => {
    fetchDefaultData();
  }, [dayData]);

  // Dữ liệu mẫu - thay thế bằng API thực tế
  const [data, setData] = useState({
    totalOrders: 1285,
    todayOrders: 24,
    revenue: 18500000,
    todayRevenue: 1250000,
    newCustomers: 15,
    lowStockProducts: 8,
    activeCoupons: 12,
    pendingOrders: 5,
  });

  // Dữ liệu biểu đồ
  const [revenueData, setRevenueData] = useState<revenue[]>();

  const [orderStatusData, setOrderStatusData] = useState<data[]>([]);

  const topProducts = [
    { name: "Áo thun nam", sales: 125 },
    { name: "Quần jean nữ", sales: 98 },
    { name: "Giày thể thao", sales: 75 },
    { name: "Túi xách da", sales: 60 },
    { name: "Ví nam", sales: 45 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // Widget thống kê
  const stats = [
    {
      icon: "🛒",
      title: "Tổng đơn hàng",
      value: data.totalOrders,
      // change: '+12%',
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: "💵",
      title: "Doanh thu",
      value: `${(data.revenue / 1000000).toFixed(1)} triệu`,
      // change: '+8%',
      color: "bg-green-100 text-green-600",
    },
    {
      icon: "👥",
      title: "Khách hàng mới",
      value: data.newCustomers,
      // change: '+5%',
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: "📦",
      title: "Sản phẩm tồn kho",
      value: data.lowStockProducts,
      // change: '2 sắp hết',
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      icon: "🎫",
      title: "Mã giảm giá",
      value: data.activeCoupons,
      // change: '3 sắp hết hạn',
      color: "bg-pink-100 text-pink-600",
    },
    {
      icon: "⚠️",
      title: "Đơn cần xử lý",
      value: data.pendingOrders,
      // change: '2 chờ xác nhận',
      color: "bg-red-100 text-red-600",
    },
  ];

  // Danh sách đơn hàng mới
  const recentOrders = [
    {
      id: "#DH20230025",
      customer: "Trần Văn An",
      amount: "850.000₫",
      status: "Đã giao",
      time: "15 phút trước",
    },
    {
      id: "#DH20230026",
      customer: "Lê Thị Mai",
      amount: "1.250.000₫",
      status: "Đang xử lý",
      time: "30 phút trước",
    },
    {
      id: "#DH20230027",
      customer: "Phạm Văn Đức",
      amount: "550.000₫",
      status: "Đang giao",
      time: "1 giờ trước",
    },
    {
      id: "#DH20230028",
      customer: "Nguyễn Thị Hương",
      amount: "1.450.000₫",
      status: "Đã hủy",
      time: "2 giờ trước",
    },
  ];

  console.log(dayData);

  if (isLoading) {
    return (
      <div
        id="loading-screen"
        className="fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-500"
      >
        <div className="flex flex-col items-center space-y-6">
          <div className="text-3xl font-semibold tracking-widest text-black uppercase">
            VERVESTYLE
          </div>
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-gray-700 tracking-wide">
            Đang khởi động trải nghiệm của bạn...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Dashboard Bán Hàng
            </h1>
            <p className="text-sm text-gray-500">
              Tổng quan hoạt động cửa hàng
            </p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <select
              value={dayData}
              onChange={(e: any) => setDayData(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm bg-white"
            >
              <option value="day">Hôm nay</option>
              <option value="week">Tuần này</option>
              <option value="month">Tháng này</option>
            </select>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 flex items-center">
              <span className="mr-2">Xuất báo cáo</span>
              <i className="fas fa-download"></i>
            </button>
          </div>
        </div>

        {/* Thống kê tổng quan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`w-10 h-10 rounded-full ${stat.color} flex items-center justify-center text-xl`}
                >
                  {stat.icon}
                </div>
                {/* <span className="text-xs text-gray-500">{stat.change}</span> */}
              </div>
              <div className="mt-2">
                <h3 className="text-lg font-semibold">{stat.value}</h3>
                <p className="text-xs text-gray-500">{stat.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Biểu đồ chính */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Biểu đồ doanh thu */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Doanh thu theo tháng</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis
                    tickFormatter={(value) =>
                      `${(value / 1000000).toFixed(0)}tr`
                    }
                  />
                  <Tooltip
                    formatter={(value) => [
                      `${Number(value).toLocaleString("vi-VN")}₫`,
                      "Doanh thu",
                    ]}
                  />
                  <Bar dataKey="revenue" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Biểu đồ trạng thái đơn */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-4">Trạng thái đơn hàng</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {orderStatusData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value} đơn`, "Số lượng"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Hàng hóa và đơn hàng */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Sản phẩm bán chạy */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Sản phẩm bán chạy</h2>
              <a href="#" className="text-sm text-indigo-600 hover:underline">
                Xem tất cả
              </a>
            </div>
            <div className="space-y-4">
              {productBestSeller?.map(
                (product, index) =>
                  index < 5 && (
                    <div
                      key={product.id_san_pham}
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded mr-3">
                          <img
                            className="rounded"
                            src={`https://huunghi.id.vn/storage/products/${product.images[0].link_anh}`}
                            alt=""
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">
                            {product.ten_san_pham}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {product.gia_da_giam.toLocaleString("vi-VN")} đ
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {product.variant_orders_count} đã bán
                        </p>
                        <p
                          className={`text-xs ${
                            product.product_variants_sum_so_luong < 10
                              ? "text-red-500"
                              : "text-gray-500"
                          }`}
                        >
                          Còn {product.product_variants_sum_so_luong} sản phẩm
                        </p>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>

          {/* Sản phẩm bán chậm */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Sản phẩm bán chậm</h2>
              <a href="#" className="text-sm text-indigo-600 hover:underline">
                Xem tất cả
              </a>
            </div>
            <div className="space-y-4">
              {productBestSellerAsc?.map(
                (product, index) =>
                  index < 5 && (
                    <div
                      key={product.id_san_pham}
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded mr-3">
                          <img
                            className="rounded"
                            src={`https://huunghi.id.vn/storage/products/${product.images[0].link_anh}`}
                            alt=""
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">
                            {product.ten_san_pham}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {product.gia_da_giam.toLocaleString("vi-VN")} đ
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {product.variant_orders_count} đã bán
                        </p>
                        <p
                          className={`text-xs ${
                            product.product_variants_sum_so_luong < 10
                              ? "text-red-500"
                              : "text-gray-500"
                          }`}
                        >
                          Còn {product.product_variants_sum_so_luong} sản phẩm
                        </p>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>

        {/* Phần mới: Đánh giá và phản hồi của khách hàng */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quản lý mã giảm giá */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Mã giảm giá sắp hết hạn</h2>
              <button className="text-sm bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700">
                + Thêm mã
              </button>
            </div>
            <div className="space-y-3">
              {listVoucher.map((coupon, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50"
                >
                  <div>
                    <div className="font-medium text-indigo-600">
                      {coupon.ma_giam_gia}
                    </div>
                    <div className="text-sm text-gray-500">
                      {coupon.loai_giam_gia == "phan_tram"
                        ? coupon.gia_tri_giam + "%"
                        : coupon.gia_tri_giam.toLocaleString("vi-VN") + " đ"}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-amber-600">
                      {new Date(coupon.ngay_het_han).toLocaleDateString(
                        "vi-VN"
                      ) +
                        " - " +
                        new Date(coupon.ngay_bat_dau).toLocaleDateString(
                          "vi-VN"
                        )}
                    </div>
                    <div className="text-xs text-gray-500">
                      Đã dùng: {coupon.order_count}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-center">
              <Link href={`/admin/voucher`}>
                <button className="text-indigo-600 hover:underline text-sm font-medium">
                  Xem tất cả mã giảm giá
                </button>
              </Link>
            </div>
          </div>
          {/* Đánh giá và phản hồi của khách hàng */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Đánh giá của khách hàng</h2>
            </div>

            {/* Thống kê đánh giá */}
            <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-500">
                  {pointStart
                    ? Number(
                        pointStart.one * 1 +
                          pointStart.two * 2 +
                          pointStart.three * 3 +
                          pointStart.four * 4 +
                          pointStart.five * 5
                      ) / pointStart.all
                    : 0}
                </div>
                <div className="flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-amber-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div className="text-xs text-gray-500">
                  Dựa trên {pointStart.all} đánh giá
                </div>
              </div>
              <div className="w-2/3 space-y-2">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center">
                    <span className="w-8 text-sm">{star} sao</span>
                    <div className="flex-1 mx-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400"
                        style={{
                          width: `${
                            star === 5
                              ? (pointStart.five / pointStart.all) * 100
                              : star === 4
                              ? (pointStart.four / pointStart.all) * 100
                              : star === 3
                              ? (pointStart.three / pointStart.all) * 100
                              : star === 2
                              ? (pointStart.two / pointStart.all) * 100
                              : (pointStart.one / pointStart.all) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-xs w-8 text-gray-500">
                      {star === 5
                        ? (pointStart.five / pointStart.all) * 100 + "%"
                        : star === 4
                        ? (pointStart.four / pointStart.all) * 100 + "%"
                        : star === 3
                        ? (pointStart.three / pointStart.all) * 100 + "%"
                        : star === 2
                        ? (pointStart.two / pointStart.all) * 100 + "%"
                        : (pointStart.one / pointStart.all) * 100 + "%"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-3 text-center">
              <Link href={`/admin/evalue`}>
                <button className="text-indigo-600 hover:underline text-sm font-medium">
                  Xem tất cả đánh giá
                </button>
              </Link>
            </div>
          </div>
          {/* Đơn hàng mới
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Đơn hàng gần đây</h2>
              <a href="#" className="text-sm text-indigo-600 hover:underline">
                Xem tất cả
              </a>
            </div>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                >
                  <div>
                    <h3 className="font-medium">{order.id}</h3>
                    <p className="text-sm text-gray-500">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{order.amount}</p>
                    <div className="flex items-center justify-end">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          order.status === "Đã giao"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Đang giao"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "Đang xử lý"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
