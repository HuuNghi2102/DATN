"use client";
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import Link from "next/link";
export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [errorEmail, setErrEmail] = useState("");

  const handleSubmit = async () => {
    const res = await fetch(`https://huunghi.id.vn/api/user/sendOTP`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });

    const results = await res.json();

    if (results.status == false) {
      if (results.errors.email.length > 0) {
        const arrErr = results.errors;
        setErrEmail(arrErr.email[0]);
      } else {
        setErrEmail(results.message);
      }
      return;
    }

    localStorage.setItem("email", JSON.stringify(results.email));
    toast.success(results.message);
    window.location.href = "enterCode";
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col pt-[10%]">
      {/* Header Navigation */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex space-x-8">
              <a
                href="/"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 "
              >
                Trang chủ
              </a>
              <a
                href="#"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700 border-b-2 border-gray-900"
              >
                Quên mật khẩu
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          {/* Forgot Password Card */}
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                QUÊN MẬT KHẨU
              </h1>
              <p className="text-sm text-gray-600">khôi phục bằng Email</p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* Email Input */}
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                />
              </div>
              {errorEmail && (
                <p className="text-red-500 text-sm">{errorEmail}</p>
              )}
              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-amber-400 text-black py-3 px-4 rounded-md hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 font-medium text-sm transition duration-200"
              >
                Gửi
              </button>
            </div>
            {/* Login Link */}
            <div className="mt-6 text-center">
              <Link
                href="/login"
                className="text-sm text-gray-500 hover:text-gray-700 transition duration-200"
              >
                Đăng nhập
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
