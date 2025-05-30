'use client';
import React from 'react';

const Register = () => {
  return (
    <div className="min-h-screen bg-gray-100 mt-40">
      {/* Navigation */}
      <nav className=" border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto">
          <div className="flex space-x-8 text-sm font-medium text-gray-700">
            <a href="/" className="hover:text-gray-900 transition-colors">
              Trang chủ
            </a>
            <a href="/" className="hover:text-gray-900 transition-colors">
              Tài khoản
            </a>
            <a href="#" className="hover:text-gray-900 transition-colors">
              Đăng ký
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex items-center justify-center px-4 py-8 md:py-16">
        <div className="w-full max-w-md">
          {/* Form Container */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            {/* Title */}
            <h1 className="text-xl md:text-2xl font-bold text-center text-gray-900 mb-6 md:mb-8">
              TẠO TÀI KHOẢN
            </h1>

            {/* Form */}
            <form className="space-y-6">
              {/* Phone Input */}
              <div>
                <input
                  type="tel"
                  placeholder="Nhập email của bạn"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-gray-900 placeholder-gray-500 transition-all"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-black text-white py-3 px-4 rounded-md font-medium hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                GỬI MÃ XÁC NHẬN
              </button>

              {/* Back Link */}
              <div className="text-center">
                <a
                  href="/login"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Quay về
                </a>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;