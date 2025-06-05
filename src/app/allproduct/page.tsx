'use client';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const products = [
  {
    id: '1',
    name: 'Quần Short Nam ICONDENIM Linen Sundaze Rush',
    price: '319,000₫',
    label: 'Hàng Mới',
    image: 'https://picsum.photos/300/300?random=1',
    hoverImage: 'https://picsum.photos/300/300?random=2',
  },
  {
    id: '2',
    name: 'Áo Thun Nam ICONDENIM Double Stripes ICDN',
    price: '299,000₫',
    label: 'Hàng Mới',
    image: 'https://picsum.photos/300/300?random=3',
    hoverImage: 'https://picsum.photos/300/300?random=4',
  },
  {
    id: '3',
    name: 'Dép Quai Ngang Nam ICONDENIM Shade Flow',
    price: '329,000₫',
    label: 'Hàng Mới',
    image: 'https://picsum.photos/300/300?random=5',
    hoverImage: 'https://picsum.photos/300/300?random=6',
  },
  {
    id: '4',
    name: 'Quần Short Denim Nam ICONDENIM - Basic 5-Pocket Ripped Wash',
    price: '399,000₫',
    label: 'Best Seller',
    image: 'https://picsum.photos/300/300?random=7',
    hoverImage: 'https://picsum.photos/300/300?random=8',
  },
];

export default function AllProductPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 pt-[11%]"> 

      {/* Breadcrumb */}
      <nav className="text-[11px] font-normal text-black pb-2">
    <ul className="flex items-center gap-1">
      <li className="text-gray-500 hover:text-black cursor-pointer">Trang chủ</li>
      <li>/</li>
      <li className="font-semibold">TẤT CẢ SẢN PHẨM</li>
    </ul>
  </nav>

      {/* Banner */}
      <div className="mt-1">
        <img
          alt="Menswear banner"
          className="w-full object-cover"
          height="300"
          src="https://picsum.photos/1200/300?random=9"
          width="1200"
        />
      </div>

      {/* Sort */}
      <div className="flex justify-end mt-3 text-[10px] font-normal text-black">
        <label className="mr-2" htmlFor="sort">Sắp xếp:</label>
        <select
          className="border border-gray-300 rounded-full text-xs font-semibold px-2 py-1"
          id="sort"
          name="sort"
        >
          <option>Sản phẩm nổi bật</option>
        </select>
      </div>

      {/* Product list */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2 mb-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-2 rounded border border-gray-200 group"
          >
            <div className="relative">
              {/* Ảnh chính */}
              <img
                alt={product.name}
                className="w-full h-auto rounded"
                height="300"
                src={product.image}
                width="300"
                loading="lazy"
              />

              {/* Ảnh hover */}
              <img
                alt={`${product.name} alternate`}
                className="absolute top-0 left-0 w-full h-auto rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                height="300"
                src={product.hoverImage}
                width="300"
                loading="lazy"
              />

              {/* Overlay mờ */}
              <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                {/* Icon search */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-8 h-8 rounded-full flex justify-center items-center text-black text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  title="Xem chi tiết"
                >
                  <FontAwesomeIcon icon={faSearch} />
                </div>
              </div>

              {/* Label */}
              <div
                className={`absolute top-2 left-2 px-2 py-1 text-[10px] font-bold rounded text-white z-30 ${
                  product.label === 'Hàng Mới' ? 'bg-red-500' : 'bg-orange-500'
                }`}
              >
                {product.label}
              </div>

              {/* Icon giỏ */}
              <a
                href="#"
                className="absolute right-2 bottom-2 bg-black w-7 h-7 rounded-full flex justify-center items-center text-white text-sm hover:bg-white hover:text-black z-30"
                aria-label="Thêm vào giỏ"
                title="Thêm vào giỏ"
              >
                <FontAwesomeIcon icon={faShoppingCart} />
              </a>
            </div>

            <div className="mt-1 text-[11px] font-normal text-black leading-tight">
              {product.name}
            </div>
            <div className="text-[12px] font-semibold mt-0.5">
              {product.price}
            </div>
          </div>
        ))}
      </div>

      {/* Xem thêm */}
      <div className="flex justify-center mb-10">
        <button className="bg-black text-white text-[11px] font-semibold px-5 py-2 rounded-full border-black transition">
          XEM THÊM
        </button>
      </div>
    </div>
  );
}
