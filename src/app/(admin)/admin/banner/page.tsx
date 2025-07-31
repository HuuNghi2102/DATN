"use client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const GET_BANNER_URL = "https://huunghi.id.vn/api/banner/getBannerIndex";
const POST_BANNER_URL = "https://huunghi.id.vn/api/banner/addBanner";
const DELETE_BANNER_URL = "https://huunghi.id.vn/api/banner/deleteBanner/";

interface Banner {
  id: number;
  link_banner: string;
  trang_thai: number;
  vi_tri: string;
  created_at: string;
  updated_at: string;
}

const BannerManagerPage = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [form, setForm] = useState({
    title: "",
    position: "",
    status: 1 | 0,
    image: null as File | null,
  });

  const fetchBanners = () => {
    const token = localStorage.getItem("accessToken");
    axios
      .get(GET_BANNER_URL, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setBanners(res.data?.data?.banners || []))
      .catch((err) => console.error("Lỗi load API:", err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setForm((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    if (!token) return alert("Vui lòng đăng nhập lại.");

    const data = new FormData();
    data.append("title", form.title);
    data.append("position", form.position);
    data.append("status", form.status.toString());
    if (!form.image) return alert("Vui lòng chọn ảnh banner");
    data.append("image", form.image);

    try {
      const res = await axios.post(POST_BANNER_URL, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });

      setShowForm(false);
      setForm({ title: "", position: "", status: 1, image: null });
      setBanners((prev) => [res.data.banner, ...prev]);
    } catch (err: any) {
      const message = err.response?.data
        ? JSON.stringify(err.response.data)
        : "Lỗi không xác định";
      alert("❌ Gửi API thất bại: " + message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Bạn có chắc chắn muốn xoá banner này?")) return;
    const token = localStorage.getItem("accessToken");

    try {
      await axios.delete(`${DELETE_BANNER_URL}${id}`, {
        headers: { Authorization: `Bearer ${JSON.parse(token!)}` },
      });
      setBanners(banners.filter((banner) => banner.id !== id));
    } catch (err) {
      console.error("❌ Lỗi xoá banner:", err);
      alert("Không thể xoá banner. Kiểm tra lại quyền hoặc trạng thái server.");
    }
  };

  //
  // Thêm các hàm xử lý mới vào component
  const handleMoveToTop = async (id: number) => {
    const token = localStorage.getItem("accessToken");
    try {
      await axios.put(
        `https://huunghi.id.vn/api/banner/moveToTop/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${JSON.parse(token!)}` },
        }
      );
      fetchBanners();
    } catch (err) {
      console.error("Lỗi khi đưa banner lên đầu:", err);
      alert("Không thể thay đổi vị trí banner");
    }
  };

  const handleToggleStatus = async (id: number) => {
    console.log(id);
    const token = localStorage.getItem("accessToken");
    try {
      await axios.patch(
        `https://huunghi.id.vn/api/banner/changeStatus/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${JSON.parse(token!)}` },
        }
      );
      setBanners(
        banners.map((banner) =>
          banner.id == id
            ? { ...banner, trang_thai: banner.trang_thai == 1 ? 0 : 1 }
            : banner
        )
      );
    } catch (err) {
      console.error("Lỗi khi thay đổi trạng thái:", err);
      alert("Không thể thay đổi trạng thái banner");
    }
  };

  const handleChangePosition = async (id: number, newPosition: string) => {
    const token = localStorage.getItem("accessToken");
    try {
      await axios.patch(
        `https://huunghi.id.vn/api/banner/changePosition/${id}`,
        {
          position: newPosition,
        },
        {
          headers: { Authorization: `Bearer ${JSON.parse(token!)}` },
        }
      );
      setBanners(
        banners.map((banner) =>
          banner.id == id ? { ...banner, vi_tri: newPosition } : banner
        )
      );
    } catch (err) {
      console.error("Lỗi khi thay đổi vị trí:", err);
      alert("Không thể thay đổi vị trí banner");
    }
  };

  const handleChangePriority = async (id: number, priority: number) => {
    const token = localStorage.getItem("accessToken");
    try {
      await axios.put(
        `https://huunghi.id.vn/api/banner/changePriority/${id}`,
        {
          priority,
        },
        {
          headers: { Authorization: `Bearer ${JSON.parse(token!)}` },
        }
      );
      fetchBanners();
    } catch (err) {
      console.error("Lỗi khi thay đổi ưu tiên:", err);
      alert("Không thể thay đổi độ ưu tiên");
    }
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
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-700">Quản lý Banner</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          {showForm ? "Đóng" : "+ Thêm banner"}
        </button>
      </header>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded shadow p-6 mb-8 grid gap-4 md:grid-cols-2"
        >
          <select
            name="status"
            value={form.position}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="1">Hoạt động</option>
            <option value="0">Không hoạt động</option>
          </select>
          <select
            name="position"
            value={form.position}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="">-- Vị trí hiển thị --</option>
            <option value="trang_chu">Trang chủ</option>
            <option value="trang_san_pham">Trang sản phẩm</option>
          </select>

          <div className="col-span-2">
            <label
              htmlFor="image-upload"
              className="block border border-dashed p-6 text-center text-gray-600 rounded cursor-pointer hover:bg-gray-50"
            >
              Chọn ảnh banner (JPG, PNG)
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            {form.image && (
              <div className="mt-4 text-center">
                <img
                  src={URL.createObjectURL(form.image)}
                  alt="preview"
                  className="w-40 h-24 object-cover rounded mx-auto border"
                />
              </div>
            )}
          </div>

          <div className="col-span-2 text-right">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Lưu banner
            </button>
          </div>
        </form>
      )}

      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 font-medium">Hình ảnh</th>
              <th className="p-3 font-medium">Vị trí</th>
              <th className="p-3 font-medium">Trạng thái</th>

              <th className="p-3 font-medium">Ngày tạo</th>
              <th className="p-3 font-medium">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {banners.map((banner) => (
              <tr key={banner.id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <img
                    src={`https://huunghi.id.vn/storage/banners/${banner.link_banner}`}
                    alt="Banner"
                    className="w-32 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-3">
                  <select
                    value={banner.vi_tri}
                    onChange={(e) =>
                      handleChangePosition(banner.id, e.target.value)
                    }
                    className="border p-1 rounded text-xs"
                  >
                    <option value="trang_chu">Trang chủ</option>
                    <option value="trang_san_pham">Trang sản phẩm</option>
                  </select>
                </td>
                <td className="p-3">
                  <span
                    onClick={() => handleToggleStatus(banner.id)}
                    className={`px-2 py-1 rounded-full text-xs cursor-pointer ${
                      banner.trang_thai == 1
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {banner.trang_thai == 1 ? "Đang hoạt động" : "Tạm ngưng"}
                  </span>
                </td>
                <td className="p-3">
                  {banner.created_at
                    ? new Date(banner.created_at).toLocaleString()
                    : "N/A"}
                </td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => handleDelete(banner.id)}
                    className="w-8 h-8 border border-gray-300  flex items-center justify-center   text-red-500 text-xs rounded hover:border-red-600"
                    title="Xóa"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
            {banners.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  Chưa có banner nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BannerManagerPage;
