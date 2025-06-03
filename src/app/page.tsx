'use client';
import React,{useState,useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCartShopping, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import productsBestSalerInterface from './compoments/productsBestSalerInterface';
import productsNewInterface from "./compoments/productsNewInterface";
import {productsCateInterface} from "./compoments/productsCateInterface";
import productsSalerInterface from './compoments/productsSalerInterface';

// import { ProducSalerImage } from './compoments/productsSalerInterface';
// import { ProducNewtImage } from './compoments/productsNewInterface';
import Slider from 'react-slick';
import './globals.css';
const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <div
    className="absolute top-1/2 text-white text-4xl left-4 z-10 -translate-y-1/2 cursor-pointer  p-2 rounded-full "
    onClick={onClick}
  >
    <FontAwesomeIcon icon={faChevronLeft} />
  </div>
);

const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <div
    className="absolute top-1/2 text-white text-4xl right-4 z-10 -translate-y-1/2 cursor-pointer  p-2 rounded-full "
    onClick={onClick}
  >
    <FontAwesomeIcon icon={faChevronRight} />
  </div>
);
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
  const settings = {
    dots: true,
    infinite: true,
    autoplaySpeed: 3000,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
const productSettings = {
  slidesToShow: 5,
  slidesToScroll: 2,
  autoplay: true,
  autoplaySpeed: 2000,
  speed: 500,
  dots: true,
  infinite: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    { breakpoint: 1280, settings: { slidesToShow: 4 } },
    { breakpoint: 768, settings: { slidesToShow: 3 } },
    { breakpoint: 480, settings: { slidesToShow: 2 } },
  ],
};
const [productsBestSaler, setProductsBestSaler] = useState<productsBestSalerInterface[]>([]);
const [productsNew, setProductsNew] =useState<productsNewInterface[]>([]);
const [productsSaler, setProductsSaler] =useState<productsNewInterface[]>([]);
const [productsCate, setproductsCate ] = useState<productsCateInterface[]>([]);
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await fetch('http://huunghi.id.vn/api/product/getBestSalerProducts');
      const result = await res.json();
      setProductsBestSaler(result.data.productBestSeller);
    } catch (error) {
      console.log(error);
    }
  };
  fetchProducts();
},[])
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await fetch('https://huunghi.id.vn/api/categoryProduct/getCateAndProducts');
      const result = await res.json();
      setproductsCate(result.data.cateAndProducts);
    } catch (error) {
      console.log(error);
    }
  };
  fetchProducts();
},[])
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await fetch('http://huunghi.id.vn/api/product/getProductNews');
      const result = await res.json();
      setProductsNew(result.data.productNews);
      console.log(setProductsNew);
      
    } catch (error) {
      console.log(error);
    }
  };
  fetchProducts();
},[])
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await fetch('https://huunghi.id.vn/api/product/getProductSales');
      const result = await res.json();
      setProductsSaler(result.data.productSales);
      
    } catch (error) {
      console.log(error);
    }
  };
  fetchProducts();
},[])
  return (
    <div>
      <div className="container  mx-auto mt-40 max-w-[1200px]">
        {/* Banner */}
        <div className="container mx-auto mt-40 max-w-[1200px] relative">
      <Slider {...settings}>
        {[
          "/assets/images/banner1.png",
          "/assets/images/banner2.png",
          "/assets/images/banner3.png",
        ].map((src, index) => (
          <div key={index}>
            <img
              src={src}
              alt={`Banner ${index + 1}`}
              className="w-full object-cover max-h-[400px] sm:max-h-[465px] rounded-lg"
            />
          </div>
        ))}
      </Slider>
        </div>
        {/* Voucher Section */}
        <div className="my-4">
          <h2 className="border-l-4 border-black pl-2 my-2 text-xl font-semibold sm:text-lg">
            ƯU ĐÃI DÀNH CHO BẠN
          </h2>
        {/* Scroll ngang */}
          <div className="overflow-x-auto">
          <div className="flex gap-6  pb-2">
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
            <div className="my-4">
              {/* BestSalerProducts */}
              <div>
                <img src="../assets/images/yptvddzi.jpg" alt="Best Seller" className="w-full object-cover rounded-lg" />
                <Slider {...productSettings} className="my-4">
                  {productsBestSaler.map((product, i) => (
                    <div key={i} className="p-2">
                      <div className="bg-white p-2 rounded-lg cursor-pointer">
                      <div className="relative group overflow-hidden">
                        <a href="#" className="relative">
                          <img src={`https://huunghi.id.vn/storage/products/${product.images[0]?.link_anh}`}  alt="aa" className="w-full" />
                          <img
                            src={`https://huunghi.id.vn/storage/products/${product.images[1]?.link_anh}`} 
                            alt="product"
                            className="w-full absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          />
                        </a>
                        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          <FontAwesomeIcon icon={faSearch} className="text-white w-4 pointer-events-auto" />
                        </div>
                        <a
                          href={`/product/${product.duong_dan}`}
                          className="absolute right-2 bottom-2 bg-black w-7 h-7 rounded-full flex justify-center items-center text-white text-sm hover:bg-white hover:text-black"
                        >
                          <FontAwesomeIcon icon={faCartShopping} />
                        </a>
                      </div>
                      <div className="px-1 mt-2">
                        <p className="text-sm">{product.ten_san_pham}</p>
                        <strong className="text-sm">{product.gia_da_giam.toLocaleString('vi-VN') + ' VNĐ'}</strong>
                      </div>
                    </div>
                    </div>
                  ))}
                </Slider>
                <div className="flex justify-center my-5">
                  <button className="rounded-lg bg-black text-white h-10 px-5 hover:bg-white hover:text-black text-sm sm:text-base">
                    Xem tất cả
                  </button>
                </div>
              </div>
              {/* NewProducts */}
              <div>
                <img src="/assets/images/z6380677082359_b0129104e7a13cb7b1bfbc38569724b8.webp" alt="Best Seller" className="w-full object-cover rounded-lg" />
                <Slider {...productSettings} className="my-4">
                  {productsNew.map((product, i) => (
                    <div key={i} className="p-2">
                      <div className="bg-white p-2 rounded-lg cursor-pointer">
                      <div className="relative group overflow-hidden">
                        <a href={`/product/${product.duong_dan}`} className="relative">
                          <img src={`https://huunghi.id.vn/storage/products/${product.images[0]?.link_anh}`}  alt="aa" className="w-full" />
                          <img
                            src={`https://huunghi.id.vn/storage/products/${product.images[1]?.link_anh}`} 
                            alt="product"
                            className="w-full absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          />
                        </a>
                        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          <FontAwesomeIcon icon={faSearch} className="text-white w-4 pointer-events-auto" />
                        </div>
                        <a
                          href="#"
                          className="absolute right-2 bottom-2 bg-black w-7 h-7 rounded-full flex justify-center items-center text-white text-sm hover:bg-white hover:text-black"
                        >
                          <FontAwesomeIcon icon={faCartShopping} />
                        </a>
                      </div>
                      <div className="px-1 mt-2">
                        <p className="text-sm">{product.ten_san_pham}</p>
                        <strong className="text-sm">{product.gia_da_giam.toLocaleString('vi-VN') + ' VNĐ'}</strong>
                      </div>
                    </div>
                    </div>
                  ))}
                </Slider>
                <div className="flex justify-center my-5">
                  <button className="rounded-lg bg-black text-white h-10 px-5 hover:bg-white hover:text-black text-sm sm:text-base">
                    Xem tất cả
                  </button>
                </div>
              </div>
              {/* ProductSaler */}
              <div>
                <img src="/assets/images/banchay_a01333a0db53411883d51490d22b7eab.webp" alt="Best Seller" className="w-full object-cover rounded-lg" />
                <Slider {...productSettings} className="my-4">
                  {productsSaler.map((product, i) => (
                    <div key={i} className="p-2">
                      <div className="bg-white p-2 rounded-lg cursor-pointer">
                      <div className="relative group overflow-hidden">
                        <a href="#" className="relative">
                          <img src={`https://huunghi.id.vn/storage/products/${product.images[0]?.link_anh}`} alt="aa" className="w-full" />
                          <img
                            src={`https://huunghi.id.vn/storage/products/${product.images[1]?.link_anh}`}
                            alt="product"
                            className="w-full absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          />
                        </a>
                        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          <FontAwesomeIcon icon={faSearch} className="text-white w-4 pointer-events-auto" />
                        </div>
                        <a
                          href="#"
                          className="absolute right-2 bottom-2 bg-black w-7 h-7 rounded-full flex justify-center items-center text-white text-sm hover:bg-white hover:text-black"
                        >
                          <FontAwesomeIcon icon={faCartShopping} />
                        </a>
                      </div>
                      <div className="px-1 mt-2">
                        <p className="text-sm">{product.ten_san_pham}</p>
                        <strong className="text-sm">{product.gia_da_giam.toLocaleString('vi-VN') + ' VNĐ'}</strong>
                      </div>
                    </div>
                    </div>
                  ))}
                </Slider>
                <div className="flex justify-center my-5">
                  <button className="rounded-lg bg-black text-white h-10 px-5 hover:bg-white hover:text-black text-sm sm:text-base">
                    Xem tất cả
                  </button>
                </div>
              </div>
            </div>
        {/* Collection Section */}
        <div className="my-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {productsCate.map((category, index) => (
              category.products.length > 0 && (
                <div key={index} className="bg-white rounded-[10px] shadow-md p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="uppercase border-l-[3px] border-black pl-3 text-lg sm:text-xl">{category.ten_loai}</h3>
                  <button className="text-white bg-black w-[100px] h-[30px] rounded-[8px] hover:bg-white hover:text-black border hover:border-black transition-all duration-500 text-sm">
                    Xem tất cả
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {category.products.map((product, i) => (
                    i < 3 && (
                      <div key={i} className="w-full">
                      <div className="relative group overflow-hidden">
                        <img src={`https://huunghi.id.vn/storage/products/${product.images[0]?.link_anh}`} alt="product" className="w-full" />
                        <img
                          src={`https://huunghi.id.vn/storage/products/${product.images[1]?.link_anh}`}
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
                        <a href="#" className="block font-medium text-sm">{product.ten_san_pham}</a>
                        <p className="text-black font-semibold text-sm">{product.gia_da_giam.toLocaleString('vi-VN')+` VNĐ`}</p>
                      </div>
                    </div>
                    )
                  ))}
                </div>
              </div>
              )
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