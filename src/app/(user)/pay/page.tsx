"use client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { HTMLAttributes, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaDotCircle } from "react-icons/fa";
import userInterface from "../compoments/userInterface";
import {
  faSearch,
  faCartShopping,
  faCalendarDays,
  faChevronRight,
  faBox,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const PayPage = () => {
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    address: "",
    province: "",
    district: "",
    ward: "",
  });

  const [errorsFormAddress, setErrorsFormAddress] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [selectedProvince, setSelectedProvince] = useState<number>();
  const [selectedDistrict, setSelectedDistrict] = useState<number>();
  const [selectedWard, setSelectedWard] = useState<number>();

  const [selectedDiscount, setSelectedDiscount] = useState<any>();
  const [inputDiscount, setInputDiscount] = useState("");
  const [orderInfo, setOrderInfo] = useState({
    name: "",
    phone: "",
    address: "",
    totalOrder: 0,
    note: "",
    price_ship: 0,
    paymentMethod: 1,
    location: "",
    idVoucher: null,
  });
  const [discountOptions, setDiscountOptions] = useState<any[]>([]);
  const [addressOfUser, setAddressOfUser] = useState<any[]>([]);
  const [carts, setCarts] = useState<any[]>([]);
  const [arrMethodPayment, setArrMethodPayment] = useState<any[]>([]);
  const [logoutUser, setLogoutUser] = useState(false);
  const [arrayProvince, setArrayProvince] = useState<any[]>([]);
  const [arrDistrict, setArrDistrict] = useState<any[]>([]);
  const [arrWard, setArrWard] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const [isHiddenShip, setHiddenShip] = useState<boolean>(false);
  const [getUser, setgetUser] = useState<userInterface>();

  // Thêm state cho modal thêm địa chỉ mới
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    address: "",
    isDefault: 0,
  });

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, name } = e.target;
  };

  // Thêm hàm thêm địa chỉ mới
  const addNewAddress = async () => {
    console.log("ok");
    try {
      const accessTokenLocal = localStorage.getItem("accessToken");
      const typeTokenLocal = localStorage.getItem("typeToken");

      if (!accessTokenLocal || !typeTokenLocal) {
        toast.error("Vui lòng đăng nhập để thêm địa chỉ");
        return;
      }

      const res = await fetch("https://huunghi.id.vn/api/address/addAddress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${JSON.parse(typeTokenLocal)} ${JSON.parse(
            accessTokenLocal
          )}`,
        },
        body: JSON.stringify({
          name: newAddress.name,
          phone: newAddress.phone,
          address: newAddress.address,
          default: newAddress.isDefault,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        if (result.errors) {
          const errors = result.errors;
          setErrorsFormAddress({
            name: errors.name ? errors.name[0] : "",
            phone: errors.phone ? errors.phone[0] : "",
            address: errors.address ? errors.address[0] : "",
          });
          return;
        }

        toast.success("Thêm địa chỉ thành công");
        setShowAddressModal(false);
        setNewAddress({ name: "", phone: "", address: "", isDefault: 0 });
        // Cập nhật lại danh sách địa chỉ
        const responseAddress = await fetch(
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
        const resultAddress = await responseAddress.json();
        setAddressOfUser(resultAddress.data.address);
      } else {
        toast.error(result.message || "Thêm địa chỉ không thành công");
      }
    } catch (error) {
      console.error("Lỗi khi thêm địa chỉ:", error);
      toast.error("Đã xảy ra lỗi khi thêm địa chỉ");
    }
  };

  // hàm sử dụng địa chỉ giao hàng có sẵn của người dùng
  const changeAdress = (id_address: number) => {
    console.log("id_address", id_address);

    if (isNaN(id_address)) {
      setOrderInfo({
        ...orderInfo,
        name: "",
        phone: "",
        address: "",
      });
      return;
    }

    const address = addressOfUser.find(
      (address) => address.id_dia_chi_giao_hang === id_address
    );

    setOrderInfo({
      ...orderInfo,
      name: address?.ten_nguoi_nhan,
      phone: address?.so_dien_thoai_nguoi_nhan,
      address: address?.dia_chi_nguoi_nhan,
    });
  };
  // hàm sử dụng mã giảm giá
  const useVoucher = async (codeVoucher: string, totalOrder: number) => {
    const res = await fetch(`https://huunghi.id.vn/api/voucher/useVoucher`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        codeVoucher: codeVoucher,
        totalOrder: totalOrder,
      }),
    });
    const result = await res.json();
    if (result.status == false) {
      toast.error(result.message);
    } else {
      setSelectedDiscount(result.data.voucher);
      const voucher: any = result.data.voucher;
      setOrderInfo({
        ...orderInfo,
        totalOrder:
          carts.reduce(
            (total: number, cart: any) =>
              total + cart.gia_san_pham * cart.so_luong_san_pham,
            0
          ) -
          (voucher.loai_giam_gia === "so_tien"
            ? voucher.gia_tri_giam
            : (carts.reduce(
                (total: number, cart: any) =>
                  total + cart.gia_san_pham * cart.so_luong_san_pham,
                0
              ) /
                100) *
              voucher.gia_tri_giam),
        idVoucher: voucher.id_ma_giam_gia,
      });
    }
  };
  // hàm lấy dữ liệu ban đầu
  const fetchData = async () => {
    const cartLocal = localStorage.getItem("cart");
    const accessTokenLocal = localStorage.getItem("accessToken");
    const typeTokenLocal = localStorage.getItem("typeToken");
    const userLocal = localStorage.getItem("user");

    // kiểm tra xem người dùng đã đăng nhập hay chưa
    if (!userLocal || !accessTokenLocal || !typeTokenLocal) {
      toast.error("Bạn chưa đăng nhập, vui lòng đăng nhập để tiếp tục");
      return router.push("/login");
    }

    const accessToken = JSON.parse(accessTokenLocal);
    const typeToken = JSON.parse(typeTokenLocal);
    const user = JSON.parse(userLocal);

    // kiểm tra giỏ hàng có sản phẩm không
    if (cartLocal) {
      const cartData = JSON.parse(cartLocal);
      if (cartData.length == 0) {
        toast.error(
          "Giỏ hàng của bạn đang trống, vui lòng thêm sản phẩm vào giỏ hàng để thanh toán"
        );
        router.push("/collection/all");
        return;
      }
      setOrderInfo({
        ...orderInfo,
        totalOrder: cartData.reduce(
          (total: number, cart: any) =>
            total + cart.gia_san_pham * cart.so_luong_san_pham,
          0
        ),
      });
      setCarts(cartData);
      console.log(cartData);
    }

    // Lấy địa chỉ của người dùng
    const responseAddress = await fetch(
      "https://huunghi.id.vn/api/address/listAddress",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${typeToken} ${accessToken}`,
        },
      }
    );
    const resultAddress = await responseAddress.json();
    setAddressOfUser(resultAddress.data.address);

    // Thêm: Tự động chọn địa chỉ mặc định nếu có
    const addressDefault = resultAddress.data.address.find(
      (a: any, i: number) => a.mac_dinh == 1
    );
    console.log(addressDefault);
    if (addressDefault) {
      setOrderInfo((prev) => ({
        ...prev,
        name: addressDefault.ten_nguoi_nhan,
        phone: addressDefault.so_dien_thoai_nguoi_nhan,
        address: addressDefault.dia_chi_nguoi_nhan,
      }));
    }

    // Lấy danh sách tỉnh/thành phố
    const responseProvince = await fetch(
      "https://huunghi.id.vn/api/function/getProvince"
    );
    const resultProvince = await responseProvince.json();
    setArrayProvince(resultProvince.province.data);
    console.log(resultProvince.province.data);

    // Lấy danh sách phương thức thanh toán
    const responsePaymentMethods = await fetch(
      "https://huunghi.id.vn/api/paymentMethod/getAllMethod"
    );
    const resultPaymentMethods = await responsePaymentMethods.json();
    setArrMethodPayment(resultPaymentMethods.data.paymentMethod);

    // Lấy danh sách mã giảm giá
    const responseDiscount = await fetch(
      "https://huunghi.id.vn/api/voucher/getFourVoucher"
    );
    const resultDiscount = await responseDiscount.json();
    console.log("resultDiscount", resultDiscount);
    setDiscountOptions(resultDiscount.data.vouchers);

    setIsLoading(false);
  };

  // Lấy danh sách quận/huyện theo tỉnh/thành phố
  const getDistrict = async (idProvince: number) => {
    const res = await fetch(
      `https://huunghi.id.vn/api/function/getDistrict/${idProvince}`
    );
    const result = await res.json();
    const district = result.district.data;
    setArrDistrict(district);
  };

  // Lấy danh sách phường/xã theo quận/huyện
  const getWard = async (idDistrict: number) => {
    const res = await fetch(
      `https://huunghi.id.vn/api/function/getWard/${idDistrict}`
    );
    const result = await res.json();
    const ward = result.ward.data;
    setArrWard(ward);
    console.log("ward", ward);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const setLocation = (idWard: number) => {
    if (isNaN(idWard)) {
      return;
    }
    setSelectedWard(idWard);
    const province = arrayProvince.find(
      (province) => province.ProvinceID == selectedProvince
    );
    const district = arrDistrict.find(
      (district) => district.DistrictID == selectedDistrict
    );
    const ward = arrWard.find((ward) => ward.WardCode === idWard);

    setOrderInfo({
      ...orderInfo,
      location: `${orderInfo.address} ${ward.WardName}, ${district.DistrictName}, ${province.ProvinceName}`,
    });
    if (selectedProvince !== undefined) {
      setShip(selectedProvince);
    }
  };
  const setShip = (idProvince: number) => {
    if (
      idProvince == 204 ||
      idProvince == 205 ||
      idProvince == 205 ||
      idProvince == 206 ||
      idProvince == 240 ||
      idProvince == 211
    ) {
      setOrderInfo({ ...orderInfo, price_ship: 0 });
    } else {
      setOrderInfo({ ...orderInfo, price_ship: 30000 });
    }
    setHiddenShip(true);
  };

  const Pay = async () => {
    let arrError: any = {};
    let flag = true;
    if (selectedProvince === undefined) {
      arrError.province = "Vui lòng chọn tỉnh/thành phố*";
      flag = false;
    }
    if (selectedDistrict === undefined) {
      arrError.district = "Vui lòng chọn quận/huyện*";
      flag = false;
    }
    if (selectedWard === undefined) {
      arrError.ward = "Vui lòng chọn phường/xã*";
      flag = false;
    }
    if (orderInfo.phone === "") {
      arrError.phone = "Vui lòng nhập số điện thoại*";
      flag = false;
    }
    if (orderInfo.address === "") {
      arrError.address = "Vui lòng nhập địa chỉ*";
      flag = false;
    }
    if (orderInfo.name === "") {
      arrError.name = "Vui lòng nhập tên*";
      flag = false;
    }
    setErrors({
      ...errors,
      name: arrError.name ? arrError.name : "",
      phone: arrError.phone ? arrError.phone : "",
      address: arrError.address ? arrError.address : "",
      province: arrError.province ? arrError.province : "",
      district: arrError.district ? arrError.district : "",
      ward: arrError.ward ? arrError.ward : "",
    });

    if (flag == true) {
      const accessTokenLocal = localStorage.getItem("accessToken");
      const typeTokenLocal = localStorage.getItem("typeToken");
      const userLocal = localStorage.getItem("user");

      if (accessTokenLocal && typeTokenLocal && userLocal) {
        try {
          const res = await fetch(`https://huunghi.id.vn/api/order/addOrder`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${JSON.parse(typeTokenLocal)} ${JSON.parse(
                accessTokenLocal
              )}`,
            },
            body: JSON.stringify({
              name: orderInfo.name,
              phone: orderInfo.phone,
              address: orderInfo.address + " " + orderInfo.location,
              note: orderInfo.note ? orderInfo.note : null,
              priceShip: orderInfo.price_ship ? orderInfo.price_ship : 0,
              totalOrder: orderInfo.totalOrder,
              idVoucher: orderInfo.idVoucher ? orderInfo.idVoucher : null,
              idPayment: orderInfo.paymentMethod,
              items: carts,
            }),
          });

          const result = await res.json();
          console.log(result);
          const idOrder = result.data.idOrder;

          if (res.ok) {
            localStorage.setItem("cart", JSON.stringify([]));
            const responseDeleteCart = await fetch(
              `https://huunghi.id.vn/api/cart/deleteAllCartOfUser`,
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

            if (orderInfo.paymentMethod == 3) {
              router.push(`/pagePaymentVNPay?idOrder=${idOrder}`);
            } else if (orderInfo.paymentMethod == 1) {
              router.push(`/successOrder?idOrder=${idOrder}`);
            } else if (orderInfo.paymentMethod == 2) {
              router.push(`${result.data.linkResponse}`);
            }
          } else {
            toast.error("Tạo đơn hàng không thành công");
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  // logout
  useEffect(() => {
    if (logoutUser) {
      logout();
    }
  }, [logoutUser]);
  const logout = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const typeToken = localStorage.getItem("typeToken");

      if (accessToken && typeToken) {
        const parseaccessToken = JSON.parse(accessToken);
        const parsetypeToken = JSON.parse(typeToken);
        console.log(parseaccessToken);
        console.log(parsetypeToken);
        const response = await fetch("https://huunghi.id.vn/api/user/logout", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${parsetypeToken} ${parseaccessToken}`,
          },
        });
        if (response.ok) {
          localStorage.removeItem("user");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("typeToken");
          localStorage.removeItem("cart");
          window.dispatchEvent(new Event("userChanged"));
          window.dispatchEvent(new Event("quantityCartChange"));
          alert("Đăng xuất thành công!");
          router.push("/login");
        } else {
          alert("Không thể đăng xuất");
        }
      }
    } catch (error) {
      console.log("Lỗi: ", error);
    }
  };
  // fetchUser
  const userFetch = () => {
    try {
      const getUser = localStorage.getItem("user");
      if (getUser) {
        setgetUser(JSON.parse(getUser));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    userFetch();
  }, []);

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
    <div className="min-h-screen bg-gray-50 pt-[12%]">
      {/* Thêm modal thêm địa chỉ mới */}
      {showAddressModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Thêm địa chỉ mới</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Họ và tên
                </label>
                <input
                  type="text"
                  value={newAddress.name}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Nhập họ và tên"
                />
                {errorsFormAddress.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errorsFormAddress.name}*
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Số điện thoại
                </label>
                <input
                  type="text"
                  value={newAddress.phone}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, phone: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Nhập số điện thoại"
                />
                {errorsFormAddress.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errorsFormAddress.phone}*
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  value={newAddress.address}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, address: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Nhập địa chỉ"
                />
                {errorsFormAddress.address && (
                  <p className="text-red-500 text-sm mt-1">
                    {errorsFormAddress.address}*
                  </p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="defaultAddress"
                  value={1}
                  onChange={(e: any) => {
                    const { checked } = e.target;
                    setNewAddress({
                      ...newAddress,
                      isDefault: checked ? 1 : 0,
                    });
                  }}
                  className="mr-2"
                />
                <label
                  htmlFor="defaultAddress"
                  className="text-sm text-gray-600"
                >
                  Đặt làm địa chỉ mặc định
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowAddressModal(false);
                  setErrorsFormAddress({ name: "", phone: "", address: "" });
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={addNewAddress}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Lưu địa chỉ
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Order Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-2xl font-semibold mb-4">
                Thông tin giao hàng
              </h3>

              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4 overflow-hidden">
                  <img
                    src={`https://huunghi.id.vn/storage/avatars/${getUser?.anh_dai_dien_user}`}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-gray-600">{getUser?.ten_user}</p>
                  <p
                    onClick={() => setLogoutUser(true)}
                    className="text-blue-500 cursor-pointer hover:underline"
                  >
                    Đăng xuất
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-sm text-gray-600 mb-1">
                    Địa chỉ giao hàng
                  </label>
                  <button
                    onClick={() => setShowAddressModal(true)}
                    className="text-blue-500 text-sm hover:underline flex items-center"
                  >
                    <FontAwesomeIcon icon={faPlus} className="w-3 h-3 mr-1" />
                    Thêm địa chỉ mới
                  </button>
                </div>

                <select
                  onChange={(e) => {
                    changeAdress(parseInt(e.target.value));
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Chọn địa chỉ giao hàng</option>
                  {addressOfUser.map((address, index) => (
                    <option value={address.id_dia_chi_giao_hang} key={index}>
                      {address.ten_nguoi_nhan +
                        ", " +
                        address.so_dien_thoai_nguoi_nhan +
                        ", " +
                        address.dia_chi_nguoi_nhan}
                    </option>
                  ))}
                </select>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    value={orderInfo.name}
                    onChange={(e) =>
                      setOrderInfo({ ...orderInfo, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập họ và tên"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    value={orderInfo.phone}
                    onChange={(e) =>
                      setOrderInfo({ ...orderInfo, phone: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    placeholder="Địa chỉ"
                    value={orderInfo.address}
                    onChange={(e) =>
                      setOrderInfo({ ...orderInfo, address: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Ghi chú đơn hàng
                  </label>
                  <textarea
                    value={orderInfo.note}
                    onChange={(e) =>
                      setOrderInfo({ ...orderInfo, note: e.target.value })
                    }
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    name=""
                    id=""
                  ></textarea>
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>
                <div></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-3 gap-2">
                  <div>
                    <select
                      // value={selectedProvince}
                      onChange={(e: any) => {
                        !isNaN(e.target.value)
                          ? setSelectedProvince(e.target.value)
                          : setSelectedProvince(undefined);

                        setArrDistrict([]);
                        setArrWard([]);

                        setSelectedDistrict(undefined);
                        setSelectedWard(undefined);

                        !isNaN(e.target.value)
                          ? getDistrict(e.target.value)
                          : setArrDistrict([]);
                      }}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    >
                      <option>Chọn tỉnh/thành phố</option>
                      {arrayProvince.map((province, index) => (
                        <option key={index} value={province.ProvinceID}>
                          {province?.ProvinceName}
                        </option>
                      ))}
                    </select>
                    {errors.province && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.province}
                      </p>
                    )}
                  </div>
                  <div>
                    <select
                      onChange={(e: any) => {
                        !isNaN(e.target.value)
                          ? setSelectedDistrict(e.target.value)
                          : setSelectedDistrict(undefined);

                        setSelectedWard(undefined);

                        !isNaN(e.target.value)
                          ? getWard(e.target.value)
                          : setArrWard([]);
                      }}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    >
                      <option>Chọn Quận/huyện</option>
                      {arrDistrict.map((district, index) => (
                        <option key={index} value={district.DistrictID}>
                          {district.DistrictName}
                        </option>
                      ))}
                    </select>
                    {errors.district && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.district}
                      </p>
                    )}
                  </div>
                  <div>
                    <select
                      onChange={(e: any) => {
                        if (!isNaN(e.target.value)) {
                          setLocation(e.target.value);
                          setSelectedWard(e.target.value);
                        }
                      }}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    >
                      <option value={undefined}>Chọn Phường/xã</option>
                      {arrWard.map((ward, index) => (
                        <option key={index} value={ward.WardCode}>
                          {ward.WardName}
                        </option>
                      ))}
                    </select>
                    {errors.ward && (
                      <p className="text-red-500 text-sm mt-1">{errors.ward}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Shipping Method */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">
                Phương thức vận chuyển
              </h3>
              {!isHiddenShip && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <div className="h-16 w-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon className="w-10 h-24" icon={faBox} />
                  </div>
                  <p className="text-gray-500">
                    Vui lòng chọn tỉnh / thành để có danh sách phương thức vận
                    chuyển.
                  </p>
                </div>
              )}
              {isHiddenShip && (
                <div className="flex items-center justify-between border rounded-md p-4">
                  <div className="flex items-center gap-2">
                    <FaDotCircle className="text-blue-500" />
                    <span className="text-gray-700">
                      {orderInfo.price_ship == 0
                        ? "Free Ship Đơn Hàng Từ 1.000.000đ và các tỉnh lận cận HCM"
                        : "Phí ship đơn hàng"}
                    </span>
                  </div>
                  <span className="text-gray-800 font-medium">
                    {orderInfo.price_ship == 0 ? "" : "30.000đ"}
                  </span>
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">
                Phương thức thanh toán
              </h3>
              <div className="space-y-3">
                <div className="ml-8 text-sm text-gray-600">
                  <p>
                    Hiện tại là thành viên Silver hoặc Gold/Diamond, nhận viền
                    áo cộng điểm giảm giá khi mua các sản phẩm.
                  </p>
                  <p className="text-blue-500">- Freeship đơn từ 399K</p>
                </div>
                {arrMethodPayment.map((method, index) => (
                  <label
                    key={index}
                    className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={
                        orderInfo.paymentMethod ===
                        method.id_phuong_thuc_thanh_toan
                      }
                      value={method.id_phuong_thuc_thanh_toan}
                      onChange={(e) =>
                        setOrderInfo({
                          ...orderInfo,
                          paymentMethod: parseInt(e.target.value),
                        })
                      }
                      className="mr-3"
                    />
                    <img
                      src={`https://huunghi.id.vn/${method.hinh_anh}`}
                      width={50}
                      height={50}
                      alt=""
                    />
                    <span> {method.ten_phuong_thuc}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Link href={`/cart`}>
                <button className="px-6 py-3 text-amber-500 border border-amber-500 rounded-lg hover:bg-blue-50">
                  Giỏ hàng
                </button>
              </Link>

              <button
                onClick={(e) => Pay()}
                className="flex-1 px-6 py-3 bg-amber-400 text-white rounded-lg active:bg-amber-500"
              >
                Hoàn tất đơn hàng
              </button>
            </div>
          </div>
          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-44">
              {carts.map((cart, index) => (
                <div key={index} className="flex items-center mb-6">
                  <img
                    src={`https://huunghi.id.vn/storage/products/${cart.anh_san_pham}`}
                    alt="Product"
                    className="w-12 h-12  rounded-lg mr-4"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{cart.ten_san_pham}</h4>
                    <p className="text-sm text-gray-600">
                      Số lượng: {cart.so_luong_san_pham}
                    </p>
                    <p className="text-sm text-gray-500">
                      {cart.mau_san_pham} / {cart.kich_thuoc_san_pham}
                    </p>
                  </div>
                  <span className="font-semibold">
                    {cart.so_luong_san_pham} x{" "}
                    {cart.gia_san_pham.toLocaleString("vi-VN")}đ
                  </span>
                </div>
              ))}
              <hr className="mb-2" />
              <div className="flex items-center justify-between mb-4">
                <input
                  value={inputDiscount}
                  onChange={(e) => setInputDiscount(e.target.value)}
                  type="text"
                  placeholder="Mã giảm giá"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mr-4"
                />
                <button
                  onClick={() =>
                    useVoucher(inputDiscount, orderInfo.totalOrder)
                  }
                  className="px-2 py-2 bg-white text-black border border-black rounded-lg active:bg-gray-100"
                >
                  Sử dụng
                </button>
              </div>

              <div className="mb-4">
                <p className="text-amber-500 cursor-pointer hover:underline mb-3">
                  <i className="fas fa-plus mr-2"></i>Xem thêm mã giảm giá
                </p>
                <div className="flex flex-wrap gap-2">
                  {discountOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => setInputDiscount(option.ma_giam_gia)}
                      className={`px-3 py-1 border border-amber-500 rounded-full text-sm transition-colors ${
                        selectedDiscount === option.value
                          ? "border-amber-500 text-amber-500"
                          : "border-blue-300 text-amber-600 hover:border-amber-500"
                      }`}
                    >
                      Giảm{" "}
                      {option.loai_giam_gia == "so_tien"
                        ? option.gia_tri_giam.toLocaleString("vi-VN") + " đ"
                        : option.gia_tri_giam + " %"}
                    </button>
                  ))}
                </div>
              </div>
              <hr className="mb-2" />
              <h3 className="text-lg font-semibold mb-4">
                Chương trình khách hàng thân thiết
              </h3>
              <hr className="mb-2" />
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Tạm tính</span>
                  <span>
                    {carts
                      .reduce(
                        (total, cart) =>
                          total + cart.gia_san_pham * cart.so_luong_san_pham,
                        0
                      )
                      .toLocaleString("vi-VN")}{" "}
                    đ
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Giảm giá</span>
                  <span>
                    {orderInfo.idVoucher
                      ? selectedDiscount?.loai_giam_gia === "so_tien"
                        ? selectedDiscount?.gia_tri_giam.toLocaleString(
                            "vi-VN"
                          ) + " đ"
                        : selectedDiscount?.gia_tri_giam + " %"
                      : "Không có"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Phí vận chuyển</span>
                  <span>
                    {orderInfo.price_ship > 0
                      ? orderInfo.price_ship.toLocaleString("vi-VN") + " đ"
                      : "-"}
                  </span>
                </div>
                <hr className="mb-2" />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Tổng cộng</span>
                  <span>{orderInfo.totalOrder.toLocaleString("vi-VN")} đ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Thêm ToastContainer */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default PayPage;
