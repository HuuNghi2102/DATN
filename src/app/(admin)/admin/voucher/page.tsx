"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faPencil, faSearch } from '@fortawesome/free-solid-svg-icons';
import { getAPIVouchers, addVoucher, deleteVoucher, editVoucher } from "../services/voucherServices";
import interfaceVoucher from "../types/voucher";
import { CreateVoucher } from "../types/voucher";

export default function VoucherManager() {
  // State quản lý form
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingVoucher, setEditingVoucher] = useState<null | number>(null);
  const [errorMessages, setErrorMessages] = useState<Record<string, string[]>>({});
  
  // State form data
  const [formData, setFormData] = useState<CreateVoucher>({
    ma_giam_gia: "",
    loai_giam_gia: "",
    gia_tri_giam: 0,
    gia_tri_don_hang: 0,
    ngay_bat_dau: "",
    ngay_het_han: "",
    trang_thai: -1,
  });

  // State dữ liệu voucher
  const [vouchers, setVouchers] = useState<interfaceVoucher[]>([]);
  
  // State bộ lọc
  const [searchCode, setSearchCode] = useState("");
  const [discountValueFilter, setDiscountValueFilter] = useState<number | "">("");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Options cho giá trị giảm
  const discountValueOptions = [
    { value: 100000, label: "100.000 VNĐ" },
    { value: 200000, label: "200.000 VNĐ" },
    { value: 500000, label: "500.000 VNĐ" },
    { value: 10000000, label: "1.000.000 VNĐ" },
    { value: 20000000, label: "2.000.000 VNĐ" },
  ];

  // Lấy dữ liệu voucher từ API
  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const data = await getAPIVouchers();
        setVouchers(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu voucher:", error);
      }
    };

    fetchVouchers();
  }, []);

  // Hàm lọc voucher
  const filteredVouchers = vouchers.filter(voucher => {
    // Lọc theo mã
    if (searchCode && !voucher.ma_giam_gia.toLowerCase().includes(searchCode.toLowerCase())) {
      return false;
    }
    
    // Lọc theo giá trị giảm
    if (discountValueFilter !== "" && voucher.gia_tri_giam !== discountValueFilter) {
      return false;
    }

    // Lọc theo ngày bắt đầu
    if (startDateFilter && new Date(voucher.ngay_bat_dau) < new Date(startDateFilter)) {
      return false;
    }

    // Lọc theo trạng thái
    if (statusFilter !== "all") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const startDate = new Date(voucher.ngay_bat_dau);
      const endDate = new Date(voucher.ngay_het_han);

      switch (statusFilter) {
        case "active":
          return startDate <= today && endDate >= today && voucher.trang_thai === 1;
        case "inactive":
          return voucher.trang_thai === 0;
        case "expired":
          return endDate < today;
        case "upcoming":
          return startDate > today;
        default:
          return true;
      }
    }

    return true;
  });

  // Xử lý thay đổi form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "trang_thai" || type === "number" ? Number(value) : value,
    }));
  };

  // Thêm voucher mới
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await addVoucher(formData);
      
      if (result.success) {
        const newData = await getAPIVouchers();
        setVouchers(newData);
        resetForm();
        alert("Thêm voucher thành công!");
      } else {
        setErrorMessages(result.errors || {});
      }
    } catch (error) {
      console.error("Lỗi khi thêm voucher:", error);
      alert("Thêm voucher thất bại!");
    }
  };

  // Cập nhật voucher
  const handleSubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVoucher) return;

    try {
      const result = await editVoucher(editingVoucher, formData);
      
      if (result.success) {
        const newData = await getAPIVouchers();
        setVouchers(newData);
        resetForm();
        alert("Cập nhật voucher thành công!");
      } else {
        setErrorMessages(result.errors || {});
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật voucher:", error);
      alert("Cập nhật voucher thất bại!");
    }
  };

  // Xóa voucher
  const handleDelete = async (id: string | number) => {
    if (!confirm("Bạn có chắc chắn muốn xóa voucher này?")) return;
    
    try {
      const success = await deleteVoucher(id);
      if (success) {
        const updated = await getAPIVouchers();
        setVouchers(updated);
        alert("Xóa voucher thành công!");
      } else {
        alert("Xóa voucher thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi xóa voucher:", error);
      alert("Đã xảy ra lỗi khi xóa voucher!");
    }
  };

  // Reset form
  const resetForm = () => {
    setShowForm(false);
    setEditMode(false);
    setEditingVoucher(null);
    setFormData({
      ma_giam_gia: "",
      loai_giam_gia: "",
      gia_tri_giam: 0,
      gia_tri_don_hang: 0,
      ngay_bat_dau: "",
      ngay_het_han: "",
      trang_thai: -1,
    });
    setErrorMessages({});
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Quản lý Voucher</h1>
            <p className="text-sm text-gray-500">Tạo mới và quản lý mã giảm giá</p>
          </div>
          <button
            onClick={() => {
              setShowForm(true);
              setEditMode(false);
              setFormData({
                ma_giam_gia: "",
                loai_giam_gia: "",
                gia_tri_giam: 0,
                gia_tri_don_hang: 0,
                ngay_bat_dau: "",
                ngay_het_han: "",
                trang_thai: -1,
              });
            }}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" /> Thêm mới
          </button>
        </header>

        {/* Bộ lọc */}
        <div className="bg-white rounded-lg shadow mb-6 p-6">
          <h3 className="font-medium mb-4">Bộ lọc voucher</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Lọc theo mã */}
            <div>
              <label className="block text-sm font-medium mb-1"> Mã giảm giá</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  placeholder="Nhập mã cần tìm..."
                  className="w-full pl-8 pr-4 py-2 border rounded"
                />
                <FontAwesomeIcon 
                  icon={faSearch} 
                  className="absolute left-3 top-3 text-gray-400"
                />
              </div>
            </div>

            {/* Lọc theo giá trị giảm */}
            <div>
              <label className="block text-sm font-medium mb-1"> Giá trị giảm</label>
              <select
                value={discountValueFilter}
                onChange={(e) => setDiscountValueFilter(e.target.value ? Number(e.target.value) : "")}
                className="w-full px-4 py-2 border rounded"
              >
                <option value="">Tất cả giá trị</option>
                {discountValueOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Lọc theo ngày bắt đầu */}
            <div>
              <label className="block text-sm font-medium mb-1"> Ngày bắt đầu từ</label>
              <input
                type="date"
                value={startDateFilter}
                onChange={(e) => setStartDateFilter(e.target.value)}
                className="w-full px-4 py-2 border rounded"
              />
            </div>

            {/* Lọc theo trạng thái */}
            <div>
              <label className="block text-sm font-medium mb-1"> Trạng thái</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border rounded"
              >
                <option value="all">Tất cả</option>
                <option value="active">Đang hoạt động</option>
                <option value="inactive">Dừng hoạt động</option>
                <option value="expired">Hết hạn</option>
                <option value="upcoming">Chưa bắt đầu</option>
              </select>
            </div>
          </div>
        </div>

        {/* Form thêm/sửa voucher */}
        {showForm && (
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">
                {editMode ? "Chỉnh sửa Voucher" : "Thêm Voucher mới"}
              </h2>
            </div>
            <div className="p-6">
              <form onSubmit={editMode ? handleSubmitEdit : handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Mã giảm giá *</label>
                  <input
                    name="ma_giam_gia"
                    value={formData.ma_giam_gia}
                    onChange={handleChange}
                    required
                    className="w-full border px-4 py-2 rounded"
                  />
                  {errorMessages.ma_giam_gia && (
                    <p className="text-red-500 text-sm mt-1">{errorMessages.ma_giam_gia[0]}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Loại giảm giá *</label>
                  <input
                    name="loai_giam_gia"
                    value={formData.loai_giam_gia}
                    onChange={handleChange}
                    required
                    className="w-full border px-4 py-2 rounded"
                  />
                  {errorMessages.loai_giam_gia && (
                    <p className="text-red-500 text-sm mt-1">{errorMessages.loai_giam_gia[0]}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Giá trị giảm *</label>
                    <select
                      name="gia_tri_giam"
                      value={formData.gia_tri_giam}
                      onChange={handleChange}
                      required
                      className="w-full border px-4 py-2 rounded"
                    >
                      <option value="" disabled>Chọn giá trị giảm</option>
                      {discountValueOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errorMessages.gia_tri_giam && (
                      <p className="text-red-500 text-sm mt-1">{errorMessages.gia_tri_giam[0]}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Đơn tối thiểu *</label>
                    <input
                      name="gia_tri_don_hang"
                      type="number"
                      value={formData.gia_tri_don_hang}
                      onChange={handleChange}
                      required
                      min="0"
                      className="w-full border px-4 py-2 rounded"
                    />
                    {errorMessages.gia_tri_don_hang && (
                      <p className="text-red-500 text-sm mt-1">{errorMessages.gia_tri_don_hang[0]}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Ngày bắt đầu *</label>
                    <input
                      name="ngay_bat_dau"
                      type="date"
                      value={formData.ngay_bat_dau}
                      onChange={handleChange}
                      required
                      className="w-full border px-4 py-2 rounded"
                    />
                    {errorMessages.ngay_bat_dau && (
                      <p className="text-red-500 text-sm mt-1">{errorMessages.ngay_bat_dau[0]}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Ngày kết thúc *</label>
                    <input
                      name="ngay_het_han"
                      type="date"
                      value={formData.ngay_het_han}
                      onChange={handleChange}
                      required
                      className="w-full border px-4 py-2 rounded"
                    />
                    {errorMessages.ngay_het_han && (
                      <p className="text-red-500 text-sm mt-1">{errorMessages.ngay_het_han[0]}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Trạng thái *</label>
                  <select
                    name="trang_thai"
                    value={formData.trang_thai}
                    onChange={handleChange}
                    required
                    className="w-full border px-4 py-2 rounded"
                  >
                    <option value={-1} disabled>Chọn trạng thái</option>
                    <option value={1}>Hoạt động</option>
                    <option value={0}>Dừng hoạt động</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border rounded hover:bg-gray-100"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  >
                    {editMode ? "Cập nhật" : "Thêm mới"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Danh sách voucher */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">
              Danh sách Voucher <span className="text-gray-500">({filteredVouchers.length})</span>
            </h2>
          </div>
          <div className="overflow-x-auto p-6">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Mã giảm giá</th>
                  <th className="p-3 text-left">Loại giảm giá</th>
                  <th className="p-3 text-left">Giá trị</th>
                  <th className="p-3 text-left">Đơn tối thiểu</th>
                  <th className="p-3 text-left">Ngày bắt đầu</th>
                  <th className="p-3 text-left">Ngày kết thúc</th>
                  <th className="p-3 text-left">Trạng thái</th>
                  <th className="p-3 text-left">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredVouchers.length > 0 ? (
                  filteredVouchers.map((voucher) => (
                    <tr key={voucher.id_ma_giam_gia} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-semibold">{voucher.ma_giam_gia}</td>
                      <td className="p-4">{voucher.loai_giam_gia}</td>
                      <td className="p-4">{voucher.gia_tri_giam.toLocaleString()} VNĐ</td>
                      <td className="p-4">{voucher.gia_tri_don_hang?.toLocaleString() || '0'} VNĐ</td>
                      <td className="p-4">{new Date(voucher.ngay_bat_dau).toLocaleDateString('vi-VN')}</td>
                      <td className="p-4">{new Date(voucher.ngay_het_han).toLocaleDateString('vi-VN')}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          voucher.trang_thai === 1 ? "bg-green-500 text-white" : "bg-red-500 text-white"
                        }`}>
                          {voucher.trang_thai === 1 ? "Hoạt động" : "Dừng hoạt động"}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setShowForm(true);
                              setEditMode(true);
                              setEditingVoucher(voucher.id_ma_giam_gia);
                              setFormData({
                                ma_giam_gia: voucher.ma_giam_gia,
                                loai_giam_gia: voucher.loai_giam_gia,
                                gia_tri_giam: voucher.gia_tri_giam,
                                gia_tri_don_hang: voucher.gia_tri_don_hang || 0,
                                ngay_bat_dau: voucher.ngay_bat_dau,
                                ngay_het_han: voucher.ngay_het_han,
                                trang_thai: voucher.trang_thai,
                              });
                            }}
                            className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:border-indigo-500 text-indigo-600"
                          >
                            <FontAwesomeIcon icon={faPencil} />
                          </button>
                          <button
                            onClick={() => handleDelete(voucher.id_ma_giam_gia)}
                            className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:border-red-500 text-red-600"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="p-4 text-center text-gray-500">
                      Không tìm thấy voucher nào phù hợp
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}