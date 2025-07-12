'use client'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartItem } from '../../compoments/CartItem';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCartShopping, faChevronLeft, faChevronRight, faHeart } from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slick';
import productDetailInterface from "../../compoments/productDetailInterface";
import { useCart } from '@/app/(user)/context/CartContext';
import voucherInterface from '@/app/(user)/compoments/vouchersInterface';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// import { debounce } from 'lodash';
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
const addWhistList = async (name: string, image: string, price: number, slug: string, idPro: number) => {

    const newObj: any = {}
    newObj.ten_san_pham = name;
    newObj.anh_san_pham = image;
    newObj.gia_san_pham = price;
    newObj.duong_dan = slug;
    newObj.id_san_pham = idPro;


    const user = localStorage.getItem('user');
    const accessToken = localStorage.getItem('accessToken');
    const typeToken = localStorage.getItem('typeToken');
    const whistList = localStorage.getItem('whislist');
    if (user && accessToken && typeToken) {
        console.log('accessToken:', JSON.parse(accessToken));
        console.log('typeToken:', JSON.parse(typeToken));
        const resAddWhisList = await fetch(`https://huunghi.id.vn/api/whislist/addWhislist`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${JSON.parse(typeToken)} ${JSON.parse(accessToken)}`
            },
            body: JSON.stringify({
                name: name,
                image: image,
                price: price,
                slug: slug,
                idPro: idPro
            })
        })
        if (resAddWhisList.ok) {
            const result = await resAddWhisList.json();
            console.log(result)
            toast.success('Thêm sản phẩm vào danh sách thành công');
        } else {
            toast.error('Thêm sản phẩm vào danh sách thất bại');
        }
    } else {
        if (whistList) {
            const parseWhisList = JSON.parse(whistList);

            let flag: boolean = true;

            parseWhisList.forEach((e: any, i: number) => {
                if (e.id_san_pham == idPro) {
                    flag = false;
                }
            })

            if (flag == true) {
                parseWhisList.unshift(newObj);
            }

            localStorage.setItem('whislist', JSON.stringify(parseWhisList));
        } else {
            localStorage.setItem('whislist', JSON.stringify([newObj]));
        }
        alert('Thêm sản phẩm vào danh sách thành công');
    }
}
const ProductPageDetail = () => {
    const [selectedSize, setSelectedSize] = useState<any>();
    const [selectedColor, setSelectedColor] = useState<any>();
    const [quantity, setQuantity] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState('');
    const [productVariant, setProductVariant] = useState<any>(null);
    const [sizes, setSizes] = useState<any[] | []>([]);
    const [colors, setColors] = useState<any[]>([]);
    const [product, setProduct] = useState<any>(null);
    const [images, setImages] = useState<any[]>([]);
    const [productRelateds, setProductRelateds] = useState<any[]>([]);
    const [voucher, setVoucher] = useState<voucherInterface[]>([]);
    const [isCart, setIsCart] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [cartItem, setCartItem] = useState({
        ten_san_pham: product?.ten_san_pham,
        anh_san_pham: product?.anh_san_pham,
        gia_san_pham: product?.gia_da_giam,
        mau_san_pham: selectedColor?.ten_mau,
        kich_thuoc_san_pham: selectedSize?.ten_kich_thuoc,
        so_luong_san_pham: quantity,
        duong_dan: product?.duong_dan,
        id_san_pham_bien_the: productVariant?.id_san_pham_bien_the,
    })

    const router = useRouter();
    const params = useParams();
    const { slug } = params;
    useEffect(() => {

    }, [])

    useEffect(() => {
        if (!slug) return;
        const fetchProduct = async () => {
            const accessTokenLocal = localStorage.getItem('accessToken');
            const typeTokenLocal = localStorage.getItem('typeToken');
            const user = localStorage.getItem('user');
            try {
                let res;
                if (accessTokenLocal && typeTokenLocal && user) {
                    res = await fetch(`https://huunghi.id.vn/api/product/pageDetailProduct/${slug}`, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `${JSON.parse(typeTokenLocal)} ${JSON.parse(accessTokenLocal)}`
                        }
                    });
                } else {
                    res = await fetch(`https://huunghi.id.vn/api/product/pageDetailProduct/${slug}`);
                }
                const result = await res.json();
                if (result.status == false) {
                    return router.push('/notFound');
                }
                const arrImages = result.data.product.images;
                const getProduct = result.data.product;
                const arrSizes = result.data.sizes
                const arrColors = result.data.colors;
                setImages(arrImages);
                setProduct(getProduct);
                setColors(arrColors);
                setSizes(arrSizes);
                // set color, size , image default
                setSelectedColor(arrColors[0]);
                setSelectedSize(arrSizes[0]);
                setCurrentImageIndex(arrImages[0].link_anh);
                // get product
                const pro = result.data.product;
                // fetch relatedProduct
                const res2 = await fetch(`https://huunghi.id.vn/api/product/getTenRelatedProduct/${pro?.id_loai_san_pham}`);
                const result2 = await res2.json();
                setProductRelateds(result2.data.relatedProducts)
                const variant = await handleChangeQuantity(pro.id_san_pham, result.data.colors[0].ten_mau, result.data.sizes[0], quantity);
                //set default cartItem
                setCartItem({
                    ten_san_pham: getProduct.ten_san_pham,
                    anh_san_pham: arrImages[0].link_anh,
                    gia_san_pham: getProduct.gia_da_giam,
                    mau_san_pham: arrColors[0].ten_mau,
                    kich_thuoc_san_pham: arrSizes[0].ten_kich_thuoc,
                    so_luong_san_pham: quantity,
                    duong_dan: getProduct.duong_dan,
                    id_san_pham_bien_the: variant.id_san_pham_bien_the,
                })

                // lấy voucher mặc định của trang
                let getAPIvoucher = await fetch('https://huunghi.id.vn/api/voucher/getFourVoucher')
                let data = await getAPIvoucher.json()
                setVoucher(data.data.vouchers)
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        fetchProduct();
        // lấy voucher
        const fetchVoucher = async () => {

        }
        fetchVoucher();

    }, []);



    const handleChangeQuantity = async (idProduct: number, ten_mau: string, size: any, quantity: number) => {
        try {
            const res = await fetch(`https://huunghi.id.vn/api/productVariant/getProductBySizeAndColor/${idProduct}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nameColor: ten_mau,
                    idSize: size?.id_kich_thuoc
                })
            });
            const result = await res.json();
            const variant = result.data;
            setProductVariant(variant);
            setCartItem({
                ten_san_pham: product?.ten_san_pham,
                anh_san_pham: images[0]?.link_anh,
                gia_san_pham: product?.gia_da_giam,
                mau_san_pham: ten_mau,
                kich_thuoc_san_pham: size?.ten_kich_thuoc,
                so_luong_san_pham: quantity,
                duong_dan: product?.duong_dan,
                id_san_pham_bien_the: variant?.id_san_pham_bien_the,
            })
            return variant;

        } catch (error) {
            console.log(error);
        }
    }
    // console.log(cartItem);
    const addToCart = async (isCart: boolean) => {
        const localCart = localStorage.getItem('cart');
        let carts = []
        if (localCart) {
            carts = JSON.parse(localCart);
        }
        if (productVariant.so_luong < 1) {
            toast.error('Loại sản phẩm hiện này hiện đang hết hàng! Quý khách vui lòng quay lại sau');
            return;
        }

        const accessToken = localStorage.getItem("accessToken");
        const typeToken = localStorage.getItem("typeToken");
        const user = localStorage.getItem("user");
        if (accessToken && typeToken && user) {
            const parsetoken = JSON.parse(accessToken);
            const parsetypeToken = JSON.parse(typeToken);
            try {
                const res = await fetch("https://huunghi.id.vn/api/cart/addToCart", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `${parsetypeToken} ${parsetoken}`
                    },
                    body: JSON.stringify({
                        name: cartItem.ten_san_pham,
                        image: cartItem.anh_san_pham,
                        slug: cartItem.duong_dan,
                        size: cartItem.kich_thuoc_san_pham,
                        color: cartItem.mau_san_pham,
                        quantity: cartItem.so_luong_san_pham,
                        price: cartItem.gia_san_pham,
                        idVariant: cartItem.id_san_pham_bien_the,
                    })
                })

                if (res.ok) {
                    const result = await res.json();
                   
                } else {
                    toast.success('Thêm vào giỏ hàng thành công');
                }
            } catch (error) {
                console.log('Lỗi thêm cart => ', error);
            };
        }

        let flag: boolean = true;

        carts.forEach((cart: CartItem) => {
            if (cart.id_san_pham_bien_the == cartItem.id_san_pham_bien_the) {
                cart.so_luong_san_pham += cartItem.so_luong_san_pham;
                flag = false;
            }
        })
        console.log(flag);

        if (flag === true) {
            carts.unshift(cartItem);
        }

        localStorage.setItem('cart', JSON.stringify(carts));

        if (isCart) {
            toast('Thêm vào giỏ hàng thành công');
            router.push('/cart');
        } else {
            router.push('/pay');
        }

    }





    const productSettings = {
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
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
    if (isLoading) {
        return (
            <div
                id="loading-screen"
                className="fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-500"
            >
                <div className="flex flex-col items-center space-y-6">
                    {/* Logo hoặc icon tùy chọn */}
                    <div className="text-3xl font-semibold tracking-widest text-black uppercase">VERVESTYLE</div>

                    {/* Vòng quay */}
                    <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>

                    {/* Nội dung loading */}
                    <p className="text-sm text-gray-700 tracking-wide">Đang khởi động trải nghiệm của bạn...</p>
                </div>
            </div>
        )
    }
    return (
        <div className="min-h-screen bg-gray-50 pt-[12%]">
            {/* Header */}
            <div className="bg-white shadow-sm py-4 pl-28">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span>Trang chủ</span>
                        <i className="fas fa-chevron-right text-xs"></i>
                        <span>{product ? product.category.ten_loai : 'Đang tải...'}</span>
                        <i className="fas fa-chevron-right text-xs"></i>
                        <span className="text-gray-900">{product ? product.ten_san_pham : 'Đang tải...'} </span>
                    </div>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto py-4 lg:py-6 sm:px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Product Images */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="relative bg-white rounded-lg overflow-hidden shadow-sm">
                            <img
                                src={`https://huunghi.id.vn/storage/products/${currentImageIndex ? currentImageIndex : 'Đang tải'}`}
                                alt="Product"
                                className="w-full h-96 lg:h-[650px] object-cover"
                            />
                        </div>

                        {/* Thumbnail Images */}
                        <div className="flex space-x-2 overflow-x-auto">
                            {images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(img.link_anh)}
                                    className={`flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden border-2 ${currentImageIndex === img.link_anh ? 'border-blue-500' : 'border-gray-200'
                                        }`}
                                >
                                    <img src={`https://huunghi.id.vn/storage/products/${img.link_anh}`} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6 sticky top-0">
                        <div>
                            <h1 className="text-xl lg:text-xl font-bold text-gray-900 mb-2">
                                {product ? product.ten_san_pham : 'Đang tải...'}
                            </h1>
                            <div className=" bg-green-500 text-white w-20 px-2 py-1 mb-2 rounded text-xs font-medium">
                                Còn Hàng
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                                <span>Loại: <strong className="font-semibold">{product ? product.category.ten_loai : 'Đang tải...'}</strong></span>
                                <span>MSP: <strong className="font-semibold">ATI00{product ? product.id_san_pham : ' Đang tải...'}</strong></span>
                            </div>
                            <div className="text-2xl font-bold text-black mb-4">{product ? product.gia_da_giam.toLocaleString('vi-VN') : 'Đang tải...'}đ</div>
                        </div>

                        {/* Promotions */}
                        <div className=" relative border-2 border-black border-dashed rounded-lg p-4 ">
                            <div className="flex items-center absolute top-[-14px] font-semibold bg-white mb-3">
                                <i className="fas fa-gift mr-2"></i>
                                <img src="https://file.hstatic.net/1000253775/file/gift_new-removebg-preview_fce03d3cd9d24d0cb0be33ac068e41fc.png" alt="" width={22} height={22} />KHUYẾN MÃI - ƯU ĐÃI
                            </div>
                            <div className="space-y-2 text-sm">
                                {voucher.map((voucher, index) => (
                                    <div key={index} className="flex items-center">
                                        <i className="fas fa-tag text-orange-500 mr-2"></i>
                                        <span>Nhập mã <strong>{voucher.ma_giam_gia}</strong> GIẢM {voucher.ma_giam_gia} ĐƠN TỪ {voucher.gia_tri_don_hang.toLocaleString()+ "VNĐ"}</span>
                                    </div>
                                ))}
                                <div className="flex items-center">
                                    <i className="fas fa-shipping-fast text-orange-500 mr-2"></i>
                                    <span><strong>FREESHIP</strong> đơn từ 250K</span>
                                </div>
                            </div>
                        </div>
                        {/* Promo Codes */}
                        {/* <div>
                            <p className="text-sm text-gray-600 mb-3">Mã giảm giá bạn có thể sử dụng:</p>
                            <div className="flex flex-wrap gap-2">
                                {voucher.map((voucher, index) => (
                                    <button
                                        key={index}
                                        className="relative bg-black text-white px-4 py-1 rounded text-sm font-medium hover:bg-gray-800 transition-colors">
                                        {voucher.ma_giam_gia}
                                        <div className=' absolute rounded-full w-3 h-[10px] bg-white top-[9px] left-[-6px] '>
                                        </div>
                                        <div className=' absolute rounded-full w-3 h-[10px] bg-white top-[9px] right-[-6px] '>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div> */}

                        {/* Color Selection */}
                        {colors.length > 1 && (
                            <div>
                                <div className="flex items-center mb-3">
                                    <span className="text-sm font-medium mr-2">Màu sắc:</span>
                                    <span className="text-sm text-gray-600 capitalize">{selectedColor?.ten_mau}</span>
                                </div>
                                <div className="flex space-x-2">
                                    {colors.map((colorOption, index) => (
                                        <button
                                            key={colorOption ? colorOption.ten_mau : 'Đang tải...'}
                                            onClick={() => { setSelectedColor(colorOption); setQuantity(1); handleChangeQuantity(product?.id_san_pham, colorOption.ten_mau, selectedSize, quantity); }}
                                            style={{ backgroundColor: colorOption.ma_mau }}
                                            className={`w-8 h-8 rounded-full border-2  ${selectedColor?.ten_mau === colorOption.ten_mau ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>)
                        }
                        

                        {/* Size Selection */}
                        {sizes.length > 1 && (
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm font-medium">Kích thước: {selectedSize?.ten_kich_thuoc}</span>
                                    <button className="text-sm text-blue-600 hover:underline">
                                        <i className="fas fa-ruler mr-1"></i>
                                        Hướng dẫn chọn size
                                    </button>
                                </div>
                                <div className="flex space-x-2">
                                    {sizes.map((size) => (
                                        <button
                                            key={size.ten_kich_thuoc}
                                            onClick={() => { setSelectedSize(size); setQuantity(1); handleChangeQuantity(product?.id_san_pham, selectedColor.ten_mau, size, quantity) }}
                                            className={`w-20 h-10 border rounded text-sm font-medium ${selectedSize?.ten_kich_thuoc === size.ten_kich_thuoc
                                                ? 'border-red-500 bg-red-50 text-red-600'
                                                : 'border-gray-300 hover:border-gray-400'
                                                }`}
                                        >
                                            <p className='text-sm'>{size.ten_kich_thuoc}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        

                        {/* Quantity and Actions */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center border rounded">
                                    <button
                                        onClick={() => { setQuantity(Math.max(1, quantity - 1)); handleChangeQuantity(product.id_san_pham, selectedColor.ten_mau, selectedSize, Math.max(1, quantity - 1)) }}
                                        className="px-3 py-2 hover:bg-gray-100"> -
                                    </button>
                                    <span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
                                    <button
                                        onClick={() => { setQuantity(productVariant?.so_luong == 0 ? 1 : (quantity + 1 > productVariant?.so_luong ? productVariant?.so_luong : quantity + 1)); handleChangeQuantity(product.id_san_pham, selectedColor.ten_mau, selectedSize, quantity + 1 > productVariant?.so_luong ? productVariant?.so_luong : quantity + 1) }}
                                        className="px-3 py-2 hover:bg-gray-100" >
                                        +
                                    </button>
                                </div>
                                <button
                                    onClick={() => { addToCart(true) }}
                                    className="flex-1 bg-blue-600  text-white py-3 px-6 rounded font-medium hover:bg-blue-700 transition-colors"
                                >
                                    THÊM VÀO GIỎ
                                </button>
                                <button
                                    onClick={() => { addToCart(false) }}
                                    className=" bg-white border-2 border-black text-black py-3 px-6 rounded font-medium hover:bg-gray-50 transition-colors">
                                    MUA NGAY
                                </button>
                            </div>

                        </div>

                        {/* Store Info */}
                        <div className="text-sm text-gray-600">
                            <div className="flex items-center">
                                <i className="fas fa-store mr-2"></i>
                                <span>Có {productVariant?.so_luong} sản phẩm này còn trong cửa hàng</span>
                                <button className="ml-2 text-blue-600 hover:underline">+</button>
                            </div>
                        </div>
                        {/* Service Features - Mobile Only */}
                        <div className="mt-8 lg:hidden">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white p-4 rounded-lg text-center">
                                    <img className='ml-[44%]' src="https://file.hstatic.net/1000253775/file/z4635451118875_c98fff6e965c4957a2beef70df6df0f8_afcea78391a640c9bcef22ce88aca7d6.jpg" alt="" width={25} height={25} />
                                    <p className="text-xs text-gray-600">Đổi trả tận nhà trong vòng 15 ngày</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg text-center">
                                    <img className='ml-[44%]' src="https://file.hstatic.net/1000253775/file/z4635451151763_13f64ed25050f361cfb0a70fda62b2c2_efbb28df6328412b9200cd92a795396e.jpg" alt="" width={35} height={35} />
                                    <p className="text-xs text-gray-600"> Miễn phí vận chuyển đơn từ 250K</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg text-center">
                                    <img className='ml-[44%]' src="https://file.hstatic.net/1000253775/file/z4635451129757_228e4824d8a593038b9f20d5e53d4d08_7e46b4c108bc481e8c2351f909bdcba4.jpg" alt="" height={35} width={35} />
                                    <p className="text-xs text-gray-600"> Bảo hành trong vòng 30 ngày</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg text-center">
                                    <img className='ml-[44%]' src="https://file.hstatic.net/1000253775/file/z4635451140541_2b09e178f1b8b4763b266875fd2c8db6_8b536c9ae5e24c17961fdb906d3f5022.jpg" alt="" width={35} height={35} />
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
                                    <img className='ml-14' src="https://file.hstatic.net/1000253775/file/z4635451151763_13f64ed25050f361cfb0a70fda62b2c2_efbb28df6328412b9200cd92a795396e.jpg" alt="" width={35} height={35} />
                                    <p className="text-xs text-gray-600"> Miễn phí vận chuyển đơn từ 250K</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg text-center shadow-sm">
                                    <img className='ml-14' src="https://file.hstatic.net/1000253775/file/z4635451129757_228e4824d8a593038b9f20d5e53d4d08_7e46b4c108bc481e8c2351f909bdcba4.jpg" alt="" height={35} width={35} />
                                    <p className="text-xs text-gray-600"> Bảo hành trong vòng 30 ngày</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-3">
                                <div className="bg-white p-6 rounded-lg text-center shadow-sm">
                                    <img className='ml-14' src="https://file.hstatic.net/1000253775/file/z4635451140541_2b09e178f1b8b4763b266875fd2c8db6_8b536c9ae5e24c17961fdb906d3f5022.jpg" alt="" width={35} height={35} />
                                    <p className="text-xs text-gray-600">Hotline 0287100-6789 hỗ trợ từ 8h30-24h</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg text-center shadow-sm">
                                    <img className='ml-14' src="https://file.hstatic.net/1000253775/file/z4635451129712_78e0e70db6fffe43fbb9a3e680cb3ed0_a2b8379adf4843a4898c621b37c2b42a.jpg" alt="" width={35} height={35} />
                                    <p className="text-xs text-gray-600">Giao hàng toàn quốc</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg text-center shadow-sm">
                                    <img className='ml-14' src="https://file.hstatic.net/1000253775/file/z4635451151761_2fe8731e9d20060a54130996be16cd2e_e8e090599dd9467abdd66feb9ba3474f.jpg" alt="" height={35} width={35} />
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
                            160STORE - {product ? product.ten_san_pham : 'Đang tải...'}
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
                                {product.mo_ta_san_pham}
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
                    <div className="my-4">
                        {/* Slider thay cho grid */}
                        <Slider {...productSettings} className="my-4">
                            {productRelateds.map((product, i) => (
                                <div key={i} className="p-2">
                                    <div className="bg-white p-2 rounded-lg cursor-pointer">
                                        <div className="relative group overflow-hidden">
                                            <Link href={`/product/${product.duong_dan}`} className="relative">
                                                <img src={`https://huunghi.id.vn/storage/products/${product.images[0].link_anh}`} alt="product" className="w-full" />
                                                <img
                                                    src={`https://huunghi.id.vn/storage/products/${product.images[1].link_anh}`}
                                                    alt="product"
                                                    className="w-full absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                />
                                            </Link>
                                            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                                <FontAwesomeIcon icon={faSearch} className="text-black p-3 rounded-full bg-white w-5 h-5 pointer-events-auto" />
                                            </div>
                                            <a
                                                onClick={() => addWhistList(product.ten_san_pham, product.images[0]?.link_anh, product.gia_da_giam, product.duong_dan, product.id_san_pham)}
                                                className="absolute right-2 bottom-2 bg-black w-7 h-7 rounded-full flex justify-center items-center text-white text-sm hover:bg-white hover:text-red-500"
                                            >
                                                <FontAwesomeIcon icon={faHeart} />
                                            </a>
                                        </div>
                                        <div className="px-1 mt-2">
                                            <p className="text-sm">{product.ten_san_pham}</p>
                                            <strong className="text-sm">{product.gia_da_giam.toLocaleString('vi-VN')}đ</strong>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPageDetail;