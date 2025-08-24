"use client";
import { useState } from "react";
import Image from "../interface/imageInterface";
import { FaComments } from "react-icons/fa";
import Link from "next/link";

interface Message {
  role: "user" | "ai";
  message: string;
  products?: ProductFull[];
}

interface ProductFull {
  id_san_pham: string;
  ten_san_pham: string;
  images: Image[];
  duong_dan: string;
  gia_chua_giam: number;
  phan_tram_giam: number;
  gia_da_giam: number;
  mo_ta_san_pham: string;
  trang_thai: number;
  id_loai_san_pham: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export default function ChatBox() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", message: "Xin chào! Tôi có thể giúp gì cho bạn hôm nay?" },
  ]);
  const [dataBefore, setDataBefore] = useState<ProductFull[]>([]);
  const [input, setInput] = useState("");

  const toggleChat = () => setOpen(!open);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { role: "user", message: trimmed }]);
    setInput("");

    try {
      console.log(trimmed);
      const res = await fetch("https://huunghi.id.vn/api/function/chatboxai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dataBefore: dataBefore, message: trimmed }),
      });

      const data = await res.json();

      console.log(data.data);

      setDataBefore(data.data);

      if (data.data && Array.isArray(data.data) && data.data.length > 0) {
        setMessages((prev) => [
          ...prev,
          { role: "ai", message: data.message, products: data.data },
        ]);
      } else {
        setMessages((prev) => [...prev, { role: "ai", message: data.message }]);
      }
    } catch (error) {
      console.log(error);
      setMessages((prev) => [
        ...prev,
        { role: "ai", message: "Đã xảy ra lỗi khi gửi tin nhắn." },
      ]);
    }
  };

  return (
    <div className="fixed bottom-40 right-5 z-50">
      {/* Nút mở chat */}
      {!open && (
        <button
          onClick={toggleChat}
          className="fixed bottom-20 right-6 w-14 h-14 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105 "
        >
          <FaComments size={28} />
        </button>
      )}

      {/* Khung chat */}
      {open && (
        <div className="mt-2 w-80 h-[350px] md:h-[450px] bg-white shadow-xl rounded-xl flex flex-col overflow-hidden border border-orange-400 relative top-28">
          {/* Header với nút X */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 font-semibold text-center rounded-t-xl flex justify-between items-center shadow-md">
            <div className="flex items-center gap-2">
              {/* Logo nhỏ */}
              <img
                src="/assets/images/logo.png"
                alt="Verves"
                className="w-6 h-6 rounded-full"
              />
              <span className="text-lg">Verve Style</span>
            </div>
            <button
              onClick={toggleChat}
              className="text-white font-bold px-3 py-1 hover:text-gray-200 hover:bg-orange-700 rounded-md transition"
            >
              ✕
            </button>
          </div>

          {/* Nội dung */}
          <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col max-w-[75%] ${
                  msg.role === "user"
                    ? "ml-auto items-end"
                    : "mr-auto items-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-lg break-words ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-black border border-orange-300"
                  }`}
                >
                  {msg.message}
                </div>

                {/* Hiển thị sản phẩm */}
                {msg.products &&
                  msg.products.map((prod, i) => (
                    <Link key={i} href={`/product/${prod.duong_dan}`}>
                      <div
                        key={i}
                        className="flex border rounded-lg overflow-hidden mt-2 w-full shadow-sm bg-white"
                      >
                        {/* Ảnh sản phẩm */}

                        <img
                          src={`https://huunghi.id.vn/storage/products/${prod.images[0]?.link_anh}`}
                          alt={prod.ten_san_pham}
                          className="w-20 h-20 object-cover"
                        />

                        {/* Nội dung */}
                        <div className="p-2 flex flex-col justify-center flex-1">
                          <p className="font-semibold text-sm line-clamp-2">
                            {prod.ten_san_pham}
                          </p>

                          <div className="flex items-center gap-2 mt-1">
                            {/* Giá mới */}
                            {prod.gia_da_giam && (
                              <p className="text-orange-500 font-bold text-sm">
                                {prod.gia_da_giam.toLocaleString()}₫
                              </p>
                            )}

                            {/* Giá cũ */}
                            {prod.gia_chua_giam && (
                              <p className="text-gray-400 text-xs line-through">
                                {prod.gia_chua_giam.toLocaleString()}₫
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-2 flex gap-2 border-t border-gray-200">
            <input
              type="text"
              className="flex-1 border rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Nhập tin nhắn..."
            />
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-lg text-sm font-semibold"
              onClick={sendMessage}
            >
              Gửi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
