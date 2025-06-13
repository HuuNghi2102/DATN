'use client'
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCartShopping,faCalendarDays,faChevronRight } from '@fortawesome/free-solid-svg-icons';
interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  badge: string;
}

type TabType ='products' | 'articles';

const EcommerceSearchPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('products');

  const products: Product[] = [
    {
      id: 1,
      name: 'Áo Sơ Mi Bóng Chày Nam Disney Stitch Striker Edition',
      price: '399000',
      image: '/api/placeholder/280/280',
      badge: 'Hàng Mới',
    },
    {
      id: 2,
      name: 'Áo Thun Nam Disney Stitch 626 Bounce Core Form Oversize',
      price: '399000',
      image: '/api/placeholder/280/280',
      badge: 'Hàng Mới',
    },
    {
      id: 3,
      name: 'Áo Thun Nam Strokes Orgris Form Boxy',
      price: '299000',
      image: '/api/placeholder/280/280',
      badge: 'Hàng Mới',
    },
    {
      id: 4,
      name: 'Áo Thun Nam ICONDENIM The Coastal Frenzy ORGN.S',
      price: '329000',
      image: '/api/placeholder/280/280',
      badge: 'Hàng Mới',
    },
    {
      id: 5,
      name: 'Áo Thun Nam Sundaze Rush Form Regular',
      price: '329000',
      image: '/api/placeholder/280/280',
      badge: 'Hàng Mới',
    },
    {
      id: 6,
      name: 'Áo Thun Nam Fusion Kit-ID Form Regular',
      price: '279000',
      image: '/api/placeholder/280/280',
      badge: 'Hàng Mới',
    },
    {
      id: 7,
      name: 'Áo Thun Nam Disney Stitch Jersey Vibe Form Oversize',
      price: '399000',
      image: '/api/placeholder/280/280',
      badge: 'Hàng Mới',
    },
    {
      id: 8,
      name: 'Áo Tanktop Nam Hoa Tiêt Disney Stitch Chaotic Energy',
      price: '229,000₫',
      image: '/api/placeholder/280/280',
      badge: 'Hàng Mới',
    },
    {
      id: 9,
      name: 'Áo Thun Nam Tiestyle Loang Sundaze Rush Form Boxy',
      price: '349,000₫',
      image: '/api/placeholder/280/280',
      badge: 'Hàng Mới',
    },
    {
      id: 10,
      name: 'Áo Thun Nam Họa Tiết Disney Stitch Floral Vibes Form Boxy',
      price: '329,000₫',
      image: '/api/placeholder/280/280',
      badge: 'Hàng Mới',
    }
  ];
  const [isProductOrPost, setIsProductOrPost] = useState(false || true);
  const handleTabClick = (tab: TabType): void => {
    setActiveTab(tab);
  };

  
  return (
    <div className="min-h-screen bg-gray-50 mt-40">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                  <span className="font-semibold">áo</span>
                  ".
                </p>
                </div>
              
              {/* Filter Tabs */}
              <div className="flex justify-center items-center gap-5  mb-12">
                <button 
                  onClick={() => handleTabClick('products')}
                  className={`px-6 py-2 text-sm font-medium rounded-sm transition-colors ${
                    activeTab === 'products' 
                      ? 'bg-black text-white' 
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                  type="button"
                >
                  SẢN PHẨM ({products.length})
                </button>
                <button 
                  onClick={() => handleTabClick('articles')}
                  className={`px-6 py-2 text-sm font-medium rounded-sm transition-colors ${
                    activeTab === 'articles' 
                      ? 'bg-black text-white' 
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                  type="button"
                >
                  BÀI VIẾT (0)
                </button>
              </div>
            </div>
          {/* Sản phẩm */}
          {activeTab === 'products' && (
            <div className="flex flex-wrap -mx-2">
              {products.map((product, i) => (
                <div key={i} className=" w-1/2 sm:w-1/3 lg:w-1/5 px-2 mb-6">
                  <div className="bg-white p-2 rounded-lg cursor-pointer">
                    <div className="relative group overflow-hidden">
                      <a href="#" className="relative">
                        <img src='/assets/images/zz.webp' alt={product.name} className="w-full h-full object-cover" />
                        <img
                          src='/assets/images/zzz.webp'
                          className="w-full absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                      </a>
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
                      <p className="text-sm">{product.name}</p>
                      <strong className="text-sm">{product.price.toLocaleString()} VNĐ</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* bài viết */}
          {activeTab === 'articles' && (
            <div className="flex flex-wrap -mx-2">
              {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className="w-1/2 h-1/2 sm:w-1/3 lg:w-1/4 px-2 mb-6">
                  <div className="group">
                    <div className="h-[220px]">
                      <a href="#">
                        <img className="object-cover w-full h-full opacity-1 group-hover:opacity-90 group-hover:p-[2px] transition-p transition-opacity duration-900" src="/assets/images/zzz.webp" alt="" />
                      </a>
                    </div>
                    <div className="bg-white mx-2 relative mt-[-25px] py-2 px-4 shadow">
                      <h1 className="text-center font-semibold">Top 10 đồ đẹp của shop verve style</h1>
                      <p className="text-sm text-gray-600 ">áo đẹp là asdasdasde asdada a sdaadssđ a..</p>
                      <hr className="my-2" />
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">
                          <FontAwesomeIcon icon={faCalendarDays} /> 10/06/2025
                        </span>
                        <a href="#" className="text-sm text-gray-500 hover:text-amber-400">
                          Xem thêm <FontAwesomeIcon className="text-sm" icon={faChevronRight} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Load More Section */}
          <div className="flex justify-center items-center gap-5 mt-12">
            <button 
              className="bg-black text-white hover:bg-slate-50 border border-black hover:text-black px-5 py-3  font-medium transition-colors duration-300" type="button">
              1
            </button>
            <button 
              className="bg-black text-white hover:bg-slate-50 border border-black hover:text-black px-5 py-3  font-medium transition-colors duration-300" type="button">
              2
            </button>
            <button 
              className="bg-black text-white hover:bg-slate-50 border border-black hover:text-black px-5 py-3  font-medium transition-colors duration-300" type="button">
              3
            </button>            
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