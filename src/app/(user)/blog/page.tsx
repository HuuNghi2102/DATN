'use client';
import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCartShopping, faCalendarDays, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const MainContent = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [pageStart, setPageStart] = useState(1);
  const [pageEnd, setPageEnd] = useState(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchPost = async () => {
    const responsePost = await fetch(`https://huunghi.id.vn/api/post/listPost?page=${currentPage}`);
    const result = await responsePost.json();
    if (responsePost.ok) {
      setPosts(result.data.posts.data);
      setCurrentPage(result.data.posts.current_page);
      setTotalPage(result.data.posts.last_page);
    } else {
      setPosts([]);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchPost();
  }, [currentPage]);

  // Cập nhật pageStart và pageEnd mỗi khi currentPage hoặc totalPage thay đổi
  useEffect(() => {
    setPageStart(currentPage - 2 >= 1 ? currentPage - 2 : 1);
    setPageEnd(currentPage + 2 <= totalPage ? currentPage + 2 : totalPage);
  }, [currentPage, totalPage]);

  const titleRef = useRef<HTMLDivElement>(null);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    titleRef.current?.scrollIntoView({ behavior: 'smooth' });
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
    <div
      ref={titleRef}
      className="max-w-[1200px] mx-auto px-4 pt-28 md:pt-44 lg:pt-[180px] min-h-screen relative z-10"
    >
      {/* Breadcrumb */}
      <nav className="text-[11px] font-medium pb-2">
        <ul className="flex items-center gap-1">
          <li className="text-[12px] font-semibold mt-0.5">Trang chủ</li>
          <li className="text-gray-500 font-normal">/</li>
          <li className="text-[12px] font-semibold mt-0.5">Tất cả bài viết</li>
        </ul>
      </nav>

      {/* Tiêu đề chính */}
      <section className="pb-8">
        <h1 className="text-2xl font-semibold mb-5 text-center md:text-left">Tất cả bài viết</h1>

        {/* Grid hiển thị bài viết */}
        <div className="flex flex-wrap -mx-2">
          {posts.map((article, index) => (
            <div key={index} className="w-full md:w-1/4 px-2 mb-6">
              <div className="group">
                <div className="h-[220px]">
                  <Link href={`/blog-detail/${article.duong_dan}`}>
                    <img
                      className="object-cover w-full h-full opacity-1 group-hover:opacity-90 group-hover:p-[2px] transition-p transition-opacity duration-900"
                      src={`https://huunghi.id.vn/storage/posts/${article.anh_bai_viet}`}
                      alt={article.ten_bai_viet}
                    />
                  </Link>
                </div>
                <div className="bg-white mx-2 relative mt-[-25px] py-2 px-4 shadow">
                  <h1 className="text-center font-semibold">
                    {article.ten_bai_viet.length > 50 ? article.ten_bai_viet.slice(0, 50) + '...' : article.ten_bai_viet}
                  </h1>
                  <div className="text-sm text-gray-600">
                    <div dangerouslySetInnerHTML={{ __html: article.noi_dung_bai_viet.slice(0,30)+'...' }} />
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">
                      <FontAwesomeIcon icon={faCalendarDays} />{' '}
                      {new Date(article.created_at).toLocaleDateString('vi-VN')}
                    </span>
                    <Link href={`/blog-detail/${article.duong_dan}`} className="text-sm text-gray-500 hover:text-amber-400">
                      Xem thêm <FontAwesomeIcon className="text-sm" icon={faChevronRight} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center my-6 gap-2">
          {currentPage > 1 && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-4 py-2 border text-sm  bg-black text-white"
            >
              {'<'}
            </button>
          )}
          {Array.from({ length: totalPage }, (_, i) => i + 1).map(
            (page) =>
              page >= pageStart &&
              page <= pageEnd && 
              totalPage > 1 && (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 border text-sm  ${
                    currentPage === page
                      ? 'bg-black text-white'
                      : 'bg-white text-black border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ),
          )}
          {currentPage < totalPage && ( 
            <>
              <button className="px-4 py-2 border text-sm  bg-black text-white">{`...`}</button>
              <button
                onClick={() => handlePageChange(totalPage)}
                className="px-4 py-2 border text-sm  bg-black text-white"
              >
                {totalPage}
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-4 py-2 border text-sm  bg-black text-white"
              >
                {'>'}
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default MainContent;
