"use client";
import { InputHTMLAttributes, useEffect, useState } from "react";
import roleInterface from "../components/interface/roleInterface";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash, faPencil, faPlus, faCheck, faClock,faEyeSlash,faChevronRight,faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface userInterface {
  id_user: number;
  ten_user: string;
  anh_dai_dien_user: string;
  email_user: string;
  email_verified_at: string;
  mat_khau_user: string;
  dia_chi_user: string;
  sdt_user: string;
  ma_otp: number;
  trang_thai: number;
  id_vai_tro: number;
  remember_token: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  expires_at: string;
  orders_count: number;
  orders_sum_gia_tong_don_hang: number;
}

export default function CustomerManager() {
  const [customers, setComtomer] = useState<userInterface[]>([]);
  const [listRole, setListRole] = useState<roleInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(20); // Số sản phẩm mỗi trang

  const [typeToken, setTypeToken] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const router = useRouter();
  const [errAddUser, setErrAddUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    role: "",
  });

  const [formAddUser, setFormAdduser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    role: 1,
  });
  const [showForm, setShowForm] = useState(false);

  const [selectedRole, setSeletedRole] = useState<number | "">("");
  const [selectedDate, setSeletedDate] = useState<string | "">("");
  const [search, setSearch] = useState<string | "">("");
  const [totalOrder, setTotalOrder] = useState<string | "">("");

  const fetchDefaultData = async () => {
    const accessTokenLocal = localStorage.getItem("accessToken");
    const typeTokenLocal = localStorage.getItem("typeToken");
    const userLocal = localStorage.getItem("user");

    if (accessTokenLocal && typeTokenLocal && userLocal) {
      setAccessToken(JSON.parse(accessTokenLocal));
      setTypeToken(JSON.parse(typeTokenLocal));
      const user = JSON.parse(userLocal);
      if (user.id_vai_tro == 1) {
        const resUser = await fetch(
          `https://huunghi.id.vn/api/user/getListUser?page=${currentPage}&role=${selectedRole}&date=${selectedDate}&search=${search}&totalOrder=${totalOrder}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${JSON.parse(typeTokenLocal)} ${JSON.parse(
                accessTokenLocal
              )}`,
            },
          }
        );

        const resultUser = await resUser.json();

        if (resultUser.status == true) {
          const listUser = resultUser.data.users.data;
          console.log(listUser);
          setComtomer(listUser);
          setCurrentPage(resultUser.data.users.current_page);
          setTotalPages(resultUser.data.users.last_page);
          setPerPage(resultUser.data.users.per_page);
          console.log(resultUser);
          setIsLoading(false);
        } else {
          alert("Lấy danh sách không thành công");
        }

        const resRole = await fetch("https://huunghi.id.vn/api/role/listRole", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${JSON.parse(typeTokenLocal)} ${JSON.parse(
              accessTokenLocal
            )}`,
          },
        });

        const resultRole = await resRole.json();

        if (resultRole.status == true) {
          const roles = resultRole.data.roles;
          setListRole(roles);
        } else {
          alert("Lấy danh sách role không thành công");
        }
      } else {
        router.push("/user/userprofile");
      }
    } else {
      router.push("/login");
    }
  };

  const checkRole = (idRole: number) => {
    switch (idRole) {
      case 1:
        return "Admin";
      case 2:
        return "User";
      case 3:
        return "Shipper";
      default:
        return "Blogger";
    }
  };

  const addUser = async () => {
    setErrAddUser({
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      role: "",
    });

    const resAdduser = await fetch(`https://huunghi.id.vn/api/user/addUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${typeToken} ${accessToken}`,
      },
      body: JSON.stringify({
        name: formAddUser.name,
        email: formAddUser.email,
        phone: formAddUser.phone,
        password: formAddUser.password,
        address: formAddUser.address,
        role: formAddUser.role,
      }),
    });

    const resultAddUser = await resAdduser.json();

    if (resultAddUser.status == true) {
      const newUser = resultAddUser.data.user;
      setComtomer([newUser, ...customers]);
      setFormAdduser({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        role: 1,
      });
    } else {
      if (resultAddUser.errors) {
        const errors = resultAddUser.errors;
        setErrAddUser({
          name: errors.name ? errors.name[0] : "",
          email: errors.email ? errors.email[0] : "",
          phone: errors.phone ? errors.phone[0] : "",
          address: errors.address ? errors.address[0] : "",
          password: errors.password ? errors.password[0] : "",
          role: errors.role ? errors.role[0] : "",
        });
        return;
      }
      alert("Thêm user không thành công");
      console.log(resultAddUser);
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    setFormAdduser({ ...formAddUser, [name]: value });
  };

  useEffect(() => {
    fetchDefaultData();
  }, [currentPage, selectedDate, selectedRole, search, totalOrder]);
  console.log(search);
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
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Quản lý Khách hàng
          </h1>
          <p className="text-gray-500 text-sm">
            Xem và quản lý tất cả khách hàng của cửa hàng
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded text-sm font-medium"
          >
            <FontAwesomeIcon icon={faPlus} />Thêm khách hàng
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded shadow mb-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Thêm khách hàng mới
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Họ tên
              </label>
              <input
                value={formAddUser.name}
                type="text"
                name="name"
                onChange={handleChangeInput}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                placeholder="Nhập họ tên"
              />
              {errAddUser.name && (
                <p className="text-red-500 text-sm mt-1">{errAddUser.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                onChange={handleChangeInput}
                name="email"
                type="email"
                value={formAddUser.email}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                placeholder="example@email.com"
              />
              {errAddUser.email && (
                <p className="text-red-500 text-sm mt-1">{errAddUser.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số điện thoại
              </label>
              <input
                onChange={handleChangeInput}
                type="text"
                name="phone"
                value={formAddUser.phone}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                placeholder="0987xxxxxx"
              />
              {errAddUser.phone && (
                <p className="text-red-500 text-sm mt-1">{errAddUser.phone}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Địa chỉ
              </label>
              <input
                onChange={handleChangeInput}
                type="text"
                name="address"
                value={formAddUser.address}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                placeholder="123 Lương Định Của..."
              />
              {errAddUser.address && (
                <p className="text-red-500 text-sm mt-1">
                  {errAddUser.address}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mật khẩu
              </label>
              <input
                onChange={handleChangeInput}
                name="password"
                type="password"
                value={formAddUser.password}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                placeholder="Nhập mật khẩu"
              />
              {errAddUser.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errAddUser.password}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vai trò
              </label>
              <select
                name="role"
                onChange={handleChangeInput}
                value={formAddUser.role}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              >
                {listRole.map((r, i) => (
                  <option key={i} value={r.id_vai_tro}>
                    {r.ten_vai_tro}
                  </option>
                ))}
              </select>
              {errAddUser.role && (
                <p className="text-red-500 text-sm mt-1">{errAddUser.role}</p>
              )}
            </div>
          </div>
          <div className="flex justify-end mt-4 gap-2">
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded bg-white"
            >
              Hủy
            </button>
            <button
              onClick={addUser}
              className="px-4 py-2 text-sm text-white bg-indigo-600 rounded"
            >
              Lưu
            </button>
          </div>
        </div>
      )}

      <div className="bg-white p-4 rounded shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nhóm thành viên
          </label>
          <select
            value={selectedRole}
            onChange={(e: any) => {
              setSeletedRole(e.target.value ? Number(e.target.value) : "");
              setCurrentPage(1);
            }}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          >
            <option value="">Tất cả nhóm</option>
            {listRole.map((r, i) => (
              <option key={i} value={r.id_vai_tro}>
                {r.ten_vai_tro}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ngày đăng ký
          </label>
          <select
            value={selectedDate}
            onChange={(e: any) => {
              setSeletedDate(e.target.value ? e.target.value : "");
              setCurrentPage(1);
            }}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          >
            <option>Tất cả thời gian</option>
            <option value="day">Hôm nay</option>
            <option value="week">Tuần này</option>
            <option value="month">Tháng này</option>
            <option value="year">Năm này</option>
          </select>
        </div>
        <div>
          {/* <form onSubmit={(e:any) => {e.preventDefault()}}> */}
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tìm kiếm
          </label>
          <input
            type="text"
            value={search}
            onChange={(e: any) => {
              setCurrentPage(1);
              setSearch(e.target.value);
            }}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            placeholder="Tìm theo tên, SĐT, email..."
          />
          {/* </form> */}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Số đơn hàng
          </label>
          <select
            value={totalOrder}
            onChange={(e: any) => {
              setCurrentPage(1);
              setTotalOrder(e.target.value ? e.target.value : "");
            }}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          >
            <option value="">Tất cả</option>
            <option value="chua_mua_hang">Chưa mua hàng</option>
            <option value="1-5">1-5 đơn</option>
            <option value="hon_5">Trên 5 đơn</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded shadow">
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h2 className="font-semibold text-lg">Danh sách khách hàng</h2>
          <span className="text-sm text-gray-500">
            Tổng: {customers?.length} khách hàng
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-2 text-left">Khách hàng</th>
                <th className="px-4 py-2 text-left">Thông tin liên hệ</th>
                <th className="px-4 py-2 text-left">Ngày đăng ký</th>
                <th className="px-4 py-2 text-left">Tổng đơn hàng</th>
                <th className="px-4 py-2 text-left">Tổng chi tiêu</th>
                <th className="px-4 py-2 text-left">Vai trò</th>
                <th className="px-4 py-2 text-left">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {customers?.map((cus) => (
                <tr key={cus.id_user} className="border-t">
                  <td className="px-4 py-3 flex items-center gap-3">
                    <img
                      src={
                        cus.anh_dai_dien_user
                          ? `https://huunghi.id.vn/storage/avatars/${cus.anh_dai_dien_user}`
                          : "https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg"
                      }
                      alt={cus.ten_user}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium text-gray-800">
                        {cus.ten_user}
                      </div>
                      <div className="text-xs text-gray-500">
                        ID: {cus.id_user}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>{cus.sdt_user}</div>
                    <div className="text-xs text-gray-500">
                      {cus.email_user}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {new Date(cus.created_at).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {cus.orders_count ? cus.orders_count : 0}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {cus.orders_sum_gia_tong_don_hang
                      ? Number(cus.orders_sum_gia_tong_don_hang).toLocaleString(
                          "vi-VN"
                        )
                      : 0}{" "}
                    VNĐ
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${
                        cus.id_vai_tro === 1
                          ? "bg-indigo-100 text-indigo-600"
                          : cus.id_vai_tro === 2
                          ? "bg-green-100 text-green-600"
                          : cus.id_vai_tro === 3
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {checkRole(cus.id_vai_tro)}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <Link href={`/admin/users/detail-user/${cus.id_user}`}>
                      <button
                        className="text-indigo-600 hover:text-indigo-800"
                        title="Xem chi tiết"
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                    </Link>

                    <button
                      className="text-yellow-600 hover:text-yellow-800"
                      title="Chỉnh sửa"
                    >
                      <FontAwesomeIcon icon={faPencil} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      title="Xóa"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-white">
          {/* Hiển thị <span className="font-medium">{(currentPage - 1) * perPage + 1}</span> đến{' '} */}
          <div className="text-sm text-gray-600">
            Hiển thị{" "}
            <span className="font-medium">
              {(currentPage - 1) * perPage + 1}
            </span>{" "}
            đến{" "}
            <span className="font-medium">
              {Math.min(
                currentPage * perPage,
                customers.length + (currentPage - 1) * perPage
              )}
            </span>{" "}
            trong tổng số{" "}
            <span className="font-medium">{customers.length * totalPages}</span>{" "}
            sản phẩm
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md border ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
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
                  className={`px-3 py-1 rounded-md border ${
                    currentPage === pageNum
                      ? "bg-indigo-500 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
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
                className={`px-3 py-1 rounded-md border ${
                  currentPage === totalPages
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {totalPages}
              </button>
            )}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md border ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
