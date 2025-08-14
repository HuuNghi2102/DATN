"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React, { useEffect, useState, useRef } from "react";
import userInterface from "../../compoments/userInterface";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Config from "@/config";

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: File | null;
}

export default function UserProfile() {
  const [user, setUser] = useState<userInterface>();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    avatar: null,
  });
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    const accessTokenLocal = localStorage.getItem("accessToken");
    const typeTokenLocal = localStorage.getItem("typeToken");
    if (u && accessTokenLocal && typeTokenLocal) {
      const uu = JSON.parse(u);
      setUser(uu);
      if (uu.avatar_user) {
        setAvatarPreview(uu.avatar_user);
      }
    } else {
      router.push("/login");
      toast.info("Vui lòng đăng nhập");
    }
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.ten_user || "",
        email: user.email_user || "",
        phone: user.sdt_user || "",
        address: user.dia_chi_user || "",
        avatar: null,
      });
    }
  }, [user]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log(e.target.files);
      setFormData((prev) => ({ ...prev, avatar: file }));

      // Tạo preview cho avatar
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const updateUserProfile = async () => {
    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.phone === "" ||
      formData.address === ""
    ) {
      toast.warn("Bạn vui lòng điền đầy đủ thông tin");
      return;
    }

    setIsLoading(true);
    try {
      const tokenLocal = localStorage.getItem("accessToken");
      if (tokenLocal) {
        const token = JSON.parse(tokenLocal);
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("phone", formData.phone);
        formDataToSend.append("address", formData.address);
        if (formData.avatar) {
          formDataToSend.append("image", formData.avatar);
        }

        const res = await fetch(
          "https://huunghi.id.vn/api/user/changeImformationUser",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formDataToSend,
          }
        );
        const result = await res.json();

        if (res.ok) {
          localStorage.setItem("user", JSON.stringify(result.data.user));
          setUser(result.data.user);
          setIsEditing(false);
          toast.success("Cập nhật thông tin thành công!");
        } else {
          toast.error(result.message || "Có lỗi xảy ra khi cập nhật thông tin");
        }
      } else {
        toast.error("Bạn chưa đăng nhập");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Có lỗi xảy ra khi cập nhật thông tin");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const menuItems = [
    {
      icon: "fas fa-user",
      text: "Hồ sơ của tôi",
      href: "/user/userprofile",
      active: true,
    },
    {
      icon: "fas fa-clipboard-list",
      text: "Đơn hàng của tôi",
      href: "/user/history-order",
    },
    {
      icon: "fas fa-question-circle",
      text: "Yêu cầu hỗ trợ",
      href: "/user/yeucauhotro",
    },
    {
      icon: "fas fa-map-marker-alt",
      text: "Sổ địa chỉ",
      href: "/user/sodiachi",
    },
    { icon: "fas fa-heart", text: "Sản phẩm đã xem", href: "/user/sanphamdaxem" },
    { icon: "fas fa-lock", text: "Đổi mật khẩu", href: "/user/changePassword" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-[11%]">
      {/* Font Awesome CDN */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      />

      {/* Header Navigation */}
      <div className="bg-white border-b px-4 md:px-40 py-3 shadow-sm">
        <div className="max-w-[1200px] mx-auto">
          <nav className="text-sm text-gray-600">
            <span>
              <Link href="/" className="hover:text-amber-500">
                Trang chủ
              </Link>
            </span>{" "}
            / <span className="font-medium text-gray-800">Tài khoản</span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto p-4">
        {/* Desktop & Tablet Layout */}
        <div className="hidden md:flex gap-6">
          {/* Sidebar */}
          <div className="w-80 bg-white rounded-lg shadow-sm max-h-[530px] sticky top-40">
            <div className="p-4 border-b bg-gray-50 rounded-t-lg">
              <div className="flex items-center gap-2">
                <i className="fas fa-user text-gray-600"></i>
                <span className="font-medium">Tài khoản của bạn</span>
              </div>
            </div>

            <div className="p-2">
              <div className="text-sm text-gray-600 px-3 py-2">
                Xin chào,{" "}
                <span className="font-medium text-gray-800">
                  {user?.ten_user || "Người dùng"}
                </span>
              </div>

              <ul className="space-y-1">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link href={item.href}>
                      <button
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors ${
                          item.active
                            ? "bg-black text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <i className={`${item.icon} w-4`}></i>
                        <span className="text-sm">{item.text}</span>
                      </button>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  HỒ SƠ CỦA TÔI
                </h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-amber-500 transition-colors flex items-center gap-2"
                  >
                    <i className="fas fa-edit"></i>
                    <span>Chỉnh sửa</span>
                  </button>
                )}
              </div>

              {/* Avatar Section */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative group">
                  {avatarPreview ? (
                    <Image
                      src={avatarPreview}
                      alt="User Avatar"
                      width={120}
                      height={120}
                      className="rounded-full w-32 h-32 object-cover border-4 border-white shadow-md"
                    />
                  ) : user?.anh_dai_dien_user ? (
                    <img
                      src={`https://huunghi.id.vn/storage/avatars/${user?.anh_dai_dien_user}`}
                      alt="User Avatar"
                      width={120}
                      height={120}
                      className="rounded-full w-32 h-32 object-cover border-4 border-white shadow-md"
                    />
                  ) : (
                    <div className="rounded-full w-32 h-32 bg-gray-200 flex items-center justify-center border-4 border-white shadow-md">
                      <i className="fas fa-user text-4xl text-gray-400"></i>
                    </div>
                  )}

                  {isEditing && (
                    <div
                      className="absolute inset-0 rounded-full bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      onClick={triggerFileInput}
                    >
                      <i className="fas fa-camera text-white text-2xl"></i>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleAvatarChange}
                        accept="image/*"
                        className="hidden"
                        multiple
                      />
                    </div>
                  )}
                </div>
                {isEditing && (
                  <button
                    onClick={triggerFileInput}
                    className="mt-2 text-sm text-blue-600 hover:text-amber-500"
                  >
                    Thay đổi ảnh đại diện
                  </button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-6">
                  <div className="">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Tên:
                      </label>
                      <input
                        type="text"
                        name="name"
                        maxLength={50}
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full mb-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Email:
                      </label>
                      <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full mb-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100"
                        disabled
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Số điện thoại:
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full mb-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Địa chỉ:
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full mb-2   px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                    >
                      Hủy bỏ
                    </button>
                    <button
                      onClick={updateUserProfile}
                      disabled={isLoading}
                      className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-amber-500 transition-colors flex items-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <i className="fas fa-spinner fa-spin"></i>
                          <span>Đang cập nhật...</span>
                        </>
                      ) : (
                        <>
                          <i className="fas fa-save"></i>
                          <span>CẬP NHẬT</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className=" gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg mb-2">
                      <h3 className="text-sm font-medium text-gray-500 mb-1">
                        Tên:
                      </h3>
                      <p className=" font-medium text-gray-800">
                        {user?.ten_user || "Chưa cập nhật"}
                      </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg mb-2">
                      <h3 className="text-sm font-medium text-gray-500 mb-1">
                        Email:
                      </h3>
                      <p className=" font-medium text-gray-800">
                        {user?.email_user || "Chưa cập nhật"}
                      </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg mb-2">
                      <h3 className="text-sm font-medium text-gray-500 mb-1">
                        Số điện thoại:
                      </h3>
                      <p className=" font-medium text-gray-800">
                        {user?.sdt_user || "Chưa cập nhật"}
                      </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg mb-2">
                      <h3 className="text-sm font-medium text-gray-500 mb-1">
                        Địa chỉ:
                      </h3>
                      <p className=" font-medium text-gray-800">
                        {user?.dia_chi_user || "Chưa cập nhật"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="bg-white rounded-lg shadow-sm mb-4">
            {/* Mobile Header */}
            <div className="p-4 border-b bg-gray-50 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <i className="fas fa-user text-gray-600"></i>
                  <span className="font-medium">Tài khoản của bạn</span>
                </div>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-3 py-1 bg-black text-white rounded-lg font-medium text-sm hover:bg-amber-500 transition-colors"
                  >
                    <i className="fas fa-edit mr-1"></i>
                    <span>Chỉnh sửa</span>
                  </button>
                )}
              </div>
            </div>

            {/* Mobile Content */}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                HỒ SƠ CỦA TÔI
              </h2>

              {/* Avatar Mobile */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative group">
                  {avatarPreview ? (
                    <Image
                      src={avatarPreview}
                      alt="User Avatar"
                      width={100}
                      height={100}
                      className="rounded-full w-24 h-24 object-cover border-4 border-white shadow-md"
                    />
                  ) : user?.anh_dai_dien_user ? (
                    <img
                      src={`https://huunghi.id.vn/storage/avatars/${user?.anh_dai_dien_user}`}
                      alt="User Avatar"
                      width={120}
                      height={120}
                      className="rounded-full w-32 h-32 object-cover border-4 border-white shadow-md"
                    />
                  ) : (
                    <div className="rounded-full w-32 h-32 bg-gray-200 flex items-center justify-center border-4 border-white shadow-md">
                      <i className="fas fa-user text-4xl text-gray-400"></i>
                    </div>
                  )}

                  {isEditing && (
                    <div
                      className="absolute inset-0 rounded-full bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      onClick={triggerFileInput}
                    >
                      <i className="fas fa-camera text-white text-xl"></i>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleAvatarChange}
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                  )}
                </div>
                {isEditing && (
                  <button
                    onClick={triggerFileInput}
                    className="mt-2 text-sm text-blue-600 hover:text-amber-800"
                  >
                    Thay đổi ảnh đại diện
                  </button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tên
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full mb-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full mb-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100"
                      disabled
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Số điện thoại:
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full mb-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Địa chỉ:
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full mb-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium text-sm hover:bg-gray-300 transition-colors"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={updateUserProfile}
                      disabled={isLoading}
                      className="px-4 py-2 bg-black text-white rounded-lg font-medium text-sm hover:bg-amber-700 transition-colors flex items-center gap-1"
                    >
                      {isLoading ? (
                        <>
                          <i className="fas fa-spinner fa-spin"></i>
                          <span>Đang lưu...</span>
                        </>
                      ) : (
                        <>
                          <i className="fas fa-save"></i>
                          <span>Lưu</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      Tên:
                    </h3>
                    <p className="text-base font-medium text-gray-800">
                      {user?.ten_user || "Chưa cập nhật"}
                    </p>
                  </div>

                  <div className="border-b pb-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      Email:
                    </h3>
                    <p className="text-base font-medium text-gray-800">
                      {user?.email_user || "Chưa cập nhật"}
                    </p>
                  </div>

                  <div className="border-b pb-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      Số điện thoại:
                    </h3>
                    <p className="text-base font-medium text-gray-800">
                      {user?.sdt_user || "Chưa cập nhật"}
                    </p>
                  </div>

                  <div className="pb-2">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      Địa chỉ:
                    </h3>
                    <p className="text-base font-medium text-gray-800">
                      {user?.dia_chi_user || "Chưa cập nhật"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b bg-gray-50 rounded-t-lg">
              <div className="text-sm text-gray-600">
                Xin chào,{" "}
                <span className="font-medium text-gray-800">
                  {user?.ten_user || "Người dùng"}
                </span>
              </div>
            </div>

            <div className="p-2">
              <ul className="grid grid-cols-2 gap-1">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link href={item.href}>
                      <button
                        className={`w-full flex items-center gap-2 px-3 py-3 rounded-lg text-left transition-colors text-sm ${
                          item.active
                            ? "bg-black text-white"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <i className={`${item.icon} w-4`}></i>
                        <span>{item.text}</span>
                      </button>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
