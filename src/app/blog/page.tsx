'use client';
import React, { useState, useRef, useEffect } from 'react';

const articles = [
  {
    id: 1,
    title: 'Top 8+ Các Thương Hiệu Quần Jeans Nổi Tiếng Việt Nam Và Quốc Tế',
    description:
      'Quần jeans từ lâu đã trở thành biểu tượng thời trang không thể thiếu trong tủ đồ của mọi người. Trên thế giới...',
    date: '28/04/2025',
    image:
      'https://storage.googleapis.com/a1aa/image/86c872df-b08f-4793-3c5b-ec52f24c608a.jpg',
    link: '#',
  },
  // 👉 Thêm nhiều bài viết demo cho đủ trang
  ...Array.from({ length: 30 }, (_, i) => ({
    id: i + 2,
    title: `Bài viết demo số ${i + 2}`,
    description: 'Đây là mô tả ngắn gọn cho bài viết demo...',
    date: '01/06/2025',
    image: 'https://storage.googleapis.com/a1aa/image/86c872df-b08f-4793-3c5b-ec52f24c608a.jpg',
    link: '#',
  })),
];

const MainContent = () => {

  const [posts, setPosts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);


  const fecthPost = async () => {
    const responsePost = await fetch(`https://huunghi.id.vn/api/post/listPost?page=${currentPage}`);
    const result = await responsePost.json();
    if(responsePost.ok){
      setPosts(result.data.posts.data);
      setCurrentPage(result.data.posts.current_page)
      setTotalPage(result.data.posts.last_page)
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {posts.map((article,index) => (
            <article
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col"
            >
              <img
                src={`https://huunghi.id.vn/storage/posts/${article.anh_bai_viet}`}
                alt={article.ten_bai_viet}
                className="w-full h-36 object-cover"
                loading="lazy"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-sm font-bold mb-2">{article.ten_bai_viet}</h2>
                <p className="text-xs text-gray-600 mb-3 flex-grow">
                  {article.noi_dung_bai_viet.length > 100 ? article.noi_dung_bai_viet.slice(0,127)+'...' : article.noi_dung_bai_viet  }
                </p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <time className="flex items-center gap-1">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7a2 2 0 002 2z"
                      />
                    </svg>
                    { new Date(article.created_at).toLocaleDateString('vi-VN')}
                  </time>
                  <a
                    href={`/blog/${article.duong_dan}`}
                    className="hover:text-yellow-400 transition"
                  >
                    Xem thêm ›
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

   
         {/* Pagination */}
          <div className="flex justify-center my-6 gap-2">
            {Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
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


      </section>
    </div>
  );
};

export default MainContent;
