"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";

export default function CustomerManager() {
  const [customers] = useState([
    {
      id: "KH001",
      name: "Trần Văn Bình",
      phone: "0345 678 901",
      email: "binhtran@gmail.com",
      registered: "15/06/2022",
      orders: 12,
      totalSpent: "8.450.000đ",
      group: "VIP",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: "KH002",
      name: "Lê Thị Mai",
      phone: "0987 654 321",
      email: "maile@gmail.com",
      registered: "14/03/2023",
      orders: 5,
      totalSpent: "3.250.000đ",
      group: "Thường xuyên",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Quản lý Khách hàng
          </h1>
          <p className="text-gray-500 text-sm">
            Xem và quản lý tất cả khách hàng của cửa hàng
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded text-sm font-medium text-gray-700 bg-white shadow">
            <i className="fas fa-file-export mr-2"></i>Xuất file
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded text-sm font-medium"
          >
            <i className="fas fa-plus mr-2"></i>Thêm khách hàng
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded shadow mb-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Thêm khách hàng mới
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Họ tên
              </label>
              <input
              maxLength={255}
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                placeholder="Nhập họ tên"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
              maxLength={255}
                type="email"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                placeholder="example@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số điện thoại
              </label>
              <input
              maxLength={255}
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                placeholder="Nhập số điện thoại"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nhóm khách hàng
              </label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                <option>VIP</option>
                <option>Thường xuyên</option>
                <option>Mới</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-4 gap-2">
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded bg-white"
            >
              Hủy
            </button>
            <button className="px-4 py-2 text-sm text-white bg-indigo-600 rounded">
              Lưu
            </button>
          </div>
        </div>
      )}

      <div className="bg-white p-4 rounded shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nhóm khách hàng
          </label>
          <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
            <option>Tất cả nhóm</option>
            <option>VIP</option>
            <option>Thường xuyên</option>
            <option>Mới</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ngày đăng ký
          </label>
          <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
            <option>Tất cả thời gian</option>
            <option>Hôm nay</option>
            <option>Tuần này</option>
            <option>Tháng này</option>
            <option>Tùy chọn...</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tìm kiếm
          </label>
          <input
          maxLength={255}
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            placeholder="Tìm theo tên, SĐT, email..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Số đơn hàng
          </label>
          <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
            <option>Tất cả</option>
            <option>Chưa mua hàng</option>
            <option>1-5 đơn</option>
            <option>Trên 5 đơn</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded shadow">
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h2 className="font-semibold text-lg">Danh sách khách hàng</h2>
          <span className="text-sm text-gray-500">
            Tổng: {customers.length} khách hàng
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-2 text-left">Khách hàng</th>
                <th className="px-4 py-2 text-left">Thông tin liên hệ</th>
                <th className="px-4 py-2 text-left">Ngày đăng ký</th>
                <th className="px-4 py-2 text-left">Tổng đơn hàng</th>
                <th className="px-4 py-2 text-left">Tổng chi tiêu</th>
                <th className="px-4 py-2 text-left">Nhóm</th>
                <th className="px-4 py-2 text-left">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((cus) => (
                <tr key={cus.id} className="border-t">
                  <td className="px-4 py-3 flex items-center gap-3">
                    <img
                      src={cus.avatar}
                      alt={cus.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium text-gray-800">
                        {cus.name}
                      </div>
                      <div className="text-xs text-gray-500">ID: {cus.id}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>{cus.phone}</div>
                    <div className="text-xs text-gray-500">{cus.email}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{cus.registered}</td>
                  <td className="px-4 py-3 text-gray-700">{cus.orders}</td>
                  <td className="px-4 py-3 text-gray-700">{cus.totalSpent}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${
                        cus.group === "VIP"
                          ? "bg-indigo-100 text-indigo-600"
                          : cus.group === "Thường xuyên"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {cus.group}
                    </span>
                  </td>
                  <td className="">
                    <button
                      className="text-indigo-600 mx-1 hover:text-indigo-800"
                      title="Xem chi tiết"
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button
                      className="text-yellow-600 mx-1 hover:text-yellow-800"
                      title="Chỉnh sửa"
                    >
                      <FontAwesomeIcon icon={faPencil} />
                    </button>
                    <button
                      className="text-red-500 mx-1 hover:text-red-700"
                      title="Xóa"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
