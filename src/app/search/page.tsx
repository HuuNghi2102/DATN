'use client'
import React, { useState } from 'react';

export default function SearchInterface() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Xử lý tìm kiếm ở đây
    console.log('Tìm kiếm:', searchQuery);
  };

  const handleKeyPress = (e:any) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-40">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 space-x-8">
            <a 
              href="#" 
              className="text-gray-900 hover:text-gray-700 font-medium text-sm sm:text-base"
            >
              Trang chủ
            </a>
            <a 
              href="#" 
              className="text-gray-600 hover:text-gray-900 font-medium text-sm sm:text-base border-b-2 border-black"
            >
              Tìm kiếm
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="w-full max-w-2xl mx-auto text-center">
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 ">
            Tìm kiếm
          </h1>
          
          {/* Decorative line - hidden on mobile */}
          <div className="hidden sm:block w-16 h-1 bg-gray-800 mx-auto mb-8 lg:mb-12"></div>
          
          {/* Error message */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 mb-4 sm:mb-6 leading-tight">
            Không tìm thấy nội dung bạn yêu cầu
          </h2>
          
          {/* Description */}
          <p className="text-gray-600 text-sm sm:text-base mb-8 sm:mb-12 max-w-lg mx-auto leading-relaxed">
            Không tìm thấy "". Vui lòng kiểm tra chính tả, sử dụng các từ tổng quát hơn và thử lại!
          </p>
          
          {/* Search Form */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 max-w-md sm:max-w-lg mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tìm kiếm sản phẩm..."
              className="flex-1 px-4 py-3 mr-3 text-gray-700 bg-white border border-gray-300   focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm sm:text-base"
            />
            <button
              onClick={handleSearch}
              className="px-6 sm:px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-medium  sm:rounded-l-none transition-colors duration-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            >
              Tìm kiếm
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}