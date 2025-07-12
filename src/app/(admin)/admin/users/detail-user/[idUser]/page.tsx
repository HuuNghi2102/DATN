"use client";
import { useEffect, useState } from "react";
import {
  FiArrowLeft, FiEdit, FiSave, FiUser, FiMail,
  FiPhone, FiMapPin, FiShield, FiLock, FiCalendar
} from "react-icons/fi";
import { useParams, useRouter } from "next/navigation";
import userInterface from "../../../components/interface/userInterface";
import roleInterface from '../../../components/interface/roleInterface';


export default function UserDetailPage() {
  const useParam = useParams();
  const router = useRouter();

  const [user ,setUser] = useState<userInterface>();
  const [listRole, setListRole] = useState<roleInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [idRole, setIdRole] = useState<number>();

  const [typeToken, setTypeToken] = useState('');
  const [accessToken, setAccessToken] = useState('');


  const [isOpen, setIsOpen] = useState(false);

  const { idUser } = useParam


  const fetchDateDefault = async () => {

    if (!idUser) {
      router.push('admin/users');
      return;
    }

    const accessTokenLocal = localStorage.getItem('accessToken');
    const typeTokenLocal = localStorage.getItem('typeToken');
    const userLocal = localStorage.getItem('user');

    if (accessTokenLocal && typeTokenLocal && userLocal) {

      setTypeToken(JSON.parse(typeTokenLocal));
      setAccessToken(JSON.parse(accessTokenLocal));

      const user = JSON.parse(userLocal);

      if (user.id_vai_tro == 1) {

        const resUser = await fetch(`https://huunghi.id.vn/api/user/getUser/${idUser}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${JSON.parse(typeTokenLocal)} ${JSON.parse(accessTokenLocal)}`
          }
        })
        if (resUser.ok) {
          const resultUser = await resUser.json();
          const user = resultUser.data.user
          setIdRole(user.id_vai_tro);
          setUser(user);
        } else {
          alert('Người dùng không tồn tại');
          router.push('/admin/users');
        }


        const resRole = await fetch('https://huunghi.id.vn/api/role/listRole', {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${JSON.parse(typeTokenLocal)} ${JSON.parse(accessTokenLocal)}`
          }
        })

        const resultRole = await resRole.json();

        if (resultRole.status == true) {
          const roles = resultRole.data.roles;
          setListRole(roles);
        } else {
          alert('Lấy danh sách role không thành công')
        }

        setIsLoading(false);

      } else {
        router.push('/user/userprofile');
      }
    } else {
      router.push('/login');
    }
  }
  // Dữ liệu mẫu dựa trên cấu trúc database
  // const user = {
  //   id_user: 1,
  //   ten_user: "Nguyễn Văn A",
  //   anh_dai_dien_user: "avatar.jpg",
  //   email_user: "nguyenvana@example.com",
  //   email_verified_at: "2023-10-15T08:30:00Z",
  //   mat_khau_user: "hashed_password",
  //   dia_chi_user: "123 Đường ABC, Quận 1, TP.HCM",
  //   sdt_user: "0912345678",
  //   ma_otp: null,
  //   trang_thai: 1,
  //   id_vai_tro: 2,
  //   created_at: "2023-01-10T10:20:00Z"
  // };

  useEffect(()=>{
    fetchDateDefault();

  },[])


  const roles = [
  { id_vai_tro: 1, ten_vai_tro: "Admin", color: "bg-purple-100 text-purple-800" },
  { id_vai_tro: 2, ten_vai_tro: "Khách hàng", color: "bg-blue-100 text-blue-800" },
  { id_vai_tro: 3, ten_vai_tro: "Shipper", color: "bg-green-100 text-green-800" },
  { id_vai_tro: 4, ten_vai_tro: "Blogger", color: "bg-yellow-100 text-yellow-800" },
];

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...user });

  // const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  //   const { name, value } = e.target;
  //   setUser();
  // };

  const handleSave = async () => {
    console.log(user?.id_vai_tro);
    setIsEditing(false);
    // Gọi API lưu thay đổi vai trò
    const resChangeRoleUser = await fetch(`https://huunghi.id.vn/api/user/chnageRoleUser/${idUser}/idRole/${idRole}`,{
      method : "PUT",
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : `${typeToken} ${accessToken}`
      }
    })
    if(resChangeRoleUser.ok){
      const result = await resChangeRoleUser.json();
      const userUpdated = result.data.user;
      setUser(userUpdated);
    }else{
      alert('Đã xảy ra lỗi! Vui lòng thử lại.')
    }
  };

  const currentRole = roles.find(r => r.id_vai_tro === user?.id_vai_tro);

  if (isLoading) {
    return (
      <div
        id="loading-screen"
        className="fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-500"
      >
        <div className="flex flex-col items-center space-y-6">
          <div className="text-3xl font-semibold tracking-widest text-black uppercase">VERVESTYLE</div>
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-gray-700 tracking-wide">Đang khởi động trải nghiệm của bạn...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-0">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={()=>window.history.back()} className="p-2 mr-4 rounded-lg hover:bg-gray-100 transition-all">
              <FiArrowLeft className="text-gray-600 text-xl" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Chi tiết người dùng</h1>
              <p className="text-gray-500 text-sm">ID: {user?.id_user}</p>
            </div>
          </div>
          <div>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow hover:shadow-md"
              >
                <FiEdit className="mr-2" /> Chỉnh sửa vai trò
              </button>
            ) : (
              <div className="flex space-x-3">
                <button
                  onClick={() => {setIsEditing(false);setIdRole(user?.id_vai_tro)}}
                  className="px-5 py-2.5 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
                >
                  Hủy bỏ
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow hover:shadow-md"
                >
                  <FiSave className="mr-2" /> Lưu thay đổi
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Profile Card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-24 relative"></div>
              <div className="px-5 pb-6 relative">
                <div className="flex justify-center -mt-12 mb-4">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full border-4 border-white bg-white shadow-md overflow-hidden">
                      <img
                        src={user?.anh_dai_dien_user ? `https://huunghi.id.vn/storage/avatars/${user.anh_dai_dien_user}` :   'https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg' }
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {roles && roles.map((r,i) =>(
                      r.id_vai_tro == user?.id_vai_tro ? 
                      <div key={i}className={`absolute -bottom-2 -right-2 px-3 py-1 rounded-full text-xs font-medium ${r.color} shadow-sm`}>
                        {r.ten_vai_tro}
                      </div> :
                      ""
                    ))}
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800">{user?.ten_user}</h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Thành viên từ: {new Date(user?.created_at ? user?.created_at : '').toLocaleDateString("vi-VN")}
                  </p>
                  <div className={`mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${user?.trang_thai === 1 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                    {user?.trang_thai === 1 ? "Đang hoạt động" : "Đã khóa"}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-indigo-50 p-2 rounded-lg mr-3 mt-0.5">
                      <FiMail className="text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-medium">Email</p>
                      <p className="font-medium text-gray-700">{user?.email_user}</p>
                      {user?.email_verified_at && (
                        <p className="text-xs text-green-600 mt-1">Đã xác thực</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-green-50 p-2 rounded-lg mr-3 mt-0.5">
                      <FiPhone className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-medium">Điện thoại</p>
                      <p className="font-medium text-gray-700">{user?.sdt_user || "Chưa cập nhật"}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-50 p-2 rounded-lg mr-3 mt-0.5">
                      <FiMapPin className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-medium">Địa chỉ</p>
                      <p className="font-medium text-gray-700">{user?.dia_chi_user || "Chưa cập nhật"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Security */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h3 className="font-medium text-gray-800 mb-4 flex items-center">
                <FiShield className="text-red-500 mr-2" />
                Bảo mật tài khoản
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Xác thực email</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${user?.email_verified_at ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}>
                    {user?.email_verified_at ? "Đã xác thực" : "Chưa xác thực"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Mật khẩu</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Đã thiết lập</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">OTP</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${user?.ma_otp ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}>
                    {user?.ma_otp ? "Đã kích hoạt" : "Chưa kích hoạt"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* User Details Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <FiUser className="mr-2 text-indigo-500" />
                  Thông tin chi tiết
                </h2>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Personal Info Column */}
                  <div>
                    <h3 className="text-md font-medium text-gray-700 mb-4 pb-2 border-b border-gray-100">Thông tin cá nhân</h3>
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1.5">Họ và tên</label>
                        <p className="px-4 py-2.5 bg-gray-50 rounded-lg text-gray-700">{user?.ten_user}</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1.5">Email</label>
                        <p className="px-4 py-2.5 bg-gray-50 rounded-lg text-gray-700">{user?.email_user}</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1.5">Địa chỉ</label>
                        <p className="px-4 py-2.5 bg-gray-50 rounded-lg text-gray-700">{user?.dia_chi_user || "Chưa cập nhật"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Account Info Column */}
                  <div>
                    <h3 className="text-md font-medium text-gray-700 mb-4 pb-2 border-b border-gray-100">Thông tin tài khoản</h3>
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1.5">Số điện thoại</label>
                        <p className="px-4 py-2.5 bg-gray-50 rounded-lg text-gray-700">{user?.sdt_user || "Chưa cập nhật"}</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1.5">Vai trò</label>
                        {isEditing ? (
                          <select
                            name="id_vai_tro"
                            value={idRole}
                            onChange={(e:any) => setIdRole(e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all appearance-none text-gray-700"
                          >
                            {listRole.map((role) => (
                              <option key={role.id_vai_tro} value={role.id_vai_tro}>
                                {role.ten_vai_tro}
                              </option>
                            ))}
                          </select>
                        ) : roles && roles.map((r,i) =>(
                              r.id_vai_tro == user?.id_vai_tro ? 
                              <div key={i} className={`px-4 py-2.5 rounded-lg inline-flex items-center ${r.color}`}>
                                {r.ten_vai_tro}
                              </div> :
                              ""
                            ))}
                          
                        
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1.5">Trạng thái</label>
                        <div className={`px-4 py-2.5 rounded-lg inline-flex items-center ${user?.trang_thai === 1 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}>
                          {user?.trang_thai === 1 ? "Đang hoạt động" : "Đã khóa"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Activity Section */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h3 className="text-md font-medium text-gray-700 mb-4 flex items-center">
                    <FiCalendar className="mr-2 text-green-500" />
                    Thông tin hoạt động
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1.5">Ngày tạo tài khoản</label>
                      <p className="px-4 py-2.5 bg-gray-50 rounded-lg text-gray-700">
                        {new Date(user?.created_at ? user?.created_at : '').toLocaleString("vi-VN", {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1.5">Xác thực email</label>
                      <p className="px-4 py-2.5 bg-gray-50 rounded-lg text-gray-700">
                        {user?.email_verified_at ?
                          new Date(user.email_verified_at).toLocaleString("vi-VN", {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          }) :
                          "Chưa xác thực"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}