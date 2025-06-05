import React from 'react';
import { FaPhone, FaEnvelope, FaClock, FaHeadphones, FaChevronDown } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-black text-white w-full py-8">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-700 pb-6 mb-6">
          <div className="text-lg font-bold mb-4 md:mb-0">ĐĂNG KÍ NHẬN TIN</div>
          <form className="flex w-full max-w-md mb-4 md:mb-0">
            <input type="email" placeholder="Email" className="flex-grow px-4 py-2 text-black" />
            <button type="submit" className="flex items-center bg-black border border-white text-white font-bold px-4">
              <FaEnvelope className="mr-2" /> ĐĂNG KÝ
            </button>
          </form>
          <div className="flex gap-2">
            <img width="40" src="/assets/images/zalo-seeklogo.webp" alt="zalo" />
            <img width="40" src="/assets/images/Instagram_icon.png.webp" alt="instagram" />
            <img width="40" src="/assets/images/yt.png" alt="youtube" />
            <img width="40" src="/assets/images/2023_Facebook_icon.svg.png" alt="facebook" />
          </div>
        </div>

        <div className="flex flex-wrap gap-8">
          <div className="min-w-[250px] flex-1">
            <h3 className="text-lg font-bold uppercase mb-4">GIỚI THIỆU</h3>
            <div className="text-sm mb-2 leading-relaxed">
              160STORE - Chuỗi Phân Phối Thời Trang Nam Chuẩn Hiệu
            </div>
            <div className="flex items-start text-sm mb-1"><FaPhone className="mr-2 mt-1" /> 02871006789</div>
            <div className="flex items-start text-sm mb-1"><FaEnvelope className="mr-2 mt-1" /> cs@160store.com</div>
            <div className="flex items-start text-sm mb-1"><FaClock className="mr-2 mt-1" /> Giờ mở cửa : 08:30 - 22:00</div>
            <div className="flex items-start text-sm mb-3"><FaHeadphones className="mr-2 mt-1" /> Nhân viên tư vấn phản hồi tin nhắn đến 24:00 (Mỗi ngày)</div>
            <div className="mt-4">
              <img width="120" src="/assets/images/vertify.webp" alt="cert1" className="mb-2" />
              <img src="https://images.dmca.com/Badges/dmca_protected_16_120.png?ID=9049de26-d97b-48dc-ab97-1e5fcb221fba" alt="DMCA" className="max-w-[150px]" />
            </div>
          </div>

          {/* Policies */}
          <div className="min-w-[250px] flex-1">
            <h3 className="text-lg font-bold uppercase mb-4">CHÍNH SÁCH</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Hướng dẫn đặt hàng</a></li>
              <li className="flex items-center justify-between">
                <a href="#" className="hover:underline">Chính sách</a>
                <button><FaChevronDown /></button>
              </li>
            </ul>
          </div>

          {/* Store Locations */}
          <div className="min-w-[250px] flex-1">
            <h3 className="text-lg font-bold uppercase mb-4">ĐỊA CHỈ CỬA HÀNG (22 CH)</h3>
            {[
              {
                city: "HỒ CHÍ MINH (10 CH)",
                address: "297/3 Tô Hiến Thành, Phường 13, Quận 10, TP Hồ Chí Minh"
              },
              {
                city: "HÀ NỘI (2 CH)",
                address: "Số 26 phố Lê Đại Hành, Phường Lê Đại Hành, Quận Hai Bà Trưng, TP Hà Nội"
              },
              {
                city: "CẦN THƠ (2 CH)",
                address: "Số 35 Trần Phú, Phường Cái Khế, Quận Ninh Kiều, TP Cần Thơ, Cần Thơ"
              },
              {
                city: "ĐÀ NẴNG (2 CH)",
                address: "332 Đ. Lê Duẩn, Tân Chính, Thanh Khê, Đà Nẵng",
                new: true
              }
            ].map((item, index) => (
              <div className="mb-4 text-sm" key={index}>
                <div className="font-bold flex items-center">
                  <img className="w-4 h-4 mr-2" src="https://theme.hstatic.net/1000253775/1001315144/14/location.svg?v=2041" alt="location" />
                  {item.city}
                  {item.new && <span className="text-xs text-red-500 ml-2">New</span>}
                </div>
                <div className="ml-6">{item.address}</div>
              </div>
            ))}
            <a href="#" className="block mt-2 text-sm font-bold uppercase">XEM TẤT CẢ CỬA HÀNG</a>
          </div>

          {/* Payment Methods */}
          <div className="min-w-[250px] flex-1">
            <h3 className="text-lg font-bold uppercase mb-4">PHƯƠNG THỨC THANH TOÁN</h3>
            <div className="flex gap-2">
              <img width="50" src="/assets/images/spay.webp" alt="spay" />
              <img width="50" src="/assets/images/vnpay.webp" alt="vnpay" />
              <img width="50" src="/assets/images/cod.webp" alt="cod" />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm">
          BẢN QUYỀN THUỘC VỀ 160STORE
        </div>
      </div>
    </footer>
  );
}