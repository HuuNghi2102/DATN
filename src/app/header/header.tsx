'use client';
import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCartShopping, faChevronDown,faHeart } from '@fortawesome/free-solid-svg-icons';
import styles from './header.module.css';
import type userInterface from "../compoments/userInterface";
import { UserControlProps } from '../compoments/userInterface';
import { log } from 'console';

const Header = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdowns, setActiveDropdowns] = useState<{ [key: string|number]: boolean }>({});
    const overlayRef = useRef<HTMLDivElement>(null);
    const [isClient, setIsClient] = useState(false); // 👈 new
    const [cartCount, setCartCount] = useState(0);
    const [category, setCategory] = useState<any[]>([]);
    const [productNew, setproductNew] = useState<any[]>();
    const [currentUser,setCurrentUser] = useState<userInterface>();
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [logoutUser, setLogoutUser] = useState(false);
    const [inputSeach,setInputSearch] = useState('')
    useEffect(() => {
        const logout = async () => {
            try{
                const accessToken = localStorage.getItem("accessToken");
                const typeToken = localStorage.getItem("typeToken");

                    if (accessToken && typeToken ){
                        const parseaccessToken = JSON.parse(accessToken);
                        const parsetypeToken = JSON.parse(typeToken);
                        console.log(parseaccessToken);
                        console.log(parsetypeToken);
                            const response = await fetch("https://huunghi.id.vn/api/user/logout", {
                            method: "GET",
                            headers: {
                                'Content-Type': 'application/json',
                                "Authorization": `${parsetypeToken} ${parseaccessToken}`,
                            }
                        });
                        if(response.ok){
                            localStorage.removeItem("user");
                            localStorage.removeItem("accessToken");
                            localStorage.removeItem("typeToken");
                            localStorage.removeItem("cart");
                            window.location.href = "/login";
                        }else{
                            alert('Không thể đăng xuất')
                        }
                    }
            }catch (error){
                console.log('Lỗi: ',error);
            }
        }
        if(logoutUser){
            logout();
        }
    },[logoutUser])
    const handleToggleUserDropdown = () => {
        if (currentUser) {
            setShowUserDropdown(prev => !prev);
        }
    };

    useEffect(() => {
        setIsClient(true); // 👈 set khi client mount
    }, [])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedCart = localStorage.getItem('cart');
            if (storedCart) {
                const cartItems = JSON.parse(storedCart);
                // Đếm tổng số lượng (quantity) của từng item
                const totalQuantity = cartItems.reduce((sum: number, item: any) => sum + item.so_luong_san_pham, 0);
                setCartCount(totalQuantity);
            }
        }
  }, []);
  useEffect(() => {
    console.log('isMobileMenuOpen:', isMobileMenuOpen); // Debug trạng thái
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    
  }, [isMobileMenuOpen]);

  const toggleDropdown = (index: number|string) => {
    setActiveDropdowns((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  }

  const handleOverlayClick = () => {
    setMobileMenuOpen(false);
  };

  useEffect(()=>{
    const fetchCategory = async () => {
        try {
            const res = await fetch('https://huunghi.id.vn/api/categoryProduct/getCateParent');
            const result = await res.json();
            setCategory(result.data.cateParent);
        } catch (error) {
            console.log(error)
        }
    }
    fetchCategory();
    const user = localStorage.getItem('user');
    if(user){
        setCurrentUser(JSON.parse(user)); 
    }
  },[]);
  if (!isClient) return null;
  return (
    <div>
        <header className={styles.header}>
            <div className={`${styles['slide-voucher']} ${styles['roll-bar']}`}>
            <div className={styles['marquee-content']}>
                <div className={styles['promotion-item']}>🚚 FREESHIP ĐƠN TỪ 250K</div>
                <div className={styles['promotion-item']}>VOUCHER 30K ĐƠN TỪ 599K</div>
                <div className={styles['promotion-item']}>🚚 FREESHIP ĐƠN TỪ 250K</div>
                <div className={styles['promotion-item']}>VOUCHER 70K ĐƠN TỪ 899K</div>
                <div className={styles['promotion-item']}>🚚 FREESHIP ĐƠN TỪ 250K</div>
            </div>
            </div>

            <div className={styles['main-header']}>
            <button
                className={styles['mobile-menu-toggle']}
                onClick={() => {
                setMobileMenuOpen(true);
                }}
            >
                ☰
            </button>
            <div className={styles.logo}>
                <a href="/"><img src="/assets/images/LogoAgain.png" alt="160STORE" /></a>
            </div>

            <div className={styles['search-container']}>
                <form onSubmit={(e:any)=> e.preventDefault()}
                    className={styles['search-form']}>
                    <input onChange={(e:any)=> setInputSearch(e.target.value)} type="text" className={styles['search-input']} placeholder="Bạn đang tìm gì..." />
                    <button
                        onClick={()=> window.location.href = `/search?q=${inputSeach}`}
                        type="submit" className={styles['search-button']}>
                        <div className={styles.icon}>
                        <img
                            width="24"
                            height="24"
                            src="https://theme.hstatic.net/1000253775/1001315144/14/search-icon.svg?v=2041"
                            alt=""
                        />
                        </div>
                    </button>
                </form>
            </div>

            <div className={styles['user-controls']}>
                <div className={styles['user-control-item']}>
                    <div className={styles.icon}>
                        <a href="/wishlist">
                            <FontAwesomeIcon className='w-6 h-6' icon={faHeart} />
                        </a>
                    </div>
                <span>Wishlist</span>
                </div>
                <div className={styles['user-control-item']} style={{ position: 'relative' }}>
                <div className={styles.icon} onClick={handleToggleUserDropdown} style={{ cursor: 'pointer' }}>
                    <img
                    src="https://theme.hstatic.net/1000253775/1001315144/14/user-account.svg?v=2041"
                    width="24"
                    height="24"
                    alt=""
                    />
                </div>

                {currentUser ? (
                    <>
                    <span style={{ cursor: 'pointer' }} onClick={handleToggleUserDropdown}>
                        Hi, {currentUser.ten_user}
                    </span>
                    {currentUser && showUserDropdown && (
                            <div className={styles.dropdown}>
                            <h1 className='text-center text-xl'>THÔNG TIN TÀI KHOẢN</h1>
                            <p className='text-center text-sm'>Số điện thoại: <strong className='text-black'>{currentUser.sdt_user}</strong></p>
                            <div  className={styles.dropdownButtons }>
                                <a href="/userprofile">
                                    <button className={styles.btn}>
                                        Xem chi tiết
                                    </button>
                                </a>
                                <button className={styles.btn} onClick={() => {
                                    setLogoutUser(true)
                                }}>Đăng xuất</button>
                            </div>
                            </div>
                        )}
                    </>
                ) : (
                    <span><a href="/login">Đăng nhập</a></span>
                )}
                </div>

                <div className={styles['user-control-item']}>
                    <div className={`${styles.icon} ${styles['cart-icon']}`}>
                        <a href="/cart">
                        <img
                            src="https://theme.hstatic.net/1000253775/1001315144/14/shopping-cart.svg?v=2041"
                            width="24"
                            height="24"
                            alt=""
                        />
                        </a>
                        <div className={styles['cart-count']}>{cartCount}</div>
                    </div>
                    <span>Giỏ hàng</span>
                </div>
            </div>
            </div>

            <nav className={styles['nav-container']}>
            <ul className={styles['main-nav']}>
                <a href="/collection/new"><li className={`${styles['nav-item']} ${styles.new}`}>HÀNG MỚI</li></a>
                <li className={styles['nav-item']}>
                <a href="/collection/all">SẢN PHẨM <FontAwesomeIcon icon={faChevronDown} /></a>
                <ul>
                    <li><a href="/collection/all">TẤT CẢ SẢN PHẨM</a></li>
                    <li><a href="/collection/bestsellers">HÀNG BÁN CHẠY</a></li>
                    <li><a href="#">ÁO</a></li>
                    <li><a href="#">QUẦN</a></li>
                    <li><a href="#">SET QUẦN ÁO</a></li>
                    <li><a href="#">PHỤ KIỆN</a></li>
                </ul>
                </li>
                {category.map((cate,index)=>(
                    <li key={index} className={styles['nav-item']}>
                    {cate.ten_loai}  <FontAwesomeIcon icon={faChevronDown} />
                    {cate.categories.length > 0 && (
                        <ul>
                            {cate.categories.map((e:any,i:number)=>(
                                <li key={i}><a href={`/collection/${e.duong_dan}`}>{e.ten_loai}</a></li>
                            ))}
                        </ul>
                    )}
                    </li> 
                ))}
                <li  className={styles['nav-item']} style={{ color: '#ff0000' }}>
                    <a href="collections/price-new">GIÁ MỚI</a>
                </li>
                <li className={styles['nav-item']}>
                JEANS <FontAwesomeIcon icon={faChevronDown} />
                <ul>
                    <li><a href="#">ProCOOL™</a></li>
                    <li><a href="#">SMARTJEAN™</a></li>
                    <li><a href="#">ICON105 Lightweight™</a></li>
                </ul>
                </li>
                <li className={styles['nav-item']}>
                    <a href="/blog">TIN THỜI TRANG</a>
                </li>
            </ul>
            </nav>
        </header>
        <div className={`${styles.overlay} ${isMobileMenuOpen ? styles.active : ''}`} ref={overlayRef} onClick={handleOverlayClick}>
        </div>
        <nav className={`${styles['mobile-nav']} ${isMobileMenuOpen ? styles.active : ''}`}>
            <div className={styles['mobile-nav-header']}>
            <div>MENU</div>
            <button
                className={styles['close-menu']}
                onClick={() => setMobileMenuOpen(false)}
            >
                ✕
            </button>
            </div>

            <div className={styles['mobile-search-container']}>
                <form className={styles['mobile-search-form']}>
                    <input
                    type="text"
                    className={styles['search-input']}
                    placeholder="Bạn đang tìm gì..."
                    />
                    <button type="submit" className={styles['search-button']} style={{ fontSize: '23px' }}>
                    <div className={styles.icon}>🔍</div>
                    </button>
                </form>
            </div>

            <ul className={styles['mobile-nav-items']}>
            {/* Mục cố định: HÀNG MỚI */}
            <li className={styles['mobile-nav-item']}>
                <a href="/hang-moi" className={styles['mobile-nav-link']} style={{ color: 'red' }}>
                🔎 HÀNG MỚI
                </a>
            </li>
            {/* SẢN PHẨM */}
            <li className={styles['mobile-nav-item']}>
            <div className={styles['mobile-nav-link']}>
                <a href="/collection/all">SẢN PHẨM</a>
                <button
                className={styles['mobile-dropdown-toggle']}
                onClick={() => toggleDropdown('sanpham')}
                type="button"
                >
                {activeDropdowns['sanpham'] ? '-' : '+'}
                </button>
            </div>
            <div
                className={`${styles['mobile-dropdown-content']} ${
                activeDropdowns['sanpham'] ? styles.active : ''
                }`}
            >
                <a href="/collection/all" className={styles['mobile-dropdown-item']}>TẤT CẢ SẢN PHẨM</a>
                <a href="/collection/bestsellers" className={styles['mobile-dropdown-item']}>HÀNG BÁN CHẠY</a>
                <a href="#" className={styles['mobile-dropdown-item']}>ÁO</a>
                <a href="#" className={styles['mobile-dropdown-item']}>QUẦN</a>
                <a href="#" className={styles['mobile-dropdown-item']}>SET QUẦN ÁO</a>
                <a href="#" className={styles['mobile-dropdown-item']}>PHỤ KIỆN</a>
            </div>
            </li>
            {/* Duyệt danh mục từ API */}
            {category.map((item, index) => (
                <li className={styles['mobile-nav-item']} key={index}>
                {item.categories && item.categories.length > 0 ? (
                    <>
                    <div className={styles['mobile-nav-link']}>
                        <a href={`/${item.duong_dan}`}>{item.ten_loai.toUpperCase()}</a>
                        <button
                        className={styles['mobile-dropdown-toggle']}
                        onClick={() => toggleDropdown(index)}
                        type="button"
                        >
                        {activeDropdowns[index] ? '-' : '+'}
                        </button>
                    </div>
                    <div
                        className={`${styles['mobile-dropdown-content']} ${
                        activeDropdowns[index] ? styles.active : ''
                        }`}
                    >
                        {item.categories.map((subItem: any, subIndex: number) => (
                        <a
                            key={subIndex}
                            href={`/${subItem.duong_dan}`}
                            className={styles['mobile-dropdown-item']}
                        >
                            {subItem.ten_loai}
                        </a>
                        ))}
                    </div>
                    </>
                ) : (
                    <a href={`/${item.duong_dan}`} className={styles['mobile-nav-link']}>
                    {item.ten_loai.toUpperCase()}
                    </a>
                )}
                </li>
            ))}

            {/* Mục cố định: GIÁ MỚI */}
            <li className={styles['mobile-nav-item']}>
                <a href="/collections/price-new" className={styles['mobile-nav-link']} style={{ color: 'red' }}>
                GIÁ MỚI
                </a>
            </li>
            {/* Jean */}
            <li className={styles['mobile-nav-item']}>
            <div className={styles['mobile-nav-link']}>
                <a href="/collection/all">JEAN</a>
                <button
                className={styles['mobile-dropdown-toggle']}
                onClick={() => toggleDropdown('sanpham')}
                type="button"
                >
                {activeDropdowns['sanpham'] ? '-' : '+'}
                </button>
            </div>
            <div
                className={`${styles['mobile-dropdown-content']} ${
                activeDropdowns['sanpham'] ? styles.active : ''
                }`}
            >
                <a href="#" className={styles['mobile-dropdown-item']}>ProCOOL™</a>
                <a href="#" className={styles['mobile-dropdown-item']}>SMARTJEAN™</a>
                <a href="#" className={styles['mobile-dropdown-item']}>ICON105 Lightweight™</a>
            </div>
            </li>
            {/* Mục cố định: TIN THỜI TRANG */}
            <li className={styles['mobile-nav-item']}>
                <a href="/tin-thoi-trang" className={styles['mobile-nav-link']}>
                TIN THỜI TRANG
                </a>
            </li>
            </ul>
        </nav>
    </div>
    );
};

export default Header;