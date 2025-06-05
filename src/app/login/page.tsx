'use client';
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ email: '', password: '' });
  const { dispatch } = useCart();
  const handleLogin = async () => {
    const newError = { email: '', password: '' };
    if (!email) {
      newError.email = 'Vui lòng nhập email';
    }
    if (!password) {
      newError.password = 'Vui lòng nhập mật khẩu';
    }
    if (!email || !password) {
      setError(newError);
      return;
    }

    try {
      const res = await fetch('https://huunghi.id.vn/api/user/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password })
      });
      const result = await res.json();

      if (!res.ok) {
        setError({ ...newError,email: 'Tài khoản hoặc mật khẩu không chính xác', password: 'Mật khẩu  không chính xác' });
        return;
      }

      const user = result.data.user;
      const accessToken = result.data.token;
      const typeToken = result.data.typeToken;

      // ✅ Lưu token
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('typeToken', typeToken);
      const cartRes = await fetch('https://huunghi.id.vn/api/cart/addToCart', {
        method: "POST",
        headers: {
          Authorization: `${typeToken} ${accessToken}`
        }
      });
      const cartResult = await cartRes.json();

      if (Array.isArray(cartResult.cart)) {
        dispatch({ type: 'SET_CART', payload: cartResult.cart });
        localStorage.setItem('cart', JSON.stringify(cartResult.cart));
      }
      window.location.href = '/userprofile';
    } catch (err) {
      console.error(err);
      setError({ ...newError });
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 mt-40">
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
      />

      <header className="bg-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-center sm:justify-start space-x-8">
            <a href="/" className="text-gray-700 hover:text-gray-900 text-sm font-medium">Trang chủ</a>
            <a href="#" className="text-gray-700 hover:text-gray-900 text-sm font-medium">Tài khoản</a>
            <a href="/login" className="text-gray-900 font-semibold text-sm border-b-2 border-gray-900 pb-1">Đăng nhập</a>
          </nav>
        </div>
      </header>

      <div className="flex items-center justify-center px-4 py-8 sm:py-12 lg:py-16">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">ĐĂNG NHẬP</h1>
              <p className="text-gray-600 text-sm">HOẶC ĐĂNG NHẬP VỚI ...</p>
            </div>

            <div className="space-y-6">
              {/* Email Input */}
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email hoặc số điện thoại"
                  className={`w-full px-4 py-3 border ${error.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder-gray-500`}
                />
                {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
              </div>

              {/* Password Input */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mật khẩu"
                  className={`w-full px-4 py-3 border ${error.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder-gray-500 pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[25px] transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
                {error.password && <p className="text-red-500 text-sm mt-1">{error.password}</p>}
              </div>

              {/* Submit */}
              <button
                type="button"
                onClick={handleLogin}
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200 text-sm"
              >
                ĐĂNG NHẬP
              </button>

              {/* Forgot Password */}
              <div className="text-center">
                <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">Quên mật khẩu?</a>
              </div>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
              </div>

              {/* Register Link */}
              <div className="text-center">
                <a href="/register" className="text-gray-700 hover:text-gray-900 font-medium text-sm">Đăng ký</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
