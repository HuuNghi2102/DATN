'use client'
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCartShopping, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slick';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
const ProductPageDetail = () => {
  const [selectedSize, setSelectedSize] = useState('S');
  const [selectedColor, setSelectedColor] = useState('white');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    '/assets/images/zzz.webp',
    '/assets/images/zz.webp',
    '/assets/images/zzz.webp',
    '/assets/images/zz.webp',
    '/assets/images/zzz.webp',
  ];
  
  const sizes = ['S', 'M', 'L', 'XL'];
  const colors = [
    { name: 'white', color: 'bg-white border-gray-300' },
    { name: 'black', color: 'bg-black' }
  ];

  const promoOffers = [
    { code: 'MAY10', discount: '10%', minOrder: '199K' },
    { code: 'MAY30', discount: '30K', minOrder: '599K' },
    { code: 'MAY70', discount: '70K', minOrder: '899K' },
    { code: 'MAY100', discount: '100K', minOrder: '1199K' }
  ];
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

    return (
        
        <div className="min-h-screen bg-gray-50 mt-40">
            
        {/* Header */}
        <div className="bg-white shadow-sm py-4 pl-10">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>Trang chủ</span>
                    <i className="fas fa-chevron-right text-xs"></i>
                    <span>Áo</span>
                    <i className="fas fa-chevron-right text-xs"></i>
                    <span className="text-gray-900">Áo Thun Nam ICONDENIM Double Stripes ICDN</span>
                </div>
            </div>
        </div>

        <div className="max-w-7xl mx-auto p-4 lg:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
            <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-lg overflow-hidden shadow-sm">
              <img 
                src={images[currentImageIndex]} 
                alt="Product"
                className="w-full h-96 lg:h-[500px] object-cover"
              />
            </div>
            
            {/* Thumbnail Images */}
            <div className="flex space-x-2 overflow-x-auto">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden border-2 ${
                    currentImageIndex === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            </div>

          {/* Product Info */}
            <div className="space-y-6">
            <div>
                <h1 className="text-xl lg:text-xl font-bold text-gray-900 mb-2">
                    Áo Thun Nam ICONDENIM Double Stripes ICDN
                </h1>
                <div className=" bg-green-500 text-white w-20 px-2 py-1 rounded text-xs font-medium">
                    Còn Hàng
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                    <span>Loại: <strong className="font-semibold">Áo Thun</strong></span>
                    <span>MSP: <strong className="font-semibold">ATI00560-01</strong></span>
                </div>
                <div className="text-2xl font-bold text-black mb-4">299,000đ</div>
            </div>

            {/* Promotions */}
            <div className=" relative border-2 border-black border-dashed rounded-lg p-4 ">
                <div className="flex items-center absolute top-[-14px] font-semibold bg-white mb-3">
                    <i className="fas fa-gift mr-2"></i>
                    <img src="https://file.hstatic.net/1000253775/file/gift_new-removebg-preview_fce03d3cd9d24d0cb0be33ac068e41fc.png" alt="" width={22} height={22} />KHUYẾN MÃI - ƯU ĐÃI
                </div>
                <div className="space-y-2 text-sm">
                    {promoOffers.map((offer, index) => (
                        <div key={index} className="flex items-center">
                            <i className="fas fa-tag text-orange-500 mr-2"></i>
                            <span>Nhập mã <strong>{offer.code}</strong> GIẢM {offer.discount} ĐƠN TỪ {offer.minOrder}</span>
                        </div>
                    ))}
                    <div className="flex items-center">
                        <i className="fas fa-shipping-fast text-orange-500 mr-2"></i>
                        <span><strong>FREESHIP</strong> đơn từ 250K</span>
                    </div>
                </div>
            </div>

            {/* Promo Codes */}
            <div>
                <p className="text-sm text-gray-600 mb-3">Mã giảm giá bạn có thể sử dụng:</p>
                <div className="flex flex-wrap gap-2">
                {promoOffers.map((offer, index) => (
                    <button
                    key={index}
                    className="bg-black text-white px-3 py-1 rounded text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                    {offer.code}
                    </button>
                ))}
            </div>
            </div>

            {/* Color Selection */}
            <div>
                <div className="flex items-center mb-3">
                    <span className="text-sm font-medium mr-2">Màu sắc:</span>
                    <span className="text-sm text-gray-600 capitalize">{selectedColor === 'white' ? 'Trắng' : 'Đen'}</span>
                </div>
                <div className="flex space-x-2">
                    {colors.map((colorOption) => (
                    <button
                        key={colorOption.name}
                        onClick={() => setSelectedColor(colorOption.name)}
                        className={`w-8 h-8 rounded-full border-2 ${colorOption.color} ${
                        selectedColor === colorOption.name ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                        }`}
                    />
                    ))}
                </div>
            </div>

            {/* Size Selection */}
            <div>
                <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Kích thước: S</span>
                <button className="text-sm text-blue-600 hover:underline">
                    <i className="fas fa-ruler mr-1"></i>
                    Hướng dẫn chọn size
                </button>
                </div>
                <div className="flex space-x-2">
                {sizes.map((size) => (
                    <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 border rounded text-sm font-medium ${
                        selectedSize === size
                        ? 'border-red-500 bg-red-50 text-red-600'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    >
                    {size}
                    </button>
                    ))}
                </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center border rounded">
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-2 hover:bg-gray-100"> -
                    </button>
                    <span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-2 hover:bg-gray-100" >
                        +
                    </button>
                    </div>
                    <button
  onClick={() => toast.success('Đã thêm sản phẩm vào giỏ hàng!')}
  className="flex-1 bg-black text-white py-3 px-6 rounded font-medium hover:bg-gray-800 transition-colors"
>
  THÊM VÀO GIỎ
</button>

                   <button
  onClick={() => toast.success('Bạn đã chọn MUA NGAY!')}
  className=" bg-white border-2 border-black text-black py-3 px-6 rounded font-medium hover:bg-gray-50 transition-colors"
>
  MUA NGAY
</button>

                </div>

            </div>

            {/* Store Info */}
            <div className="text-sm text-gray-600">
                <div className="flex items-center">
                    <i className="fas fa-store mr-2"></i>
                    <span>Có 13 cửa hàng còn sản phẩm này</span>
                    <button className="ml-2 text-blue-600 hover:underline">+</button>
                </div>
            </div>
                    {/* Service Features - Mobile Only */}
        <div className="mt-8 lg:hidden">
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg text-center">
                    <img className='ml-[44%]'  src="https://file.hstatic.net/1000253775/file/z4635451118875_c98fff6e965c4957a2beef70df6df0f8_afcea78391a640c9bcef22ce88aca7d6.jpg" alt="" width={25} height={25} />
                    <p className="text-xs text-gray-600">Đổi trả tận nhà trong vòng 15 ngày</p>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                <img className='ml-[44%]'  src="https://file.hstatic.net/1000253775/file/z4635451151763_13f64ed25050f361cfb0a70fda62b2c2_efbb28df6328412b9200cd92a795396e.jpg" alt="" width={35} height={35} />
                <p className="text-xs text-gray-600"> Miễn phí vận chuyển đơn từ 250K</p>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                <img className='ml-[44%]'  src="https://file.hstatic.net/1000253775/file/z4635451129757_228e4824d8a593038b9f20d5e53d4d08_7e46b4c108bc481e8c2351f909bdcba4.jpg" alt="" height={35} width={35} />
                <p className="text-xs text-gray-600"> Bảo hành trong vòng 30 ngày</p>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                    <img className='ml-[44%]'  src="https://file.hstatic.net/1000253775/file/z4635451140541_2b09e178f1b8b4763b266875fd2c8db6_8b536c9ae5e24c17961fdb906d3f5022.jpg" alt="" width={35} height={35} />
                    <p className="text-xs text-gray-600">Hotline 0287100-6789 hỗ trợ từ 8h30-24h</p>
                </div>
            </div>
        </div>

        {/* Service Features - Desktop/Tablet */}
        <div className="hidden lg:block mt-12">
            <div className="grid grid-cols-3">
                <div className="bg-white p-6  rounded-lg text-center shadow-sm">
                    <img className='ml-14' src="https://file.hstatic.net/1000253775/file/z4635451118875_c98fff6e965c4957a2beef70df6df0f8_afcea78391a640c9bcef22ce88aca7d6.jpg" alt="" width={35} height={35} />
                    <p className="text-xs text-gray-600">Đổi trả tận nhà trong vòng 15 ngày</p>
            </div>
            <div className="bg-white p-6 rounded-lg text-center shadow-sm">
                <img className='ml-14'  src="https://file.hstatic.net/1000253775/file/z4635451151763_13f64ed25050f361cfb0a70fda62b2c2_efbb28df6328412b9200cd92a795396e.jpg" alt="" width={35} height={35} />
                <p className="text-xs text-gray-600"> Miễn phí vận chuyển đơn từ 250K</p>
            </div>
            <div className="bg-white p-6 rounded-lg text-center shadow-sm">
                <img className='ml-14'  src="https://file.hstatic.net/1000253775/file/z4635451129757_228e4824d8a593038b9f20d5e53d4d08_7e46b4c108bc481e8c2351f909bdcba4.jpg" alt="" height={35} width={35} />
                <p className="text-xs text-gray-600"> Bảo hành trong vòng 30 ngày</p>
            </div>
            </div>
            <div className="grid grid-cols-3">
                <div className="bg-white p-6 rounded-lg text-center shadow-sm">
                    <img className='ml-14'  src="https://file.hstatic.net/1000253775/file/z4635451140541_2b09e178f1b8b4763b266875fd2c8db6_8b536c9ae5e24c17961fdb906d3f5022.jpg" alt="" width={35} height={35} />
                    <p className="text-xs text-gray-600">Hotline 0287100-6789 hỗ trợ từ 8h30-24h</p>
                </div>
            <div className="bg-white p-6 rounded-lg text-center shadow-sm">
                <img className='ml-14'  src="https://file.hstatic.net/1000253775/file/z4635451129712_78e0e70db6fffe43fbb9a3e680cb3ed0_a2b8379adf4843a4898c621b37c2b42a.jpg" alt="" width={35} height={35} />
                <p className="text-xs text-gray-600">Giao hàng toàn quốc</p>
            </div>
            <div className="bg-white p-6 rounded-lg text-center shadow-sm">
                <img className='ml-14'  src="https://file.hstatic.net/1000253775/file/z4635451151761_2fe8731e9d20060a54130996be16cd2e_e8e090599dd9467abdd66feb9ba3474f.jpg" alt="" height={35} width={35} />
                <p className="text-xs text-gray-600">Có cộng đồn ưu đãi KHTT</p>
            </div>
            </div>
        </div>
            </div>
        </div>
        {/* Product Description Tabs */}
        <div className="mt-12 bg-white rounded-lg shadow-sm">
            <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6" aria-label="Tabs">
                <button className="border-b-2 border-blue-500 py-4 px-1 text-sm font-medium text-blue-600">
                    MÔ TẢ
                </button>
                <button className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                    CHÍNH SÁCH GIAO HÀNG
                </button>
                <button className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                    CHÍNH SÁCH ĐỔI HÀNG
                </button>
                </nav>
            </div>
            <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                160STORE - Áo Thun Nam ICONDENIM Double Stripes ICDN
                </h2>
                
                <div className="space-y-6 text-gray-700">
                <div>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                        <li><strong>Chất liệu:</strong> Cotton</li>
                        <li><strong>Form:</strong> Boxy</li>
                    </ul><br />
                    <hr />
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-3">▶️CHẤT LIỆU COTTON</h3>
                    <p className="text-sm leading-relaxed mb-4">
                    Vải cotton mềm mại, thoáng khí và khả năng thấm hút mồ hôi tốt, giúp da luôn khô thoáng và dễ chịu. Nhờ cấu trúc sợi bông đặt chất, vải cotton có độ bền cao, hạn chế co rút sau nhiều lần giặt.
                    </p>
                    <p className="text-sm leading-relaxed mb-4">
                     Đồng thời, chất liệu này có khả năng co giãn nhẹ, mang lại sự thoải mái khi vận động.
                    </p>
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-3">▶️THIẾT KẾ CÁ TÍNH</h3>
                    <p className="text-sm leading-relaxed mb-4">
                    Áo nổi bật với 2 đường sọc tương phản màu áo chạy dài từ có đến vai giúp tạo hiệu ứng cho phần vai trông rộng và cân đối hơn. Logo in nổi ở giữa ngực mang đến sự tính tế và cá tính, tạo điểm nhấn cho tổng thể thiết kế, đặc biệt phù hợp nhiều phong cách khác nhau từ casual đến streetwear.
                    </p>
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-3">▶️FORM BOXY</h3>
                    <p className="text-sm leading-relaxed mb-4">
                    Form dáng mới nhất tại 160STORE với đường cắt thoáng và phần vai hơi xuôi, tạo nên vẻ ngoài phóng khoáng, hiện đại. Nhờ thiết kế rộng vừa phải, form này giúp che khuyết điểm tốt, phù hợp với nhiều dáng người và vẫn đảm bảo sự thoải mái khi vận động.
                    </p>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                    <i className="fas fa-tag mr-2"></i>
                    <span>🔍ATI00560</span>
                </div>
                </div>
            </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
                SẢN PHẨM LIÊN QUAN
                <div className="w-16 h-0.5 bg-gray-400 mx-auto mt-2"></div>
            </h2>
        {/* Product Sections */}
        {[
            {
                products: Array(5).fill({ name: 'Quần thun co giãn ICM LOTTEPark', price: '123123' })
            },
        ].map((section, index) => (
            <div key={index} className="my-4">

                {/* Slider thay cho grid */}
                <Slider {...productSettings} className="my-4">
                {section.products.map((product, i) => (
                    <div key={i} className="p-2">
                        <div className="bg-white p-2 rounded-lg cursor-pointer">
                            <div className="relative group overflow-hidden">
                                <a href="#" className="relative">
                                    <img src="../assets/images/zzz.webp" alt="product" className="w-full" />
                                    <img
                                    src="../assets/images/zz.webp"
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
                                <p className="text-sm">{product.name}</p>
                                <strong className="text-sm">{product.price}</strong>
                            </div>
                        </div>
                    </div>
                ))}
                </Slider>
            </div>
        ))}
        </div>
    </div>
    <ToastContainer position="top-right" autoClose={2000} />
    </div>
);
};

export default ProductPageDetail;