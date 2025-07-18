"use client";
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ email: "", password: "" });
  const { dispatch } = useCart();
  const router = useRouter();

  const handleLoginWithGoogle = async () => {
    window.location.href =
      "https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?client_id=468454109173-taj2jti1ec2nsaiiccuc0pnd22ne78iv.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fhuunghi.id.vn%2Fapi%2Fuser%2Fauth%2Fgoogle%2Fcallback&scope=openid%20profile%20email&response_type=code&service=lso&o2v=1&flowName=GeneralOAuthFlow";
  };

  const handleLogin = async () => {
    const newError = { email: "", password: "" };
    if (!email) {
      newError.email = "Vui lòng nhập email";
    }
    if (!password) {
      newError.password = "Vui lòng nhập mật khẩu";
    }
    if (!email || !password) {
      setError(newError);
      return;
    }

    try {
      const res = await fetch("https://huunghi.id.vn/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const result = await res.json();

      if (!res.ok) {
        setError({
          ...newError,
          email: "Tài khoản hoặc mật khẩu không chính xác",
          password: "Tài khoản hoặc mật khẩu  không chính xác",
        });
        return;
      }

      const user = result.data.user;
      const accessToken = result.data.token;
      const typeToken = result.data.typeToken;

      // ✅ Lưu token
      const carts = localStorage.getItem("cart");
      if (carts) {
        const arrCarts = JSON.parse(carts);
        const resAddCart = await fetch(
          `https://huunghi.id.vn/api/cart/insertArrayCart`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              Authorization: `${typeToken} ${accessToken}`,
            },
            body: JSON.stringify({
              carts: arrCarts,
            }),
          }
        );
      }
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", JSON.stringify(accessToken));
      localStorage.setItem("typeToken", JSON.stringify(typeToken));
      window.dispatchEvent(new Event("userChanged"));
      window.dispatchEvent(new Event("quantityCartChange"));

      // const cartRes = await fetch('https://huunghi.id.vn/api/cart/addToCart', {
      //   method: "POST",
      //   headers: {
      //     Authorization: `${typeToken} ${accessToken}`
      //   }
      // });
      // const cartResult = await cartRes.json();

      // if (Array.isArray(cartResult.cart)) {
      //   dispatch({ type: 'SET_CART', payload: cartResult.cart });
      //   localStorage.setItem('cart', JSON.stringify(cartResult.cart));
      // }
      if (user.id_vai_tro == 2) {
        router.push("/user/userprofile");
      } else {
        router.push("/admin");
      }
      toast.success("Đăng nhập thành công!");
    } catch (err) {
      console.error(err);
      setError({ ...newError });
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 pt-[12%]">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      />

      <header className="bg-gray-200 py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-center sm:justify-start space-x-8">
            <a
              href="/"
              className="text-gray-700 hover:text-gray-900 text-sm font-medium"
            >
              Trang chủ
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-gray-900 text-sm font-medium"
            >
              Tài khoản
            </a>
            <a
              href="/login"
              className="text-gray-900 font-semibold text-sm border-b-2 border-gray-900 pb-1"
            >
              Đăng nhập
            </a>
          </nav>
        </div>
      </header>

      <div className="flex items-center justify-center px-4 py-8 sm:py-12 lg:py-16">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                ĐĂNG NHẬP
              </h1>
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
                  className={`w-full px-4 py-3 border ${
                    error.email ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder-gray-500`}
                />
                {error.email && (
                  <p className="text-red-500 text-sm mt-1">{error.email}</p>
                )}
              </div>

              {/* Password Input */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mật khẩu"
                  className={`w-full px-4 py-3 border ${
                    error.password ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder-gray-500 pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[25px] transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <i
                    className={`fas ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </button>
                {error.password && (
                  <p className="text-red-500 text-sm mt-1">{error.password}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="button"
                onClick={handleLogin}
                className="w-full bg-amber-400 text-white py-3 rounded-lg font-semibold hover:bg-amber-500 transition-colors duration-200 text-sm"
              >
                ĐĂNG NHẬP
              </button>
              <button
                onClick={() => handleLoginWithGoogle()}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 group hover:shadow-md"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-gray-700 font-medium group-hover:text-gray-900">
                  Tiếp tục với Google
                </span>
              </button>
              {/* Forgot Password */}
              <div className="text-center">
                <a
                  href="/forgetPassword"
                  className="text-gray-500 hover:text-gray-700 text-sm"
                >
                  Quên mật khẩu?
                </a>
              </div>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
              </div>

              {/* Register Link */}
              <div className="text-center">
                <Link
                  href="/register"
                  className="text-gray-700 hover:text-gray-900 font-medium text-sm"
                >
                  Đăng ký
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
