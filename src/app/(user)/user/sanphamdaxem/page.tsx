'use client';
import React, { useEffect, useState } from 'react';
import userInterface from '@/app/(user)/compoments/userInterface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCartShopping, faChevronLeft, faChevronRight, faHeart, faFire } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

// Interface for viewed products
interface ViewedProduct {
    id_san_pham: number | string;
    ten_san_pham: string;
    images: ProducNewtImage[];
    duong_dan: string;
    gia_chua_giam: number | string;
    pham_tram_giam: number;
    gia_da_giam: number;
    mo_ta_san_pham: string;
    kiem_tra_san_pham_dac_biet: number;
    trang_thai: number;
    id_loai_san_pham: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    variant_orders_count: number;
}
interface ProducNewtImage {
    id_anh_san_pham: number;
    link_anh: string;
    kiem_tra_san_pham_dac_biet: number;
    id_san_pham: number;
    created_at: string;
    updated_at: string;
}
export default function UserProfile() {
    const [user, setUser] = useState<userInterface>();
    const [orders, setOrders] = useState<any[]>();
    const [reload, setReload] = useState<boolean>(true);
    // Mock data for UI demonstration
    const [viewedProducts, setviewedProducts] = useState<ViewedProduct[]>([]);

    useEffect(() => {
        const u = localStorage.getItem('user');
        const accessTokenLocal = localStorage.getItem('accessToken');
        const typeTokenLocal = localStorage.getItem('typeToken');
        if (u && accessTokenLocal && typeTokenLocal) {
            const uu = JSON.parse(u);
            const accessToken = JSON.parse(accessTokenLocal);
            const typeToken = JSON.parse(typeTokenLocal);
            const fectchOrder = async () => {
                const responseOrder = await fetch(`https://huunghi.id.vn/api/order/listOrderOfUser`, {
                    headers: {
                        "Authorization": `${typeToken} ${accessToken}`
                    }
                })
                const result = await responseOrder.json();
                const orders = result.data.orders;
                setOrders(orders);
            }
            fectchOrder();
            setUser(uu);
        } else {
            alert('Vui lòng đăng nhập');
        }
    }, [reload]);

    const clearViewedProducts = () => {
        if (confirm('Bạn có chắc muốn xóa tất cả sản phẩm đã xem?')) {
            // Functionality to be implemented
            console.log('Clear all viewed products');
        }
    };

    const removeViewedProduct = (productId: string | number) => {
        // Functionality to be implemented
        console.log('Remove product:', productId);
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    useEffect(() => {
        const fetchProducts = async () => {
        try {
            const res = await fetch('http://huunghi.id.vn/api/product/getProductNews');
            const result = await res.json();
            setviewedProducts(result.data.productNews);
            console.log(setviewedProducts);

        } catch (error) {
            console.log(error);
        }
        };
        fetchProducts();
    }, [])
    const menuItems = [
        { icon: 'fas fa-user', text: 'Hồ sơ của tôi', href: '/user/userprofile' },
        { icon: 'fas fa-clipboard-list', text: 'Đơn hàng của tôi', href: '/user/history-order' },
        { icon: 'fas fa-question-circle', text: 'Yêu cầu hỗ trợ', href: '/user/yeucauhotro' },
        { icon: 'fas fa-map-marker-alt', text: 'Sổ địa chỉ', href: '/user/sodiachi' },
        { icon: 'fas fa-ticket-alt', text: 'Vouchers', href: '/' },
        { icon: 'fas fa-heart', text: 'Sản phẩm đã xem', href: '/user/sanphamdaxem', active: true },
        { icon: 'fas fa-lock', text: 'Đổi mật khẩu', href: '/user/changePassword' }
    ];

    return (
        <div className="min-h-screen bg-gray-100 pt-[11%]">
            {/* Font Awesome CDN */}
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
            />

            {/* Header Navigation */}
            <div className="bg-white border-b px-40 py-3">
                <div className="max-w-[1200px] mx-auto">
                    <nav className="text-sm text-gray-600">
                        <span>
                            <a href="/">Trang chủ</a>
                        </span>{' '}
                        / <span className="font-medium">Tài khoản</span>
                    </nav>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto p-4">
                {/* Desktop & Tablet Layout */}
                <div className="hidden md:flex gap-6">
                    {/* Sidebar */}
                    <div className="w-80 bg-white rounded-lg shadow-sm max-h-[520px] sticky top-44">
                        <div className="p-4 border-b bg-gray-50 rounded-t-lg">
                            <div className="flex items-center gap-2">
                                <i className="fas fa-user text-gray-600"></i>
                                <span className="font-medium">Tài khoản của bạn</span>
                            </div>
                        </div>

                        <div className="p-2">
                            <div className="text-sm text-gray-600 px-3 py-2">
                                Hi, {user?.ten_user || 'Người dùng'}
                            </div>

                            <ul className="space-y-1">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <Link href={item.href}>
                                            <button
                                                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors ${item.active
                                                    ? 'bg-black text-white'
                                                    : 'text-gray-700 hover:bg-gray-50'
                                                    }`}
                                            >
                                                <i className={`${item.icon} w-4`}></i>
                                                <span className="text-sm">{item.text}</span>
                                            </button>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 bg-white rounded-lg shadow-sm">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-medium">SẢN PHẨM ĐÃ XEM</h2>
                                {viewedProducts.length > 0 && (
                                    <button
                                        onClick={clearViewedProducts}
                                        className="text-sm text-red-500 hover:text-red-700 transition-colors"
                                    >
                                        <i className="fas fa-trash mr-1"></i>
                                        Xóa tất cả
                                    </button>
                                )}
                            </div>

                            {viewedProducts.length === 0 ? (
                                <div className="text-center py-12">
                                    <i className="fas fa-eye-slash text-4xl text-gray-300 mb-4"></i>
                                    <p className="text-gray-500 mb-2">Bạn chưa xem sản phẩm nào</p>
                                    <p className="text-sm text-gray-400">Hãy khám phá các sản phẩm của chúng tôi!</p>
                                    <Link href="/">
                                        <button className="mt-4 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                                            Khám phá ngay
                                        </button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                                    {viewedProducts.map((product, i) => (
                                        <div key={i} className="p-2">
                                            <div className="bg-white p-2 rounded-lg cursor-pointer">
                                                <div className="relative group overflow-hidden">
                                                    <a href={`/product/${product.duong_dan}`} className="relative">
                                                        <img src={`https://huunghi.id.vn/storage/products/${product.images[0]?.link_anh}`} alt="aa" className="w-full" />
                                                        <img
                                                            src={`https://huunghi.id.vn/storage/products/${product.images[1]?.link_anh}`}
                                                            alt="product"
                                                            className="w-full absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                        />
                                                    </a>
                                                    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                                        <FontAwesomeIcon icon={faSearch} className="text-black p-3 rounded-full bg-white w-5 h-5 pointer-events-auto" />
                                                    </div>
                                                    <a
                                                        href={`/product/${product.duong_dan}`}
                                                        className="absolute right-2 bottom-2 bg-black w-7 h-7 rounded-full flex justify-center items-center text-white text-sm hover:bg-white hover:text-red-500"
                                                    >
                                                        <FontAwesomeIcon icon={faHeart} />
                                                    </a>
                                                </div>
                                                <div className="px-1 mt-2">
                                                    <p className="text-sm">{product.ten_san_pham}</p>
                                                    <strong className="text-sm text-red-500">{product.gia_da_giam.toLocaleString('vi-VN') + ' VNĐ'} <del className='text-gray-400 text-xs'> {product.gia_chua_giam != null ? (product.gia_chua_giam.toLocaleString('vi-VN')) + 'đ' : ''}</del></strong>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden">
                    <div className="bg-white rounded-lg shadow-sm">
                        {/* Mobile Header */}
                        <div className="p-4 border-b bg-gray-50 rounded-t-lg">
                            <div className="flex items-center gap-2">
                                <i className="fas fa-user text-gray-600"></i>
                                <span className="font-medium">Tài khoản của bạn</span>
                            </div>
                        </div>

                        {/* Mobile Menu */}
                        <div className="p-2 border-b">
                            <div className="text-sm text-gray-600 px-3 py-2">
                                Hi, {user?.ten_user || 'Người dùng'}
                            </div>

                            <ul className="space-y-1">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <Link href={item.href}>
                                            <button
                                                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors ${item.active
                                                    ? 'bg-black text-white'
                                                    : 'text-gray-700 hover:bg-gray-50'
                                                    }`}
                                            >
                                                <i className={`${item.icon} w-4`}></i>
                                                <span className="text-sm">{item.text}</span>
                                            </button>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Mobile Viewed Products */}
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-medium">SẢN PHẨM ĐÃ XEM</h2>
                                {viewedProducts.length > 0 && (
                                    <button
                                        onClick={clearViewedProducts}
                                        className="text-sm text-red-500 hover:text-red-700"
                                    >
                                        <i className="fas fa-trash mr-1"></i>
                                        Xóa tất cả
                                    </button>
                                )}
                            </div>

                            {viewedProducts.length === 0 ? (
                                <div className="text-center py-8">
                                    <i className="fas fa-eye-slash text-3xl text-gray-300 mb-3"></i>
                                    <p className="text-gray-500 mb-1">Bạn chưa xem sản phẩm nào</p>
                                    <p className="text-sm text-gray-400 mb-3">Hãy khám phá các sản phẩm của chúng tôi!</p>
                                    <Link href="/">
                                        <button className="bg-black text-white px-4 py-2 rounded-lg text-sm">
                                            Khám phá ngay
                                        </button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-3">
                                    {viewedProducts.map((product, i) => (
                                        <div key={i} className="p-2">
                                            <div className="bg-white p-2 rounded-lg cursor-pointer">
                                                <div className="relative group overflow-hidden">
                                                    <a href={`/product/${product.duong_dan}`} className="relative">
                                                        <img src={`https://huunghi.id.vn/storage/products/${product.images[0]?.link_anh}`} alt="aa" className="w-full" />
                                                        <img
                                                            src={`https://huunghi.id.vn/storage/products/${product.images[1]?.link_anh}`}
                                                            alt="product"
                                                            className="w-full absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                        />
                                                    </a>
                                                    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                                        <FontAwesomeIcon icon={faSearch} className="text-black p-3 rounded-full bg-white w-5 h-5 pointer-events-auto" />
                                                    </div>
                                                    <a
                                                        href={`/product/${product.duong_dan}`}
                                                        className="absolute right-2 bottom-2 bg-black w-7 h-7 rounded-full flex justify-center items-center text-white text-sm hover:bg-white hover:text-red-500"
                                                    >
                                                        <FontAwesomeIcon icon={faHeart} />
                                                    </a>
                                                    <div className=" absolute top-1 right-1 text-black bg-amber-400 text-xs rounded-md px-2 py-1 gap-1 items-center flex font-bold">
                                                        <FontAwesomeIcon icon={faFire} /> <p> New</p>
                                                    </div>
                                                </div>
                                                <div className="px-1 mt-2">
                                                    <p className="text-sm">{product.ten_san_pham}</p>
                                                    <strong className="text-sm text-red-500">{product.gia_da_giam.toLocaleString('vi-VN') + ' VNĐ'} <del className='text-gray-400 text-xs'> {product.gia_chua_giam != null ? (product.gia_chua_giam.toLocaleString('vi-VN')) + 'đ' : ''}</del></strong>

                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}