'use client';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faPhoneAlt,
  faLocationArrow,
  faBoxOpen,
  faShieldAlt,
  faCopyright,
} from '@fortawesome/free-solid-svg-icons';
import { faClock as faClockRegular } from '@fortawesome/free-regular-svg-icons';
import { useParams } from 'next/navigation';

const IntegratedPage = () => {

  const useParam = useParams();
  const {slug} = useParam; 

  const [shirtShopPage, setShirtShopPage] = useState(1);
  const [articlePage, setArticlePage] = useState(1);
  const [storePage, setStorePage] = useState(1);
  const titleRef = useRef<HTMLDivElement>(null);
  const [currentPost,setCurrentPost] = useState<any>();
  const [arrayPostNew,setArrayPostNew] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(()=>{
    fetchBlog();
  },[]);

  const fetchBlog = async () => {
    if(!slug){
      toast.error('Bài viết không tồn tại');
      window.location.href = '/blog'
    }

    const resBlog = await fetch(`https://huunghi.id.vn/api/post/getPost/${slug}`);
    if(!resBlog.ok){
      toast.error('Bài viết không tồn tại');
      return window.location.href = '/blog'
    }
    const result = await resBlog.json();
    setCurrentPost(result.data.post);


    const resBlogNew = await fetch('https://huunghi.id.vn/api/post/getPostNew');
    const resultPostNew = await resBlogNew.json();
    setArrayPostNew(resultPostNew.data.postsNew);

    setIsLoading(false);
    
  }

  // Dữ liệu bài viết
  const articles = [
    {
      id: 1,
      title: 'Top 8+ Các Thương Hiệu Quần Jeans Nổi Tiếng Việt Nam Và Quốc Tế',
      description: 'Quần jeans từ lâu đã trở thành biểu tượng thời trang không thể thiếu trong tủ đồ của mọi người. Trên thế giới...',
      date: '28/04/2025',
      image: 'https://storage.googleapis.com/a1aa/image/86c872df-b08f-4793-3c5b-ec52f24c608a.jpg',
      link: '#',
    },
    ...Array.from({ length: 30 }, (_, i) => ({
      id: i + 2,
      title: `Bài viết demo số ${i + 2}`,
      description: 'Đây là mô tả ngắn gọn cho bài viết demo...',
      date: '01/06/2025',
      image: 'https://storage.googleapis.com/a1aa/image/86c872df-b08f-4793-3c5b-ec52f24c608a.jpg',
      link: '#',
    })),
  ];

  // Dữ liệu cửa hàng
  const PRODUCTS = [
    {
      id: 1,
      name: 'ĐÀ NẴNG - LÊ DUẨN',
      address: '332 Đ. Lê Duẩn, Tân Chính, Thanh Khê, Đà Nẵng, Vietnam',
      hours: '8:30 - 22:00',
      phone: '02871008789',
      image: 'https://storage.googleapis.com/a1aa/image/4c35cf68-8042-4673-aa61-1fc8038a6d59.jpg',
      isNew: true,
    },
    {
      id: 2,
      name: 'ĐẮK LẮK - BUÔN MA THUỘT',
      address: '14 Phan Chu Trinh, Thắng Lợi, Buôn Ma Thuột, Đắk Lắk, Vietnam',
      hours: '8:30 - 22:00',
      phone: '02871008789',
      image: 'https://storage.googleapis.com/a1aa/image/b915f2b6-310a-4892-c8a5-6f875d9dac7f.jpg',
      isNew: false,
    },
    {
      id: 3,
      name: 'LONG AN - TÂN AN',
      address: '290 Đ. Hùng Vương, Phường 3, Tân An, Long An',
      hours: '8:30 - 22:00',
      phone: '02871008789',
      image: 'https://storage.googleapis.com/a1aa/image/8e0b3a6f-eec7-48a2-9e8c-ab45f8ef6ad1.jpg',
      isNew: false,
    },
    {
      id: 4,
      name: 'HỒ CHÍ MINH - TÔ HIẾN THÀNH',
      address: '297/13 Tô Hiến Thành, Phường 13, Quận 10, TP.HCM',
      hours: '8:30 - 22:00',
      phone: '02871008789',
      image: 'https://storage.googleapis.com/a1aa/image/2dd88e25-9d20-42c6-0ff2-3f7a6ff62592.jpg',
      isNew: false,
    },
    {
      id: 5,
      name: 'HỒ CHÍ MINH - TRẦN HƯNG ĐẠO',
      address: '391/37/5 Trần Hưng Đạo, Phường Cầu Kho, Quận 1, TP.HCM',
      hours: '8:30 - 22:00',
      phone: '02871008789',
      image: 'https://storage.googleapis.com/a1aa/image/88111d09-f507-495d-088b-543c24045d91.jpg',
      isNew: false,
    },
    {
      id: 6,
      name: 'CẦN THƠ - TRẦN PHÚ',
      address: 'Số 35 Trần Phú, Phường Cái Khế, Quận Ninh Kiều, TP.Cần Thơ',
      hours: '8:30 - 22:00',
      phone: '02871008789',
      image: 'https://storage.googleapis.com/a1aa/image/7b1abc58-d5fe-448f-dfbf-1f5801f20684.jpg',
      isNew: false,
    },
    {
      id: 7,
      name: 'ĐÀ NẴNG - LÊ DUẨN',
      address: '332 Đ. Lê Duẩn, Tân Chính, Thanh Khê, Đà Nẵng, Vietnam',
      hours: '8:30 - 22:00',
      phone: '02871008789',
      image: 'https://storage.googleapis.com/a1aa/image/4c35cf68-8042-4673-aa61-1fc8038a6d59.jpg',
      isNew: true,
    },
    {
      id: 8,
      name: 'ĐẮK LẮK - BUÔN MA THUỘT',
      address: '14 Phan Chu Trinh, Thắng Lợi, Buôn Ma Thuột, Đắk Lắk, Vietnam',
      hours: '8:30 - 22:00',
      phone: '02871008789',
      image: 'https://storage.googleapis.com/a1aa/image/b915f2b6-310a-4892-c8a5-6f875d9dac7f.jpg',
      isNew: false,
    },
    {
      id: 9,
      name: 'LONG AN - TÂN AN',
      address: '290 Đ. Hùng Vương, Phường 3, Tân An, Long An',
      hours: '8:30 - 22:00',
      phone: '02871008789',
      image: 'https://storage.googleapis.com/a1aa/image/8e0b3a6f-eec7-48a2-9e8c-ab45f8ef6ad1.jpg',
      isNew: false,
    },
    {
      id: 10,
      name: 'HỒ CHÍ MINH - TÔ HIẾN THÀNH',
      address: '297/13 Tô Hiến Thành, Phường 13, Quận 10, TP.HCM',
      hours: '8:30 - 22:00',
      phone: '02871008789',
      image: 'https://storage.googleapis.com/a1aa/image/2dd88e25-9d20-42c6-0ff2-3f7a6ff62592.jpg',
      isNew: false,
    },
    {
      id: 11,
      name: 'HỒ CHÍ MINH - TRẦN HƯNG ĐẠO',
      address: '391/37/5 Trần Hưng Đạo, Phường Cầu Kho, Quận 1, TP.HCM',
      hours: '8:30 - 22:00',
      phone: '02871008789',
      image: 'https://storage.googleapis.com/a1aa/image/88111d09-f507-495d-088b-543c24045d91.jpg',
      isNew: false,
    },
    {
      id: 12,
      name: 'CẦN THƠ - TRẦN PHÚ',
      address: 'Số 35 Trần Phú, Phường Cái Khế, Quận Ninh Kiều, TP.Cần Thơ',
      hours: '8:30 - 22:00',
      phone: '02871008789',
      image: 'https://storage.googleapis.com/a1aa/image/7b1abc58-d5fe-448f-dfbf-1f5801f20684.jpg',
      isNew: false,
    },
    {
      id: 13,
      name: 'ĐÀ NẴNG - LÊ DUẨN',
      address: '332 Đ. Lê Duẩn, Tân Chính, Thanh Khê, Đà Nẵng, Vietnam',
      hours: '8:30 - 22:00',
      phone: '02871008789',
      image: 'https://storage.googleapis.com/a1aa/image/4c35cf68-8042-4673-aa61-1fc8038a6d59.jpg',
      isNew: true,
    },
    {
      id: 14,
      name: 'ĐẮK LẮK - BUÔN MA THUỘT',
      address: '14 Phan Chu Trinh, Thắng Lợi, Buôn Ma Thuột, Đắk Lắk, Vietnam',
      hours: '8:30 - 22:00',
      phone: '02871008789',
      image: 'https://storage.googleapis.com/a1aa/image/b915f2b6-310a-4892-c8a5-6f875d9dac7f.jpg',
      isNew: false,
    },
    {
      id: 15,
      name: 'LONG AN - TÂN AN',
      address: '290 Đ. Hùng Vương, Phường 3, Tân An, Long An',
      hours: '8:30 - 22:00',
      phone: '02871008789',
      image: 'https://storage.googleapis.com/a1aa/image/8e0b3a6f-eec7-48a2-9e8c-ab45f8ef6ad1.jpg',
      isNew: false,
    },
    {
      id: 16,
      name: 'HỒ CHÍ MINH - TÔ HIẾN THÀNH',
      address: '297/13 Tô Hiến Thành, Phường 13, Quận 10, TP.HCM',
      hours: '8:30 - 22:00',
      phone: '02871008789',
      image: 'https://storage.googleapis.com/a1aa/image/2dd88e25-9d20-42c6-0ff2-3f7a6ff62592.jpg',
      isNew: false,
    },
    {
      id: 17,
      name: 'HỒ CHÍ MINH - TRẦN HƯNG ĐẠO',
      address: '391/37/5 Trần Hưng Đạo, Phường Cầu Kho, Quận 1, TP.HCM',
      hours: '8:30 - 22:00',
      phone: '02871008789',
      image: 'https://storage.googleapis.com/a1aa/image/88111d09-f507-495d-088b-543c24045d91.jpg',
      isNew: false,
    },
    {
      id: 18,
      name: 'CẦN THƠ - TRẦN PHÚ',
      address: 'Số 35 Trần Phú, Phường Cái Khế, Quận Ninh Kiều, TP.Cần Thơ',
      hours: '8:30 - 22:00',
      phone: '02871008789',
      image: 'https://storage.googleapis.com/a1aa/image/7b1abc58-d5fe-448f-dfbf-1f5801f20684.jpg',
      isNew: false,
    },
  ];

  const articlesPerPage = 15;
  const storesPerPage = 12;

  const currentArticles = articles.slice((articlePage - 1) * articlesPerPage, articlePage * articlesPerPage);
  const currentStores = PRODUCTS.slice((storePage - 1) * storesPerPage, storePage * storesPerPage);

  const totalArticlePages = Math.ceil(articles.length / articlesPerPage);
  const totalStorePages = Math.ceil(PRODUCTS.length / storesPerPage);

  const handleArticlePageChange = (page: number) => {
    setArticlePage(page);
    titleRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStorePageChange = (page: number) => {
    setStorePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <div className="bg-white text-black text-[13px] leading-[18px] pt-[9%]">
      <div className="max-w-[1200px] mx-auto px-4 py-3">
        {/* Breadcrumb và Tiêu đề */}
        <nav className="text-[11px] font-medium pb-2">
          <ul className="flex items-center gap-1">
            <li className="text-[12px] font-semibold mt-0.5">Trang chủ</li>
            <li className="text-gray-500 font-normal">/</li>
            <li className="text-[12px] font-semibold mt-0.5">Shop thời trang</li>
            <li className="text-gray-500 font-normal">/</li>
            <li className="text-[12px] font-semibold mt-0.5">Top 5 shop bán áo sơ mi nam đẹp ở Gò Vấp</li>
          </ul>
        </nav>
        <h1 className="font-bold text-[15px] mb-3">{currentPost?.ten_bai_viet}</h1>

        {/* Nội dung chính */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <img
              className="w-full mb-2"
              src={`https://huunghi.id.vn/storage/posts/${currentPost?.anh_bai_viet}`}
              alt="Shop áo sơ mi nam ở Gò Vấp"
              width={600}
              height={300}
            />
            {currentPost?.noi_dung_bai_viet}
            <p className="font-bold text-[11px] mb-1">Gò Vấp là một trong những trung tâm mua sắm thời trang nam trẻ, năng động hàng đầu tại TP.HCM...</p>
            <p className="font-bold text-[13px] mb-1">Gò Vấp - Tâm điểm mua sắm thời trang nam trẻ trung</p>
            <p className="mb-3">Gò Vấp từ lâu đã được xem là <span className="font-bold">tâm điểm mua sắm thời trang nam trẻ</span> tại TP.HCM...</p>
            <p className="mb-3">Những con đường sầm uất như Quang Trung, Nguyễn Oanh luôn nhộn nhịp với các shop thời trang đình đám như ICONDENIM, 16OSTORE, 4MEN,...</p>
            <img
              className="w-full mb-2"
              src="https://storage.googleapis.com/a1aa/image/bd3a53ee-5fce-49cf-d2b7-20240ccd5279.jpg"
              alt="Khu vực thời trang nam Gò Vấp"
              width={600}
              height={300}
            />
            <p className="text-[11px] font-bold text-center mb-6">Gò Vấp là điểm đến mua sắm thời trang sầm uất hàng đầu</p>

            {/* ICONDENIM */}
            <h2 className="font-bold text-base leading-5 mb-2">ICONDENIM</h2>
            <p className="text-xs mb-1">ICONDENIM tự hào là một trong những <span className="font-bold">shop quần áo nam đẹp ở Gò Vấp, chất lượng và uy tín đầu</span>.</p>
            <p className="text-xs mb-1">Với phong cách thời trang đa dạng, ICONDENIM mang đến tinh thần “<span className="italic">Enjoy Life</span>”.</p>
            <p className="text-xs mb-1">Cửa hàng cung cấp các mẫu áo sơ mi thiết kế tinh tế, chất liệu cao cấp như cotton, linen, oxford chống nhăn...</p>
            <p className="text-xs mb-4">Điểm cộng là mức giá hợp lý, dịch vụ tư vấn tận tâm và chính sách đổi trả linh hoạt.</p>
            <figure className="mb-4">
              <img className="w-full object-cover" src="https://storage.googleapis.com/a1aa/image/083d2fc5-95bb-4731-a839-1d373806ef47.jpg" alt="ICONDENIM shop Gò Vấp" />
              <figcaption className="text-[9px] text-center italic mt-1">ICONDENIM là thương hiệu áo sơ mi local brand nam Gò Vấp</figcaption>
            </figure>
            <p className="text-[9px] font-normal mb-6">
              <strong>Website:</strong> <a href="https://icondenim.com/">https://icondenim.com/</a><br />
              <strong>Hotline:</strong> 02873 066 060<br />
              <strong>Địa chỉ:</strong> 261 Quang Trung, P.10, Gò Vấp, TP.HCM<br />
              <strong>Facebook:</strong> <a href="https://www.facebook.com/icondenimvn">https://www.facebook.com/icondenimvn</a>
            </p>

            {/* 16OSTORE */}
            <h2 className="font-bold text-base leading-5 mb-2">16OSTORE</h2>
            <p className="text-xs mb-1">16OSTORE là cái tên không thể bỏ qua khi nhắc đến <span className="font-bold">shop bán áo sơ mi nam cao cấp Gò Vấp</span>.</p>
            <p className="text-xs mb-4">Shop mang phong cách năng động, trẻ trung với áo sơ mi tối giản, chất liệu thoáng mát. Ngoài ra còn có quần bò, phụ kiện.</p>
            <figure className="mb-4">
              <iframe className="w-full aspect-video" src="https://www.youtube.com/embed/7q6q6q6q6q6" title="16OSTORE video" frameBorder="0" allowFullScreen></iframe>
              <figcaption className="text-[9px] text-center italic mt-1">16OSTORE là điểm đến mua sắm thời trang lý tưởng</figcaption>
            </figure>

            {/* Highlight sản phẩm */}
            <div className="mt-10 max-w-[520px] ml-0">
  <img className="w-full object-cover" src="https://storage.googleapis.com/a1aa/image/6b931f0c-6fc4-4bfa-f7c9-b1af9e902f31.jpg" alt="Áo sơ mi nam dài tay thời trang" />
  <p className="mt-2 text-[12px] text-[#4a90e2] italic text-left font-light">Áo Sơ Mi Blended Cotton Nam Tay Dài Patterned Heat Form Regular</p>
</div>

          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-[220px] h-fit bg-white border border-gray-300 rounded-md p-3 text-[11px] text-gray-600">
            <p className="font-bold mb-1">Nội dung bài viết <a className="text-blue-500 ml-1">(Ẩn)</a></p>
            <ul className="space-y-1">
              <li><a className="text-blue-500 hover:underline" href="#">Gò Vấp - Tâm điểm mua sắm thời trang nam trẻ trung</a></li>
              <li><a className="text-blue-500 hover:underline" href="#">ICONDENIM</a></li>
              <li><a className="text-blue-500 hover:underline" href="#">16OSTORE</a></li>
              <li><a className="text-blue-500 hover:underline" href="#">4MEN</a></li>
              <li><a className="text-blue-500 hover:underline" href="#">Totoday</a></li>
              <li><a className="text-blue-500 hover:underline" href="#">Kapo</a></li>
            </ul>
          </aside>
        </div>

        {/* Phần bài viết */}
        <div ref={titleRef} className="mt-10">
         
          <h1 className="font-bold text-[18px] text-center mb-3">CÁC BÀI VIẾT MỚI NHẤT</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {arrayPostNew.map((article) => (
              <article key={article.id_bai_viet} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
                <img src={`https://huunghi.id.vn/storage/posts/${article.anh_bai_viet}`} alt={article.ten_bai_viet} className="w-full h-36 object-cover" loading="lazy" />
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-sm font-bold mb-2">{article.ten_bai_viet}</h2>
                  <p className="text-xs text-gray-600 mb-3 flex-grow">{article.noi_dung_bai_viet.slice(0,50)}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <time className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7a2 2 0 002 2z" />
                      </svg>
                      {new Date(article.created_at).toLocaleDateString('vi-VN')}
                    </time>
                    <a href={article.duong_dan} className="hover:text-yellow-400 transition">Xem thêm ›</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
        </div>

        {/* Phần địa chỉ cửa hàng */}
        <div className="mt-10">
        <h1 className="font-bold text-[18px] text-center mb-3">HỆ THỐNG CỬA HÀNG</h1>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="flex items-center border border-gray-300 rounded-md p-3 space-x-3 bg-white">
              <FontAwesomeIcon icon={faBoxOpen} className="text-yellow-500 text-xl flex-shrink-0" />
              <div className="text-xs sm:text-sm text-gray-700 font-semibold">ĐỔI TRẢ TRONG 15 NGÀY</div>
            </div>
            <div className="flex items-center border border-gray-300 rounded-md p-3 space-x-3 bg-white">
              <FontAwesomeIcon icon={faShieldAlt} className="text-yellow-500 text-xl flex-shrink-0" />
              <div className="text-xs sm:text-sm text-gray-700 font-semibold">BẢO HÀNH TRONG 30 NGÀY</div>
            </div>
            <div className="flex items-center border border-gray-300 rounded-md p-3 space-x-3 bg-white">
              <FontAwesomeIcon icon={faCopyright} className="text-yellow-500 text-xl flex-shrink-0" />
              <div className="text-xs sm:text-sm text-gray-700 font-semibold">PHÂN PHỐI ĐỘC QUYỀN</div>
            </div>
            <div className="flex items-center border border-gray-300 rounded-md p-3 space-x-3 bg-white">
              <FontAwesomeIcon icon={faPhoneAlt} className="text-yellow-500 text-xl flex-shrink-0" />
              <div className="text-xs sm:text-sm text-gray-700 font-semibold">HOTLINE - 028 7100 6789</div>
            </div>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full sm:w-1/4">
              <option>Chọn tỉnh thành phố</option>
              <option>Đà Nẵng</option>
              <option>Đắk Lắk</option>
              <option>Long An</option>
              <option>Hồ Chí Minh</option>
              <option>Cần Thơ</option>
            </select>
            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full sm:w-1/4">
              <option>Chọn Quận/huyện</option>
            </select>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentStores.map((store) => (
              <div key={store.id} className="bg-white rounded-md shadow-md overflow-hidden">
                <img alt={`Store front at ${store.name}`} className="w-full object-cover h-48" src={store.image} />
                <div className="p-4 text-black">
                  <h3 className="text-base font-semibold flex items-center gap-2">
                    {store.name}
                    {store.isNew && <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">New</span>}
                  </h3>
                  <p className="text-xs mt-1 flex items-center gap-1">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-xs" />
                    {store.address}
                  </p>
                  <p className="text-xs mt-1 flex items-center gap-1">
                    <FontAwesomeIcon icon={faClockRegular} className="text-xs" />
                    {store.hours}
                    <span className="ml-auto text-xs font-semibold rounded bg-blue-200 text-blue-400 px-2 py-0.5">Đang mở</span>
                  </p>
                  <p className="text-xs mt-1 flex items-center gap-1 justify-between">
                    <span className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faPhoneAlt} className="text-xs" />
                      {store.phone}
                    </span>
                    <button className="flex items-center gap-1 text-xs border border-gray-300 rounded-md px-3 py-1 hover:bg-black hover:text-white transition">
                      <FontAwesomeIcon icon={faLocationArrow} className="text-xs" />
                      Xem bản đồ
                    </button>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center my-6 gap-2">
            {Array.from({ length: totalStorePages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handleStorePageChange(page)}
                className={`px-3 py-1 border text-sm rounded ${storePage === page ? 'bg-black text-white' : 'bg-white text-black border-gray-300 hover:bg-gray-100'}`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
            <ToastContainer position="top-center" autoClose={3000} />

    </div>
  );
};

export default IntegratedPage;