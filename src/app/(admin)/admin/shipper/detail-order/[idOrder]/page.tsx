'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaPrint, FaCheck, FaArrowLeft } from 'react-icons/fa';

interface OrderItem {
  id_san_pham: number;
  ma_san_pham: string;
  ten_san_pham: string;
  so_luong: number;
  gia_ban: number;
  hinh_anh?: string;
}

interface OrderInterface {
  id_don_hang: number;
  ten_nguoi_nhan: string;
  so_dien_thoai_nguoi_nhan: string;
  dia_chi_nguoi_nhan: string;
  ten_nguoi_gui: string;
  so_dien_thoai_nguoi_gui: string;
  dia_chi_nguoi_gui: string;
  trang_thai_don_hang: string;
  statusClass: string;
  chi_tiet_don_hang: OrderItem[];
  phi_van_chuyen: number;
  phuong_thuc_thanh_toan: string;
  ghi_chu: string;
  gia_tam_tinh: number;
  giam_gia: number;
  gia_tong_don_hang: number;
  created_at: string;
}

const OrderDetailShipper = () => {
  const router = useRouter();
  const [isLoading] = useState(false);
  const [order, setOrder] = useState<OrderInterface | null>({
    id_don_hang: 12345,
    ten_nguoi_nhan: "Nguyễn Văn A",
    so_dien_thoai_nguoi_nhan: "0987654321",
    dia_chi_nguoi_nhan: "Số 1, đường ABC, phường XYZ, quận 1, TP.HCM",
    ten_nguoi_gui: "Cửa hàng Thời Trang HN",
    so_dien_thoai_nguoi_gui: "0909123456",
    dia_chi_nguoi_gui: "Số 10, đường DEF, phường UVW, quận 3, TP.HCM",
    trang_thai_don_hang: "dang_giao",
    statusClass: "bg-yellow-100 text-yellow-800",
    chi_tiet_don_hang: [
      {
        id_san_pham: 1,
        ma_san_pham: "SP001",
        ten_san_pham: "Áo thun nam cổ tròn",
        so_luong: 2,
        gia_ban: 150000,
        hinh_anh: "/sample-product.jpg"
      },
      {
        id_san_pham: 2,
        ma_san_pham: "SP002",
        ten_san_pham: "Quần jean nam dài",
        so_luong: 1,
        gia_ban: 350000,
        hinh_anh: "/sample-product.jpg"
      }
    ],
    phi_van_chuyen: 30000,
    phuong_thuc_thanh_toan: "Thanh toán khi nhận hàng (COD)",
    ghi_chu: "Giao hàng giờ hành chính",
    gia_tam_tinh: 650000,
    giam_gia: 50000,
    gia_tong_don_hang: 630000,
    created_at: "2023-11-15 10:30:00"
  });

  const returStatus = (status: string) => {
    switch (status) {
      case 'cho_xac_nhan': return `Chờ xác nhận`;
      case 'chu_y': return `Chú ý`;
      case 'dang_chuan_bi_hang': return `Đang chuẩn bị hàng`;
      case 'cho_lay_hang': return `Chờ lấy hàng`;
      case 'dang_giao': return `Đang giao`;
      case 'hoan_hang': return `Hoàn hàng`;
      case 'giao_thanh_cong': return `Giao thành công`;
      case 'da_huy': return `Đã hủy`;
      default: return `Chờ xác nhận`;
    }
  };

  const nextSatatusOrder = (status: string) => {
    switch (status) {
      case 'cho_lay_hang':
        return [
          { className: 'green', nextStatus: 'dang_giao', status: 'Nhận đơn' }
        ];
      case 'dang_giao':
        return [
          { className: 'yellow', nextStatus: 'hoan_hang', status: 'Hoàn hàng' },
          { className: 'green', nextStatus: 'giao_thanh_cong', status: 'Giao hàng' }
        ];
      case 'hoan_hang':
        return [
          { className: 'yellow', nextStatus: 'da_huy', status: 'Trả hàng' }
        ];
      case 'giao_thanh_cong':
        return [];
      case 'da_huy':
        return [];
      default:
        return [];
    }
  }

  const updateStatus = async (orderId: number, newStatus: string) => {
    const confirm = window.confirm('Bạn có chắc chắn muốn cập nhật đơn hàng này?')
    if (confirm) {
      alert(`Đã cập nhật trạng thái đơn hàng #${orderId} thành ${returStatus(newStatus)}`);
      // Cập nhật trạng thái trong dữ liệu mẫu
      setOrder(prev => {
        if (!prev) return null;
        let newStatusClass = "";
        switch(newStatus) {
          case 'dang_giao': newStatusClass = "bg-yellow-100 text-yellow-800"; break;
          case 'giao_thanh_cong': newStatusClass = "bg-green-100 text-green-800"; break;
          case 'hoan_hang': newStatusClass = "bg-orange-100 text-orange-800"; break;
          case 'da_huy': newStatusClass = "bg-red-100 text-red-800"; break;
          default: newStatusClass = "bg-blue-100 text-blue-800";
        }
        return {
          ...prev,
          trang_thai_don_hang: newStatus,
          statusClass: newStatusClass
        };
      });
    }
  };

  if (isLoading) {
    return (
      <main className="p-4 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-3xl text-indigo-600 mb-3"></i>
          <p className="text-gray-600">Đang tải thông tin đơn hàng...</p>
        </div>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="p-4 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Không tìm thấy thông tin đơn hàng</p>
          <button 
            onClick={() => router.push('/shipper/order-management')}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Quay lại danh sách đơn hàng
          </button>
        </div>
      </main>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => router.push('/shipper/order-management')}
            className="mr-4 p-2 rounded-full hover:bg-gray-200"
          >
            <FaArrowLeft className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Chi tiết đơn hàng #{order.id_don_hang}</h1>
            <p className="text-sm text-gray-500">Thông tin chi tiết đơn hàng cần giao</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-xl overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Thông tin đơn hàng</h2>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${order.statusClass}`}>
              {returStatus(order.trang_thai_don_hang)}
            </span>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Thông tin người nhận</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold">{order.ten_nguoi_nhan}</p>
                  <p className="text-gray-600">{order.so_dien_thoai_nguoi_nhan}</p>
                  <p className="text-gray-600 mt-2">{order.dia_chi_nguoi_nhan}</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">Thông tin người gửi</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold">{order.ten_nguoi_gui}</p>
                  <p className="text-gray-600">{order.so_dien_thoai_nguoi_gui}</p>
                  <p className="text-gray-600 mt-2">{order.dia_chi_nguoi_gui}</p>
                </div>
              </div>
            </div>

            <h3 className="font-medium text-gray-700 mb-2">Sản phẩm</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Sản phẩm</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Số lượng</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Đơn giá</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {order.chi_tiet_don_hang.map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-md overflow-hidden">
                            {item.hinh_anh ? (
                              <img src={item.hinh_anh} alt={item.ten_san_pham} className="h-full w-full object-cover" />
                            ) : (
                              <div className="h-full w-full bg-gray-300 flex items-center justify-center">
                                <span className="text-xs text-gray-500">No image</span>
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <p className="font-medium text-gray-900">{item.ten_san_pham}</p>
                            <p className="text-gray-500 text-sm">{item.ma_san_pham}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{item.so_luong}</td>
                      <td className="px-4 py-3 text-gray-600">{item.gia_ban.toLocaleString('vi-VN')} đ</td>
                      <td className="px-4 py-3 text-gray-600">{(item.gia_ban * item.so_luong).toLocaleString('vi-VN')} đ</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Thông tin vận chuyển</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600"><span className="font-medium">Phí vận chuyển:</span> {order.phi_van_chuyen.toLocaleString('vi-VN')} đ</p>
                  <p className="text-gray-600"><span className="font-medium">Phương thức thanh toán:</span> {order.phuong_thuc_thanh_toan}</p>
                  <p className="text-gray-600"><span className="font-medium">Ghi chú:</span> {order.ghi_chu}</p>
                  <p className="text-gray-600 mt-2"><span className="font-medium">Ngày tạo đơn:</span> {new Date(order.created_at).toLocaleString('vi-VN')}</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">Tổng thanh toán</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">Tạm tính:</span>
                    <span className="font-medium">{order.gia_tam_tinh.toLocaleString('vi-VN')} đ</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">Phí vận chuyển:</span>
                    <span className="font-medium">{order.phi_van_chuyen.toLocaleString('vi-VN')} đ</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">Giảm giá:</span>
                    <span className="font-medium text-red-500">-{order.giam_gia.toLocaleString('vi-VN')} đ</span>
                  </div>
                  <div className="flex justify-between py-1 border-t border-gray-200 mt-2 pt-2">
                    <span className="text-gray-900 font-semibold">Tổng cộng:</span>
                    <span className="text-indigo-600 font-bold">{order.gia_tong_don_hang.toLocaleString('vi-VN')} đ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Thao tác</h2>
          </div>
          <div className="p-6 flex flex-wrap gap-4">
            <button 
              onClick={() => alert('Mở bản đồ đến địa chỉ giao hàng')}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 flex items-center"
            >
              <FaMapMarkerAlt className="mr-2" /> Xem bản đồ
            </button>
            <button 
              onClick={() => alert(`Gọi đến số ${order.so_dien_thoai_nguoi_nhan}`)}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 flex items-center"
            >
              <FaPhone className="mr-2" /> Gọi khách hàng
            </button>
            <button 
              onClick={() => alert('In hóa đơn đơn hàng #' + order.id_don_hang)}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 flex items-center"
            >
              <FaPrint className="mr-2" /> In hóa đơn
            </button>
            
            {nextSatatusOrder(order.trang_thai_don_hang).map((e, i) => (
              <button 
                key={i} 
                onClick={() => updateStatus(order.id_don_hang, e.nextStatus)}
                className={`px-4 py-2 text-white rounded hover:bg-opacity-90 flex items-center ${
                  e.className === 'green' ? 'bg-green-600' : 
                  e.className === 'yellow' ? 'bg-yellow-600' : 'bg-gray-600'
                }`}
              >
                <FaCheck className="mr-2" /> {e.status}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailShipper;