'use client'
import React, { useState } from 'react';

export default function EnterCodePage() {
    const [code, setCode] = useState('');
    const [isCodeVerified, setIsCodeVerified] = useState(false);
    const [error, setError] = useState('');
    const [formPassword, setFormPassword] = useState({
        passNew: '',
        passConfirm: '',
    })

    const [errPassword, setErrPassword] = useState({
        passNew: '',
        passConfirm: '',
    })
    const verifyCode = async () => {
        const email = localStorage.getItem("email");

        try {
            if (email) {
                const parseemail = JSON.parse(email);
                const response = await fetch('https://huunghi.id.vn/api/user/checkOTP', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: parseemail, code: code }),
                });
                const data = await response.json();
                console.log(data);
                if (data.status == true) {
                    setIsCodeVerified(true);
                    setError('');
                } else {
                    setError(data.message || 'Mã không đúng');
                }
            }
        } catch (err) {
            setError('Lỗi mạng hoặc máy chủ.');
            console.error(err);
        }
    };
    const changeValue = (e: any) => {
        const { name, value } = e.target;
        setFormPassword((element) => ({
            ...element,
            [name]: value
        }))
    }
    const changePassword = async () => {
        if (!formPassword.passNew || !formPassword.passConfirm) {
            setError("Vui lòng điền đầy đủ mật khẩu.");
            return;
        }

        if (formPassword.passNew !== formPassword.passConfirm) {
            setError("Mật khẩu xác nhận không khớp.");
            return;
        }
        try {
            const email = localStorage.getItem("email");
            if (email) {
                const parseemail = JSON.parse(email);
                const res = await fetch("https://huunghi.id.vn/api/user/changePasswordFoget", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email : parseemail,
                    password: formPassword.passNew,
                    passwordConfirm: formPassword.passConfirm
                })
            })
            const result = await res.json();
            if (result.status == true) {
                alert("Đổi mật khẩu thành công!");
                window.location.href = "/login";
            }
            else {
                console.log(result);
                setError(result?.message || "Có lỗi xảy ra.");
            }
            }

        } catch (error) {
            console.log("Bị lỗi rồi", error);
        }
    }

    return (
        <div className="min-h-screen bg-gray-200 flex flex-col pt-[11%]">
            {/* Header Navigation */}
            <header className="bg-white shadow-sm">
                <nav className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex space-x-8">
                            <a
                                href="#"
                                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 "
                            >
                                Trang chủ
                            </a>
                            <a
                                href="#"
                                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700"
                            >
                                Tài khoản
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
                            <p className="text-sm text-gray-600">
                                khôi phục bằng Email
                            </p>
                        </div>
                        {/* Form */}
                        <div className="space-y-6">
                            {!isCodeVerified && (
                                <div>
                                    <input
                                        type="number"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        placeholder="Nhập mã"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                                    />
                                    {error && <p className="text-red-500 text-sm">{error}</p>}
                                    <button
                                        onClick={verifyCode}
                                        className="mt-4 w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 font-medium text-sm transition duration-200"
                                    >
                                        Xác minh mã
                                    </button>
                                </div>
                            )}
                            {isCodeVerified && (
                                <div>
                                    <input
                                        type="password"
                                        name="passNew"
                                        value={formPassword.passNew}
                                        onChange={(e) => changeValue(e)}
                                        className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                                        placeholder="Nhập mật khẩu mới"
                                    />
                                    <input
                                        type="password"
                                        name="passConfirm"
                                        value={formPassword.passConfirm}
                                        onChange={(e) => changeValue(e)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                                        placeholder="Xác nhận lại mật khẩu"
                                    />

                                    {error && <p className="text-red-500 text-sm">{error}</p>}
                                    <button
                                        onClick={() => changePassword()}
                                        className="mt-4 w-full bg-black text-white py-3 px-4 rounded-md active:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 font-medium text-sm transition duration-200"
                                    >
                                        Xác nhận đổi mật khẩu
                                    </button>
                                </div>
                            )}

                        </div>
                        {/* Login Link */}
                        <div className="mt-6 text-center">
                            <a
                                href="/login"
                                className="text-sm text-gray-500 hover:text-gray-700 transition duration-200"
                            >
                                Đăng nhập
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}