"use client";
import { toast } from "react-toastify";

import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { CartItem } from "./CartItem";
import { useRouter } from "next/navigation";
const CartPage = () => {
  const [selectedProvince, setSelectedProvince] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState<number>(1);
  const [selectedWard, setSelectedWard] = useState<number>();
  const [dateDeliver, setDateDeliver] = useState("dd/mm/yy");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [arrProvince, setArrProvince] = useState<any[]>([]);
  const [arrDistrict, setArrDistrict] = useState<any[]>([]);
  const [arrWard, setArrWard] = useState<any[]>([]);

  const { state, dispatch } = useCart();
  const [carts, setCarts] = useState<CartItem[]>([]);
  const [voucher, setVoucher] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCarts = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const typeToken = localStorage.getItem("typeToken");
      const user = localStorage.getItem("user");

      if (accessToken && typeToken && user) {
        const parsetoken = JSON.parse(accessToken);
        const parsetypeToken = JSON.parse(typeToken);

        const res = await fetch(
          "https://huunghi.id.vn/api/cart/getListCartOfUser",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${parsetypeToken} ${parsetoken}`,
            },
          }
        );

        const result = await res.json();
        setCarts(result.data.carts);
        localStorage.setItem("cart", JSON.stringify(result.data.carts));

        const checkCart = await fetch(
          "https://huunghi.id.vn/api/productVariant/checkCart",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              carts: result.data.carts ? result.data.carts : [],
            }),
          }
        );

        const resultCheckCart = await checkCart.json();

        if (resultCheckCart.status == false) {
          toast.error(resultCheckCart.message);
        }
        console.log(resultCheckCart);
        setCarts(resultCheckCart.data.carts);
        localStorage.setItem(
          "cart",
          JSON.stringify(resultCheckCart.data.carts)
        );

        window.dispatchEvent(new Event("quantityCartChange"));
      } else {
        const localCarts = localStorage.getItem("cart");

        if (localCarts) {
          setCarts(JSON.parse(localCarts));

          const checkCart = await fetch(
            "https://huunghi.id.vn/api/productVariant/checkCart",
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                carts: JSON.parse(localCarts),
              }),
            }
          );

          const result = await checkCart.json();

          if (result.status == false) {
            toast.success(result.message);
          }
          setCarts(result.data.carts);

          localStorage.setItem("cart", JSON.stringify(result.data.carts));
        } else {
          setCarts([]);
        }
        window.dispatchEvent(new Event("quantityCartChange"));
      }

      const res2 = await fetch(
        "https://huunghi.id.vn/api/function/getProvince"
      );
      const result2 = await res2.json();
      const province = result2.province;
      setArrProvince(province);
      setIsLoading(false);
    };
    fetchCarts();
  }, []);

  const getWard = async (idProvince: number) => {
    const res = await fetch(
      `https://huunghi.id.vn/api/function/getWard/${idProvince}`
    );
    const result = await res.json();
    const ward = result.ward;
    console.log(ward);
    setArrWard(ward);
  };
  const deliveryDate = async (idDistrict: number, wardCode: number) => {
    const res = await fetch(
      `https://huunghi.id.vn/api/function/deliveryDate/idDistrict/${idDistrict}/wardCode/${wardCode}`
    );
    const result = await res.json();
    const date = result.data.date;
    setDateDeliver(date);
    console.log(result.data);
  };
  const removeCartItem = async (position: number) => {
    const accessToken = localStorage.getItem("accessToken");
    const typeToken = localStorage.getItem("typeToken");
    const user = localStorage.getItem("user");
    const localCart = localStorage.getItem("cart");
    let arrCart = [];

    if (localCart) {
      arrCart = JSON.parse(localCart);
    }

    if (user && accessToken && typeToken) {
      const parsetoken = JSON.parse(accessToken);
      const parsetypeToken = JSON.parse(typeToken);
      const currenCart = arrCart[position];

      const res = await fetch(
        `https://huunghi.id.vn/api/cart/deleteCartOfUser/${currenCart.id_gio_hang}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${parsetypeToken} ${parsetoken}`,
          },
        }
      );
      const result = await res.json();
      arrCart.splice(position, 1);
      toast.success(result.message);
    } else {
      arrCart.splice(position, 1);
    }
    localStorage.setItem("cart", JSON.stringify(arrCart));
    setCarts(arrCart);
    window.dispatchEvent(new Event("quantityCartChange"));
  };

  const redirectPay = () => {
    if (carts.length < 1) {
      toast.warn("Vui lòng chọn thêm sản phẩm để thanh toán");
      return;
    }
    router.push("/pay");
  };

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
      setVoucher(result.data.voucher);
      toast.success("Áp dụng mã giảm giá thành công!");
    }
  };

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
    <div className="min-h-screen bg-gray-50">
      {/* Font Awesome CDN */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      />

      {/* Header */}
      <header className="bg-white shadow-sm border-b mt-40">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-4">
          <div className="flex justify-between items-center py-4">
            <nav className="flex space-x-8">
              <a href="/" className="text-gray-600 hover:text-gray-900">
                Trang chủ
              </a>
              <a href="#" className="text-blue-600 font-medium">
                Giỏ hàng
              </a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <h1 className="text-xl font-bold mb-4">Giỏ Hàng</h1>
              {carts.length === 0 ? (
                <p>Giỏ hàng trống</p>
              ) : (
                <div className="space-y-4">
                  {carts.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center space-x-4 border-b pb-4"
                    >
                      <a href={`/product/${item.duong_dan}`}>
                        <img
                          src={`https://huunghi.id.vn/storage/products/${item.anh_san_pham}`}
                          alt={item.ten_san_pham}
                          className="w-20 h-20 object-cover rounded"
                        />
                      </a>
                      <div className="flex-1">
                        <p className="font-semibold">{item.ten_san_pham}</p>
                        <p className="text-sm text-gray-600">
                          Màu: {item.mau_san_pham} | Size:{" "}
                          {item.kich_thuoc_san_pham}
                        </p>
                        <p className="text-sm">
                          Số lượng: {item.so_luong_san_pham}
                        </p>
                        <p className="text-sm font-bold">
                          {item.gia_san_pham.toLocaleString("vi-VN")}đ
                        </p>
                      </div>
                      <button
                        onClick={() => removeCartItem(index)}
                        className="text-red-500 text-sm hover:underline"
                      >
                        Xoá
                      </button>
                    </li>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Checkout Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Thông tin đơn hàng
              </h3>

              <div className="flex justify-between text-sm mb-3">
                <span className="text-gray-600">Tạm tính:</span>
                <span className="text-gray-900">
                  {carts
                    .reduce(
                      (total, item) =>
                        total + item.so_luong_san_pham * item.gia_san_pham,
                      0
                    )
                    .toLocaleString("vi-VN")}
                  đ
                </span>
              </div>
              {/* <div className="flex justify-between text-sm mb-3">
                <span className="text-gray-600">Giá giảm:</span>
                <span className="text-gray-900">
                  -
                  {(voucher ? voucher?.gia_tri_giam : 0).toLocaleString(
                    "vi-VN"
                  )}
                  đ
                </span>
              </div> */}
              <div className="flex justify-between text-sm mb-3 font-semibold">
                <span className="text-gray-900">Tổng tiền:</span>
                <span className="text-gray-900">
                  {(
                    carts.reduce(
                      (total, item) =>
                        total + item.so_luong_san_pham * item.gia_san_pham,
                      0
                    ) - (voucher ? voucher?.gia_tri_giam : 0)
                  ).toLocaleString("vi-VN")}
                  đ
                </span>
              </div>

              {/* Shipping Info */}
              {/* <div className="mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <i className="fas fa-truck text-gray-600"></i>
                  <span className="font-medium text-gray-900">
                    Ước tính thời gian giao hàng
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2">
                  <select
                    // value={selectedProvince}
                    onChange={(e: any) => {
                      setSelectedProvince(e.target.value);
                      getWard(e.target.value);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option>Chọn tỉnh/thành phố</option>
                    {arrProvince.map((province: any, index) => (
                      <option key={index} value={province?.province_code}>
                        {province?.name}
                      </option>
                    ))}
                  </select>
                  <select
                    value={selectedWard}
                    onChange={(e: any) => {
                      setSelectedWard(e.target.value);
                      deliveryDate(selectedDistrict, e.target.value);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="">Chọn Phường/xã</option>
                    {arrWard?.map((ward, index) => (
                      <option key={index} value={ward?.ward_code}>
                        {ward?.ward_name}
                      </option>
                    ))}
                  </select>
                </div>

                <br></br>
                <h3>Ngày giao hàng dự kiến : {dateDeliver}</h3>
              </div> */}

              {/* Order Notes */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">
                  Ghi chú đơn hàng
                </h4>
                <textarea
                  placeholder="Ghi chú"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm h-16 resize-none mb-3"
                />
                <input
                  onKeyDown={(e: any) => {
                    if (e.key === "Enter") {
                      useVoucher(
                        e.target.value,
                        carts.reduce(
                          (total, item) =>
                            total + item.so_luong_san_pham * item.gia_san_pham,
                          0
                        )
                      );
                    }
                  }}
                  type="text"
                  placeholder="Nhập mã khuyến mãi (nếu có)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Checkout Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => redirectPay()}
                  className="w-full bg-amber-400 text-black py-3 rounded-lg font-medium hover:bg-amber-500 transition-colors"
                >
                  THANH TOÁN NGAY
                </button>
                <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
                  <i className="fas fa-shopping-cart"></i>
                  <a href="/collection/all">
                    <span>Tiếp tục mua hàng</span>
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
