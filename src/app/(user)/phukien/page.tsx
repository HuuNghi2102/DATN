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
    name: "Quần Jeans Nam Form Slim Fit Trẻ Trung ",
    price: "349,000₫",
    label: "Hàng Mới",
    discount: "299,000₫",
    discountPercent: "40%",
    image: "https://picsum.photos/300/300?random=21",
    hoverImage: "https://picsum.photos/300/300?random=22",
  },
  {
    id: "2",
    name: "Quần Kaki Nam Ống Đứng Basic Dễ Phối",
    price: "279,000₫",
    label: "Hàng Mới",
    image: "https://picsum.photos/300/300?random=23",
    hoverImage: "https://picsum.photos/300/300?random=24",
  },
  {
    id: "3",
    name: "Quần Tây Nam Công Sở Trẻ Trung",
    price: "319,000₫",
    discount: "289,000₫",
    discountPercent: "40%",
    image: "https://picsum.photos/300/300?random=25",
    hoverImage: "https://picsum.photos/300/300?random=26",
  },
  {
    id: "4",
    name: "Quần Jogger Nam Năng Động Cá Tính",
    price: "259,000₫",
    label: "Best Seller",
    image: "https://picsum.photos/300/300?random=27",
    hoverImage: "https://picsum.photos/300/300?random=28",
  },
  {
    id: "5",
    name: "Quần Jeans Nam Form Slim Fit Trẻ Trung ",
    price: "349,000₫",
    label: "Hàng Mới",
    discount: "299,000₫",
    discountPercent: "40%",
    image: "https://picsum.photos/300/300?random=21",
    hoverImage: "https://picsum.photos/300/300?random=22",
  },
  {
    id: "6",
    name: "Quần Kaki Nam Ống Đứng Basic Dễ Phối",
    price: "279,000₫",
    label: "Hàng Mới",
    image: "https://picsum.photos/300/300?random=23",
    hoverImage: "https://picsum.photos/300/300?random=24",
  },
  {
    id: "7",
    name: "Quần Tây Nam Công Sở Trẻ Trung",
    price: "319,000₫",
    discount: "289,000₫",
    discountPercent: "40%",
    image: "https://picsum.photos/300/300?random=25",
    hoverImage: "https://picsum.photos/300/300?random=26",
  },
  {
    id: "8",
    name: "Quần Jogger Nam Năng Động Cá Tính",
    price: "259,000₫",
    label: "Best Seller",
    image: "https://picsum.photos/300/300?random=27",
    hoverImage: "https://picsum.photos/300/300?random=28",
  },
  {
    id: "9",
    name: "Quần Jeans Nam Form Slim Fit Trẻ Trung ",
    price: "349,000₫",
    label: "Hàng Mới",
    discount: "299,000₫",
    discountPercent: "40%",
    image: "https://picsum.photos/300/300?random=21",
    hoverImage: "https://picsum.photos/300/300?random=22",
  },
  {
    id: "10",
    name: "Quần Kaki Nam Ống Đứng Basic Dễ Phối",
    price: "279,000₫",
    label: "Hàng Mới",
    image: "https://picsum.photos/300/300?random=23",
    hoverImage: "https://picsum.photos/300/300?random=24",
  },
  {
    id: "11",
    name: "Quần Tây Nam Công Sở Trẻ Trung",
    price: "319,000₫",
    discount: "289,000₫",
    discountPercent: "40%",
    image: "https://picsum.photos/300/300?random=25",
    hoverImage: "https://picsum.photos/300/300?random=26",
  },
  {
    id: "12",
    name: "Quần Jogger Nam Năng Động Cá Tính",
    price: "259,000₫",
    label: "Best Seller",
    image: "https://picsum.photos/300/300?random=27",
    hoverImage: "https://picsum.photos/300/300?random=28",
  },
  {
    id: "13",
    name: "Quần Jeans Nam Form Slim Fit Trẻ Trung ",
    price: "349,000₫",
    label: "Hàng Mới",
    discount: "299,000₫",
    discountPercent: "40%",
    image: "https://picsum.photos/300/300?random=21",
    hoverImage: "https://picsum.photos/300/300?random=22",
  },
  {
    id: "14",
    name: "Quần Kaki Nam Ống Đứng Basic Dễ Phối",
    price: "279,000₫",
    label: "Hàng Mới",
    image: "https://picsum.photos/300/300?random=23",
    hoverImage: "https://picsum.photos/300/300?random=24",
  },
  {
    id: "15",
    name: "Quần Tây Nam Công Sở Trẻ Trung",
    price: "319,000₫",
    discount: "289,000₫",
    discountPercent: "40%",
    image: "https://picsum.photos/300/300?random=25",
    hoverImage: "https://picsum.photos/300/300?random=26",
  },
  {
    id: "16",
    name: "Quần Jogger Nam Năng Động Cá Tính",
    price: "259,000₫",
    label: "Best Seller",
    image: "https://picsum.photos/300/300?random=27",
    hoverImage: "https://picsum.photos/300/300?random=28",
  },
  {
    id: "17",
    name: "Quần Jeans Nam Form Slim Fit Trẻ Trung ",
    price: "349,000₫",
    label: "Hàng Mới",
    discount: "299,000₫",
    discountPercent: "40%",
    image: "https://picsum.photos/300/300?random=21",
    hoverImage: "https://picsum.photos/300/300?random=22",
  },
  {
    id: "18",
    name: "Quần Kaki Nam Ống Đứng Basic Dễ Phối",
    price: "279,000₫",
    label: "Hàng Mới",
    image: "https://picsum.photos/300/300?random=23",
    hoverImage: "https://picsum.photos/300/300?random=24",
  },
  {
    id: "19",
    name: "Quần Tây Nam Công Sở Trẻ Trung",
    price: "319,000₫",
    discount: "289,000₫",
    discountPercent: "40%",
    image: "https://picsum.photos/300/300?random=25",
    hoverImage: "https://picsum.photos/300/300?random=26",
  },
  {
    id: "20",
    name: "Quần Jogger Nam Năng Động Cá Tính",
    price: "259,000₫",
    label: "Best Seller",
    image: "https://picsum.photos/300/300?random=27",
    hoverImage: "https://picsum.photos/300/300?random=28",
  },
  {
    id: "21",
    name: "Quần Tây Nam Công Sở Trẻ Trung",
    price: "319,000₫",
    discount: "289,000₫",
    discountPercent: "40%",
    image: "https://picsum.photos/300/300?random=25",
    hoverImage: "https://picsum.photos/300/300?random=26",
  },
];

export default function AllProductPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Sản phẩm nổi bật");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

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

  // Tính chỉ mục sản phẩm hiển thị
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Tạo số trang
  const totalPages = Math.ceil(products.length / productsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-[1200px] mx-auto px-4 pt-[11%]">
      <nav className="text-[11px] font-medium pb-2">
        <ul className="flex items-center gap-1">
          <li className="text-[12px] font-semibold mt-0.5">Trang chủ</li>
          <li className="text-gray-500 font-normal">/</li>
          <li className="text-[12px] font-semibold mt-0.5">Phụ Kiện Khác</li>
        </ul>
      </nav>

      <div className="mt-1">
        <img
          alt="Tất cả sản phẩm banner"
          className="w-full object-cover"
          height="300"
          src="/assets/images/banner spmoi.jpg"
          width="1200"
        />
      </div>

      <div className="flex justify-end mt-4 mb-4 items-center text-black text-[13px] relative z-50">
        <span className="mr-2 font-semibold">Sắp xếp:</span>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center border border-black px-3 py-[6px] rounded-sm font-normal hover:bg-gray-100 transition text-[12px]"
          >
            {selectedOption}
            <FontAwesomeIcon
              icon={faSortAlphaDown}
              className="ml-2 text-[17px]"
            />
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-black rounded-sm shadow-lg z-50">
              {sortOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => {
                    setSelectedOption(option);
                    setIsOpen(false);
                  }}
                  className="px-3 py-2 text-[10px] cursor-pointer hover:bg-blue-600 hover:text-white"
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2 mb-4 z-0">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white p-2 rounded border border-gray-200 group relative"
          >
            <div className="relative">
              <img
                alt={product.name}
                src={product.image}
                className="w-full h-auto rounded"
                loading="lazy"
              />
              <img
                alt={`${product.name} alternate`}
                src={product.hoverImage}
                className="absolute top-0 left-0 w-full h-auto rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-8 h-8 rounded-full flex justify-center items-center text-black text-sm">
                  <FontAwesomeIcon icon={faSearch} />
                </div>
              </div>

              {product.label && (
                <div
                  className={`absolute top-2 right-2 px-2 py-[2px] text-[11px] font-semibold rounded z-30 ${
                    ["Sieu Mat", "Sieu Nhe"].includes(product.label)
                      ? "text-white bg-blue-600"
                      : "text-black bg-orange-500"
                  }`}
                >
                  {product.label}
                </div>
              )}

              <a
                href="#"
                className="absolute right-2 bottom-2 bg-black w-7 h-7 rounded-full flex justify-center items-center text-white text-sm hover:bg-white hover:text-black z-30"
              >
                <FontAwesomeIcon icon={faShoppingCart} />
              </a>
            </div>

            <div className="mt-1 text-sm font-medium text-black leading-[1.25rem]">
              {product.name}
            </div>

            {product.discount ? (
              <div className="flex items-center gap-2 mt-0.5 leading-[1.25rem]">
                <span className="text-red-600 text-sm font-semibold">
                  {product.discount}
                </span>
                <span className="line-through text-gray-500 text-[12px]">
                  {product.price}
                </span>
                <span className="bg-red-600 text-white text-[11px] font-bold px-1.5 py-[1px] rounded">
                  {product.discountPercent}
                </span>
              </div>
            ) : (
              <div className="text-sm font-semibold mt-0.5 leading-[1.25rem]">
                {product.price}
              </div>
            )}
          </div>
        ))}
      </div>

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
    </div>
  );
}
