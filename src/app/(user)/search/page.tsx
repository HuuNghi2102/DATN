'use client'
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCartShopping, faCalendarDays, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';


type TabType = 'product' | 'post';

const EcommerceSearchPage: React.FC = () => {

  const useSearchParam = useSearchParams();
  const search = useSearchParam.get('q');

  const [activeTab, setActiveTab] = useState<TabType>('product');
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<any[]>([]);
  const [totalPage, setTotalPage] = useState(1);
  const [pageStart, setPageStart] = useState(1);
  const [pageEnd, setPageEnd] = useState(1);

  const [countPost, setCountPost] = useState(0);
  const [countPoruduct, setCountProduct] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async () => {
    const resData = await fetch(`https://huunghi.id.vn/api/product/getSearch?page=${currentPage}&type=${activeTab}&search=${search}`);
    const result = await resData.json();
    setData(result.data.results.data);
    setCountPost(result.data.countPost)
    setCountProduct(result.data.countProduct);
    setTotalPage(result.data.results.last_page);
    setPageStart((currentPage - 2) >= 1 ? currentPage - 2 : 1);
    setPageEnd(currentPage + 2 >= result.data.results.last_page ? result.data.results.last_page : currentPage + 2)

    setIsLoading(false);
  }



  useEffect(() => {
    fetchData();

  }, [activeTab, currentPage, search])


  const handleTabClick = (tab: TabType): void => {
    setActiveTab(tab);
    setCurrentPage(1);
    setIsLoading(true);
  };

  if (isLoading) {
    return (
      <div
        id="loading-screen"
        className="fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-500"
      >
        <div className="flex flex-col items-center space-y-6">
          {/* Logo hoặc icon tùy chọn */}
          <div className="text-3xl font-semibold tracking-widest text-black uppercase">VERVESTYLE</div>

          {/* Vòng quay */}
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>

          {/* Nội dung loading */}
          <p className="text-sm text-gray-700 tracking-wide">Đang khởi động trải nghiệm của bạn...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-[12%]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">

      </header>

      {/* Main Content */}
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-4 py-8">
        <div className=" mx-auto">
          <div className="flex items-center justify-between h-16">
            {/* Navigation */}
            <nav className="flex space-x-8">
              <a href="/">
                <button>
                  Trang chủ
                </button>
              </a>
              <button>
                Tìm kiếm
              </button>
            </nav>
          </div>
        </div>
        {/* Search Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-black mb-4 underline">
            Tìm kiếm
          </h1>
        </div>
        {/* Desktop/Tablet - Horizontal Line */}
        <div className="sm:flex sm:justify-between text-center items-center">
          <div>
            <p className="text-gray-600 text-base mb-8">
              Kết quả tìm kiếm cho "
              <span className="font-semibold">{search}</span>
              ".
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex justify-center items-center gap-5  mb-12">
            <button
              onClick={() => handleTabClick('product')}
              className={`px-6 py-2 text-sm font-medium rounded-sm transition-colors ${activeTab === 'product'
                  ? 'bg-amber-400 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              type="button"
            >
              SẢN PHẨM ({countPoruduct})
            </button>
            <button
              onClick={() => handleTabClick('post')}
              className={`px-6 py-2 text-sm font-medium rounded-sm transition-colors ${activeTab === 'post'
                  ? 'bg-amber-400 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              type="button"
            >
              BÀI VIẾT ({countPost})
            </button>
          </div>
        </div>
        {/* Sản phẩm */}
        {activeTab === 'product' && (
          <div className="flex flex-wrap -mx-2">
            {data.map((product, i) => (
              <div key={i} className=" w-1/2 sm:w-1/3 lg:w-1/5 px-2 mb-6">
                <div className="bg-white p-2 rounded-lg cursor-pointer">
                  <div className="relative group overflow-hidden">
                    <Link href={`product/${product.duong_dan}`} className="relative">
                      <img src={`https://huunghi.id.vn/storage/products/${product?.images?.length > 0 ? product?.images[0]?.link_anh : 'cac'}`} alt={product?.ten_san_pham} className="w-full h-full object-cover" />
                      <img
                        src={`https://huunghi.id.vn/storage/products/${product?.images?.length > 1 ? product?.images[1]?.link_anh : 'cac'}`}
                        className="w-full absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </Link>
                    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <FontAwesomeIcon icon={faSearch} className="text-black p-3 rounded-full bg-white w-5 h-5 pointer-events-auto" />
                    </div>
                    <a
                      href="#"
                      className="absolute right-2 bottom-2 bg-black w-7 h-7 rounded-full flex justify-center items-center text-white text-sm hover:bg-white hover:text-black"
                    >
                      <FontAwesomeIcon icon={faCartShopping} />
                    </a>
                    <div className="absolute top-1 right-1 text-black bg-amber-400 text-xs rounded-md p-1 font-bold">
                      <p>{product.badge}</p>
                    </div>
                  </div>
                  <div className="px-1 mt-2">
                    <p className="text-sm">{product.ten_san_pham}</p>
                    <strong className="text-sm">{product.gia_da_giam?.toLocaleString('vi-VN')} VNĐ</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* bài viết */}
        {activeTab === 'post' && (
          <div className="flex flex-wrap -mx-2">
            {data.map((post, index) => (
              <div key={index} className="w-1/2 h-1/2 sm:w-1/3 lg:w-1/4 px-2 mb-6">
                <div className="group">
                  <div className="h-[220px]">
                    <a href="#">
                      <img className="object-cover w-full h-full opacity-1 group-hover:opacity-90 group-hover:p-[2px] transition-p transition-opacity duration-900" src={`https://huunghi.id.vn/storage/posts/${post.anh_bai_viet}`} alt="" />
                    </a>
                  </div>
                  <div className="bg-white mx-2 relative mt-[-25px] py-2 px-4 shadow">
                    <h1 className="text-center font-semibold">{post.ten_bai_viet}</h1>
                    <p className="text-sm text-gray-600 ">{post.noi_dung_bai_viet?.length > 65 ? post.noi_dung_bai_viet.slice(0, 65) + "..." : post.noi_dung_bai_viet}</p>
                    <hr className="my-2" />
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">
                        <FontAwesomeIcon icon={faCalendarDays} /> {new Date(post.created_at).toLocaleDateString()}
                      </span>
                      <Link href={`/post/${post.duong_dan}`} className="text-sm text-gray-500 hover:text-amber-400">
                        Xem thêm <FontAwesomeIcon className="text-sm" icon={faChevronRight} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Load More Section */}

        <div className="flex justify-center items-center gap-5 mt-12">
          {currentPage > 1 && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="bg-black text-white hover:bg-slate-50 border border-black hover:text-black px-5 py-3  font-medium transition-colors duration-300" type="button">
              {`<`}
            </button>
          )}
          {Array.from({ length: totalPage }, (_, i) => i + 1).map((page, index) => (
            page >= pageStart && page <= pageEnd && totalPage > 1 && (
              <button
                key={index}
                onClick={() => setCurrentPage(page)}
                className="bg-black text-white hover:bg-slate-50 border border-black hover:text-black px-5 py-3  font-medium transition-colors duration-300" type="button">
                {page}
              </button>
            )
          ))}
          {currentPage < totalPage && (
            <button
              className="bg-black text-white hover:bg-slate-50 border border-black hover:text-black px-5 py-3  font-medium transition-colors duration-300" type="button">
              {`...`}
            </button>
          )}
          {currentPage < totalPage && (
            <button
              onClick={() => setCurrentPage(totalPage)}
              className="bg-black text-white hover:bg-slate-50 border border-black hover:text-black px-5 py-3  font-medium transition-colors duration-300" type="button">
              {totalPage}
            </button>
          )}
          {currentPage < totalPage && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="bg-black text-white hover:bg-slate-50 border border-black hover:text-black px-5 py-3  font-medium transition-colors duration-300" type="button">
              {`>`}
            </button>
          )}
        </div>
      </main>
      {/* Font Awesome CDN */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      />
    </div>
  );
};

export default EcommerceSearchPage;