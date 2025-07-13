"use client";

import React, { useState } from "react";
import "@/app/globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const messagesData = {
  "Trần Văn Bình": [
    {
      from: "customer",
      text: "Xin chào, tôi muốn hỏi về sản phẩm áo thun nam cổ tròn mà shop đang bán ạ?",
      time: "10:30 AM",
    },
    {
      from: "admin",
      text: "Chào anh Bình! Cảm ơn anh đã quan tâm đến sản phẩm của shop. Anh cần thông tin gì về sản phẩm ạ?",
      time: "10:32 AM",
    },
    {
      from: "customer",
      text: "Tôi muốn biết chất liệu vải và size áo như thế nào? Tôi cao 1m75, nặng 68kg thì nên mặc size nào?",
      time: "10:33 AM",
    },
    {
      from: "admin",
      text: "Sản phẩm làm từ vải cotton 100% thoáng mát, co giãn tốt. Với chiều cao và cân nặng của anh, shop khuyên dùng size L sẽ vừa vặn nhất ạ.",
      time: "10:35 AM",
    },
    {
      from: "customer",
      text: "Cảm ơn shop. Tôi muốn đặt 2 cái size L màu đen và 1 cái size M màu trắng. Có được giảm giá không?",
      time: "10:36 AM",
    },
  ],
  "Lê Thị Hương": [
    {
      from: "customer",
      text: "Đơn hàng của tôi chưa nhận được...",
      time: "Hôm qua",
    },
    {
      from: "admin",
      text: "Dạ em kiểm tra lại đơn và phản hồi chị ngay ạ!",
      time: "Hôm qua",
    },
  ],
  "Phạm Đức Anh": [
    { from: "customer", text: "Cảm ơn shop đã hỗ trợ!", time: "Thứ 3" },
  ],
  "Nguyễn Thị Mai": [
    { from: "customer", text: "Tôi muốn đổi size sản phẩm...", time: "Thứ 2" },
  ],
  "Hoàng Văn Cường": [
    { from: "customer", text: "Khi nào shop có hàng mới?", time: "CN" },
  ],
};

const conversations = [
  {
    name: "Trần Văn Bình",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    time: "10:30 AM",
  },
  {
    name: "Lê Thị Hương",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    time: "Hôm qua",
  },
  {
    name: "Phạm Đức Anh",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    time: "Thứ 3",
  },
  {
    name: "Nguyễn Thị Mai",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    time: "Thứ 2",
  },
  {
    name: "Hoàng Văn Cường",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    time: "CN",
  },
];

const ChatManager = () => {
  const [selectedUser, setSelectedUser] = useState(conversations[0]);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(messagesData[selectedUser.name]);

  const handleSelect = (user) => {
    setSelectedUser(user);
    setMessages(messagesData[user.name] || []);
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = {
      from: "admin",
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    const updatedMsgs = [...messages, newMsg];
    setMessages(updatedMsgs);
    messagesData[selectedUser.name] = updatedMsgs;
    setInput("");
  };

  return (
    <main className="bg-gray-100 min-h-screen p-4">
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý Tin nhắn</h1>
        <p className="text-sm text-gray-500">Trò chuyện và hỗ trợ khách hàng</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[80vh]">
        <aside className="bg-white rounded shadow p-4 overflow-y-auto">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full mb-3 border px-3 py-1 rounded text-sm"
          />
          {conversations.map((c) => (
            <div
              key={c.name}
              className={`flex items-center gap-3 p-2 rounded cursor-pointer mb-2 ${
                selectedUser.name === c.name
                  ? "bg-indigo-100"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleSelect(c)}
            >
              <img
                src={c.avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="font-medium text-sm text-gray-800 flex justify-between">
                  <span>{c.name}</span>
                  <span className="text-xs text-gray-400">{c.time}</span>
                </div>
                <p className="text-xs text-gray-500 truncate">
                  {messagesData[c.name]?.[0]?.text}
                </p>
              </div>
            </div>
          ))}
        </aside>

        <section className="lg:col-span-2 flex flex-col bg-white rounded shadow overflow-hidden">
          <div className="flex items-center gap-4 p-4 border-b">
            <img
              src={selectedUser.avatar}
              className="w-10 h-10 rounded-full object-cover"
              alt="avatar"
            />
            <div>
              <h4 className="font-semibold text-sm text-gray-800 flex items-center gap-2">
                {selectedUser.name}{" "}
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              </h4>
              <p className="text-xs text-gray-500">Đang hoạt động</p>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.from === "admin" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-lg px-4 py-2 max-w-sm ${
                    msg.from === "admin"
                      ? "bg-indigo-600 text-white rounded-tr-none"
                      : "bg-white border rounded-tl-none"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <div className="text-xs mt-1 text-right text-gray-400">
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  !e.shiftKey &&
                  (e.preventDefault(), sendMessage())
                }
                placeholder="Nhập tin nhắn..."
                className="flex-1 border rounded px-3 py-2 text-sm resize-none h-10 max-h-28"
              ></textarea>
              <button
                onClick={sendMessage}
                className="w-10 h-10 bg-indigo-600 hover:bg-indigo-700 rounded text-white"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ChatManager;
