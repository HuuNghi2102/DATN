"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("address");
  const [user, setUser] = useState<any>(null);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  );
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string>("");
  const [typeToken, setTypeToken] = useState<string>("");
  const [addressForm, setAddressForm] = useState({
    id_dia_chi_giao_hang: null,
    ten_nguoi_nhan: "",
    so_dien_thoai_nguoi_nhan: "",
    dia_chi_nguoi_nhan: "",
    mac_dinh: 0,
  });

  const [errorFormAddress, setErrFormAddress] = useState({
    ten_nguoi_nhan: "",
    so_dien_thoai_nguoi_nhan: "",
    dia_chi_nguoi_nhan: "",
  });

  useEffect(() => {
    const defaultAddress = addresses.find((addr) => addr.isDefault);
    if (defaultAddress) {
      setSelectedAddressId(defaultAddress.id_dia_chi_giao_hang);
    }
  }, [addresses]);

  useEffect(() => {
    const u = localStorage.getItem("user");
    const accessTokenLocal = localStorage.getItem("accessToken");
    const typeTokenLocal = localStorage.getItem("typeToken");
    if (u && accessTokenLocal && typeTokenLocal) {
      setTypeToken(JSON.parse(typeTokenLocal));
      setAccessToken(JSON.parse(accessTokenLocal));
      setUser(JSON.parse(u));
      const fetchAddress = async () => {
        const res = await fetch(
          "https://huunghi.id.vn/api/address/listAddress",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${JSON.parse(typeTokenLocal)} ${JSON.parse(
                accessTokenLocal
              )}`,
            },
          }
        );
        const result = await res.json();
        const address = result.data.address;
        setAddresses(address);
        setIsLoading(false);
      };
      fetchAddress();
    } else {
      toast.error("Vui lòng đăng nhập");
      router.push("/login");
    }
  }, []);

  const handleSetDefault = async (id: number) => {
    console.log(typeToken);
    console.log(accessToken);
    const res = await fetch(
      `https://huunghi.id.vn/api/address/changeDefautAddress/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${typeToken} ${accessToken}`,
        },
      }
    );
    if (res.ok) {
      toast.success("Đã đặt làm địa chỉ mặc định!");
      setAddresses((prev) =>
        prev.map((address) =>
          address.id_dia_chi_giao_hang == id
            ? { ...address, mac_dinh: 1 }
            : { ...address, mac_dinh: 0 }
        )
      );
    } else {
      toast.error("Đặt làm địa chỉ mặc định không thành công!");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setAddressForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? value : 0) : value,
    }));
  };

  const handleEditAddress = (address: any) => {
    setAddressForm({
      id_dia_chi_giao_hang: address.id_dia_chi_giao_hang,
      ten_nguoi_nhan: address.ten_nguoi_nhan,
      so_dien_thoai_nguoi_nhan: address.so_dien_thoai_nguoi_nhan,
      dia_chi_nguoi_nhan: address.dia_chi_nguoi_nhan,
      mac_dinh: address.mac_dinh,
    });
    setIsEditing(true);
    setShowAddressForm(true);
  };

  const handleAddNewAddress = () => {
    setAddressForm({
      id_dia_chi_giao_hang: null,
      ten_nguoi_nhan: "",
      so_dien_thoai_nguoi_nhan: "",
      dia_chi_nguoi_nhan: "",
      mac_dinh: 0,
    });
    setIsEditing(false);
    setShowAddressForm(true);
  };

  const handleDeleteAddress = async (id: number) => {
    const confirmDelete = confirm("Bạn có chắc chắn muốn xóa địa chỉ này?");
    if (!confirmDelete) return;

    const accessTokenLocal = localStorage.getItem("accessToken");
    const typeTokenLocal = localStorage.getItem("typeToken");

    if (accessTokenLocal && typeTokenLocal) {
      try {
        const response = await fetch(
          `https://huunghi.id.vn/api/address/deleteAddress/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${JSON.parse(typeTokenLocal)} ${JSON.parse(
                accessTokenLocal
              )}`,
            },
          }
        );

        const result = await response.json();

        if (result.status == true) {
          // Refresh the address list
          const res = await fetch(
            "https://huunghi.id.vn/api/address/listAddress",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `${JSON.parse(typeTokenLocal)} ${JSON.parse(
                  accessTokenLocal
                )}`,
              },
            }
          );
          const updatedResult = await res.json();
          setAddresses(updatedResult.data.address);
          toast.success("Xóa địa chỉ thành công!");
        }
      } catch (error) {
        console.error("Error deleting address:", error);
        toast.error("Xóa địa chỉ thất bại!");
      }
    } else {
      toast.error("Bạn vui lòng đăng nhập để tiếp tục!");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrFormAddress({
      ten_nguoi_nhan: "",
      so_dien_thoai_nguoi_nhan: "",
      dia_chi_nguoi_nhan: "",
    });

    const accessTokenLocal = localStorage.getItem("accessToken");
    const typeTokenLocal = localStorage.getItem("typeToken");

    if (accessTokenLocal && typeTokenLocal) {
      try {
        let response;
        if (isEditing) {
          console.log(addressForm.ten_nguoi_nhan);
          // Update existing address
          response = await fetch(
            `https://huunghi.id.vn/api/address/updateAddress/${addressForm.id_dia_chi_giao_hang}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `${JSON.parse(typeTokenLocal)} ${JSON.parse(
                  accessTokenLocal
                )}`,
              },
              body: JSON.stringify({
                name: addressForm.ten_nguoi_nhan,
                address: addressForm.dia_chi_nguoi_nhan,
                phone: addressForm.so_dien_thoai_nguoi_nhan,
              }),
            }
          );
        } else {
          // Add new address
          response = await fetch(
            "https://huunghi.id.vn/api/address/addAddress",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `${JSON.parse(typeTokenLocal)} ${JSON.parse(
                  accessTokenLocal
                )}`,
              },
              body: JSON.stringify({
                name: addressForm.ten_nguoi_nhan,
                address: addressForm.dia_chi_nguoi_nhan,
                phone: addressForm.so_dien_thoai_nguoi_nhan,
                default: addressForm.mac_dinh,
              }),
            }
          );
        }

        const result = await response.json();

        if (result.status == false && result.errors) {
          setErrFormAddress({
            ten_nguoi_nhan:
              result.errors?.name?.length > 0 ? result.errors.name[0] : "",
            so_dien_thoai_nguoi_nhan:
              result.errors?.phone?.length > 0 ? result.errors.phone[0] : "",
            dia_chi_nguoi_nhan:
              result.errors?.address?.length > 0
                ? result.errors?.address[0]
                : "",
          });
          return;
        }

        if (result.status == true) {
          // Refresh the address list
          const res = await fetch(
            "https://huunghi.id.vn/api/address/listAddress",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `${JSON.parse(typeTokenLocal)} ${JSON.parse(
                  accessTokenLocal
                )}`,
              },
            }
          );
          const updatedResult = await res.json();
          setAddresses(updatedResult.data.address);
          setShowAddressForm(false);
          setAddressForm({
            id_dia_chi_giao_hang: null,
            ten_nguoi_nhan: "",
            so_dien_thoai_nguoi_nhan: "",
            dia_chi_nguoi_nhan: "",
            mac_dinh: 0,
          });
          setIsEditing(false);
          toast.success(
            isEditing
              ? "Cập nhật địa chỉ thành công!"
              : "Thêm địa chỉ mới thành công!"
          );
        }
      } catch (error) {
        console.error("Error saving address:", error);
        toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
      }
    } else {
      toast.error("Bạn vui lòng đăng nhập để tiếp tục!");
      window.location.href = "/login";
    }
  };

  const menuItems = [
    { icon: "fas fa-user", text: "Hồ sơ của tôi", href: "/user/userprofile" },
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
      active: true,
    },
    { icon: "fas fa-ticket-alt", text: "Vouchers", href: "" },
    {
      icon: "fas fa-heart",
      text: "Sản phẩm đã xem",
      href: "/user/sanphamdaxem",
    },
    { icon: "fas fa-lock", text: "Đổi mật khẩu", href: "/user/changePassword" },
  ];

  if (isLoading) {
    return (
      <div
        id="loading-screen"
        className="fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-500"
      >
        <div className="flex flex-col items-center space-y-6">
          {/* Logo hoặc icon tùy chọn */}
          <div className="text-3xl font-semibold tracking-widest text-black uppercase">
            VERVESTYLE
          </div>

          {/* Vòng quay */}
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>

          {/* Nội dung loading */}
          <p className="text-sm text-gray-700 tracking-wide">
            Đang khởi động trải nghiệm của bạn...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-[10%]">
      {/* Font Awesome CDN */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      />

      {/* Breadcrumb */}
      <div className="bg-white border-b px-40 py-3">
        <div className="max-w-[1200px] mx-auto">
          <nav className="text-sm text-gray-600">
            <span>
              <a href="/">Trang chủ</a>
            </span>{" "}
            / <span className="font-medium">Sổ địa chỉ</span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto p-4 flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-80 bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b bg-gray-50 rounded-t-lg">
            <div className="flex items-center gap-2">
              <i className="fas fa-user text-gray-600"></i>
              <span className="font-medium">Tài khoản của bạn</span>
            </div>
          </div>
          <div className="p-2">
            <div className="text-sm text-gray-600 px-3 py-2">
              Hi, {user?.ten_user || user?.name || "Khách"}
            </div>
            <ul className="space-y-1">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link href={item.href}>
                    <button
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors ${
                        item.active
                          ? "bg-black text-white"
                          : "text-gray-700 hover:bg-gray-50"
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
        <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-6">ĐỊA CHỈ</h2>

          <div className="space-y-4">
            {addresses.map((address) => (
              <div
                key={address.id_dia_chi_giao_hang}
                className="border rounded-lg p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <input
                        type="radio"
                        name="address"
                        checked={1 === address.mac_dinh}
                        onChange={() =>
                          handleSetDefault(address.id_dia_chi_giao_hang)
                        }
                        className="w-4 h-4 accent-black"
                      />
                      <span className="font-semibold text-lg">
                        {address.ten_nguoi_nhan}
                      </span>
                      <span className="text-gray-600">
                        {address.so_dien_thoai_nguoi_nhan}
                      </span>
                      <button
                        onClick={() => handleEditAddress(address)}
                        className="text-blue-500 text-sm hover:underline"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteAddress(address.id_dia_chi_giao_hang)
                        }
                        className="text-red-500 text-sm hover:underline"
                      >
                        Xóa
                      </button>
                    </div>

                    <div className="ml-7">
                      <p className="text-gray-700 mb-1">
                        {address.dia_chi_nguoi_nhan}
                      </p>
                      {address.fullAddress && (
                        <p className="text-gray-700 mb-3">
                          {address.dia_chi_nguoi_nhan}
                        </p>
                      )}

                      {address.mac_dinh == 1 && (
                        <span className="inline-block bg-black text-white px-3 py-1 rounded-full text-sm">
                          mặc định
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {showAddressForm && (
              <div className="border rounded-lg p-6 relative">
                <button
                  onClick={() => {
                    setShowAddressForm(false);
                    setIsEditing(false);
                  }}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-times"></i>
                </button>
                <h3 className="text-lg font-semibold mb-4">
                  {isEditing ? "Sửa địa chỉ" : "Thêm địa chỉ mới"}
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tên người nhận
                      </label>
                      <input
                        type="text"
                        name="ten_nguoi_nhan"
                        value={addressForm.ten_nguoi_nhan}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                      />
                    </div>
                    {errorFormAddress.ten_nguoi_nhan && (
                      <p className="text-red-500 text-sm">
                        {errorFormAddress.ten_nguoi_nhan}*
                      </p>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Số điện thoại
                      </label>
                      <input
                        type="tel"
                        name="so_dien_thoai_nguoi_nhan"
                        value={addressForm.so_dien_thoai_nguoi_nhan}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                      />
                    </div>
                    {errorFormAddress.so_dien_thoai_nguoi_nhan && (
                      <p className="text-red-500 text-sm">
                        {errorFormAddress.so_dien_thoai_nguoi_nhan}*
                      </p>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Địa chỉ
                      </label>
                      <input
                        type="text"
                        name="dia_chi_nguoi_nhan"
                        value={addressForm.dia_chi_nguoi_nhan}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                      />
                    </div>
                    {errorFormAddress.dia_chi_nguoi_nhan && (
                      <p className="text-red-500 text-sm">
                        {errorFormAddress.dia_chi_nguoi_nhan}*
                      </p>
                    )}
                    {!isEditing && (
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="mac_dinh"
                          value={1}
                          onChange={handleInputChange}
                          className="w-4 h-4 accent-black"
                        />
                        <label className="ml-2 text-sm text-gray-700">
                          Đặt làm địa chỉ mặc định
                        </label>
                      </div>
                    )}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
                      >
                        {isEditing ? "Cập nhật địa chỉ" : "Lưu địa chỉ"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {!showAddressForm && (
              <button
                onClick={handleAddNewAddress}
                className="w-full bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center justify-center space-x-2">
                  <span className="font-medium">Nhập địa chỉ mới</span>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
      {addressForm.mac_dinh}
    </div>
  );
}
