"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Link from "next/link";
import React, { useEffect, useState } from "react";

const WishlistPage = () => {
  const [reload, setReload] = useState<boolean>(true);
  const [listWhistList, setListWhistList] = useState<any[]>([]);
  const [isUser, setIsUser] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const accessTokenLocal = localStorage.getItem("accessToken");
    const typeTokenLocal = localStorage.getItem("typeToken");
    const userLocal = localStorage.getItem("user");
    if (accessTokenLocal && typeTokenLocal && userLocal) {
      const fetchWhistList = async () => {
        const resWhistList = await fetch(
          "https://huunghi.id.vn/api/whislist/listWhislist",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${JSON.parse(typeTokenLocal)} ${JSON.parse(
                accessTokenLocal
              )}`,
            },
          }
        );
        const result = await resWhistList.json();
        if (!resWhistList.ok) {
          return setListWhistList([]);
        }
        console.log(result.data.productWhistList);
        return setListWhistList(result.data.productWhistList);
        return setListWhistList([]);
      };
      fetchWhistList();
      setIsUser(true);
    } else {
      const whistlistLocal = localStorage.getItem("whislist");
      if (whistlistLocal) {
        setListWhistList(
          JSON.parse(whistlistLocal).length > 0
            ? JSON.parse(whistlistLocal)
            : []
        );
      }
    }
    setIsLoading(false);
  }, [reload]);

  const removeWhilist = async (position: number) => {
    const user = localStorage.getItem("user");
    const accessToken = localStorage.getItem("accessToken");
    const typeToken = localStorage.getItem("typeToken");
    const arrWhistList = localStorage.getItem("whislist");

    if (user && accessToken && typeToken) {
      const resDelete = await fetch(
        `https://huunghi.id.vn/api/whislist/deleteWhislist/${position}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${JSON.parse(typeToken)} ${JSON.parse(
              accessToken
            )}`,
          },
        }
      );
      if (resDelete.ok) {
        const result = await resDelete.json();
        toast.success(result.message);
      } else {
        toast.error("Xóa thất bại");
      }
    } else {
      if (arrWhistList) {
        let parseWhistList = JSON.parse(arrWhistList);
        parseWhistList.splice(position, 1);
        localStorage.setItem("whislist", JSON.stringify(parseWhistList));
      } else {
        toast.info("Wishlist trống");
        localStorage.setItem("whislist", JSON.stringify([]));
      }
    }
    setReload(!reload);
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
      {/* FontAwesome CDN */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
      <div className="container mx-auto px-4 py-8 max-w-[1200px] pt-[11%]">
        <h1 className="text-2xl md:text-3xl font-light text-gray-800 mb-8">
          My wishlist
        </h1>
        <div className="hidden lg:block">
          <div className="bg-white">
            <div className="border-t border-b border-gray-200 px-6 py-4">
              <div className="flex items-center">
                <div className="flex-1">
                  <h3 className="text-xs pl-28 font-medium text-gray-600 uppercase tracking-wider">
                    PRODUCT NAME
                  </h3>
                </div>
                <div className="w-32 text-right">
                  <h3 className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                    UNIT PRICE
                  </h3>
                </div>
                <div className="w-32 text-center">
                  <h3 className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                    STOCK STATUS
                  </h3>
                </div>
                <div className="w-32"></div>
              </div>
            </div>
            {listWhistList.map((e, i) => (
              <div key={i} className="px-6 py-8 border-b border-gray-100">
                <div className="flex items-center">
                  {/* Remove button & Product Info */}
                  <div className="flex-1 flex items-center space-x-4">
                    <button
                      onClick={() =>
                        removeWhilist(isUser ? e.id_san_pham_yeu_thich : i)
                      }
                      className="text-gray-300 hover:text-gray-500 transition-colors"
                    >
                      <i className="fas fa-times text-sm"></i>
                    </button>
                    <div className="w-16 h-20 rounded-sm flex items-center justify-center">
                      <img
                        src={`https://huunghi.id.vn/storage/products/${e.anh_san_pham}`}
                        alt=""
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-normal text-gray-800">
                        {e.ten_san_pham}
                      </h3>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="w-32 text-right">
                    <span className="text-base font-medium text-gray-800">
                      {e.gia_san_pham.toLocaleString("vi-VN")}₫
                    </span>
                  </div>

                  {/* Stock Status - Empty for desktop as it's shown under price */}
                  <div className="w-32">
                    <div className="text-xs text-gray-500 mt-1 text-center">
                      In Stock
                    </div>
                  </div>
                  {/* Action Button */}
                  <div className="w-32 text-right">
                    <Link href={`/product/${e.duong_dan}`}>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium underline transition-colors">
                        Move to detail
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {/* Share Section */}
            <div className="px-6 py-6">
              <div className="flex items-center space-x-4">
                <span className="text-gray-600 text-sm">Share on:</span>
                <div className="flex space-x-2">
                  <a href="https://www.facebook.com/sharer.php?u=https://mowgarden.com/wishlist/">
                    <button className="w-8 h-8 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                      <i className="fab fa-facebook-f text-xs text-gray-600"></i>
                    </button>
                  </a>
                  <a href="https://www.twitter.com/share?url=https://mowgarden.com/wishlist/">
                    <button className="w-8 h-8 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                      <i className="fab fa-twitter text-xs text-gray-600"></i>
                    </button>
                  </a>

                  <a href="https://www.pinterest.com/pin/create/button/?url=https://mowgarden.com/wishlist/">
                    <button className="w-8 h-8 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                      <i className="fab fa-pinterest text-xs text-gray-600"></i>
                    </button>
                  </a>

                  <a href="mail">
                    <button className="w-8 h-8 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                      <i className="fas fa-envelope text-xs text-gray-600"></i>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tablet Layout */}
        <div className="hidden md:block lg:hidden pt-[11%]">
          <div className="bg-white rounded-lg">
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <button className="text-gray-300 hover:text-gray-500 transition-colors mt-2">
                  <i className="fas fa-times text-sm"></i>
                </button>
                <div className="w-20 h-24 rounded-sm flex items-center justify-center">
                  <img src="/assets/images/zzz.webp" alt="" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-normal text-gray-800 mb-4">
                    Áo sơ mi
                  </h3>
                  <div className="flex space-x-8 mb-4">
                    <div>
                      <span className="text-sm text-gray-600">Price:</span>
                      <span className="text-lg font-medium text-gray-800 ml-2">
                        120.000₫
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Stock:</span>
                      <span className="text-sm text-gray-600 ml-2">
                        In Stock
                      </span>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium underline transition-colors">
                    Move to detailll
                  </button>
                </div>
              </div>
            </div>

            {/* Share Section */}
            <div className="px-6 pb-6">
              <div className="flex justify-center space-x-3">
                <button className="w-10 h-10 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <i className="fab fa-facebook-f text-sm text-gray-600"></i>
                </button>
                <button className="w-10 h-10 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <i className="fab fa-twitter text-sm text-gray-600"></i>
                </button>
                <button className="w-10 h-10 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <i className="fab fa-pinterest text-sm text-gray-600"></i>
                </button>
                <button className="w-10 h-10 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <i className="fas fa-envelope text-sm text-gray-600"></i>
                </button>
                <button className="w-10 h-10 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <i className="fab fa-whatsapp text-sm text-gray-600"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="block md:hidden pt-[11%]">
          <div className="bg-white rounded-lg">
            {listWhistList.map((e, i) => (
              <div key={i} className="p-4">
                <div className="flex items-start space-x-3">
                  <button className="text-gray-300 hover:text-gray-500 transition-colors mt-1">
                    <i className="fas fa-times text-sm"></i>
                  </button>

                  <div className="w-16 h-20  rounded-sm flex items-center justify-center">
                    <img
                      src={`https://huunghi.id.vn/storage/products/${e.anh_san_pham}`}
                      alt=""
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-normal text-gray-800 mb-3">
                      {e.ten_san_pham}
                    </h3>

                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-600">Price:</span>
                        <span className="font-medium text-gray-800">
                          {e.gia_san_pham.toLocaleString("vi-VN")}đ
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Stock:</span>
                        <span className="text-sm text-gray-600">In Stock</span>
                      </div>
                    </div>

                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium underline transition-colors">
                      Move to detaillllllllllegeg
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Share Section */}
            <div className="px-4 pb-4">
              <div className="flex justify-center space-x-2">
                <a href="https://www.facebook.com/sharer.php?u=https://mowgarden.com/wishlist/">
                  <button className="w-8 h-8 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <i className="fab fa-facebook-f text-xs text-gray-600"></i>
                  </button>
                </a>

                <button className="w-8 h-8 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <i className="fab fa-twitter text-xs text-gray-600"></i>
                </button>
                <button className="w-8 h-8 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <i className="fab fa-pinterest text-xs text-gray-600"></i>
                </button>
                <button className="w-8 h-8 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <i className="fas fa-envelope text-xs text-gray-600"></i>
                </button>
                <button className="w-8 h-8 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <i className="fab fa-whatsapp text-xs text-gray-600"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
