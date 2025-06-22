"use client";

import { useState } from "react";

export default function VoucherManager() {
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingVoucher, setEditingVoucher] = useState(null);
  const [formData, setFormData] = useState({
    code: "",
    type: "",
    value: "",
    min: "",
    start: "",
    end: "",
    status: "Đang hoạt động",
    statusColor: "bg-green-100 text-green-800"
  });

  const [vouchers, setVouchers] = useState([
    {
      code: "SALE20",
      type: "Giảm 20%",
      value: "20%",
      min: "300.000đ",
      start: "01/06/2023",
      end: "30/06/2023",
      status: "Đang hoạt động",
      statusColor: "bg-green-100 text-green-800"
    },
    {
      code: "FREESHIP",
      type: "Miễn phí ship",
      value: "0đ",
      min: "150.000đ",
      start: "15/05/2023",
      end: "15/06/2023",
      status: "Đang hoạt động",
      statusColor: "bg-green-100 text-green-800"
    },
    {
      code: "SUMMER50",
      type: "Giảm 50K",
      value: "50.000đ",
      min: "200.000đ",
      start: "01/05/2023",
      end: "31/05/2023",
      status: "Đã hết hạn",
      statusColor: "bg-red-100 text-red-700"
    },
    {
      code: "WELCOME10",
      type: "Giảm 10%",
      value: "10%",
      min: "0đ",
      start: "01/06/2023",
      end: "30/06/2023",
      status: "Đang hoạt động",
      statusColor: "bg-green-100 text-green-800"
    },
    {
      code: "VIP100",
      type: "Giảm 100K",
      value: "100.000đ",
      min: "500.000đ",
      start: "10/06/2023",
      end: "10/07/2023",
      status: "Sắp hoạt động",
      statusColor: "bg-yellow-100 text-yellow-800"
    }
  ]);

  const handleDelete = (code) => {
    if (confirm("Bạn có chắc chắn muốn xóa voucher này?")) {
      setVouchers(vouchers.filter((v) => v.code !== code));
    }
  };

  const handleEdit = (voucher) => {
    setEditMode(true);
    setShowForm(true);
    setEditingVoucher(voucher.code);
    setFormData({ ...voucher });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      setVouchers((prev) =>
        prev.map((v) => (v.code === editingVoucher ? formData : v))
      );
    } else {
      setVouchers((prev) => [...prev, formData]);
    }
    setShowForm(false);
    setEditMode(false);
    setEditingVoucher(null);
    setFormData({
      code: "",
      type: "",
      value: "",
      min: "",
      start: "",
      end: "",
      status: "Đang hoạt động",
      statusColor: "bg-green-100 text-green-800"
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-7xl mx-auto p-8">
        <header className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Quản lý Voucher</h1>
            <p className="text-sm text-gray-500">Tạo mới và quản lý mã giảm giá</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100 flex items-center">
              <i className="fas fa-file-export mr-2" /> Xuất file
            </button>
            <button
              onClick={() => { setShowForm(true); setEditMode(false); setFormData({ code: "", type: "", value: "", min: "", start: "", end: "", status: "Đang hoạt động", statusColor: "bg-green-100 text-green-800" }); }}
              className="px-4 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center"
            >
              <i className="fas fa-plus mr-2" /> Thêm mới
            </button>
          </div>
        </header>

        {showForm && (
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">{editMode ? 'Chỉnh sửa Voucher' : 'Thêm mới Voucher'}</h2>
            </div>
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-1">Mã giảm giá</label>
                  <input name="code" type="text" className="w-full border border-gray-300 rounded px-4 py-2 text-sm" placeholder="Mã" value={formData.code} onChange={handleChange} required disabled={editMode} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Loại giảm giá</label>
                  <input name="type" type="text" className="w-full border border-gray-300 rounded px-4 py-2 text-sm" placeholder="Loại" value={formData.type} onChange={handleChange} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Giá trị giảm</label>
                  <input name="value" type="text" className="w-full border border-gray-300 rounded px-4 py-2 text-sm" placeholder="Giá trị" value={formData.value} onChange={handleChange} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Đơn tối thiểu</label>
                  <input name="min" type="text" className="w-full border border-gray-300 rounded px-4 py-2 text-sm" placeholder="Tối thiểu" value={formData.min} onChange={handleChange} required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-1">Ngày bắt đầu</label>
                    <input name="start" type="date" className="w-full border border-gray-300 rounded px-4 py-2 text-sm" value={formData.start} onChange={handleChange} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Ngày kết thúc</label>
                    <input name="end" type="date" className="w-full border border-gray-300 rounded px-4 py-2 text-sm" value={formData.end} onChange={handleChange} required />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <button type="button" onClick={() => { setShowForm(false); setEditMode(false); setEditingVoucher(null); }} className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100">Hủy</button>
                  <button type="submit" className="px-4 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700">{editMode ? 'Cập nhật' : 'Lưu'}</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Danh sách voucher giữ nguyên */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Danh sách Voucher</h2>
          </div>
          <div className="overflow-x-auto p-6">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  {["Mã giảm giá", "Loại giảm giá", "Giá trị", "Đơn tối thiểu", "Ngày bắt đầu", "Ngày kết thúc", "Trạng thái", "Thao tác"].map((h) => (
                    <th key={h} className="p-3 text-left font-medium text-gray-700 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {vouchers.map((v) => (
                  <tr key={v.code} className="border-b last:border-none hover:bg-gray-50">
                    <td className="p-4 font-semibold whitespace-nowrap">{v.code}</td>
                    <td className="p-4">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">{v.type}</span>
                    </td>
                    <td className="p-4 whitespace-nowrap">{v.value}</td>
                    <td className="p-4 whitespace-nowrap">{v.min}</td>
                    <td className="p-4 whitespace-nowrap">{v.start}</td>
                    <td className="p-4 whitespace-nowrap">{v.end}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${v.statusColor}`}>{v.status}</span>
                    </td>
                    <td className="p-4 space-x-2">
                      <button
                        onClick={() => handleEdit(v)}
                        className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:border-indigo-500 text-indigo-600"
                      >
                        <i className="fas fa-pencil-alt" />
                      </button>
                      <button
                        onClick={() => handleDelete(v.code)}
                        className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:border-red-500 text-red-600"
                      >
                        <i className="fas fa-trash" />
                      </button>
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
