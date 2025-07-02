'use client';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faSortAlphaDown, faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function AllProductPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<[string, string]>(['Sản phẩm nổi bật', '']);

  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [totalPage, setTotalPage] = useState(1);
  const [pageStart, setPageStart] = useState(1);
  const [pageEnd, setPageEnd] = useState(1);

  const addWhistList = async (name: string, image: string, price: number, slug: string, idPro: number) => {
    const newObj: any = {};
    newObj.ten_san_pham = name;
    newObj.anh_san_pham = image;
    newObj.gia_san_pham = price;
    newObj.duong_dan = slug;
    newObj.id_san_pham = idPro;

    const user = localStorage.getItem('user');
    const accessToken = localStorage.getItem('accessToken');
    const typeToken = localStorage.getItem('typeToken');
    const whistList = localStorage.getItem('whislist');
    if (user && accessToken && typeToken) {
      console.log('accessToken:', JSON.parse(accessToken));
      console.log('typeToken:', JSON.parse(typeToken));
      const resAddWhisList = await fetch(`https://huunghi.id.vn/api/whislist/addWhislist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${JSON.parse(typeToken)} ${JSON.parse(accessToken)}`,
        },
        body: JSON.stringify({
          name: name,
          image: image,
          price: price,
          slug: slug,
          idPro: idPro,
        }),
      });
      if (resAddWhisList.ok) {
        const result = await resAddWhisList.json();
        console.log(result);
        alert('Thêm sản phẩm vào danh sách thành công');
      } else {
        alert('Thêm sản phẩm vào danh sách thất bại');
      }
    } else {
      if (whistList) {
        const parseWhisList = JSON.parse(whistList);

        let flag: boolean = true;

        parseWhisList.forEach((e: any, i: number) => {
          if (e.id_san_pham == idPro) {
            flag = false;
          }
        });

        if (flag) {
          parseWhisList.unshift(newObj);
        }

        localStorage.setItem('whislist', JSON.stringify(parseWhisList));
      } else {
        localStorage.setItem('whislist', JSON.stringify([newObj]));
      }
      alert('Thêm sản phẩm vào danh sách thành công');
    }
  };

  const params = useParams();
  const { slug } = params;

  useEffect(() => {
    fetchProducts();
  }, [sort, currentPage]);

  const fetchProducts = async () => {
    const response = await fetch(`https://huunghi.id.vn/api/product/showProductPage/${slug}?page=${currentPage}&sort=${sort}`);
    const data = await response.json();
    console.log(data.message);
    if (data.status === true) {
      setSort(data.data.sort);
      setCurrentPage(data.data.currentPage);
      setProducts(data.data.products.data);
      setTotalPage(data.data.totalPage);
      setPageStart((currentPage - 2) >= 1 ? currentPage - 2 : 1);
      setPageEnd(currentPage + 2 >= data.data.totalPage ? data.data.totalPage : currentPage + 2);
    } else {
      alert(data.message);
    }
    console.log('Nay cung sort', data.data.sort);
  };

  const sortOptions = [
    ['Sản phẩm nổi bật', ''],
    ['Giá: Tăng dần', 'price-asc'],
    ['Giá: Giảm dần', 'price-desc'],
    ['Tên: A-Z', 'name-asc'],
    ['Tên: Z-A', 'name-desc'],
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-2 sm:px-4 md:px-6 pt-28 md:pt-44 lg:pt-[180px] min-h-screen relative z-10">
      {/* Breadcrumb */}
      <nav className="text-[11px] sm:text-[12px] md:text-[13px] font-medium pb-2">
        <ul className="flex items-center gap-1 flex-wrap">
          <li className="text-[12px] sm:text-[13px] md:text-[14px] font-semibold mt-0.5">Trang chủ</li>
          <li className="text-gray-500 font-normal">/</li>
          <li className="text-[12px] sm:text-[13px] md:text-[14px] font-semibold mt-0.5">Tất Cả Sản Phẩm</li>
        </ul>
      </nav>

      {/* Banner */}
      <div className="mt-2 sm:mt-3 md:mt-4">
        <img
          alt="Tất cả sản phẩm banner"
          className="w-full object-cover rounded-md"
          height="300"
          src="/assets/images/banner spmoi.jpg"
          width="1200"
        />
      </div>

      {/* Sort dropdown */}
      <div className="flex justify-end mt-3 sm:mt-4 md:mt-5 mb-3 sm:mb-4 md:mb-5 items-center text-black text-[11px] sm:text-[12px] md:text-[13px] relative z-50">
        <span className="mr-2 font-semibold">Sắp xếp:</span>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center border border-black px-2 sm:px-3 py-[4px] sm:py-[6px] rounded-sm font-normal hover:bg-gray-100 transition text-[9px] sm:text-[10px] md:text-[11px]"
          >
            {selectedOption[0]}
            <FontAwesomeIcon icon={faSortAlphaDown} className="ml-1 sm:ml-2 text-[15px] sm:text-[17px]" />
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-1 sm:mt-2 w-40 sm:w-48 bg-white border border-black rounded-sm shadow-lg z-50">
              {sortOptions.map((option, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedOption(option as [string, string]);
                    setIsOpen(false);
                    setSort(option[1]);
                  }}
                  className="px-2 sm:px-3 py-1 sm:py-2 text-[9px] sm:text-[10px] md:text-[11px] cursor-pointer hover:bg-blue-600 hover:text-white"
                >
                  {option[0]}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-1 mt-2 sm:mt-3 md:mt-4 mb-4">
        {products.map((product, i) => (
          <div key={i} className="p-1 sm:p-2">
            <div className="bg-white p-1 sm:p-2 rounded-lg cursor-pointer">
              <div className="relative group overflow-hidden">
                <Link href={`/product/${product.duong_dan}`} className="relative">
                  <img
                    src={`https://huunghi.id.vn/storage/products/${product.images[0]?.link_anh}`}
                    alt="aa"
                    className="w-full h-32 sm:h-40 md:h-48 object-cover"
                  />
                  <img
                    src={`https://huunghi.id.vn/storage/products/${product.images[1]?.link_anh}`}
                    alt="product"
                    className="w-full h-32 sm:h-40 md:h-48 object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </Link>
                <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <FontAwesomeIcon icon={faSearch} className="text-black p-1 sm:p-2 rounded-full bg-white w-5 sm:w-6 h-5 sm:h-6 pointer-events-auto" />
                </div>
                <a
                  onClick={() => addWhistList(product.ten_san_pham, product.images[0]?.link_anh, product.gia_da_giam, product.duong_dan, product.id_san_pham)}
                  className="absolute right-1 sm:right-2 bottom-1 sm:bottom-2 bg-black w-6 sm:w-7 h-6 sm:h-7 rounded-full flex justify-center items-center text-white text-xs sm:text-sm hover:bg-white hover:text-red-500"
                >
                  <FontAwesomeIcon icon={faHeart} />
                </a>
              </div>
              <div className="px-1 sm:px-2 mt-1 sm:mt-2">
                <p className="text-xs sm:text-sm md:text-base line-clamp-2">{product.ten_san_pham}</p>
                <strong className="text-xs sm:text-sm md:text-base">{product.gia_da_giam.toLocaleString('vi-VN') + ' VNĐ'}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center my-4 sm:my-6 gap-1 sm:gap-2">
        {currentPage > 1 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-2 sm:px-3 py-1 sm:py-1 border text-xs sm:text-sm rounded bg-black text-white"
          >
            {'<'}
          </button>
        )}
        {Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
          page >= pageStart && page <= pageEnd && totalPage > 1 && (
            <button
              key={page}
              onClick={() => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-2 sm:px-3 py-1 sm:py-1 border text-xs sm:text-sm rounded ${
                currentPage === page ? 'bg-black text-white' : 'bg-white text-black border-gray-300 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          )
        ))}
        {currentPage < totalPage && (
          <button
            className="px-2 sm:px-3 py-1 sm:py-1 border text-xs sm:text-sm rounded bg-black text-white"
          >
            {'...'}
          </button>
        )}
        {currentPage < totalPage && (
          <button
            onClick={() => setCurrentPage(totalPage)}
            className="px-2 sm:px-3 py-1 sm:py-1 border text-xs sm:text-sm rounded bg-black text-white"
          >
            {totalPage}
          </button>
        )}
        {currentPage < totalPage && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-2 sm:px-3 py-1 sm:py-1 border text-xs sm:text-sm rounded bg-black text-white"
          >
            {'>'}
          </button>
        )}
      </div>
    </div>
  );
}