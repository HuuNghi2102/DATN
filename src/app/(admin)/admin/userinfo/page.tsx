"use client";

import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ToastContainer, toast } from "react-toastify";
interface userInterface {
  id_user?: number;
  ten_user?: string;
  anh_dai_dien_user?: string;
  email_user?: string;
  email_verified_at?: string;
  mat_khau_user?: string;
  dia_chi_user?: string;
  sdt_user?: string;
  ma_otp?: number;
  trang_thai?: number;
  id_vai_tro?: number;
  remember_token?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  expires_at?: string;
}

const AccountSettingsPage = () => {
  const [avatarPreview, setAvatarPreview] = useState<string>(
    "https://tse2.mm.bing.net/th/id/OIP.HAV08yo3UOY-ot3zO_bwewAAAA?pid=Api&P=0&h=220"
  );
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [profileData, setProfileData] = useState<userInterface | null>(null);
  const [userCurrent, setUserCurrent] = useState<userInterface | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [typeToken, setTypeToken] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const [errPassword, setErrPassword] = useState({
    passOld: "",
    passNew: "",
    passConfirm: "",
  });
  const [errProfile, setErrProfile] = useState({
    ten_user: "",
    sdt_user: "",
    dia_chi_user: "",
  });
  const [formPassword, setFormPassword] = useState({
    passOld: "",
    passNew: "",
    passConfirm: "",
  });

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const data = new FormData();
    data.append("image", file as File);
    data.append("_method", "PATCH");

    const resChangeAvatar = await fetch(
      "https://huunghi.id.vn/api/user/changeAvatar",
      {
        method: "POST",
        headers: {
          Authorization: `${typeToken} ${accessToken}`,
        },
        body: data,
      }
    );

    if (resChangeAvatar.ok) {
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setAvatarPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
      const result = await resChangeAvatar.json();
      const newUser = result.data.user;
      localStorage.setItem("user", JSON.stringify(newUser));
      alert("Cập nhật ảnh đại diện thành công");
    } else {
      alert("Cập nhật ảnh đại diện không thành công");
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const tokenLocal = localStorage.getItem("accessToken");
      if (tokenLocal) {
        const token = JSON.parse(tokenLocal);
        const formDataToSend = new FormData();
        formDataToSend.append(
          "name",
          profileData?.ten_user ? profileData?.ten_user : ""
        );
        formDataToSend.append(
          "phone",
          profileData?.sdt_user ? profileData?.sdt_user : ""
        );
        formDataToSend.append(
          "address",
          profileData?.dia_chi_user ? profileData?.dia_chi_user : ""
        );
        // if (avatarPreview) {
        //   formDataToSend.append('image', avatarPreview);
        // }

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

        if (result.status == true) {
          localStorage.setItem("user", JSON.stringify(result.data.user));
          setProfileData(result.data.user);
          toast.success("Cập nhật thông tin thành công!");
        } else {
          if (result.errors) {
            const err = result.errors;
            setErrProfile({
              ten_user: err?.name ? err?.name[0] : "",
              sdt_user: err?.phone ? err?.phone[0] : "",
              dia_chi_user: err?.address ? err?.address[0] : "",
            });
            setProfileData((prev) => ({
              ...prev,
              ten_user: userCurrent?.ten_user ? userCurrent?.ten_user : "",
              sdt_user: userCurrent?.sdt_user,
              dia_chi_user: userCurrent?.dia_chi_user,
            }));
            return;
          }
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
    setIsEditingProfile(false);
    alert("Thông tin cá nhân đã được cập nhật!");
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("ok");
    const res = await fetch("https://huunghi.id.vn/api/user/changePassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${typeToken} ${accessToken}`,
      },
      body: JSON.stringify({
        password: formPassword.passOld,
        newPassword: formPassword.passNew,
        confirmPassword: formPassword.passConfirm,
      }),
    });
    const result = await res.json();

    if (result.status == false) {
      if (result.errors) {
        const err = result.errors;
        setErrPassword({
          passOld: err.password ? err?.password[0] : "",
          passNew: err.newPassword ? err?.newPassword[0] : "",
          passConfirm: err.confirmPassword ? err?.confirmPassword[0] : "",
        });
        return;
      }
      setErrPassword({
        passOld: "",
        passNew: "",
        passConfirm: "",
      });
      toast.error(result.message);
      return;
    } else {
      setErrPassword({
        passOld: "",
        passNew: "",
        passConfirm: "",
      });
      setFormPassword({
        passOld: "",
        passNew: "",
        passConfirm: "",
      });
      localStorage.setItem("accessToken", JSON.stringify(result.data.token));
      setAccessToken(result.data.token);
      toast.success(result.message);
      setIsEditingPassword(false);
    }
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getRoleIcon = () => {
    switch (profileData?.id_vai_tro) {
      case 1:
        return <i className="fas fa-crown text-purple-500"></i>;
      case 3:
        return <i className="fas fa-motorcycle text-blue-500"></i>;
      default:
        return <i className="fas fa-user text-green-500"></i>;
    }
  };

  const changeValue = (e: any) => {
    const { name, value } = e.target;
    setFormPassword((element) => ({
      ...element,
      [name]: value,
    }));
  };

  const fetchDefaultData = () => {
    const accessTokenLocal = localStorage.getItem("accessToken");
    const typeTokenLocal = localStorage.getItem("typeToken");
    const userLocal = localStorage.getItem("user");

    if (accessTokenLocal && typeTokenLocal && userLocal) {
      const user = JSON.parse(userLocal);
      setAccessToken(JSON.parse(accessTokenLocal));
      setTypeToken(JSON.parse(typeTokenLocal));
      setProfileData(user);
      setUserCurrent(user);
      setAvatarPreview(
        user.anh_dai_dien_user
          ? `https://huunghi.id.vn/storage/avatars/${user.anh_dai_dien_user}`
          : "https://tse2.mm.bing.net/th/id/OIP.HAV08yo3UOY-ot3zO_bwewAAAA?pid=Api&P=0&h=220"
      );
    }
  };

  useEffect(() => {
    fetchDefaultData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <main className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Tài khoản của tôi
            </h1>
            <p className="text-gray-500 mt-1">
              Quản lý thông tin cá nhân và cài đặt tài khoản
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Summary */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <img
                    src={avatarPreview}
                    alt="Avatar"
                    className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md"
                  />
                  <label className="absolute bottom-0 right-0 bg-indigo-500 text-white p-1 rounded-full cursor-pointer hover:bg-indigo-600 transition-colors">
                    <i className="fas fa-camera text-xs"></i>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {userCurrent?.ten_user}
                </h2>
                <p className="text-gray-500 text-sm">
                  {userCurrent?.email_user}
                </p>
                {/* <p className="text-gray-500 text-sm">{userCurrent?.sdt_user}</p>
                <p className="text-gray-500 text-sm">{userCurrent?.dia_chi_user}</p> */}

                <div className="mt-3 flex items-center">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      userCurrent?.id_vai_tro === 1
                        ? "bg-purple-100 text-purple-800"
                        : userCurrent?.id_vai_tro === 3
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {getRoleIcon()}{" "}
                    {userCurrent?.id_vai_tro === 1
                      ? "Admin"
                      : userCurrent?.id_vai_tro === 2
                      ? "Người dùng"
                      : userCurrent?.id_vai_tro === 3
                      ? "Shipper"
                      : "Blogger"}
                  </span>
                  {/* {profileData.verified && (
                    <span className="ml-2 text-green-500" title="Đã xác minh">
                      <i className="fas fa-check-circle"></i>
                    </span>
                  )} */}
                </div>
              </div>

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Thành viên từ:</span>
                  <span className="text-gray-700 font-medium">
                    {new Date(
                      profileData?.created_at ? profileData.created_at : ""
                    ).toLocaleDateString("vi-VN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Trạng thái:</span>
                  <span
                    className={`font-medium ${
                      profileData?.trang_thai === 1
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {profileData?.trang_thai === 1
                      ? "Hoạt động"
                      : "Ngừng hoạt động"}
                  </span>
                </div>
                {/* <div className="flex justify-between">
                  <span className="text-gray-500">Đăng nhập cuối:</span>
                  <span className="text-gray-700 font-medium">{profileData.lastLogin}</span>
                </div> */}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <i className="fas fa-user-circle text-indigo-500 mr-2"></i>
                  Thông tin cá nhân
                </h2>
                {!isEditingProfile ? (
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="text-indigo-500 hover:text-indigo-600 text-sm font-medium flex items-center"
                  >
                    <i className="fas fa-edit mr-1"></i> Chỉnh sửa
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditingProfile(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </div>

              {isEditingProfile ? (
                <form onSubmit={handleProfileSubmit} className="px-6 py-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Họ và tên
                      </label>
                      <input
                        type="text"
                        name="ten_user"
                        value={profileData?.ten_user}
                        onChange={handleProfileChange}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                      />
                      {errProfile.ten_user && (
                        <p className="text-xs text-red-500 mt-2">
                          {errProfile.ten_user}*
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        disabled
                        type="email"
                        name="email_user"
                        value={profileData?.email_user}
                        onChange={handleProfileChange}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Số điện thoại
                      </label>
                      <input
                        type="tel"
                        name="sdt_user"
                        value={profileData?.sdt_user}
                        onChange={handleProfileChange}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                      />
                      {errProfile.sdt_user && (
                        <p className="text-xs text-red-500 mt-2">
                          {errProfile.sdt_user}*
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Địa chỉ
                      </label>
                      <input
                        type="text"
                        name="dia_chi_user"
                        value={profileData?.dia_chi_user}
                        onChange={handleProfileChange}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                      />
                      {errProfile.dia_chi_user && (
                        <p className="text-xs text-red-500 mt-2">
                          {errProfile.dia_chi_user}*
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      className="px-4 py-2.5 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      Hủy bỏ
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2.5 text-sm text-white bg-indigo-600 rounded-lg hover:bg-blue-700"
                    >
                      Lưu thay đổi
                    </button>
                  </div>
                </form>
              ) : (
                <div className="px-6 py-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Họ và tên
                      </label>
                      <p className="text-gray-800 font-medium">
                        {profileData?.ten_user}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Email
                      </label>
                      <p className="text-gray-800 font-medium">
                        {profileData?.email_user}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Số điện thoại
                      </label>
                      <p className="text-gray-800 font-medium">
                        {profileData?.sdt_user}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Địa chỉ
                      </label>
                      <p className="text-gray-800 font-medium">
                        {profileData?.dia_chi_user}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Security Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <i className="fas fa-shield-alt text-indigo-500 mr-2"></i>
                  Bảo mật tài khoản
                </h2>
                {!isEditingPassword ? (
                  <button
                    onClick={() => setIsEditingPassword(true)}
                    className="text-indigo-600 hover:text-indigo-600 text-sm font-medium flex items-center"
                  >
                    <i className="fas fa-edit mr-1"></i> Đổi mật khẩu
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditingPassword(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </div>

              {isEditingPassword ? (
                <form onSubmit={handlePasswordSubmit} className="px-6 py-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mật khẩu hiện tại
                      </label>
                      <input
                        onChange={(e) => changeValue(e)}
                        name="passOld"
                        type="password"
                        value={formPassword.passOld}
                        placeholder="Nhập mật khẩu hiện tại"
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                      />
                      {errPassword.passOld && (
                        <p className="text-xs text-red-500 mt-2">
                          {errPassword.passOld}*
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mật khẩu mới
                        </label>
                        <input
                          onChange={(e) => changeValue(e)}
                          name="passNew"
                          type="password"
                          value={formPassword.passNew}
                          placeholder="Nhập mật khẩu mới"
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                        />
                        {errPassword.passNew && (
                          <p className="text-xs text-red-500 mt-2">
                            {errPassword.passNew}*
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Xác nhận mật khẩu
                        </label>
                        <input
                          onChange={(e) => changeValue(e)}
                          name="passConfirm"
                          type="password"
                          value={formPassword.passConfirm}
                          placeholder="Nhập lại mật khẩu mới"
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                        />
                        {errPassword.passConfirm && (
                          <p className="text-xs text-red-500 mt-2">
                            {errPassword.passConfirm}*
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setIsEditingPassword(false)}
                      className="px-4 py-2.5 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      Hủy bỏ
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2.5 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                      Cập nhật mật khẩu
                    </button>
                  </div>
                </form>
              ) : (
                <div className="px-6 py-6">
                  <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-100">
                    <i className="fas fa-check-circle text-green-500 mr-3 text-lg"></i>
                    <div>
                      <p className="font-medium text-green-800">
                        Tài khoản được bảo mật
                      </p>
                      <p className="text-sm text-green-600">
                        Mật khẩu của bạn đã được thiết lập an toàn
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountSettingsPage;
