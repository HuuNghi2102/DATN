"use client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhoneAlt,
  faLocationArrow,
  faBoxOpen,
  faShieldAlt,
  faCopyright,
} from "@fortawesome/free-solid-svg-icons";
import { faClock as faClockRegular } from "@fortawesome/free-regular-svg-icons";
import { useParams } from "next/navigation";
import Link from "next/link";

const IntegratedPage = () => {
  const useParam = useParams();
  const { slug } = useParam;

  const [shirtShopPage, setShirtShopPage] = useState(1);
  const [articlePage, setArticlePage] = useState(1);
  const [storePage, setStorePage] = useState(1);
  const titleRef = useRef<HTMLDivElement>(null);
  const [currentPost, setCurrentPost] = useState<any>();
  const [arrayPostNew, setArrayPostNew] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    if (!slug) {
      toast.error("Bài viết không tồn tại");
      window.location.href = "/blog";
    }

    const resBlog = await fetch(
      `https://huunghi.id.vn/api/post/getPost/${slug}`
    );
    if (!resBlog.ok) {
      toast.error("Bài viết không tồn tại");
      return (window.location.href = "/blog");
    }
    const result = await resBlog.json();
    setCurrentPost(result.data.post);

    const resBlogNew = await fetch("https://huunghi.id.vn/api/post/getPostNew");
    const resultPostNew = await resBlogNew.json();
    setArrayPostNew(resultPostNew.data.postsNew);

    setIsLoading(false);
  };

  // Dữ liệu bài viết
  const articles = [
    {
      id: 1,
      title: "Top 8+ Các Thương Hiệu Quần Jeans Nổi Tiếng Việt Nam Và Quốc Tế",
      description:
        "Quần jeans từ lâu đã trở thành biểu tượng thời trang không thể thiếu trong tủ đồ của mọi người. Trên thế giới...",
      date: "28/04/2025",
      image:
        "https://storage.googleapis.com/a1aa/image/86c872df-b08f-4793-3c5b-ec52f24c608a.jpg",
      link: "#",
    },
    ...Array.from({ length: 30 }, (_, i) => ({
      id: i + 2,
      title: `Bài viết demo số ${i + 2}`,
      description: "Đây là mô tả ngắn gọn cho bài viết demo...",
      date: "01/06/2025",
      image:
        "https://storage.googleapis.com/a1aa/image/86c872df-b08f-4793-3c5b-ec52f24c608a.jpg",
      link: "#",
    })),
  ];

  // Dữ liệu cửa hàng
  const PRODUCTS = [
    {
      id: 1,
      name: "ĐÀ NẴNG - LÊ DUẨN",
      address: "332 Đ. Lê Duẩn, Tân Chính, Thanh Khê, Đà Nẵng, Vietnam",
      hours: "8:30 - 22:00",
      phone: "02871008789",
      image:
        "https://storage.googleapis.com/a1aa/image/4c35cf68-8042-4673-aa61-1fc8038a6d59.jpg",
      isNew: true,
    },
    {
      id: 2,
      name: "ĐẮK LẮK - BUÔN MA THUỘT",
      address: "14 Phan Chu Trinh, Thắng Lợi, Buôn Ma Thuột, Đắk Lắk, Vietnam",
      hours: "8:30 - 22:00",
      phone: "02871008789",
      image:
        "https://storage.googleapis.com/a1aa/image/b915f2b6-310a-4892-c8a5-6f875d9dac7f.jpg",
      isNew: false,
    },
    {
      id: 3,
      name: "LONG AN - TÂN AN",
      address: "290 Đ. Hùng Vương, Phường 3, Tân An, Long An",
      hours: "8:30 - 22:00",
      phone: "02871008789",
      image:
        "https://storage.googleapis.com/a1aa/image/8e0b3a6f-eec7-48a2-9e8c-ab45f8ef6ad1.jpg",
      isNew: false,
    },
    {
      id: 4,
      name: "HỒ CHÍ MINH - TÔ HIẾN THÀNH",
      address: "297/13 Tô Hiến Thành, Phường 13, Quận 10, TP.HCM",
      hours: "8:30 - 22:00",
      phone: "02871008789",
      image:
        "https://storage.googleapis.com/a1aa/image/2dd88e25-9d20-42c6-0ff2-3f7a6ff62592.jpg",
      isNew: false,
    },
    {
      id: 5,
      name: "HỒ CHÍ MINH - TRẦN HƯNG ĐẠO",
      address: "391/37/5 Trần Hưng Đạo, Phường Cầu Kho, Quận 1, TP.HCM",
      hours: "8:30 - 22:00",
      phone: "02871008789",
      image:
        "https://storage.googleapis.com/a1aa/image/88111d09-f507-495d-088b-543c24045d91.jpg",
      isNew: false,
    },
    {
      id: 6,
      name: "CẦN THƠ - TRẦN PHÚ",
      address: "Số 35 Trần Phú, Phường Cái Khế, Quận Ninh Kiều, TP.Cần Thơ",
      hours: "8:30 - 22:00",
      phone: "02871008789",
      image:
        "https://storage.googleapis.com/a1aa/image/7b1abc58-d5fe-448f-dfbf-1f5801f20684.jpg",
      isNew: false,
    },
    {
      id: 7,
      name: "ĐÀ NẴNG - LÊ DUẨN",
      address: "332 Đ. Lê Duẩn, Tân Chính, Thanh Khê, Đà Nẵng, Vietnam",
      hours: "8:30 - 22:00",
      phone: "02871008789",
      image:
        "https://storage.googleapis.com/a1aa/image/4c35cf68-8042-4673-aa61-1fc8038a6d59.jpg",
      isNew: true,
    },
    {
      id: 8,
      name: "ĐẮK LẮK - BUÔN MA THUỘT",
      address: "14 Phan Chu Trinh, Thắng Lợi, Buôn Ma Thuột, Đắk Lắk, Vietnam",
      hours: "8:30 - 22:00",
      phone: "02871008789",
      image:
        "https://storage.googleapis.com/a1aa/image/b915f2b6-310a-4892-c8a5-6f875d9dac7f.jpg",
      isNew: false,
    },
    {
      id: 9,
      name: "LONG AN - TÂN AN",
      address: "290 Đ. Hùng Vương, Phường 3, Tân An, Long An",
      hours: "8:30 - 22:00",
      phone: "02871008789",
      image:
        "https://storage.googleapis.com/a1aa/image/8e0b3a6f-eec7-48a2-9e8c-ab45f8ef6ad1.jpg",
      isNew: false,
    },
    {
      id: 10,
      name: "HỒ CHÍ MINH - TÔ HIẾN THÀNH",
      address: "297/13 Tô Hiến Thành, Phường 13, Quận 10, TP.HCM",
      hours: "8:30 - 22:00",
      phone: "02871008789",
      image:
        "https://storage.googleapis.com/a1aa/image/2dd88e25-9d20-42c6-0ff2-3f7a6ff62592.jpg",
      isNew: false,
    },
    {
      id: 11,
      name: "HỒ CHÍ MINH - TRẦN HƯNG ĐẠO",
      address: "391/37/5 Trần Hưng Đạo, Phường Cầu Kho, Quận 1, TP.HCM",
      hours: "8:30 - 22:00",
      phone: "02871008789",
      image:
        "https://storage.googleapis.com/a1aa/image/88111d09-f507-495d-088b-543c24045d91.jpg",
      isNew: false,
    },
    {
      id: 12,
      name: "CẦN THƠ - TRẦN PHÚ",
      address: "Số 35 Trần Phú, Phường Cái Khế, Quận Ninh Kiều, TP.Cần Thơ",
      hours: "8:30 - 22:00",
      phone: "02871008789",
      image:
        "https://storage.googleapis.com/a1aa/image/7b1abc58-d5fe-448f-dfbf-1f5801f20684.jpg",
      isNew: false,
    },
    {
      id: 13,
      name: "ĐÀ NẴNG - LÊ DUẨN",
      address: "332 Đ. Lê Duẩn, Tân Chính, Thanh Khê, Đà Nẵng, Vietnam",
      hours: "8:30 - 22:00",
      phone: "02871008789",
      image:
        "https://storage.googleapis.com/a1aa/image/4c35cf68-8042-4673-aa61-1fc8038a6d59.jpg",
      isNew: true,
    },
    {
      id: 14,
      name: "ĐẮK LẮK - BUÔN MA THUỘT",
      address: "14 Phan Chu Trinh, Thắng Lợi, Buôn Ma Thuột, Đắk Lắk, Vietnam",
      hours: "8:30 - 22:00",
      phone: "02871008789",
      image:
        "https://storage.googleapis.com/a1aa/image/b915f2b6-310a-4892-c8a5-6f875d9dac7f.jpg",
      isNew: false,
    },
    {
      id: 15,
      name: "LONG AN - TÂN AN",
      address: "290 Đ. Hùng Vương, Phường 3, Tân An, Long An",
      hours: "8:30 - 22:00",
      phone: "02871008789",
      image:
        "https://storage.googleapis.com/a1aa/image/8e0b3a6f-eec7-48a2-9e8c-ab45f8ef6ad1.jpg",
      isNew: false,
    },
    {
      id: 16,
      name: "HỒ CHÍ MINH - TÔ HIẾN THÀNH",
      address: "297/13 Tô Hiến Thành, Phường 13, Quận 10, TP.HCM",
      hours: "8:30 - 22:00",
      phone: "02871008789",
      image:
        "https://storage.googleapis.com/a1aa/image/2dd88e25-9d20-42c6-0ff2-3f7a6ff62592.jpg",
      isNew: false,
    },
    {
      id: 17,
      name: "HỒ CHÍ MINH - TRẦN HƯNG ĐẠO",
      address: "391/37/5 Trần Hưng Đạo, Phường Cầu Kho, Quận 1, TP.HCM",
      hours: "8:30 - 22:00",
      phone: "02871008789",
      image:
        "https://storage.googleapis.com/a1aa/image/88111d09-f507-495d-088b-543c24045d91.jpg",
      isNew: false,
    },
    {
      id: 18,
      name: "CẦN THƠ - TRẦN PHÚ",
      address: "Số 35 Trần Phú, Phường Cái Khế, Quận Ninh Kiều, TP.Cần Thơ",
      hours: "8:30 - 22:00",
      phone: "02871008789",
      image:
        "https://storage.googleapis.com/a1aa/image/7b1abc58-d5fe-448f-dfbf-1f5801f20684.jpg",
      isNew: false,
    },
  ];

  const articlesPerPage = 15;
  const storesPerPage = 12;

  const currentArticles = articles.slice(
    (articlePage - 1) * articlesPerPage,
    articlePage * articlesPerPage
  );
  const currentStores = PRODUCTS.slice(
    (storePage - 1) * storesPerPage,
    storePage * storesPerPage
  );

  const totalArticlePages = Math.ceil(articles.length / articlesPerPage);
  const totalStorePages = Math.ceil(PRODUCTS.length / storesPerPage);

  const handleArticlePageChange = (page: number) => {
    setArticlePage(page);
    titleRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleStorePageChange = (page: number) => {
    setStorePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    <div className="bg-white text-black text-[13px] leading-[18px] pt-[9%]">
      <div className="max-w-[1200px] mx-auto px-4 py-3">
        {/* Breadcrumb và Tiêu đề */}
        <nav className="text-[11px] font-medium pb-2">
          <ul className="flex items-center gap-1">
            <li className="text-[12px] font-semibold mt-0.5">Trang chủ</li>
            <li className="text-gray-500 font-normal">/</li>
            <li className="text-[12px] font-semibold mt-0.5">
              Shop thời trang
            </li>
            <li className="text-gray-500 font-normal">/</li>
            <li className="text-[12px] font-semibold mt-0.5">
              Top 5 shop bán áo sơ mi nam đẹp ở Gò Vấp
            </li>
          </ul>
        </nav>
        <h1 className="font-bold md:text-[26px] mb-3 ">
          {currentPost?.ten_bai_viet}
        </h1>

        {/* Nội dung chính với layout mới */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Nội dung bài viết chính - chiếm 2/3 width */}
          <div className="lg:w-2/3">
            <img
              className="w-full mb-4 rounded-lg"
              src={`https://huunghi.id.vn/storage/posts/${currentPost?.anh_bai_viet}`}
              alt={currentPost?.ten_bai_viet}
            />
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: currentPost?.noi_dung_bai_viet,
              }}
            />
          </div>

          {/* Sidebar bài viết liên quan - thiết kế cao cấp */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              {/* Header với icon */}
              <div className="flex items-center mb-6 pb-4 border-b border-gray-100">
                <svg
                  className="w-5 h-5 text-blue-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                <h2 className="text-lg font-bold text-gray-800">
                  BÀI VIẾT LIÊN QUAN
                </h2>
              </div>

              {/* Danh sách bài viết */}
              <div className="space-y-5">
                {arrayPostNew.slice(0, 5).map((article) => (
                  <Link
                    key={article.id_bai_viet}
                    href={article.duong_dan}
                    className="group block transition duration-200 hover:-translate-y-0.5"
                  >
                    <div className="flex gap-4">
                      {/* Hình ảnh với hiệu ứng */}
                      <div className="relative flex-shrink-0 w-24 h-24 overflow-hidden rounded-lg shadow-sm">
                        <img
                          src={`https://huunghi.id.vn/storage/posts/${article.anh_bai_viet}`}
                          alt={article.ten_bai_viet}
                          className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
                      </div>

                      {/* Nội dung text */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-[15px] leading-snug text-gray-800 group-hover:text-blue-600 transition line-clamp-2">
                          {article.ten_bai_viet}
                        </h3>

                        {/* Nội dung demo rút gọn */}
                        <p className="mt-1 text-xs text-gray-500 line-clamp-2">
                          {article.noi_dung_bai_viet
                            .replace(/<[^>]*>/g, "")
                            .substring(0, 80)}
                          ...
                        </p>

                        {/* Ngày đăng và đọc tiếp */}
                        <div className="flex items-center justify-between mt-2">
                          <span className="flex items-center text-xs text-gray-400">
                            <svg
                              className="w-3 h-3 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            {new Date(article.created_at).toLocaleDateString(
                              "vi-VN"
                            )}
                          </span>
                          <span className="text-xs font-medium text-blue-500 flex items-center group-hover:text-blue-600 transition">
                            Đọc tiếp
                            <svg
                              className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Nút xem thêm */}
              <div className="mt-6 text-center">
                <a
                  href="/blog"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200 shadow-sm"
                >
                  Xem tất cả bài viết
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Phần địa chỉ cửa hàng */}
        <div className="mt-10">
          <h1 className="font-bold text-[18px] text-center mb-3">
            HỆ THỐNG CỬA HÀNG
          </h1>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="flex items-center border border-gray-300 rounded-md p-3 space-x-3 bg-white">
              <FontAwesomeIcon
                icon={faBoxOpen}
                className="text-yellow-500 text-xl flex-shrink-0"
              />
              <div className="text-xs sm:text-sm text-gray-700 font-semibold">
                ĐỔI TRẢ TRONG 15 NGÀY
              </div>
            </div>
            <div className="flex items-center border border-gray-300 rounded-md p-3 space-x-3 bg-white">
              <FontAwesomeIcon
                icon={faShieldAlt}
                className="text-yellow-500 text-xl flex-shrink-0"
              />
              <div className="text-xs sm:text-sm text-gray-700 font-semibold">
                BẢO HÀNH TRONG 30 NGÀY
              </div>
            </div>
            <div className="flex items-center border border-gray-300 rounded-md p-3 space-x-3 bg-white">
              <FontAwesomeIcon
                icon={faCopyright}
                className="text-yellow-500 text-xl flex-shrink-0"
              />
              <div className="text-xs sm:text-sm text-gray-700 font-semibold">
                PHÂN PHỐI ĐỘC QUYỀN
              </div>
            </div>
            <div className="flex items-center border border-gray-300 rounded-md p-3 space-x-3 bg-white">
              <FontAwesomeIcon
                icon={faPhoneAlt}
                className="text-yellow-500 text-xl flex-shrink-0"
              />
              <div className="text-xs sm:text-sm text-gray-700 font-semibold">
                HOTLINE - 028 7100 6789
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full sm:w-1/4">
              <option>Chọn tỉnh thành phố</option>
              <option>Đà Nẵng</option>
              <option>Đắk Lắk</option>
              <option>Long An</option>
              <option>Hồ Chí Minh</option>
              <option>Cần Thơ</option>
            </select>
            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full sm:w-1/4">
              <option>Chọn Quận/huyện</option>
            </select>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentStores.map((store) => (
              <div
                key={store.id}
                className="bg-white rounded-md shadow-md overflow-hidden"
              >
                <img
                  alt={`Store front at ${store.name}`}
                  className="w-full object-cover h-48"
                  src={store.image}
                />
                <div className="p-4 text-black">
                  <h3 className="text-base font-semibold flex items-center gap-2">
                    {store.name}
                    {store.isNew && (
                      <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                        New
                      </span>
                    )}
                  </h3>
                  <p className="text-xs mt-1 flex items-center gap-1">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="text-xs"
                    />
                    {store.address}
                  </p>
                  <p className="text-xs mt-1 flex items-center gap-1">
                    <FontAwesomeIcon
                      icon={faClockRegular}
                      className="text-xs"
                    />
                    {store.hours}
                    <span className="ml-auto text-xs font-semibold rounded bg-blue-200 text-blue-400 px-2 py-0.5">
                      Đang mở
                    </span>
                  </p>
                  <p className="text-xs mt-1 flex items-center gap-1 justify-between">
                    <span className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faPhoneAlt} className="text-xs" />
                      {store.phone}
                    </span>
                    <button className="flex items-center gap-1 text-xs border border-gray-300 rounded-md px-3 py-1 hover:bg-black hover:text-white transition">
                      <FontAwesomeIcon
                        icon={faLocationArrow}
                        className="text-xs"
                      />
                      Xem bản đồ
                    </button>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center my-6 gap-2">
            {Array.from({ length: totalStorePages }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => handleStorePageChange(page)}
                  className={`px-3 py-1 border text-sm rounded ${
                    storePage === page
                      ? "bg-black text-white"
                      : "bg-white text-black border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              )
            )}
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default IntegratedPage;
