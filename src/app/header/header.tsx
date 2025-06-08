'use client';
import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCartShopping, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import styles from './header.module.css';
import userInterface from "../compoments/userInterface";

const Header = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdowns, setActiveDropdowns] = useState<{ [key: number]: boolean }>({});
    const overlayRef = useRef<HTMLDivElement>(null);
    const [isClient, setIsClient] = useState(false); // 👈 new
    const [cartCount, setCartCount] = useState(0);
    const [category, setCategory] = useState<any[]>([]);
    const [currentUser,setCurrentUser] = useState<userInterface>();
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

  const toggleDropdown = (index: number) => {
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
                console.log('Toggle clicked'); // Debug nút
                setMobileMenuOpen(true);
                }}
            >
                ☰
            </button>
            <div className={styles.logo}>
                <a href="/"><img src="/assets/images/logo.png" alt="160STORE" /></a>
            </div>

            <div className={styles['search-container']}>
                <form className={styles['search-form']}>
                <input type="text" className={styles['search-input']} placeholder="Bạn đang tìm gì..." />
                <button type="submit" className={styles['search-button']}>
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
                    <img
                    src="https://theme.hstatic.net/1000253775/1001315144/14/location.svg?v=2041"
                    alt=""
                    />
                </div>
                <span>Cửa hàng</span>
                </div>

                <div className={styles['user-control-item']}>
                <div className={styles.icon}>
                    <a href="/login">
                    <img
                    src="https://theme.hstatic.net/1000253775/1001315144/14/user-account.svg?v=2041"
                    width="24"
                    height="24"
                    alt=""
                    />                    
                    </a>
                </div>
                {currentUser ? (<span><a href="/login">Hi,{currentUser.ten_user}</a></span>) :(<span><a href="/login">Đăng nhập</a></span>) }
                
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
                <li className={`${styles['nav-item']} ${styles.new}`}>HÀNG MỚI</li>
                <li className={styles['nav-item']}>
                <a href="/productPage">SẢN PHẨM <FontAwesomeIcon icon={faChevronDown} /></a>
                <ul>
                    <li><a href="#">TẤT CẢ SẢN PHẨM</a></li>
                    <li><a href="#">HÀNG BÁN CHẠY</a></li>
                    <li><a href="#">ÁO</a></li>
                    <li><a href="#">QUẦN</a></li>
                    <li><a href="#">SET QUẦN ÁO</a></li>
                    <li><a href="#">ĐỒ LÓT - BOXER</a></li>
                    <li><a href="#">PHỤ KIỆN</a></li>
                </ul>
                </li>
                {category.map((cate,index)=>(
                    <li key={index} className={styles['nav-item']}>
                    {cate.ten_loai}  <FontAwesomeIcon icon={faChevronDown} />
                    {cate.categories.length > 0 && (
                        <ul>
                            {cate.categories.map((e:any,i:number)=>(
                                <li key={i}><a href={`collections/${e.duong_dan}`}>{e.ten_loai}</a></li>
                            ))}
                        </ul>
                    )}
                    </li> 
                ))}
                <li className={styles['nav-item']} style={{ color: '#ff0000' }}>
                GIÁ MỚI
                </li>
                <li className={styles['nav-item']}>
                JEANS <FontAwesomeIcon icon={faChevronDown} />
                <ul>
                    <li><a href="#">ProCOOL™</a></li>
                    <li><a href="#">SMARTJEAN™</a></li>
                    <li><a href="#">ICON105 Lightweight™</a></li>
                </ul>
                </li>
                <li className={styles['nav-item']}>TIN THỜI TRANG</li>
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
            {[
                { label: '🔎 HÀNG MỚI', link: '#' },
                {
                    label: 'SẢN PHẨM',
                    subItems:[
                    {label: 'Áo Thun', link: '#'},
                    {label: 'Áo Sơ Mi', link: '#'},
                    {label: 'Áo Khoác', link: '#'},
                    {label: 'Quần Jeans', link: '#'},
                    {label: 'Quần Kaki', link: '#'},
                ]
                },
                {
                label: 'ÁO NAM',
                    subItems:[
                    {label: 'Áo Thun', link: '#'},
                    {label: 'Áo Sơ Mi', link: '#'},
                    {label: 'Áo Khoác', link: '#'},
                    {label: 'Áo Polo', link: '#'},
                ]
                },
                {
                label: 'QUẦN NAM',
                subItems:[
                    {label: 'Quần Jeans', link: '#'},
                    {label: 'Quần Kaki', link: '#'},
                    {label: 'Quần Short', link: '#'},
                    {label: 'Quần Tây', link: '#'},
                ]
                },
                {
                label: 'PHỤ KIỆN',
                subItems:[
                    {label: 'Thắt Lưng', link: '#'},
                    {label: 'Ví Da', link: '#'},
                    {label: 'Túi Xách', link: '#'},
                    {label: 'Mũ', link: '#'},
                ]
                },
                { label: 'GIÁ MỚI', link: '#', color: '#ff0000' },
                {
                label: 'JEANS',
                subItems:[
                    {label: 'Slim Fit', link: '#'},
                    {label: 'Skinny', link: '#'},
                    {label: 'Regular Fit', link: '#'},
                    {label: 'Baggy', link: '#'},
                ]
                },
                { label: 'TIN THỜI TRANG', link: '#' },
                ].map((item, index) => (
                <li className={styles['mobile-nav-item']} key={index}>
                    {'subItems' in item ? (
                    <>
                    <div className={styles['mobile-nav-link']}>
                        {item.label}
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
                        {item.subItems?.map((subItem, subIndex) => (
                            <a
                                key={subIndex}
                                href={subItem.link}
                                className={styles['mobile-dropdown-item']}
                            >
                                {subItem.label}
                            </a>
                        ))}
                    </div>
                    </>
                ) : (
                    <a
                    href={item.link}
                    className={styles['mobile-nav-link']}
                    style={item.color ? { color: item.color } : {}}
                    >
                    {item.label}
                    </a>
                )}
                </li>
            ))}
            </ul>
        </nav>
    </div>
    );
};

export default Header;