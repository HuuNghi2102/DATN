'use client';
import React, { useEffect, useState } from 'react';

const Register = () => {

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

  const handleRegister = async () => {
    try {
      const res = await fetch('https://huunghi.id.vn/api/user/register',{
        method : "POST",
        headers : {
          "Content-type" : "application/json",
        },
        body : JSON.stringify({
          name : formRegister.name,
          email : formRegister.email,
          password : formRegister.password,
          confirm_password : formRegister.passwordConfirm
        })
      });

      const result = await res.json();

      if(result.status == false){
        setErrors({
          errName : result.errors.name,
          errEmail : result.errors.email,
          errPassword : result.errors.password,
          errPasswordConfirm : result.errors.confirm_password
        })
        return;
      }

      localStorage.setItem('user',JSON.stringify(result.data.user))
      localStorage.setItem('accessToken',JSON.stringify(result.data.token))
      localStorage.setItem('typeToken',JSON.stringify(result.data.typeToken))

      alert(`${result.message}`);
      
      window.location.href = '/userprofile'



    } catch (error) {
      console.log(error);
    }
  }

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
                {errors.errName}
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
                {errors.errEmail}
              </div>
              {/* Password Input */}
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Nhập mật khẩu của bạn"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-gray-900 placeholder-gray-500 transition-all"
                  value={formRegister.password}
                  onChange={handleChangeInput}
                />
                {errors.errPassword}
              </div>             
              {/* Password Input Again */}
              <div>
                <input
                  type="password"
                  name="passwordConfirm"
                  placeholder="Xác nhận lại mật khẩu"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-gray-900 placeholder-gray-500 transition-all"
                  value={formRegister.passwordConfirm}
                  onChange={handleChangeInput}
                />
                {errors.errPasswordConfirm}
                
              </div>              
              {/* Submit Button */}
              <button
                onClick={handleRegister}
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