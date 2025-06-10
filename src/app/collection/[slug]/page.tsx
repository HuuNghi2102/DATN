'use client';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faSortAlphaDown,faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'next/navigation';

const product = [
  {
    id: '1',
    name: 'Áo Thun Nam Tiedye Loang Sundaze Rush Form Boxy',
    price: '349,000₫',
    label: 'Hàng Mới',
    image: '/assets/images/hangmoi1.webp',
    hoverImage: '/assets/images/hoverhangmoi11.webp',
  },
  {
    id: '2',
    name: 'Áo Thun Nam ICONDENIM The Coastal Frenzy ORGNLS',
    price: '329,000₫',
    label: 'Hàng Mới',
    image: '/assets/images/hangmoi2.webp',
    hoverImage: '/assets/images/hoverhangmoi2.webp',
  },
  {
    id: '3',
    name: 'Túi Tote Nam Pattern Sundaze Rush',
    price: '249,000₫',
    label: 'Hàng Mới',
    image: '/assets/images/hangmoi3.webp',
    hoverImage: '/assets/images/hoverhangmoi3.webp',
  },
  {
    id: '4',
    name: 'Áo Thun Nam Sundaze Rush Form Regular',
    price: '329,000₫',
    label: 'Best Seller',
    image: '/assets/images/hangmoi4.webp',
    hoverImage: '/assets/images/hoverhangmoi4.jpg',
  },
  
];

export default function AllProductPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<[string, string]>(['Sản phẩm nổi bật','']);

  const [currentPage,setCurrentPage] = useState(1);
  const [sort,setSort] = useState('');
  const [products,setProducts] = useState<any[]>([]);
  const [totalPage,setTotalPage] = useState(1);

  const perPage = 20;
  const totalPages = Math.ceil(products.length / perPage);
  const currentProducts = products.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const params = useParams();
  const {slug} = params;

  useEffect(() => {

    fetchProducts();
  },[sort,currentPage]);

  const fetchProducts = async () => {
      const response = await fetch(`https://huunghi.id.vn/api/product/showProductPage/${slug}?page=${currentPage}&sort=${sort}`);
      const data = await response.json();
      console.log(data.message);
      if(data.status == true){
        setSort(data.data.sort);
        setCurrentPage(data.data.currentPage);
        setProducts(data.data.products.data);
        setTotalPage(data.data.totalPage);
      }else{
        alert(data.message);
      }
      console.log('Nay cung sort',data.data.sort);
    }

    // console.log('sort',sort);

  const sortOptions = [
    ['Sản phẩm nổi bật',''],
    ['Giá: Tăng dần','price-asc'],
    ['Giá: Giảm dần','price-desc'],
    ['Tên: A-Z','name-asc'],
    ['Tên: Z-A','name-desc'],
    // 'Cũ nhất',
    // 'Mới nhất',
    // 'Bán chạy nhất',
    // 'Tồn kho: Giảm dần',
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-4 pt-[11%]">
      {/* Breadcrumb */}
      <nav className="text-[11px] font-medium pb-2">
        <ul className="flex items-center gap-1">
          <li className="text-[12px] font-semibold mt-0.5">Trang chủ</li>
          <li className="text-gray-500 font-normal">/</li>
          <li className="text-[12px] font-semibold mt-0.5">Tất Cả Sản Phẩm</li>
        </ul>
      </nav>

      {/* Banner */}
      <div className="mt-1">
        <img
          alt="Tất cả sản phẩm banner"
          className="w-full object-cover"
          height="300"
          src="/assets/images/banner spmoi.jpg"
          width="1200"
        />
      </div>

      {/* Sort dropdown */}
      <div className="flex justify-end mt-4 mb-4 items-center text-black text-[13px] relative z-50">
        <span className="mr-2 font-semibold">Sắp xếp:</span>
        <div className="relative">
          <button
            onClick={() => {setIsOpen(!isOpen);}}
            className="flex items-center border border-black px-3 py-[6px] rounded-sm font-normal hover:bg-gray-100 transition text-[10px]"
          >
            {selectedOption[0]}
            <FontAwesomeIcon icon={faSortAlphaDown} className="ml-2 text-[17px]" />
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-black rounded-sm shadow-lg z-50">
              {sortOptions.map((option,index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedOption(option as [string, string]);
                    setIsOpen(false);
                    setSort(option[1]);
                  }}
                  className="px-3 py-2 text-[10px] cursor-pointer hover:bg-blue-600 hover:text-white"
                >
                  {option[0]}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2 mb-4 z-0">
  {products.map((product,index) => (
    <div key={index} className="bg-white p-2 rounded border border-gray-200 group relative">
      <a href={`/product/${product.duong_dan}`} >
        <div className="relative">
        <img
          alt={product.ten_san_pham}
          className="w-full h-auto rounded"
          src={`https://huunghi.id.vn/storage/products/${product.images[0].link_anh}`}
          loading="lazy"
        />
        <img
          alt={`${product.ten_san_pham} alternate`}
          className="absolute top-0 left-0 w-full h-auto rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          src={`https://huunghi.id.vn/storage/products/${product.images[1].link_anh}`}
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

        {product.label && (
          <div
            className={`absolute top-2 right-2 px-2 py-[2px] text-[11px] font-semibold rounded z-30 ${
              ['Sieu Mat', 'Sieu Nhe'].includes(product.label)
                ? 'text-white bg-blue-600'
                : 'text-black bg-orange-500'
            }`}
          >
            {product.label}
          </div>
        )}

        <button
          onClick={(e) => {
            e.preventDefault(); // Ngăn redirect khi bấm nút trong thẻ <a>
            // TODO: xử lý thêm vào giỏ hàng tại đây nếu muốn
          }}
          className="absolute right-2 bottom-2 bg-black w-7 h-7 rounded-full flex justify-center items-center text-white text-sm hover:bg-white hover:text-black z-30"
          aria-label="Thêm vào giỏ"
          title="Thêm vào giỏ"
        >
          <FontAwesomeIcon icon={faCartShopping} />
        </button>
      </div>
      </a>
      <div className="mt-1 text-sm font-medium text-black leading-[1.25rem]">
  {product.ten_san_pham}
</div>
<div className="text-sm font-semibold mt-0.5 leading-[1.25rem]">
  {product.gia_da_giam.toLocaleString('vi-VN')}đ
</div>

    </div>
  ))}
</div>

      {/* Xem thêm */}
            {/* Pagination */}
<div className="flex justify-center my-6 gap-2">
  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
    <button
      key={page}
      onClick={() => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
      }}
      className={`px-3 py-1 border text-sm rounded ${
        currentPage === page
          ? 'bg-black text-white'
          : 'bg-white text-black border-gray-300 hover:bg-gray-100'
      }`}
    >
      {page}
    </button>
  ))}
</div>
    </div>
  );
}
