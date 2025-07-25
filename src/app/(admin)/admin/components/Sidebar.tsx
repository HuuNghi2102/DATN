'use client'
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import userInterface from './interface/userInterface';
import React, { useEffect, useState } from 'react';
import {
  FaTachometerAlt, FaBoxOpen, FaTags, FaUsers,
  FaShoppingBag, FaChartPie, FaCog, FaBars, FaStar, FaComment, FaImage, FaTicketAlt, FaUsersCog, FaCircle, FaBlog,FaPodcast
} from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa';
import { toast } from "react-toastify";

interface SidebarProps {
  className?: string;
}

interface sideBar {
  icon: React.ReactElement;
  label: string;
  slug: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const sideBarAdmin = [
    { icon: <FaTachometerAlt />, label: 'Dashboard', slug: '/admin/dashboard' },
    { icon: <FaBoxOpen />, label: 'Sản phẩm', slug: '/admin/products' },
    { icon: <FaTags />, label: 'Danh mục', slug: '/admin/categoryproduct' },
    { icon: <FaUsers />, label: 'Khách hàng', slug: '/admin/users' },
    { icon: <FaShoppingBag />, label: 'Đơn hàng', slug: '/admin/orders' },
    { icon: <FaStar />, label: 'Đánh giá', slug: '/admin/evalue' },
    { icon: <FaImage />, label: 'Banner', slug: '/admin/banner' },
    { icon: <FaTicketAlt />, label: 'Voucher', slug: '/admin/voucher' },
    { icon: <FaBlog />, label: 'Bài viết', slug: '/admin/article' },
    { icon: <FaPodcast />, label: 'Chấp nhận bài viết', slug: '/admin/acceptPost' },
    { icon: <FaUsersCog />, label: 'Tài khoản', slug: '/admin/userinfo' },
  ]

  const sideBarShipper = [
    { icon: <FaTachometerAlt />, label: 'Dashboard', slug: '/admin' },
    { icon: <FaShoppingBag />, label: 'Đơn hàng', slug: '/admin/shipper/' },
  ]

  const sideBarBlogger = [
    // { icon: <FaTachometerAlt />, label: 'Dashboard', slug: '/admin' },
    // { icon: <FaBoxOpen />, label: 'Sản phẩm', slug: '/admin/products' },
    // { icon: <FaTags />, label: 'Danh mục', slug: '/admin/categoryproduct' },
    { icon: <FaBlog />, label: 'Bài viết', slug: '/admin/blogger' },
    { icon: <FaUsersCog />, label: 'Tài khoản', slug: '/admin/userinfo' },
    // { icon: <FaUsers />, label: 'Khách hàng', slug: '/admin/users' },
    // { icon: <FaShoppingBag />, label: 'Đơn hàng', slug: '/admin/orders/' },
  ]

  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [selectedSideBar, setSelectedSideBar] = useState<sideBar[]>([]);
  const [getUser, setgetUser] = useState<userInterface>();
  const defaultData = async () => {

    const accessTokenLocal = localStorage.getItem('accessToken');
    const typeTokenLocal = localStorage.getItem('typeToken');
    const userLocal = localStorage.getItem('user');

    if (accessTokenLocal && typeTokenLocal && userLocal) {
      const user = JSON.parse(userLocal);

      if (user.id_vai_tro == 1 || user.id_vai_tro == 3 || user.id_vai_tro == 4) {

        if (user.id_vai_tro == 1) {
          setSelectedSideBar(sideBarAdmin);
        } else if (user.id_vai_tro == 3) {
          setSelectedSideBar(sideBarShipper);
        } else {
          setSelectedSideBar(sideBarBlogger);
        }
      } else {
        router.push("/user/userprofile");
      }
    } else {
      router.push("/login");
    }
  };

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const typeToken = localStorage.getItem("typeToken");

      if (accessToken && typeToken) {
        const parseaccessToken = JSON.parse(accessToken);
        const parsetypeToken = JSON.parse(typeToken);
        const response = await fetch("https://huunghi.id.vn/api/user/logout", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${parsetypeToken} ${parseaccessToken}`,
          },
        });
        if (response.ok) {
          localStorage.removeItem("user");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("typeToken");
          localStorage.removeItem("cart");
          router.push("/login");
        } else {
          toast.error("Không thể đăng xuất");
        }
      }
    } catch (error) {
      console.log("Lỗi: ", error);
    }
  };

  useEffect(() => {
    defaultData();
  }, [])

  console.log(selectedSideBar);
  const userFetch = () => {
    try {
      const getUser = localStorage.getItem("user");
      if (getUser) {
        setgetUser(JSON.parse(getUser));
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    defaultData();
    userFetch();
  }, [])
  return (
    <>
      {/* Nút mở sidebar (chỉ mobile) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 text-gray-700 bg-white p-2 rounded shadow"
      >
        <FaBars />
      </button>

      {/* Overlay (chỉ mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 p-6 z-40
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0  md:block 
          ${className || ''}
        `}
      >
        <div className="brand flex items-center mb-8 pb-4 border-b border-gray-200">
          <div className="brand-logo w-9 h-9 bg-indigo-500 text-white rounded flex items-center justify-center mr-3 font-semibold">
            V
          </div>
          <div className="brand-name text-lg font-semibold text-gray-900">
            VerveStyle Admin
          </div>
        </div>

        <nav className="nav flex-1">
          {selectedSideBar && selectedSideBar.map((item, index) => (
            <Link
              key={index}
              href={item.slug}
              className="nav-item flex items-center px-3 py-2 rounded text-gray-700 mb-1 hover:bg-indigo-500 hover:text-white transition-colors"
            >
              <div className="mr-3 w-5 text-center">{item.icon}</div>
              <span>{item.label}</span>
            </Link>

          ))}
          <button
            onClick={handleLogout}
            className="nav-item flex items-center px-3 py-2 rounded text-red-700 mb-1 hover:bg-indigo-500 hover:text-white transition-colors"
          >
            <FaSignOutAlt className="mr-3 w-5 text-center" /> Đăng xuất
          </button>
        </nav>

        {/* Hồ sơ người dùng */}
        <div className="user-profile mt-auto pt-4 border-t border-black flex items-center">
          <div className="user-avatar w-9 h-9 rounded-full bg-black mr-3 overflow-hidden">
            <img src={`https://huunghi.id.vn/storage/avatars/${getUser?.anh_dai_dien_user}`} alt="" />
          </div>
          <Link href={`/admin/userinfo`}>
            <div className="user-info">
              <h4 className="text-sm font-medium mb-0.5">{getUser?.ten_user}</h4>
              <p className="text-xs text-gray-500">Xin chào,{getUser?.id_vai_tro === 1 ? "Admin" : getUser?.id_vai_tro===3?"Shipper": getUser?.id_vai_tro===4?"Blogger":"Quản trị viên"}</p>
            </div>
          </Link>
        </div>
      </aside>

      {/* Overlay on Mobile */}
      {isOpen && (
        <div
          className=""
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
