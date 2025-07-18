"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faPencil, faRepeat,faSearch } from '@fortawesome/free-solid-svg-icons';
import { addVoucher, deleteVoucher, editVoucher } from "../services/voucherServices";
import interfaceVoucher from "../types/voucher";
import { CreateVoucher } from "../types/voucher";
import { changeStatusVoucher } from "../services/voucherServices";
export default function VoucherManager() {
  // State quản lý form
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingVoucher, setEditingVoucher] = useState<null | number>(null);
  const [errorMessages, setErrorMessages] = useState<Record<string, string[]>>(
    {}
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(20);
  const getAPIVouchers = async (): Promise<interfaceVoucher[]> => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const typeToken = localStorage.getItem("typeToken");
      if (accessToken && typeToken) {
        const parseaccessToken = JSON.parse(accessToken);
        const parsetypeToken = JSON.parse(typeToken);

        const res = await fetch(`https://huunghi.id.vn/api/voucher/listVoucher?page=${currentPage}`, {
          method: "GET",
          headers: {
            "Authorization": `${parsetypeToken} ${parseaccessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          console.error("❌ Fetch failed:", res.status, res.statusText);
          return [];
        }

        const data = await res.json();
        const vouchers = data?.data?.vouchers?.data;
        setTotalPages(data?.data?.vouchers?.last_page || 1);
        // Kiểm tra xem data có phải array không
        if (!Array.isArray(vouchers)) {
          console.warn("❗ API không trả về mảng:", vouchers);
          return [];
        }

        return vouchers;
      } else {
        console.warn("⚠️ Không có accessToken hoặc typeToken");
        return [];
      }
    } catch (error) {
      console.error("Lỗi khi gọi getAPIVouchers:", error);
      return [];
    }
  };

  // State bộ lọc
  const [searchCode, setSearchCode] = useState("");
  const [discountValueFilter, setDiscountValueFilter] = useState<number | "">(
    ""
  );
  const [startDateFilter, setStartDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Options cho giá trị giảm
  const discountValueOptions = [
    { value: "phan_tram", label: "Phần trăm" },
    { value: "so_tien", label: "Số tiền" },
  ];

  // Lấy dữ liệu voucher từ API
  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const data = await getAPIVouchers();
        setVouchers(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu voucher:", error);
      }
    };

    fetchVouchers();
  }, [currentPage]);

  // Hàm lọc voucher
  const filteredVouchers = vouchers.filter((voucher) => {
    // Lọc theo mã
    if (
      searchCode &&
      !voucher.ma_giam_gia.toLowerCase().includes(searchCode.toLowerCase())
    ) {
      return false;
    }

    // Lọc theo giá trị giảm
    if (
      discountValueFilter !== "" &&
      voucher.gia_tri_giam !== discountValueFilter
    ) {
      return false;
    }

    // Lọc theo ngày bắt đầu
    if (
      startDateFilter &&
      new Date(voucher.ngay_bat_dau) < new Date(startDateFilter)
    ) {
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
          return (
            startDate <= today && endDate >= today && voucher.trang_thai === 1
          );
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
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "trang_thai" || type === "number" ? Number(value) : value,
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
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
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
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Quản lý Voucher</h1>
            <p className="text-sm text-gray-500">
              Tạo mới và quản lý mã giảm giá
            </p>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Lọc theo mã */}
            <div>
              <label className="block text-sm font-medium mb-1">
                {" "}
                Mã giảm giá
              </label>
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
              <label className="block text-sm font-medium mb-1">
                {" "}
                Giá trị giảm
              </label>
              <select
                value={discountValueFilter}
                onChange={(e) =>
                  setDiscountValueFilter(
                    e.target.value ? Number(e.target.value) : ""
                  )
                }
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

            {/* Lọc theo trạng thái */}
            <div>
              <label className="block text-sm font-medium mb-1">
                {" "}
                Trạng thái
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border rounded"
              >
                <option value="">Tất cả</option>
                <option value="dang_hoat_dong">Đang hoạt động</option>
                <option value="dung_hoat_dong">Dừng hoạt động</option>
                <option value="het_han">Hết hạn</option>
                <option value="chua_bat_dau">Chưa bắt đầu</option>
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
              <form
                onSubmit={editMode ? handleSubmitEdit : handleSubmit}
                className="space-y-5"
              >
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Mã giảm giá *
                  </label>
                  <input
                    name="ma_giam_gia"
                    value={formData.ma_giam_gia}
                    onChange={handleChange}
                    required
                    className="w-full border px-4 py-2 rounded"
                  />
                  {errorMessages.codeVoucher && (
                    <p className="text-red-500 text-sm mt-1">
                      {errorMessages.codeVoucher[0]}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Loại giảm giá *
                  </label>
                  <input
                    name="loai_giam_gia"
                    value={formData.loai_giam_gia}
                    onChange={handleChange}
                    required
                    className="w-full border px-4 py-2 rounded"
                  />
                  {errorMessages.typeVoucher && (
                    <p className="text-red-500 text-sm mt-1">
                      {errorMessages.typeVoucher[0]}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    name="gia_tri_giam"
                    type="number"
                    value={formData.gia_tri_giam}
                    onChange={handleChange}
                    required
                    placeholder="Giá trị giảm"
                    className="w-full border px-4 py-2 rounded"
                  />
                  {errorMessages.valueRedution && (
                    <p className="text-red-500 text-sm mt-1">
                      {errorMessages.valueRedution[0]}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    name="gia_tri_don_hang"
                    type="number"
                    value={formData.gia_tri_don_hang}
                    onChange={handleChange}
                    required
                    placeholder="Đơn tối thiểu"
                    className="w-full border px-4 py-2 rounded"
                  />
                  {errorMessages.minOrderValue && (
                    <p className="text-red-500 text-sm mt-1">
                      {errorMessages.minOrderValue[0]}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    name="ngay_bat_dau"
                    type="date"
                    value={formData.ngay_bat_dau}
                    onChange={handleChange}
                    required
                    className="w-full border px-4 py-2 rounded"
                  />
                  {errorMessages.dateStart && (
                    <p className="text-red-500 text-sm mt-1">
                      {errorMessages.dateStart[0]}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    name="ngay_het_han"
                    type="date"
                    value={formData.ngay_het_han}
                    onChange={handleChange}
                    required
                    className="w-full border px-4 py-2 rounded"
                  />
                  {errorMessages.dateEnd && (
                    <p className="text-red-500 text-sm mt-1">
                      {errorMessages.dateEnd[0]}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Trạng thái *
                  </label>
                  <select
                    name="trang_thai"
                    value={formData.trang_thai}
                    onChange={handleChange}
                    required
                    className="w-full border px-4 py-2 rounded"
                  >
                    <option value={-1} disabled>
                      -- Chọn trạng thái --
                    </option>
                    <option value={1}>Đang hoạt động</option>

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
              Danh sách Voucher{" "}
              <span className="text-gray-500">({filteredVouchers.length})</span>
            </h2>
          </div>
          <div className="overflow-x-auto p-6">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  {[
                    "Mã giảm giá",
                    "Loại giảm giá",
                    "Giá trị",
                    "Đơn tối thiểu",
                    "Ngày bắt đầu",
                    "Ngày kết thúc",
                    "Trạng thái",
                    "Thao tác",
                  ].map((h) => (
                    <th
                      key={h}
                      className="p-3 text-left font-medium text-gray-700 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {vouchers.map((voucher, i) => (
                  <tr key={i} className="border-b last:border-none hover:bg-gray-50">
                    <td className="p-4 font-semibold whitespace-nowrap">{voucher.ma_giam_gia}</td>
                    <td className="p-4 whitespace-nowrap">
                      {voucher.loai_giam_gia === "phan_tram" ? "Phần trăm" : "Số tiền"}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      {voucher.loai_giam_gia === "phan_tram"
                        ? `${voucher.gia_tri_giam}%`
                        : `${voucher.gia_tri_giam.toLocaleString()} VNĐ`}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      {voucher?.gia_tri_don_hang
                        ? `${voucher?.gia_tri_don_hang.toLocaleString()} VNĐ`
                        : "0 VNĐ"}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      {new Date(voucher.ngay_bat_dau).toLocaleDateString(
                        "vi-VN"
                      )}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      {new Date(voucher.ngay_het_han).toLocaleDateString(
                        "vi-VN"
                      )}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={async () => {
                          const confirmChange = confirm("Bạn có chắc chắn muốn đổi trạng thái voucher này?");
                          if (!confirmChange) return;
                          const success = await changeStatusVoucher(voucher.id_ma_giam_gia);
                          if (!success) {
                            alert("❌ Đổi trạng thái thất bại");
                          } else {
                            alert("✅ Đổi trạng thái thành công");
                            const updated = await getAPIVouchers();
                            setVouchers(updated);
                          }
                        }}
                        className=" rounded flex items-center justify-center hover:border-yellow-500 text-yellow-600"
                        title="Đổi trạng thái"
                      >
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${Number(voucher.trang_thai) === 1 ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                          {Number(voucher.trang_thai) === 1 ? "Đang hoạt động" : "Dừng hoạt động"}
                        </span>
                      </button>

                    </td>
                    <td className="p-4 flex gap-2">
                      <button
                        className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:border-indigo-500 text-indigo-600"
                        onClick={() => {
                          setShowForm(true);
                          setEditMode(true);
                          setEditingVoucher(voucher.id_ma_giam_gia);
                          setFormData({
                            ma_giam_gia: voucher.ma_giam_gia,
                            loai_giam_gia: voucher.loai_giam_gia,
                            gia_tri_giam: voucher.gia_tri_giam,
                            gia_tri_don_hang: voucher.gia_tri_don_hang ?? 0,
                            ngay_bat_dau: voucher.ngay_bat_dau,
                            ngay_het_han: voucher.ngay_het_han,
                            trang_thai: voucher.trang_thai,
                          });
                        }}
                      >
                        <FontAwesomeIcon icon={faPencil} />
                      </button>

                      <button
                        onClick={() => handleDelete(voucher.id_ma_giam_gia)}
                        className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:border-red-500 text-red-600"
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
        {/* phân trang */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-white">
          {/* Hiển thị <span className="font-medium">{(currentPage - 1) * perPage + 1}</span> đến{' '} */}
          <div className="text-sm text-gray-600">
            Hiển thị <span className="font-medium">{(currentPage - 1) * perPage + 1}</span> đến{' '}
            <span className="font-medium">{Math.min(currentPage * perPage, vouchers.length + (currentPage - 1) * perPage)}</span>{' '}
            trong tổng số <span className="font-medium">{vouchers.length}</span> voucher
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md border ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
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
                  className={`px-3 py-1 rounded-md border ${currentPage === pageNum ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
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
                className={`px-3 py-1 rounded-md border ${currentPage === totalPages ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                {totalPages}
              </button>
            )}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md border ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              Sau
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
