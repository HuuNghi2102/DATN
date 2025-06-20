'use client'
import React, { useState } from 'react';
import {
  FaTachometerAlt, FaBoxOpen, FaTags, FaUsers,
  FaShoppingBag, FaChartPie, FaCog, FaBars
} from 'react-icons/fa';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button (Mobile only) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 text-gray-700 bg-white p-2 rounded shadow"
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <aside
        className={`
          h-full w-64 bg-white border-r border-gray-200 p-6 z-40
          transform transition-transform duration-300 ease-in-out
          fixed
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0  md:block 
          ${className}
        `}
      >
        <div className="brand flex items-center mb-8 pb-4 border-b border-gray-200">
          <div className="brand-logo w-9 h-9 bg-indigo-500 text-white rounded flex items-center justify-center mr-3 font-semibold">P</div>
          <div className="brand-name text-lg font-semibold text-gray-900">Premium Admin</div>
        </div>

        <nav className="nav flex-1">
          {[
            { icon: <FaTachometerAlt />, label: 'Dashboard' },
            { icon: <FaBoxOpen />, label: 'Sản phẩm' },
            { icon: <FaTags />, label: 'Danh mục' },
            { icon: <FaUsers />, label: 'Khách hàng' },
            { icon: <FaShoppingBag />, label: 'Đơn hàng' },
            { icon: <FaChartPie />, label: 'Báo cáo' },
            { icon: <FaCog />, label: 'Cài đặt' },
          ].map((item, index) => (
            <a
              key={index}
              href="#"
              className="nav-item flex items-center px-3 py-2 rounded text-gray-700 mb-1 hover:bg-indigo-500 hover:text-white transition-colors"
            >
              <div className="mr-3 w-5 text-center">{item.icon}</div>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="user-profile mt-auto pt-4 border-t border-black flex items-center">
          <div className="user-avatar w-9 h-9 rounded-full bg-black mr-3 overflow-hidden">
            <img
              src="https://randomuser.me/api/portraits/women/45.jpg"
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="user-info">
            <h4 className="text-sm font-medium mb-0.5">Nguyễn Thị An</h4>
            <p className="text-xs text-gray-500">Quản trị viên</p>
          </div>
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
