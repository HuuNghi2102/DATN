"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortAlphaDown,
  faMagnifyingGlass,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

const categories = [
  {
    id: "all",
    name: "Tất cả",
    image: "https://file.hstatic.net/1000253775/file/all.png",
  },
  {
    id: "shirt",
    name: "Áo thun",
    image: "https://file.hstatic.net/1000253775/file/aothun.png",
  },
  {
    id: "polo",
    name: "Áo polo",
    image:
      "https://file.hstatic.net/1000253775/file/polo_09414aec5dce4cddbe9410c79d3b5d50.png",
  },
  {
    id: "dress-shirt",
    name: "Áo sơ mi",
    image: "https://file.hstatic.net/1000253775/file/aosomi.png",
  },
  {
    id: "jeans",
    name: "Quần jeans",
    image: "https://file.hstatic.net/1000253775/file/jeans_new.png",
  },
  {
    id: "shorts",
    name: "Quần short",
    image: "https://file.hstatic.net/1000253775/file/shorts.png",
  },
  {
    id: "jacket",
    name: "Áo khoác",
    image: "https://file.hstatic.net/1000253775/file/jacket.png",
  },
];

const products = [
  {
    id: "1",
    name: "Áo Thun Nam ICONDENIM Idyllic Scenery",
    originalPrice: "349,000₫",
    discountedPrice: "249,000₫",
    discount: "29%",
    label: "Hàng Mới",
    image: "https://picsum.photos/300/300?random=1",
    hoverImage: "https://picsum.photos/300/300?random=2",
    category: "shirt",
  },
  {
    id: "2",
    name: "Áo Sweatshirt Nam ICONDENIM Basic",
    originalPrice: "389,000₫",
    discountedPrice: "279,000₫",
    discount: "28%",
    label: "Hàng Mới",
    image: "https://picsum.photos/300/300?random=3",
    hoverImage: "https://picsum.photos/300/300?random=4",
    category: "shirt",
  },
  {
    id: "3",
    name: "Quần Short Nam ICONDENIM Denim",
    originalPrice: "419,000₫",
    discountedPrice: "319,000₫",
    discount: "24%",
    label: "",
    image: "https://picsum.photos/300/300?random=5",
    hoverImage: "https://picsum.photos/300/300?random=6",
    category: "shorts",
  },
  {
    id: "4",
    name: "Áo Thun Nam ICONDENIM ORGNLS",
    originalPrice: "289,000₫",
    discountedPrice: "199,000₫",
    discount: "31%",
    label: "Best Seller",
    image: "https://picsum.photos/300/300?random=7",
    hoverImage: "https://picsum.photos/300/300?random=8",
    category: "shirt",
  },
  {
    id: "5",
    name: "Áo Polo Nam ICONDENIM Fit Basic",
    originalPrice: "359,000₫",
    discountedPrice: "259,000₫",
    discount: "28%",
    label: "Hàng Mới",
    image: "https://picsum.photos/300/300?random=9",
    hoverImage: "https://picsum.photos/300/300?random=10",
    category: "polo",
  },
  {
    id: "6",
    name: "Áo Sơ Mi Nam ICONDENIM Trắng Classic",
    originalPrice: "399,000₫",
    discountedPrice: "299,000₫",
    discount: "25%",
    label: "",
    image: "https://picsum.photos/300/300?random=11",
    hoverImage: "https://picsum.photos/300/300?random=12",
    category: "dress-shirt",
  },
  {
    id: "7",
    name: "Quần Jeans Nam ICONDENIM Slim Fit",
    originalPrice: "499,000₫",
    discountedPrice: "399,000₫",
    discount: "20%",
    label: "Best Seller",
    image: "https://picsum.photos/300/300?random=13",
    hoverImage: "https://picsum.photos/300/300?random=14",
    category: "jeans",
  },
  {
    id: "8",
    name: "Áo Khoác Jean Nam ICONDENIM Blue Wash",
    originalPrice: "599,000₫",
    discountedPrice: "459,000₫",
    discount: "23%",
    label: "Hàng Mới",
    image: "https://picsum.photos/300/300?random=15",
    hoverImage: "https://picsum.photos/300/300?random=16",
    category: "jacket",
  },
  {
    id: "9",
    name: "Áo Thun Nam ICONDENIM Oversize",
    originalPrice: "299,000₫",
    discountedPrice: "209,000₫",
    discount: "30%",
    label: "",
    image: "https://picsum.photos/300/300?random=17",
    hoverImage: "https://picsum.photos/300/300?random=18",
    category: "shirt",
  },
];

export default function NewProductPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Sản phẩm nổi bật");
  const [selectedCategory, setSelectedCategory] = useState("all");
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

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getLabelColor = (label: string) => {
    if (label === "Hàng Mới") return "bg-orange-500";
    if (label === "Best Seller") return "bg-yellow-400 text-black";
    return "bg-green-500";
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 pt-[12%]">
      {/* Breadcrumb */}
      <nav className="text-[11px] font-medium pb-2">
        <ul className="flex items-center gap-1">
          <li className="text-[12px] font-semibold mt-0.5">Trang chủ</li>
          <li className="text-gray-500 font-normal">/</li>
          <li className="text-[12px] font-semibold mt-0.5">Sản Phẩm Mới</li>
        </ul>
      </nav>

      {/* Category */}
      <div className="relative">
        <div className="flex justify-center overflow-x-auto space-x-2 pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                setCurrentPage(1); // Reset về trang 1 khi chọn category
              }}
              className={`category-button flex items-center px-9 py-4 rounded text-sm font-medium ${
                selectedCategory === category.id ? "bg-gray-300" : "bg-white"
              } transition-colors whitespace-nowrap`}
            >
              <img
                src={category.image}
                alt={category.name}
                className="mr-2 w-6 h-6"
              />
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div className="flex justify-end mt-4 mb-2 items-center text-black text-[13px] relative z-30">
        <span className="mr-2 font-semibold">Sắp xếp:</span>
        <div className="relative z-30">
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
            <div className="absolute right-0 mt-2 w-48 bg-white border border-black rounded-sm shadow-lg z-40">
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

      {/* Product List */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2 mb-4">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white p-2 rounded border border-gray-200 group"
          >
            <div className="relative">
              <img
                alt={product.name}
                className="w-full h-auto rounded"
                src={product.image}
                loading="lazy"
              />
              <img
                alt={`${product.name} alternate`}
                className="absolute top-0 left-0 w-full h-auto rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                src={product.hoverImage}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-8 h-8 rounded-full flex justify-center items-center text-black text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  title="Xem chi tiết"
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
              </div>
              {product.label && (
                <div
                  className={`absolute top-2 left-2 px-2 py-[2px] text-[11px] font-medium rounded text-white z-30 ${getLabelColor(
                    product.label
                  )}`}
                >
                  {product.label}
                </div>
              )}
              <a
                href="#"
                className="absolute right-2 bottom-2 bg-black w-7 h-7 rounded-full flex justify-center items-center text-white text-sm hover:bg-white hover:text-black z-30"
                aria-label="Thêm vào giỏ"
                title="Thêm vào giỏ"
              >
                <FontAwesomeIcon icon={faCartShopping} />
              </a>
            </div>
            <div className="mt-1 text-sm font-medium text-black leading-[1.25rem]">
              {product.name}
            </div>
            {product.discountedPrice ? (
              <div className="flex items-center gap-2 mt-0.5 leading-[1.25rem]">
                <span className="text-red-600 text-sm font-semibold">
                  {product.discountedPrice}
                </span>
                <span className="line-through text-gray-500 text-[12px]">
                  {product.originalPrice}
                </span>
                <span className="bg-red-600 text-white text-[11px] font-bold px-1.5 py-[1px] rounded">
                  {product.discount}
                </span>
              </div>
            ) : (
              <div className="text-sm font-semibold mt-0.5 leading-[1.25rem]">
                {product.originalPrice}
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
