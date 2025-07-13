"use client";

import React from "react";
import "@/app/globals.css";

const PendingPostsPage = () => {
  const posts = [
    {
      id: "#BV005",
      title: "Hướng dẫn sử dụng sản phẩm phiên bản 2023",
      category: "Tin tức",
      author: "Nguyễn Văn A",
      date: "15/06/2023",
      status: "Chờ duyệt",
    },
    {
      id: "#BV006",
      title: "Khuyến mãi đặc biệt tháng 6",
      category: "Khuyến mãi",
      author: "Trần Thị B",
      date: "14/06/2023",
      status: "Chờ duyệt",
    },
    {
      id: "#BV007",
      title: "Sự kiện ra mắt sản phẩm mới",
      category: "Sự kiện",
      author: "Lê Văn C",
      date: "13/06/2023",
      status: "Chỉnh sửa lại",
    },
    {
      id: "#BV008",
      title: "Kinh nghiệm chọn sản phẩm phù hợp",
      category: "Blog",
      author: "Nguyễn Văn A",
      date: "12/06/2023",
      status: "Chờ duyệt",
    },
    {
      id: "#BV009",
      title: "Thông báo bảo trì hệ thống",
      category: "Tin tức",
      author: "Trần Thị B",
      date: "10/06/2023",
      status: "Chờ duyệt",
    },
  ];

  const statusColor = (status) =>
    status === "Chỉnh sửa lại"
      ? "bg-blue-100 text-blue-800"
      : "bg-yellow-100 text-yellow-800";

  const filters = {
    "Danh mục": ["Tất cả danh mục", "Tin tức", "Khuyến mãi", "Sự kiện", "Blog"],
    "Ngày đăng": ["Tất cả thời gian", "Hôm nay", "Tuần này", "Tháng này"],
    "Người đăng": [
      "Tất cả người đăng",
      "Nguyễn Văn A",
      "Trần Thị B",
      "Lê Văn C",
    ],
    "Sắp xếp": ["Mới nhất", "Cũ nhất"],
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans p-8">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Bài viết chờ xác nhận</h1>
          <p className="text-sm text-gray-500">
            Danh sách bài viết đang chờ phê duyệt
          </p>
        </div>
        <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100">
          <i className="fas fa-clock mr-2"></i> Bài viết chờ xác nhận
        </button>
      </header>

      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6">
          <div className="flex flex-wrap gap-4">
            {Object.entries(filters).map(([label, options], idx) => (
              <div key={idx} className="flex flex-col min-w-[200px] flex-1">
                <label className="mb-2 text-sm font-medium text-gray-700">
                  {label}
                </label>
                <select className="border border-gray-300 rounded px-3 py-2 text-sm bg-white">
                  {options.map((opt, i) => (
                    <option key={i}>{opt}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">
            Danh sách bài viết chờ duyệt
          </h2>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            {posts.length} bài viết chờ xử lý
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                {[
                  "ID",
                  "Tiêu đề",
                  "Danh mục",
                  "Người đăng",
                  "Ngày đăng",
                  "Trạng thái",
                  "Thao tác",
                ].map((th, i) => (
                  <th
                    key={i}
                    className="px-4 py-3 font-medium text-gray-700 border-b border-gray-200"
                  >
                    {th}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {posts.map((post, idx) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 border-b border-gray-200">
                    {post.id}
                  </td>
                  <td className="px-4 py-4 border-b border-gray-200">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded overflow-hidden mr-3">
                        <img
                          src="https://via.placeholder.com/40"
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span>{post.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 border-b border-gray-200">
                    {post.category}
                  </td>
                  <td className="px-4 py-4 border-b border-gray-200">
                    {post.author}
                  </td>
                  <td className="px-4 py-4 border-b border-gray-200">
                    {post.date}
                  </td>
                  <td className="px-4 py-4 border-b border-gray-200">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${statusColor(
                        post.status
                      )}`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 border-b border-gray-200">
                    <div className="flex gap-2">
                      {["eye", "check", "times", "pencil-alt"].map(
                        (icon, i) => (
                          <button
                            key={i}
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 hover:text-gray-700 text-gray-500"
                          >
                            <i className={`fas fa-${icon}`}></i>
                          </button>
                        )
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Hiển thị 1-5 của 15 bài viết
          </div>
          <div className="flex gap-1">
            {["chevron-left", "1", "2", "3", "chevron-right"].map(
              (label, i) => (
                <button
                  key={i}
                  className={`w-9 h-9 rounded flex items-center justify-center border text-sm ${
                    label === "1"
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {isNaN(label) ? <i className={`fas fa-${label}`}></i> : label}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingPostsPage;
