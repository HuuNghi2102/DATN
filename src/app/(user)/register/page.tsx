'use client';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errors,setErrors] = useState({
    errName : '',
    errEmail : '',
    errPassword : '',
    errPasswordConfirm : ''
  });

  const [formRegister,setFromRegister] = useState({
    name : '',
    email : '',
    password : '',
    passwordConfirm : ''
  });

  const handleChangeInput = (e:any) => {
    const { name, value } = e.target;
    setFromRegister(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const router = useRouter();

const handleRegister = async () => {
  try {
    const res = await fetch('https://huunghi.id.vn/api/user/register', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formRegister.name,
        email: formRegister.email,
        password: formRegister.password,
        confirm_password: formRegister.passwordConfirm
      }),
    });

    // Check xem server có trả JSON hợp lệ không
    const contentType = res.headers.get("content-type");
    if (!res.ok || !contentType?.includes("application/json")) {
      const text = await res.text(); // lấy raw HTML trả về
      console.error("Server returned non-JSON response:", text);
      throw new Error("Đăng ký thất bại. Server không trả về JSON hợp lệ.");
    }

    const result = await res.json();

    if (result.status === false) {
      setErrors({
        errName: result.errors?.name || '',
        errEmail: result.errors?.email || '',
        errPassword: result.errors?.password || '',
        errPasswordConfirm: result.errors?.confirm_password || '',
      });
      return;
    }

    localStorage.setItem('user', JSON.stringify(result.data.user));
    localStorage.setItem('accessToken', JSON.stringify(result.data.token));
    localStorage.setItem('typeToken', JSON.stringify(result.data.typeToken));

    toast.success(`${result.message}`);
    router.push('/user/userprofile');

  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    toast.error("Đăng ký thất bại. Vui lòng thử lại sau.");
  }
}

  return (
    <div className="min-h-screen bg-gray-100 pt-[12%]">
      {/* Navigation */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
        />
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
            <form onSubmit={e => e.preventDefault()} className="space-y-6">
              {/* Name Input */}
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Nhập họ và tên của bạn"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-gray-900 placeholder-gray-500 transition-all"
                  value={formRegister.name}
                  onChange={handleChangeInput}
                />
                {errors.errName && <p className='text-red-500 text-sm'>{errors.errName}*</p>}
              </div>              
              {/* Email Input */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Nhập email của bạn"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-gray-900 placeholder-gray-500 transition-all"
                  value={formRegister.email}
                  onChange={handleChangeInput}
                />
                {errors.errEmail && <p className='text-red-500 text-sm'>{errors.errEmail}*</p>}
              </div>
              {/* Password Input */}
            <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Mật khẩu"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder-gray-500 pr-12"
                  value={formRegister.password}
                  onChange={handleChangeInput}
                />
                {errors.errPasswordConfirm && <p className='text-red-500 text-sm'>{errors.errPasswordConfirm}*</p>}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[25px] transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              {/* Password Input Again */}
            <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="passwordConfirm"
                  placeholder="Xác nhận lại mật khẩu"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder-gray-500 pr-12"
                  value={formRegister.passwordConfirm}
                  onChange={handleChangeInput}
                />
                {errors.errPasswordConfirm && <p className='text-red-500 text-sm'>{errors.errPasswordConfirm}*</p>}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[25px] transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
            </div>              

              {/* Submit Button */}
              <button
                onClick={handleRegister}
                type="submit"
                className="w-full bg-amber-400 text-black font-semibold py-3 px-4 rounded-md  hover:bg-amber-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
               Đăng ký
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
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default Register;