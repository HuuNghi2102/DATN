"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShoppingCart,
  faSortAlphaDown,
} from "@fortawesome/free-solid-svg-icons";

const products = [
  {
    id: "1",
    name: "Áo Thun Nam Trơn Cotton Mềm Mại",
    price: "199,000₫",
    label: "Hàng Mới",
    discount: "179,000₫",
    discountPercent: "40%",
    image: "https://picsum.photos/300/300?random=101",
    hoverImage: "https://picsum.photos/300/300?random=102",
  },
  {
    id: "2",
    name: "Áo Sơ Mi Nam Dài Tay Thanh Lịch",
    price: "259,000₫",
    label: "Hàng Mới",
    image: "https://picsum.photos/300/300?random=103",
    hoverImage: "https://picsum.photos/300/300?random=104",
  },
  {
    id: "3",
    name: "Áo Polo Nam Cá Tính",
    price: "299,000₫",
    discount: "269,000₫",
    image: "https://picsum.photos/300/300?random=105",
    hoverImage: "https://picsum.photos/300/300?random=106",
  },
  {
    id: "4",
    name: "Áo Khoác Nam Thể Thao Năng Động",
    price: "399,000₫",
    label: "Best Seller",
    image: "https://picsum.photos/300/300?random=107",
    hoverImage: "https://picsum.photos/300/300?random=108",
  },
  {
    id: "5",
    name: "Áo Hoodie Nam Năng Động",
    price: "349,000₫",
    label: "Hàng Mới",
    image: "https://picsum.photos/300/300?random=109",
    hoverImage: "https://picsum.photos/300/300?random=110",
  },
  {
    id: "6",
    name: "Áo Sơ Mi Trơn Trẻ Trung",
    price: "279,000₫",
    image: "https://picsum.photos/300/300?random=111",
    hoverImage: "https://picsum.photos/300/300?random=112",
  },
  {
    id: "7",
    name: "Áo Bomber Phối Màu Cá Tính",
    price: "399,000₫",
    discount: "369,000₫",
    discountPercent: "10%",
    image: "https://picsum.photos/300/300?random=113",
    hoverImage: "https://picsum.photos/300/300?random=114",
  },
  {
    id: "8",
    name: "Áo Len Dệt Kim Nam",
    price: "319,000₫",
    label: "Best Seller",
    image: "https://picsum.photos/300/300?random=115",
    hoverImage: "https://picsum.photos/300/300?random=116",
  },
  {
    id: "9",
    name: "Áo Thun Nam Trơn Cotton Mềm Mại",
    price: "199,000₫",
    label: "Hàng Mới",
    discount: "179,000₫",
    discountPercent: "40%",
    image: "https://picsum.photos/300/300?random=101",
    hoverImage: "https://picsum.photos/300/300?random=102",
  },
  {
    id: "10",
    name: "Áo Sơ Mi Nam Dài Tay Thanh Lịch",
    price: "259,000₫",
    label: "Hàng Mới",
    image: "https://picsum.photos/300/300?random=103",
    hoverImage: "https://picsum.photos/300/300?random=104",
  },
  {
    id: "11",
    name: "Áo Polo Nam Cá Tính",
    price: "299,000₫",
    discount: "269,000₫",
    image: "https://picsum.photos/300/300?random=105",
    hoverImage: "https://picsum.photos/300/300?random=106",
  },
  {
    id: "12",
    name: "Áo Khoác Nam Thể Thao Năng Động",
    price: "399,000₫",
    label: "Best Seller",
    image: "https://picsum.photos/300/300?random=107",
    hoverImage: "https://picsum.photos/300/300?random=108",
  },
  {
    id: "13",
    name: "Áo Hoodie Nam Năng Động",
    price: "349,000₫",
    label: "Hàng Mới",
    image: "https://picsum.photos/300/300?random=109",
    hoverImage: "https://picsum.photos/300/300?random=110",
  },
  {
    id: "14",
    name: "Áo Sơ Mi Trơn Trẻ Trung",
    price: "279,000₫",
    image: "https://picsum.photos/300/300?random=111",
    hoverImage: "https://picsum.photos/300/300?random=112",
  },
  {
    id: "15",
    name: "Áo Bomber Phối Màu Cá Tính",
    price: "399,000₫",
    discount: "369,000₫",
    discountPercent: "10%",
    image: "https://picsum.photos/300/300?random=113",
    hoverImage: "https://picsum.photos/300/300?random=114",
  },
  {
    id: "16",
    name: "Áo Len Dệt Kim Nam",
    price: "319,000₫",
    label: "Best Seller",
    image: "https://picsum.photos/300/300?random=115",
    hoverImage: "https://picsum.photos/300/300?random=116",
  },
  {
    id: "17",
    name: "Áo Len Dệt Kim Nam",
    price: "319,000₫",
    label: "Best Seller",
    image: "https://picsum.photos/300/300?random=115",
    hoverImage: "https://picsum.photos/300/300?random=116",
  },
  {
    id: "18",
    name: "Áo Len Dệt Kim Nam",
    price: "319,000₫",
    label: "Best Seller",
    image: "https://picsum.photos/300/300?random=115",
    hoverImage: "https://picsum.photos/300/300?random=116",
  },
  {
    id: "19",
    name: "Áo Len Dệt Kim Nam",
    price: "319,000₫",
    label: "Best Seller",
    image: "https://picsum.photos/300/300?random=115",
    hoverImage: "https://picsum.photos/300/300?random=116",
  },
  {
    id: "20",
    name: "Áo Len Dệt Kim Nam",
    price: "319,000₫",
    label: "Best Seller",
    image: "https://picsum.photos/300/300?random=115",
    hoverImage: "https://picsum.photos/300/300?random=116",
  },

  {
    id: "21",
    name: "Áo Bomber Phối Màu Cá Tính",
    price: "399,000₫",
    discount: "369,000₫",
    discountPercent: "10%",
    image: "https://picsum.photos/300/300?random=113",
    hoverImage: "https://picsum.photos/300/300?random=114",
  },
  {
    id: "22",
    name: "Áo Khoác Nam Thể Thao Năng Động",
    price: "399,000₫",
    label: "Best Seller",
    image: "https://picsum.photos/300/300?random=107",
    hoverImage: "https://picsum.photos/300/300?random=108",
  },
  {
    id: "23",
    name: "Áo Hoodie Nam Năng Động",
    price: "349,000₫",
    label: "Hàng Mới",
    image: "https://picsum.photos/300/300?random=109",
    hoverImage: "https://picsum.photos/300/300?random=110",
  },
];

export default function ShirtProductPage() {
  const newProducts = products.filter(
    (product) => product.label || product.discount
  );
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Sản phẩm nổi bật");
  const [isContentExpanded, setIsContentExpanded] = useState(false);

  // Pagination logic
  const productsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(newProducts.length / productsPerPage);
  const paginatedProducts = newProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const sortOptions = [
    "Sản phẩm nổi bật",
    "Giá: Tăng dần",
    "Giá: Giảm dần",
    "Tên: A-Z",
    "Tên: Z-A",
    "Cũ nhất",
    "Mới nhất",
    "Bán chạy nhất",
    "Tồn kho: Giảm dần",
  ];

  const articleContent = `
Bạn đang tìm kiếm chiếc áo vừa đẹp vừa dễ phối? Bộ sưu tập Áo Nam tại 160STORE là điểm đến lý tưởng cho phong cách hiện đại, năng động và cá tính.

Từ áo thun basic, áo sơ mi lịch lãm đến áo khoác thời trang, chúng tôi cung cấp nhiều lựa chọn phù hợp với mọi hoàn cảnh. Dù bạn là người yêu thích sự tối giản hay phá cách, 160STORE đều có thể đáp ứng.

Một số dòng áo nam nổi bật tại 160STORE:
- Áo thun nam: Đơn giản, trẻ trung, dễ phối cùng quần jeans hoặc jogger.
- Áo sơ mi: Lịch sự, hiện đại, phù hợp công sở hoặc sự kiện quan trọng.
- Áo polo: Kết hợp giữa thoải mái và trang nhã, rất được ưa chuộng.
- Áo khoác: Dành cho mùa lạnh hoặc đi chơi, thiết kế cá tính, chất liệu cao cấp.

Sản phẩm tại 160STORE luôn được chọn lọc kỹ lưỡng, mang đến trải nghiệm mặc thoải mái và tự tin. Đừng bỏ lỡ các chương trình khuyến mãi hấp dẫn được cập nhật liên tục.

Khám phá ngay bộ sưu tập Áo Nam tại 160STORE để nâng tầm phong cách mỗi ngày!`;

  const truncatedContent = articleContent.substring(0, 200) + "...";

  return (
    <div className="max-w-[1200px] mx-auto px-4 pt-[11%]">
      <nav className="text-[11px] font-medium pb-2">
        <ul className="flex items-center gap-1">
          <li className="text-[12px] font-semibold mt-0.5">Trang chủ</li>
          <li className="text-gray-500 font-normal">/</li>
          <li className="text-[12px] font-semibold mt-0.5">Áo</li>
        </ul>
      </nav>

      <div className="mt-1">
        <img
          alt="Banner Áo Nam"
          className="w-full object-cover"
          height="300"
          src="/assets/images/banner aonam.webp"
          width="1200"
        />
      </div>

      <div className="flex justify-end mt-4 mb-2 items-center text-black text-[13px]">
        <span className="mr-2 font-semibold">Sắp xếp:</span>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center border border-black px-3 py-[6px] rounded-sm font-normal hover:bg-gray-100 transition text-[13px]"
          >
            {selectedOption}
            <FontAwesomeIcon
              icon={faSortAlphaDown}
              className="ml-2 text-[17px]"
            />
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-black rounded-sm shadow-lg z-10">
              {sortOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => {
                    setSelectedOption(option);
                    setIsOpen(false);
                  }}
                  className="px-3 py-2 text-[13px] cursor-pointer hover:bg-blue-600 hover:text-white"
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2 mb-4">
        {paginatedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white p-2 rounded border border-gray-200 group"
          >
            <div className="relative">
              <img
                alt={product.name}
                className="w-full h-auto rounded"
                height="300"
                src={product.image}
                width="300"
                loading="lazy"
              />
              <img
                alt={`${product.name} alternate`}
                className="absolute top-0 left-0 w-full h-auto rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                height="300"
                src={product.hoverImage}
                width="300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-8 h-8 rounded-full flex justify-center items-center text-black text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  title="Xem chi tiết"
                >
                  <FontAwesomeIcon icon={faSearch} />
                </div>
              </div>
              <a
                href="#"
                className="absolute right-2 bottom-2 bg-black w-7 h-7 rounded-full flex justify-center items-center text-white text-sm hover:bg-white hover:text-black z-30"
                aria-label="Thêm vào giỏ"
                title="Thêm vào giỏ"
              >
                <FontAwesomeIcon icon={faShoppingCart} />
              </a>
              {product.label && (
                <div
                  className={`absolute top-2 right-2 text-[11px] font-medium px-2 py-[2px] rounded z-30 ${
                    ["Sieu Mat", "Sieu Nhe"].includes(product.label)
                      ? "bg-blue-600 text-white"
                      : "bg-orange-500 text-black"
                  }`}
                >
                  {product.label}
                </div>
              )}
            </div>

            <div className="mt-1 text-sm font-medium text-black leading-[1.25rem]">
              {product.name}
            </div>

            <div className="text-sm font-semibold mt-0.5 leading-[1.25rem] flex items-center gap-2">
              {product.discount ? (
                <>
                  <span className="text-red-600">{product.discount}</span>
                  <span className="line-through text-gray-500 text-[12px]">
                    {product.price}
                  </span>
                  <span className="bg-red-600 text-white text-[11px] font-bold px-1.5 py-[1px] rounded">
                    {product.discountPercent}
                  </span>
                </>
              ) : (
                product.price
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {/* Pagination */}
      <div className="flex justify-center my-6 gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`px-3 py-1 border text-sm rounded ${
              currentPage === page
                ? "bg-black text-white"
                : "bg-white text-black border-gray-300 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <div className="mt-6 mb-10 text-center">
        <h2 className="text-[18px] font-bold mb-4">
          Khám phá Áo Nam Thời Trang tại 160STORE
        </h2>
        <div className="text-[14px] text-black leading-relaxed">
          {isContentExpanded ? articleContent : truncatedContent}
        </div>
        <div className="mt-2 flex justify-center">
          <button
            onClick={() => setIsContentExpanded(!isContentExpanded)}
            className="bg-black text-white text-[13px] font-medium px-6 py-2 rounded hover:opacity-50 transition"
          >
            {isContentExpanded ? "Thu gọn" : "Xem thêm"}
          </button>
        </div>
      </div>
    </div>
  );
}
