"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const ChatBoxAI: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<{ from: "user" | "bot"; text: string }[]>([
        { from: "bot", text: "Bạn cần tư vấn về gì?" },
    ]);
    const [input, setInput] = useState("");

    // Gửi tin nhắn
    const handleSend = () => {
        if (!input.trim()) return;
        setMessages([...messages, { from: "user", text: input }]);
        setInput("");
    };

    return (
        <div className="fixed bottom-12 right-6 z-50">
            {/* Icon mở chat */}
            {!open && (
                <button
                    onClick={() => setOpen(true)}
                    className="bg-amber-400 text-white  w-16 h-16  rounded-full shadow-lg"
                >
                    <FontAwesomeIcon icon={faMessage} />
                </button>
            )}

            {/* Box chat */}
            {open && (
                <div className="w-80 h-96 bg-white rounded-2xl shadow-xl flex flex-col">
                    {/* Header */}
                    <div className="bg-black text-white p-3 flex justify-between items-center">
                        <Link href="/">
                            <img
                                className="w-20 object-cover"
                                src="/assets/images/logo.png"
                                alt="160STORE"
                            />
                        </Link>
                        <span className="font-semibold">Chat với chúng tôi</span>
                        <button
                            onClick={() => setOpen(false)}
                            className="font-bold text-lg"
                        >
                            ×
                        </button>
                    </div>

                    {/* Body */}
                    <div className="flex-1 p-3 overflow-y-auto text-sm space-y-3">
                        {messages.map((msg, i) =>
                            msg.from === "bot" ? (
                                <div
                                    key={i}
                                    className="bg-gray-200 text-black px-3 py-2 rounded-lg w-fit"
                                >
                                    {msg.text}
                                </div>
                            ) : (
                                <div
                                    key={i}
                                    className="bg-amber-100 text-black px-3 py-2 rounded-lg w-fit ml-auto"
                                >
                                    {msg.text}
                                </div>
                            )
                        )}

                        {/* Ví dụ tin nhắn dạng sản phẩm từ bot */}
                        <div className="bg-gray-100 p-3 rounded-lg w-64 shadow text-sm">
                            <img
                                src="https://cavathanquoc.com/wp-content/uploads/2024/06/Ao-thun-tron-cotton-mau-xanh-duong-4.jpg"
                                alt="Áo Polo"
                                className="w-full object-cover rounded-md mb-2"
                            />
                            <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 ">
                                Áo Polo Nam Trim Edge Tay Raglan
                            </h3>
                            <div className="flex gap-2 items-center">
                                <p className="text-red-500 font-bold text-sm mt-1">379.000₫</p>
                                <del className="text-gray-700 font-bold text-xs mt-1">
                                    123.000₫
                                </del>
                            </div>
                            <p className="text-gray-600 text-xs mt-1 line-clamp-2">
                                Chất liệu double-face interlock CVC dày dặn, giữ phom tốt, thoáng
                                mát, thiết kế tay raglan phối viền nam tính...
                            </p>
                            <div className="flex justify-between mt-2">
                                <button className="bg-amber-400 text-white px-3 py-1 text-sm rounded-md hover:text-amber-400 hover:border-amber-400 hover:border-2 hover:bg-white">
                                    Xem chi tiết
                                </button>
                                <button className="border-amber-400 border-2 text-amber-400 px-3 py-1 text-sm rounded-md hover:bg-amber-400 hover:text-white">
                                    Mua ngay
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex border-t">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            className="flex-1 px-3 py-2 text-sm outline-none"
                            placeholder="Nhập tin nhắn..."
                        />
                        <button
                            onClick={handleSend}
                            className="bg-amber-400 text-black px-4 py-2"
                        >
                            Gửi
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBoxAI;
