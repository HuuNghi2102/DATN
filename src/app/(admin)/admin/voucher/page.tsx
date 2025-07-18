"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faPencil, faRepeat } from '@fortawesome/free-solid-svg-icons';
import { addVoucher, deleteVoucher, editVoucher } from "../services/voucherServices";
import interfaceVoucher from "../types/voucher";
import { CreateVoucher } from "../types/voucher";
import { changeStatusVoucher } from "../services/voucherServices";
export default function VoucherManager() {
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingVoucher, setEditingVoucher] = useState<null | number>(null);
  const [errorMessages, setErrorMessages] = useState<Record<string, string[]>>({});
  const [formData, setFormData] = useState<CreateVoucher>({
    ma_giam_gia: "",
    loai_giam_gia: "",
    gia_tri_giam: 0,
    gia_tri_don_hang: 0,
    ngay_bat_dau: "",
    ngay_het_han: "",
    trang_thai: -1,
  });
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
  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const data = await getAPIVouchers();
        setVouchers(data);
      } catch (error) {
        console.error("Lỗi khi fetch vouchers:", error);
      }
    };

    fetchVouchers();
  }, [currentPage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "trang_thai" || type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await addVoucher(formData);

    if (result.success) {
      const newData = await getAPIVouchers();
      setVouchers(newData);
      setFormData({
        ma_giam_gia: "",
        loai_giam_gia: "",
        gia_tri_giam: 1,
        gia_tri_don_hang: 1,
        ngay_bat_dau: "",
        ngay_het_han: "",
        trang_thai: -1,
      });
      setErrorMessages({});
      setShowForm(false);
      alert("Thêm voucher thành công!");
    } else {
      setErrorMessages(result.errors || {});
    }
  };

  const handleDelete = async (idVoucher: string | number) => {
    const success = await deleteVoucher(idVoucher);
    if (success) {
      alert("✔️ Xoá thành công!");
      const updated = await getAPIVouchers();
      setVouchers(updated);
    } else {
      alert("❌ Xoá voucher thất bại!");
    }
  };
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const handleSubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editMode && editingVoucher !== null) {
        const result = await editVoucher(editingVoucher, formData);
        if (result.success === false) {
          setErrorMessages(result.errors || {});
          return;
        }
      } else {
        await addVoucher(formData);
      }

      const newData = await getAPIVouchers();
      setVouchers(newData);
      setShowForm(false);
      setFormData({
        ma_giam_gia: "",
        loai_giam_gia: "",
        gia_tri_giam: 1,
        gia_tri_don_hang: 1,
        ngay_bat_dau: "",
        ngay_het_han: "",
        trang_thai: -1,
      });
      setEditMode(false);
      setEditingVoucher(null);
      setErrorMessages({});
      alert("Thành công");
    } catch (err: any) {
      console.error("Lỗi khi gọi editVoucher:", err);
      alert("❌ Cập nhật thất bại. Xem log console để biết thêm.");
    }
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
            <button
              onClick={() => {
                setShowForm(true);
                setEditMode(false);
                setFormData({
                  ma_giam_gia: "",
                  loai_giam_gia: "",
                  gia_tri_giam: 1,
                  gia_tri_don_hang: 1,
                  ngay_bat_dau: "",
                  ngay_het_han: "",
                  trang_thai: -1,
                });
              }}
              className="px-4 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" /> Thêm mới
            </button>
          </div>
        </header>

        {showForm && (
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">
                {editMode ? "Chỉnh sửa Voucher" : "Thêm mới Voucher"}
              </h2>
            </div>
            <div className="p-6">
              <form onSubmit={editMode ? handleSubmitEdit : handleSubmit} className="space-y-5">
                <div>
                  <input
                    name="ma_giam_gia"
                    value={formData.ma_giam_gia}
                    onChange={handleChange}
                    required
                    placeholder="Mã giảm giá"
                    className="w-full border px-4 py-2 rounded"
                  />
                  {errorMessages.codeVoucher && (
                    <p className="text-red-500 text-sm mt-1">{errorMessages.codeVoucher[0]}</p>
                  )}
                </div>

                <div>
                  <input
                    name="loai_giam_gia"
                    value={formData.loai_giam_gia}
                    onChange={handleChange}
                    required
                    placeholder="Loại giảm giá"
                    className="w-full border px-4 py-2 rounded"
                  />
                  {errorMessages.typeVoucher && (
                    <p className="text-red-500 text-sm mt-1">{errorMessages.typeVoucher[0]}</p>
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
                    <p className="text-red-500 text-sm mt-1">{errorMessages.valueRedution[0]}</p>
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
                    <p className="text-red-500 text-sm mt-1">{errorMessages.minOrderValue[0]}</p>
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
                    <p className="text-red-500 text-sm mt-1">{errorMessages.dateStart[0]}</p>
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
                    <p className="text-red-500 text-sm mt-1">{errorMessages.dateEnd[0]}</p>
                  )}
                </div>

                <div>
                  <select
                    name="trang_thai"
                    value={formData.trang_thai}
                    onChange={handleChange}
                    required
                    className="w-full border px-4 py-2 rounded"
                  >
                    <option value={-1} disabled>-- Chọn trạng thái --</option>
                    <option value={1}>Đang hoạt động</option>
                    <option value={0}>Dừng hoạt động</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 border rounded"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded"
                  >
                    Lưu
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Danh sách Voucher</h2>
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
                    "Thao tác"
                  ].map((h) => (
                    <th key={h} className="p-3 text-left font-medium text-gray-700 whitespace-nowrap">
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
                      {voucher?.gia_tri_don_hang ? `${voucher?.gia_tri_don_hang.toLocaleString()} VNĐ` : "0 VNĐ"}
                    </td>
                    <td className="p-4 whitespace-nowrap">{new Date(voucher.ngay_bat_dau).toLocaleDateString('vi-VN')}</td>
                    <td className="p-4 whitespace-nowrap">{new Date(voucher.ngay_het_han).toLocaleDateString('vi-VN')}</td>
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

                      {/* <button
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
                        className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:border-yellow-500 text-yellow-600"
                        title="Đổi trạng thái"
                      >
                        <FontAwesomeIcon icon={faRepeat} />
                      </button> */}
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