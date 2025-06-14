'use client';
import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCartShopping,faCalendarDays,faChevronRight } from '@fortawesome/free-solid-svg-icons';

const MainContent = () => {

  const [posts, setPosts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [pageStart,setPageStart] = useState(1);
  const [pageEnd,setPageEnd] = useState(1);


  const fecthPost = async () => {
    const responsePost = await fetch(`https://huunghi.id.vn/api/post/listPost?page=${currentPage}`);
    const result = await responsePost.json();
    if(responsePost.ok){
      setPosts(result.data.posts.data);
      setCurrentPage(result.data.posts.current_page)
      setTotalPage(result.data.posts.last_page)
      setPageStart((currentPage - 2) >= 1 ? currentPage - 2 : 1 );
    setPageEnd(currentPage + 2 >= result.data.posts.last_page ? result.data.posts.last_page : currentPage + 2 )

    }else{
      setPosts([])
    }
  }

  useEffect(()=>{
    fecthPost();
  },[currentPage])

  const articlesPerPage = 15;
  
  const titleRef = useRef<HTMLDivElement>(null);

  

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    titleRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      ref={titleRef}
      className="max-w-[1200px] mx-auto px-4 pt-24 md:pt-28 lg:pt-[180px] min-h-screen relative z-10"
    >
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-600 mb-4">
        <ul className="flex gap-1">
          <li className="hover:text-black cursor-pointer">Trang chủ</li>
          <li>/</li>
          <li className="font-semibold text-black">Tất cả bài viết</li>
        </ul>
      </nav>

      {/* Tiêu đề chính */}
      <section className="pb-8">
        <h1 className="text-2xl font-semibold mb-5">Tất cả bài viết</h1>

        {/* Grid hiển thị bài viết */}
            <div className="flex flex-wrap -mx-2">
              {posts.map((article, index) => (
                <div key={index} className="w-1/2 h-1/2 sm:w-1/3 lg:w-1/4 px-2 mb-6">
                  <div className="group">
                    <div className="h-[220px]">
                      <a href="#">
                        <img className="object-cover w-full h-full opacity-1 group-hover:opacity-90 group-hover:p-[2px] transition-p transition-opacity duration-900" src={`https://huunghi.id.vn/storage/posts/${article.anh_bai_viet}`}
                        alt={article.ten_bai_viet} />
                      </a>
                    </div>
                    <div className="bg-white mx-2 relative mt-[-25px] py-2 px-4 shadow">
                      <h1 className="text-center font-semibold">{article.ten_bai_viet.length > 50 ? article.ten_bai_viet.slice(0,50)+ '...' : article.ten_bai_viet}</h1>
                      <p className="text-sm text-gray-600 ">{article.noi_dung_bai_viet.length > 100 ? article.noi_dung_bai_viet.slice(0,65)+'...' : article.noi_dung_bai_viet  }</p>
                      <hr className="my-2" />
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">
                          <FontAwesomeIcon icon={faCalendarDays} /> { new Date(article.created_at).toLocaleDateString('vi-VN')}
                        </span>
                        <a href={`/blog/${article.duong_dan}`} className="text-sm text-gray-500 hover:text-amber-400">
                          Xem thêm <FontAwesomeIcon className="text-sm" icon={faChevronRight} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

   
         {/* Pagination */}
          <div className="flex justify-center my-6 gap-2">
            {currentPage > 1 &&(
    <button
      onClick={()=>setCurrentPage(currentPage-1)}
      className={`px-3 py-1 border text-sm rounded bg-black text-white `}
    >
      {'<'}
  </button>
  )}
  {Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
        page >= pageStart && page <= pageEnd && (
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
        )
      ))}
      {currentPage < totalPage &&(
        <button
          className={`px-3 py-1 border text-sm rounded bg-black text-white `}
        >
          {`...`}
      </button>
      )}
      {currentPage < totalPage &&(
        <button
          onClick={()=>setCurrentPage(totalPage)}
          className={`px-3 py-1 border text-sm rounded bg-black text-white `}
        >
          {totalPage}
      </button>
      )}
      {currentPage < totalPage &&(
        <button
          onClick={()=>setCurrentPage(currentPage+1)}
          className={`px-3 py-1 border text-sm rounded bg-black text-white `}
        >
          {'>'}
      </button>
      )}
          </div>


      </section>
    </div>
  );
};

export default MainContent;
