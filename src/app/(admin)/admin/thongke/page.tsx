
"use client";

import { useState } from "react";

export default function DashboardReportPage() {
  const [timeRange, setTimeRange] = useState("month");

  return (
    <div className="min-h-screen bg-gray-100 font-inter">
      {/* Main */}
      <main className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Thống Kê & Báo Cáo</h1>
            <p className="text-sm text-gray-500">Tổng quan hoạt động kinh doanh cửa hàng</p>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-outline px-4 py-2 border border-gray-300 text-gray-700 rounded text-sm">
              <i className="fas fa-file-export mr-2"></i> Xuất báo cáo
            </button>
            <button className="btn btn-primary px-4 py-2 bg-indigo-600 text-white rounded text-sm">
              <i className="fas fa-print mr-2"></i> In báo cáo
            </button>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white rounded shadow-sm p-4 mb-6 flex flex-wrap gap-4 justify-between items-center">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium text-gray-700">Xem theo:</span>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value="day">Hôm nay</option>
              <option value="week">Tuần này</option>
              <option value="month">Tháng này</option>
              <option value="quarter">Quý này</option>
              <option value="year">Năm nay</option>
              <option value="custom">Tùy chọn</option>
            </select>
          </div>

          {timeRange === "custom" && (
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium text-gray-700">Từ:</span>
              <input type="date" className="border border-gray-300 rounded px-2 py-1 text-sm" />
              <span className="font-medium text-gray-700">Đến:</span>
              <input type="date" className="border border-gray-300 rounded px-2 py-1 text-sm" />
              <button className="bg-indigo-600 text-white px-3 py-1 rounded text-sm">
                <i className="fas fa-filter mr-2"></i>Lọc
              </button>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mb-6">
          {[
            { icon: "shopping-bag", label: "Tổng đơn hàng", value: "1,248", trend: "+12.5%", color: "primary" },
            { icon: "dollar-sign", label: "Tổng doanh thu", value: "186.5 triệu", trend: "+8.3%", color: "success" },
            { icon: "boxes", label: "Sản phẩm bán ra", value: "2,845", trend: "-3.2%", color: "warning" },
            { icon: "users", label: "Khách hàng mới", value: "328", trend: "+5.7%", color: "danger" }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-4 rounded shadow-sm flex items-center">
              <div className={`w-12 h-12 flex items-center justify-center rounded-full text-white bg-${item.color === "primary" ? "indigo" : item.color === "success" ? "green" : item.color === "warning" ? "yellow" : "red"}-500 mr-4`}>
                <i className={`fas fa-${item.icon}`}></i>
              </div>
              <div>
                <h3 className="text-sm text-gray-500 font-medium mb-1">{item.label}</h3>
                <h2 className="text-xl font-semibold text-gray-900">{item.value}</h2>
                <p className={`text-xs mt-1 ${item.trend.startsWith("-") ? "text-red-500" : "text-green-600"}`}>
                  <i className={`fas fa-arrow-${item.trend.startsWith("-") ? "down" : "up"} mr-1`}></i>
                  {item.trend} so với tháng trước
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Top Products and Inventory */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-4 rounded shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base font-semibold text-gray-900">Sản phẩm bán chạy</h2>
              <a href="#" className="text-sm text-indigo-600">Xem tất cả</a>
            </div>
            {[{
              name: "Áo thun nam cổ tròn",
              category: "Áo thun",
              sales: 428,
              revenue: "64.2 triệu",
              image: "https://via.placeholder.com/48"
            }, {
              name: "Quần jean nữ ống suông",
              category: "Quần jean",
              sales: 356,
              revenue: "89 triệu",
              image: "https://via.placeholder.com/48"
            }, {
              name: "Váy liền thun cổ vuông",
              category: "Váy đầm",
              sales: 298,
              revenue: "44.7 triệu",
              image: "https://via.placeholder.com/48"
            }, {
              name: "Áo khoác dù nam",
              category: "Áo khoác",
              sales: 215,
              revenue: "75.25 triệu",
              image: "https://via.placeholder.com/48"
            }].map((item, idx) => (
              <div key={idx} className="flex items-center py-3 border-b last:border-b-0">
                <img src={item.image} alt={item.name} className="w-12 h-12 rounded mr-4" />
                <div className="flex-1">
                  <div className="font-medium text-gray-900 text-sm">{item.name}</div>
                  <div className="text-gray-500 text-xs">{item.category}</div>
                </div>
                <div className="text-right text-sm">
                  <div className="font-semibold text-gray-900">{item.sales} lượt bán</div>
                  <div className="text-gray-500 text-xs">{item.revenue}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-4 rounded shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Tình trạng tồn kho</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between"><span>Tổng sản phẩm</span><span className="font-semibold">1,245</span></li>
              <li className="flex justify-between"><span>Còn hàng</span><span className="font-semibold">856</span></li>
              <li className="flex justify-between"><span>Sắp hết hàng</span><span className="font-semibold">217</span></li>
              <li className="flex justify-between"><span>Hết hàng</span><span className="font-semibold">172</span></li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Tỉ lệ tồn kho theo danh mục</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between"><span>Áo thun</span><span className="font-semibold">35%</span></li>
              <li className="flex justify-between"><span>Quần jean</span><span className="font-semibold">25%</span></li>
              <li className="flex justify-between"><span>Váy đầm</span><span className="font-semibold">20%</span></li>
              <li className="flex justify-between"><span>Áo khoác</span><span className="font-semibold">15%</span></li>
            </ul>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded shadow-sm">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-base font-semibold text-gray-900">Đơn hàng gần đây</h2>
            <a href="#" className="text-sm text-indigo-600">Xem tất cả</a>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-4 font-medium text-gray-700">Mã đơn</th>
                  <th className="p-4 font-medium text-gray-700">Khách hàng</th>
                  <th className="p-4 font-medium text-gray-700">Ngày đặt</th>
                  <th className="p-4 font-medium text-gray-700">Tổng tiền</th>
                  <th className="p-4 font-medium text-gray-700">Trạng thái</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: "#DH231101", name: "Trần Văn Bình", date: "01/11/2023", amount: "1.250.000đ", status: "Đã giao", color: "green" },
                  { id: "#DH231031", name: "Lê Thị Hương", date: "31/10/2023", amount: "890.000đ", status: "Đang giao", color: "yellow" },
                  { id: "#DH231030", name: "Phạm Đức Anh", date: "30/10/2023", amount: "2.150.000đ", status: "Đã hủy", color: "red" },
                  { id: "#DH231029", name: "Nguyễn Minh Tuấn", date: "29/10/2023", amount: "1.750.000đ", status: "Đang xử lý", color: "blue" }
                ].map((order, idx) => (
                  <tr key={idx} className="border-b last:border-b-0">
                    <td className="p-4">{order.id}</td>
                    <td className="p-4">{order.name}</td>
                    <td className="p-4">{order.date}</td>
                    <td className="p-4">{order.amount}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${order.color}-100 text-${order.color}-800`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <a href="#" className="text-indigo-600 text-sm">Chi tiết</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
