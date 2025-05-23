import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import './globals.css';

const vouchers = [
  {
    code: 'MAY10',
    title: 'GIẢM 10%',
    description: 'giảm 10% (tối đa 10K)',
    expiry: '31/05/2025',
  },
  {
    code: 'MAY10',
    title: 'GIẢM 10%',
    description: 'giảm 10% (tối đa 10K)',
    expiry: '31/05/2025',
  },
  {
    code: 'MAY10',
    title: 'GIẢM 10%',
    description: 'giảm 10% (tối đa 10K)',
    expiry: '31/05/2025',
  },
  {
    code: 'MAY10',
    title: 'GIẢM 10%',
    description: 'giảm 10% (tối đa 10K)',
    expiry: '31/05/2025',
  },
];

const Home = () => {
  return (
    <div>
      <div className="container mx-auto mt-40 max-w-[1200px] px-4">
        {/* Banner */}
        <div className="flex justify-center max-w-[1190px] mx-auto">
          <img
            src="../assets/images/new_banner_pc.webp"
            alt="Banner"
            className="w-full object-cover max-h-[400px] sm:max-h-[300px] rounded-lg"
          />
        </div>

        {/* Voucher Section */}
<div className="my-4">
  <h2 className="border-l-4 border-black pl-2 my-2 text-xl font-semibold sm:text-lg">
    ƯU ĐÃI DÀNH CHO BẠN
  </h2>

  {/* Scroll ngang */}
  <div className="overflow-x-auto">
    <div className="flex gap-4 w-max pb-2">
      {vouchers.map((voucher, index) => (
        <div
          key={index}
          className="flex-shrink-0 w-[280px] h-[110px] p-2 border-l-[10px] border-[#FCBF49] rounded-md shadow-md bg-white flex"
        >
          <div className="flex items-center justify-center w-[70px] font-bold text-sm">
            {voucher.code}
          </div>
          <div className="text-xs border-l border-dashed border-black pl-2 relative w-full">
            <div className="py-1 pr-2">
              <h3 className="font-semibold">{voucher.title}</h3>
              <p className="text-xs">{voucher.description}</p> <br />
              <p className="mt-1">
                Mã: <span className="font-semibold">{voucher.code}</span>
              </p>
              <p>HSD: {voucher.expiry}</p>
            </div>
            <button className="absolute right-2 bottom-2 bg-black text-white px-2 py-0.5 rounded-full text-xs">
              Sao chép mã
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

        {/* Product Sections */}
        {[
          { banner: '../assets/images/yptvddzi.jpg', products: Array(5).fill({ name: 'Quần thun 12size', price: '20000' }) },
          {
            banner: '../assets/images/z6380677082359_b0129104e7a13cb7b1bfbc38569724b8.webp',
            products: Array(5).fill({ name: 'Quần thun 12size', price: '20000' }),
          },
          {
            banner: '../assets/images/banchay_a01333a0db53411883d51490d22b7eab.webp',
            products: Array(5).fill({ name: 'Quần thun 12size', price: '20000' }),
          },
        ].map((section, index) => (
          <div key={index} className="my-4">
            <div>
              <img src={section.banner} alt="Section Banner" className="w-full object-cover rounded-lg" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 my-2">
              {section.products.map((product, i) => (
                <div key={i} className="bg-slate-100 p-2 rounded-lg cursor-pointer">
                  <div className="relative group overflow-hidden">
                    <img src="../assets/images/zzz.webp" alt="product" className="w-full" />
                    <img
                      src="../assets/images/zz.webp"
                      alt="product"
                      className="w-full absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity">
                      <FontAwesomeIcon icon={faSearch} className="text-white w-4" />
                    </div>
                    <a
                      href="#"
                      className="absolute right-2 bottom-2 bg-black w-7 h-7 rounded-full flex justify-center items-center text-white text-sm hover:bg-white hover:text-black"
                    >
                      <FontAwesomeIcon icon={faCartShopping} />
                    </a>
                  </div>
                  <div className="px-1 mt-2 ">
                    <p className="text-sm">{product.name}</p>
                    <strong className="text-sm">{product.price}</strong>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center my-3">
              <button className="rounded-lg bg-black border-2 border-black text-white h-10 px-5 hover:bg-white hover:text-black text-sm sm:text-base">
                Xem tất cả
              </button>
            </div>
          </div>
        ))}

        {/* Collection Section */}
        <div className="my-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['Áo thun', 'Áo khoác'].map((title, index) => (
              <div key={index} className="bg-white rounded-[10px] shadow-md p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="uppercase border-l-[3px] border-black pl-3 text-lg sm:text-xl">{title}</h3>
                  <button className="text-white bg-black w-[100px] h-[30px] rounded-[8px] hover:bg-white hover:text-black border hover:border-black transition-all duration-500 text-sm">
                    Xem tất cả
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="w-full">
                      <div className="relative group overflow-hidden">
                        <img src="../assets/images/zzz.webp" alt="product" className="w-full" />
                        <img
                          src="../assets/images/zz.webp"
                          alt="product"
                          className="w-full absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity">
                          <FontAwesomeIcon icon={faSearch} className="text-white w-4" />
                        </div>
                        <a
                          href="#"
                          className="absolute right-2 bottom-2 bg-black w-7 h-7 rounded-full flex justify-center items-center text-white text-sm hover:bg-white hover:text-black"
                        >
                          <FontAwesomeIcon icon={faCartShopping} />
                        </a>
                      </div>
                      <div className="mt-2 px-1">
                        <a href="#" className="block font-medium text-sm">Quần Short Nam</a>
                        <p className="text-black font-semibold text-sm">229,000đ</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Combo Mix & Match */}
        <div className="comboMix py-6">
          <h2 className="text-xl font-semibold mb-4 uppercase sm:text-lg">COMBO MIX & MATCH ĐÚNG CHUẨN</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[
              '../assets/images/1_665c172c1740432982d9a4383f373ad8.webp',
              '../assets/images/5_0004f250fc584bc3bc246fa5e3c9356b.webp',
              '../assets/images/3.webp',
              '../assets/images/4.webp',
            ].map((src, index) => (
              <div key={index} className="w-full">
                <img src={src} alt="Combo" className="w-full h-full object-cover rounded-lg" />
              </div>
            ))}
          </div>
          <div className="flex justify-center my-4">
            <button className="w-[100px] h-[35px] border rounded-lg bg-white text-black hover:bg-black hover:text-white transition-colors duration-500 cursor-pointer text-sm">
              Xem tất cả
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;