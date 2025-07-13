"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import {
  getAPIVouchers,
  addVoucher,
  deleteVoucher,
  editVoucher,
} from "../services/voucherServices";
import interfaceVoucher from "../types/voucher";
import { CreateVoucher } from "../types/voucher";

export default function VoucherManager() {
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingVoucher, setEditingVoucher] = useState<null | number>(null);
  const [errorMessages, setErrorMessages] = useState<Record<string, string[]>>(
    {}
  );
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
  }, []);

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
            <p className="text-sm text-gray-500">
              Tạo mới và quản lý mã giảm giá
            </p>
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
              <form
                onSubmit={editMode ? handleSubmitEdit : handleSubmit}
                className="space-y-5"
              >
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
                    <p className="text-red-500 text-sm mt-1">
                      {errorMessages.codeVoucher[0]}
                    </p>
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
                  <tr
                    key={i}
                    className="border-b last:border-none hover:bg-gray-50"
                  >
                    <td className="p-4 font-semibold whitespace-nowrap">
                      {voucher.ma_giam_gia}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      {voucher.loai_giam_gia}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      {voucher?.gia_tri_giam
                        ? `${voucher?.gia_tri_giam.toLocaleString()} VNĐ`
                        : "0 VNĐ"}
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
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          Number(voucher.trang_thai) === 1
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {Number(voucher.trang_thai) === 1
                          ? "Đang hoạt động"
                          : "Dừng hoạt động"}
                      </span>
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
      </main>
    </div>
  );
}
