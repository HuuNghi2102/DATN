'use client'
import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden pt-[12%]">
      {/* Animated Stars */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Planets */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full opacity-80 animate-bounce"></div>
      <div className="absolute top-40 right-20 w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-70 animate-pulse"></div>
      <div className="absolute bottom-32 left-1/4 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-60"></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-2xl mx-auto">
          {/* Astronaut */}
          <div className="mb-8 relative">
            <div className="mx-auto w-32 h-32 relative">
              {/* Helmet */}
              <div className="w-28 h-28 mx-auto bg-gradient-to-br from-gray-200 to-gray-300 rounded-full border-4 border-gray-400 relative overflow-hidden">
                {/* Helmet Reflection */}
                <div className="absolute top-2 left-2 w-8 h-8 bg-white opacity-30 rounded-full blur-sm"></div>
                {/* Face */}
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-pink-200 rounded-full">
                  {/* Eyes */}
                  <div className="absolute top-4 left-3 w-2 h-2 bg-black rounded-full"></div>
                  <div className="absolute top-4 right-3 w-2 h-2 bg-black rounded-full"></div>
                  {/* Mouth */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-pink-300 rounded-full"></div>
                </div>
              </div>
              
              {/* Body */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-24 bg-white rounded-lg border-2 border-gray-300">
                {/* Chest Panel */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-8 bg-gray-100 rounded border border-gray-300">
                  <div className="flex justify-center items-center h-full space-x-1">
                    <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                    <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                    <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                  </div>
                </div>
                {/* Arms */}
                <div className="absolute top-4 -left-6 w-12 h-4 bg-white rounded-full border-2 border-gray-300 transform -rotate-12"></div>
                <div className="absolute top-4 -right-6 w-12 h-4 bg-white rounded-full border-2 border-gray-300 transform rotate-12"></div>
              </div>

              {/* Floating Effect */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-1 h-8 bg-gradient-to-t from-transparent to-white opacity-50"></div>
            </div>
          </div>

          {/* 404 Text */}
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl  text-transparent text-gray-50 font-bold  mb-4 ">
              404
            </h1>
            <div className="text-xl md:text-2xl font-bold text-white mb-2">
              Ôi không, chúng tôi có vấn đề
            </div>
            <p className="text-gray-300 text-lg mb-4">
              Có lẽ bạn đã lạc vào không gian🚀
            </p>
            <p className="text-gray-400 text-sm max-w-md mx-auto">
            Trang bạn đang tìm kiếm đã trôi vào khoảng trống vũ trụ. Đừng lo lắng, phi hành đoàn không gian của chúng tôi ở đây để giúp bạn điều hướng trở về an toàn.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={() => window.location.href = '/'}
              className="group px-8 py-4 bg-black border-2 text-white font-semibold rounded-full hover:from-cyan-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <i className="fas fa-home mr-2"></i>
              Return to Earth
            </button>
          </div>
        </div>
      </div>

      {/* Floating Animation CSS */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;