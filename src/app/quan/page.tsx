'use client';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faSortAlphaDown } from '@fortawesome/free-solid-svg-icons';

const products = [
  {
    id: '1',
    name: 'Quần Jeans Nam Form Slim Fit Trẻ Trung ',
    price: '349,000₫',
    label: 'Hàng Mới',
    discount: '299,000₫',
    discountPercent: "40%",
    image: 'https://picsum.photos/300/300?random=21',
    hoverImage: 'https://picsum.photos/300/300?random=22',
  },
  {
    id: '2',
    name: 'Quần Kaki Nam Ống Đứng Basic Dễ Phối',
    price: '279,000₫',
    label: 'Hàng Mới',
    image: 'https://picsum.photos/300/300?random=23',
    hoverImage: 'https://picsum.photos/300/300?random=24',
  },
  {
    id: '3',
    name: 'Quần Tây Nam Công Sở Trẻ Trung',
    price: '319,000₫',
    discount: '289,000₫',
    discountPercent: "40%",
    image: 'https://picsum.photos/300/300?random=25',
    hoverImage: 'https://picsum.photos/300/300?random=26',
  },
  {
    id: '4',
    name: 'Quần Jogger Nam Năng Động Cá Tính',
    price: '259,000₫',
    label: 'Best Seller',
    image: 'https://picsum.photos/300/300?random=27',
    hoverImage: 'https://picsum.photos/300/300?random=28',
  },
];

export default function PantsProductPage() {
  const newProducts = products.filter((product) => product.label);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Sản phẩm nổi bật');
  const [isContentExpanded, setIsContentExpanded] = useState(false);

  const sortOptions = [
    'Sản phẩm nổi bật',
    'Giá: Tăng dần',
    'Giá: Giảm dần',
    'Tên: A-Z',
    'Tên: Z-A',
    'Cũ nhất',
    'Mới nhất',
    'Bán chạy nhất',
    'Tồn kho: Giảm dần',
  ];

  const articleContent = `
Tìm kiếm chiếc quần phù hợp để nâng tầm phong cách mỗi ngày? Bộ sưu tập Quần Nam tại 160STORE mang đến cho bạn sự kết hợp hoàn hảo giữa thiết kế hiện đại và cảm giác thoải mái.

Dù bạn theo đuổi phong cách năng động, lịch lãm hay tối giản, chúng tôi đều có những lựa chọn lý tưởng:
- Quần jeans nam: Dáng slim fit thời thượng, chất liệu bền đẹp, dễ phối cùng áo thun hoặc sơ mi.
- Quần kaki nam: Thiết kế đứng dáng, gam màu đa dạng, dễ ứng dụng trong môi trường học tập hay công sở.
- Quần jogger: Chất liệu co giãn, thoải mái, mang đến sự trẻ trung và cá tính.
- Quần tây nam: Đường may tinh tế, sang trọng – lựa chọn hoàn hảo cho phong cách công sở.

Mỗi sản phẩm đều được chọn lọc kỹ lưỡng từ chất liệu đến kiểu dáng, đảm bảo mang lại trải nghiệm tốt nhất. Đặc biệt, bộ sưu tập được cập nhật thường xuyên với những xu hướng thời trang mới nhất cùng nhiều ưu đãi hấp dẫn.

Khám phá ngay Quần Nam tại 160STORE để hoàn thiện phong cách của bạn!`;

  const truncatedContent = articleContent.substring(0, 200) + '...';

  return (
    <div className="max-w-[1200px] mx-auto px-4 pt-[11%]">
      <nav className="text-[11px] font-medium pb-2">
        <ul className="flex items-center gap-1">
          <li className="text-[12px] font-semibold mt-0.5">Trang chủ</li>
          <li className="text-gray-500 font-normal">/</li>
          <li className="text-[12px] font-semibold mt-0.5">Quần</li>
        </ul>
      </nav>

      <div className="mt-1">
        <img
          alt="Banner Quần Nam"
          className="w-full object-cover"
          height="300"
          src="/assets/images/banner quan nam.webp"
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
            <FontAwesomeIcon icon={faSortAlphaDown} className="ml-2 text-[17px]" />
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
  {newProducts.map((product) => (
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
              ['Sieu Mat', 'Sieu Nhe'].includes(product.label)
                ? 'bg-blue-600 text-white'
                : 'bg-orange-500 text-black'
            }`}
          >
            {product.label}
          </div>
        )}
      </div>

      {/* Tên sản phẩm */}
      <div className="mt-1 text-sm font-medium text-black leading-[1.25rem]">
        {product.name}
      </div>

      {/* Giá sản phẩm */}
      <div className="text-sm font-semibold mt-0.5 leading-[1.25rem] flex items-center gap-2">
        {product.discount ? (
          <>
            <span className="text-red-600">{product.discount}</span>
            <span className="line-through text-gray-500 text-[12px]">{product.price}</span>
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



      <div className="flex justify-center mb-10">
        <button className="bg-black text-white text-[13px] font-medium px-6 py-2 rounded hover:opacity-50 transition">
          Xem thêm
        </button>
      </div>

      <div className="mt-6 mb-10 text-center">
        <h2 className="text-[18px] font-bold mb-4">Khám phá Quần Nam Thời Trang tại 160STORE</h2>
        <div className="text-[14px] text-black leading-relaxed">
          {isContentExpanded ? articleContent : truncatedContent}
        </div>
        <div className="mt-2 flex justify-center">
          <button
            onClick={() => setIsContentExpanded(!isContentExpanded)}
            className="bg-black text-white text-[13px] font-medium px-6 py-2 rounded hover:opacity-50 transition"
          >
            {isContentExpanded ? 'Thu gọn' : 'Xem thêm'}
          </button>
        </div>
      </div>
    </div>
  );
}
