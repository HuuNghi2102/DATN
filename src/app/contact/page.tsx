'use client';
import React, { useState } from 'react';
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

// Dữ liệu mock
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
  }
];


const ITEMS_PER_PAGE = 12;

export default function StoreLocationsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(PRODUCTS.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = PRODUCTS.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 pt-[12%]">
      {/* Breadcrumb */}
      <nav className="text-[11px] font-medium pb-2">
        <ul className="flex items-center gap-1">
          <li className="text-[12px] font-semibold mt-0.5"><a href="/">Trang chủ</a></li>
          <li className="text-gray-500 font-normal">/</li>
          <li className="text-[12px] font-semibold mt-0.5 underline">Địa Chỉ Cửa Hàng</li>
        </ul>
      </nav>

      {/* Banner */}
      <div className="mt-1">
        <img
          alt="Banner Áo Nam"
          className="w-full object-cover"
          height="300"
          src="https://picsum.photos/1200/300?random=20"
          width="1200"
        />
      </div>

      {/* Info boxes */}
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

      {/* Filters */}
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

      {/* Store cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map((store) => (
          <div key={store.id} className="bg-white rounded-md shadow-md overflow-hidden">
            <img
              alt={`Store front at ${store.name}`}
              className="w-full object-cover h-48"
              src={store.image}
            />
            <div className="p-4 text-black">
              <h3 className="text-base font-semibold flex items-center gap-2">
                {store.name}
                {store.isNew && (
                  <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                    New
                  </span>
                )}
              </h3>
              <p className="text-xs mt-1 flex items-center gap-1">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-xs" />
                {store.address}
              </p>
              <p className="text-xs mt-1 flex items-center gap-1">
                <FontAwesomeIcon icon={faClockRegular} className="text-xs" />
                {store.hours}
                <span className="ml-auto text-xs font-semibold rounded bg-blue-200 text-blue-400 px-2 py-0.5">
                  Đang mở
                </span>
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
