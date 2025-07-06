'use client';

import React, { useEffect, useState } from 'react';
import '@/app/globals.css';
import { useParams, useRouter } from 'next/navigation';
import detailOrder from '../../../components/interface/detailOrderInterface';
import voucherInterface from '../../../components/interface/voucherInterface';
import {
  FiArrowLeft, FiEdit, FiSave, FiUser, FiMail,
  FiPhone, FiMapPin, FiShield, FiLock, FiCalendar
} from "react-icons/fi";

interface orderInterface {
  id_don_hang: number;
  ten_nguoi_nhan: string;
  dia_chi_nguoi_nhan: string;
  so_dien_thoai_nguoi_nhan: string;
  ghi_chu_don_hang: string;
  gia_tong_don_hang: number;
  ten_nguoixacnhan: string;
  ma_giao_dich: number;
  trang_thai_don_hang: string;
  trang_thai_thanh_toan: string;
  link_thanh_toan: string;
  id_nguoi_xac_nhan: number;
  id_khach_hang: number;
  id_ma_giam_gia: number;
  id_phuong_thuc_thanh_toan: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  tien_ship: number;
  detail_orders?: detailOrder[];
}

const OrderDetailPage = () => {

  const router = useRouter();
  const useParam = useParams();

  const { idOrder } = useParam;

  const [order, setOrder] = useState<orderInterface>();
  const [detailOrders, setDetailOrder] = useState<detailOrder[]>([]);
  const [voucher, setVoucher] = useState<voucherInterface>();
  const [trackingCode, setTrackingCode] = useState('GHN123456789');
  const [deliveryStatus, setDeliveryStatus] = useState('Đang vận chuyển');
  const [orderNote, setOrderNote] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [typeToken, setTypeToken] = useState('');
  const [accessToken, setAccessToken] = useState('');


  const handleUpdateShipping = () => {
    alert(`Cập nhật vận chuyển với mã: ${trackingCode}, trạng thái: ${deliveryStatus}`);
  };

  const handleCancelOrder = async () => {
    const confirm = window.confirm('Bạn có chắc muốn hủy đơn hàng này không?');
    if (confirm) {
      const resChangeStatusOrder = await fetch(`https://huunghi.id.vn/api/order/changeStatusOrderAdmin/${order?.id_don_hang}?status=da_huy` ,{
        method : "PUT",
        headers : {
          "Content-Type" : "application/json",
          "Authorization" : `${typeToken} ${accessToken}`
        }
      });

      if(resChangeStatusOrder.ok){
        if(order){
          setOrder({...order, trang_thai_don_hang : 'da_huy'})
        }
      }else{
        alert('Cập nhật không thành công');
      }
    }
  };

  const handlePrepareOrderSuccess = async () => {
    const confirm = window.confirm('Bạn có chắc đơn hàng đã sẵn sàn?');
    if (confirm) {
      const resChangeStatusOrder = await fetch(`https://huunghi.id.vn/api/order/changeStatusOrderAdmin/${order?.id_don_hang}?status=cho_lay_hang` ,{
        method : "PUT",
        headers : {
          "Content-Type" : "application/json",
          "Authorization" : `${typeToken} ${accessToken}`
        }
      });

      if(resChangeStatusOrder.ok){
        if(order){
          setOrder({...order, trang_thai_don_hang : 'cho_lay_hang'})
        }
      }else{
        alert('Cập nhật không thành công');
      }
    }
  };

  const handleConfirm = async () => {
    const confirm = window.confirm('Bạn có chắc muốn hủy đơn hàng này không?');
    if (confirm) {
      const resChangeStatusOrder = await fetch(`https://huunghi.id.vn/api/order/changeStatusOrderAdmin/${order?.id_don_hang}?status=da_huy` ,{
        method : "PUT",
        headers : {
          "Content-Type" : "application/json",
          "Authorization" : `${typeToken} ${accessToken}`
        }
      });

      if(resChangeStatusOrder.ok){
        if(order){
          setOrder({...order, trang_thai_don_hang : 'da_huy'})
        }
      }else{
        alert('Cập nhật không thành công');
      }
    }
  };

  const handleAttention = async () => {
    const confirm = window.confirm('Bạn có chắc muốn đưa đơn hàng này vào mục chú ý?');
    if (confirm) {
      const resChangeStatusOrder = await fetch(`https://huunghi.id.vn/api/order/changeStatusOrderAdmin/${order?.id_don_hang}?status=chu_y` ,{
        method : "PUT",
        headers : {
          "Content-Type" : "application/json",
          "Authorization" : `${typeToken} ${accessToken}`
        }
      });

      if(resChangeStatusOrder.ok){
        if(order){
          setOrder({...order, trang_thai_don_hang : 'chu_y'})
        }
      }else{
        alert('Cập nhật không thành công');
      }
    }
  };

  const handleUpdateNote = () => {
    alert(`Cập nhật ghi chú đơn hàng: ${orderNote}`);
  };

  const fetchDefaultData = async () => {

    if (!idOrder) {
      alert('Đơn hàng không tồn tại');
      router.push('/admin/orders');
      return
    }

    const accessTokenLocal = localStorage.getItem('accessToken');
    const typeTokenLocal = localStorage.getItem('typeToken');
    const userLocal = localStorage.getItem('user');

    if (accessTokenLocal && typeTokenLocal && userLocal) {

      setAccessToken(JSON.parse(accessTokenLocal));
      setTypeToken(JSON.parse(typeTokenLocal));

      const user = JSON.parse(userLocal);
      if (user.id_vai_tro == 1 ||  user.id_vai_tro == 3 ) {

        const resGetOrder = await fetch(`https://huunghi.id.vn/api/order/getOrderAdmin/${idOrder}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${JSON.parse(typeTokenLocal)} ${JSON.parse(accessTokenLocal)}`
          }
        })

        if (resGetOrder.ok) {
          const resultGetOrder = await resGetOrder.json();
          const currentOrder = resultGetOrder.data.order;

          if (currentOrder.id_ma_giam_gia) {

            const resGetVoucher = await fetch(`https://huunghi.id.vn/api/voucher/getVoucher/${currentOrder.id_ma_giam_gia}`, {
              headers: {
                "Content-Type": "application/json",
                "Authorization": `${JSON.parse(typeTokenLocal)} ${JSON.parse(accessTokenLocal)}`
              }
            })

            if (resGetOrder.ok) {
              const resultGetOrder = await resGetVoucher.json();
              const getVoucher = resultGetOrder.data.voucher;
              setVoucher(getVoucher);
            } else {
              alert('Lấy mã giảm giá không thành công');
            }
          }

          setOrder(currentOrder);
          setDetailOrder(resultGetOrder.data.order.detail_orders);
          setIsLoading(false);
        } else {
          alert('Đơn hàng không tồn tại');
          router.push('/admin/orders');
        }
      } else {
        router.push('/user/userprofile');
      }
    } else {
      router.push('/user/login');
    }
  }

  const getOrderStatusInfo = (status: string) => {
  const base = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';

  switch (status) {
    case 'cho_xac_nhan':
      return { label: 'Chờ Xác Nhận', className: `${base} bg-yellow-100 text-yellow-800` };
    case 'chu_y':
      return { label: 'Chú Ý', className: `${base} bg-orange-100 text-orange-800` };
    case 'dang_chuan_bi_hang':
      return { label: 'Đang Chuẩn Bị Hàng', className: `${base} bg-blue-100 text-blue-800` };
    case 'cho_lay_hang':
      return { label: 'Chờ Lấy Hàng', className: `${base} bg-indigo-100 text-indigo-800` };
    case 'dang_giao':
      return { label: 'Đang Giao', className: `${base} bg-purple-100 text-purple-800` };
    case 'hoan_hang':
      return { label: 'Hoàn Hàng', className: `${base} bg-pink-100 text-pink-800` };
    case 'giao_thanh_cong':
      return { label: 'Giao Thành Công', className: `${base} bg-green-100 text-green-800` };
    case 'da_huy':
      return { label: 'Đã Hủy', className: `${base} bg-red-100 text-red-800` };
    default:
      return { label: 'Không Rõ', className: `${base} bg-gray-100 text-gray-800` };
  }
};

  useEffect(() => {
    fetchDefaultData();
  }, []);


  if (isLoading) {
    return (
      <main className="p-4 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-3xl text-indigo-600 mb-3"></i>
          <p className="text-gray-600">Đang tải dữ liệu đơn hàng...</p>
        </div>
      </main>
    );
  }



  return (
    <div className="min-h-screen font-sans bg-gray-100 p-8">
      <header className="mb-8 flex justify-between items-center">
        <div className="flex items-center">
          <button onClick={() => window.history.back()} className="p-2 mr-4 rounded-lg hover:bg-gray-100 transition-all">
            <FiArrowLeft className="text-gray-600 text-xl" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Chi tiết đơn hàng #DH{order?.id_don_hang}</h1>
            <p className="text-sm text-gray-500">Ngày đặt hàng: {new Date(order?.created_at ?  order?.created_at : "").toLocaleDateString('vi-VN')} - {new Date(order?.created_at).toLocaleTimeString('vi-VN')} </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100">
            <i className="fas fa-print mr-2"></i> In đơn
          </button>
          <button
            onClick={handleUpdateNote}
            className="btn btn-primary px-4 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            <i className="fas fa-pen mr-2"></i> Cập nhật
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-sm text-gray-500 mb-1">Tổng giá trị</h3>
          <p className="text-xl font-semibold text-gray-900">{order?.gia_tong_don_hang.toLocaleString('vi-VN')}₫</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-sm text-gray-500 mb-1">Phương thức thanh toán</h3>
          <p className="text-xl font-semibold text-gray-900">{order?.id_phuong_thuc_thanh_toan == 1 ? 'Thanh Toán Khi Nhận Hàng' : 'Chuyển Khoản'}</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-sm text-gray-500 mb-1">Trạng thái đơn hàng</h3>
          <p className="text-xl font-semibold text-gray-900 mb-1">{getOrderStatusInfo(order?.trang_thai_don_hang ? order?.trang_thai_don_hang : '').label}</p>
          <span className={getOrderStatusInfo(order?.trang_thai_don_hang ? order?.trang_thai_don_hang : '').className}>
            {getOrderStatusInfo(order?.trang_thai_don_hang ? order?.trang_thai_don_hang : '').label}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded shadow">
            <div className="border-b border-gray-200 p-4">
              <h2 className="text-lg font-semibold text-gray-800">Thông tin khách hàng</h2>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[['Họ tên', order?.ten_nguoi_nhan], ['Số điện thoại', order?.so_dien_thoai_nguoi_nhan], ['Email', 'nam.tran@example.com'], ['Địa chỉ', order?.dia_chi_nguoi_nhan]].map(([label, value], index) => (
                <div key={index}>
                  <label className="text-sm text-gray-500">{label}</label>
                  <p className="font-medium text-gray-800">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded shadow">
            <div className="border-b border-gray-200 p-4">
              <h2 className="text-lg font-semibold text-gray-800">Sản phẩm đã đặt</h2>
            </div>
            <div className="p-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium text-gray-700">Sản phẩm</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-700">Số lượng</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-700">Đơn giá</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-700">Tổng</th>
                  </tr>
                </thead>
                <tbody>
                  {detailOrders.map((_, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="px-4 py-3">
                        <div className="flex gap-3 items-center">
                          <img src={`https://huunghi.id.vn/storage/products/${_.anh_san_pham}`} alt="Sản phẩm" className="w-12 h-12 rounded object-cover" />
                          <div>
                            <p className="font-medium text-gray-800">{_.ten_san_pham}</p>
                            <p className="text-xs text-gray-500">Màu: {_.mau_san_pham} - Size: {_.kich_thuoc_san_pham}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">{_.so_luong_san_pham}</td>
                      <td className="px-4 py-3">{_.gia_san_pham.toLocaleString('vi-VN')}₫</td>
                      <td className="px-4 py-3">{(_.gia_san_pham * _.so_luong_san_pham).toLocaleString('vi-VN')}₫</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Ghi chú đơn hàng</h2>
            <textarea
              disabled
              className="w-full border border-gray-300 rounded p-2 text-sm"
              rows={3}
              placeholder="Nhập ghi chú..."
              defaultValue={order?.ghi_chu_don_hang}
            // onChange={(e) => setOrderNote(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Tổng thanh toán</h2>
            <table className="w-full text-sm">
              <tbody>
                {[['Tạm tính:', ((order?.gia_tong_don_hang ? order?.gia_tong_don_hang : 0) - (order?.tien_ship ? order?.tien_ship : 0) + (voucher?.gia_tri_giam ? voucher?.gia_tri_giam : 0)).toLocaleString('vi-VN') + 'đ'], ['Phí vận chuyển:', (order?.tien_ship ? order?.tien_ship : 0).toLocaleString('vi-VN') + 'đ'], ['Giảm giá:', (voucher ? voucher?.gia_tri_giam : 0 ).toLocaleString('vi-VN') + 'đ'], ['Tổng cộng:', order?.gia_tong_don_hang.toLocaleString('vi-VN') + 'đ']].map(([label, value], idx) => (
                  <tr key={idx} className={idx === 3 ? 'font-semibold text-gray-800' : ''}>
                    <td className="text-gray-500">{label}</td>
                    <td className="text-right font-medium">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Cập nhật trạng thái đơn hàng</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Mã vận đơn</label>
                <input
                  type="text"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded text-sm"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Trạng thái</label>
                <select
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded text-sm"
                  value={deliveryStatus}
                  onChange={(e) => setDeliveryStatus(e.target.value)}
                >
                  <option>Chờ xử lý</option>
                  <option>Đang vận chuyển</option>
                  <option>Đã giao</option>
                  <option>Đã hủy</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-3">
              {(order?.trang_thai_don_hang == 'cho_xac_nhan' || order?.trang_thai_don_hang == 'dang_chuan_bi_hang' || order?.trang_thai_don_hang == 'chu_y' || order?.trang_thai_don_hang == 'cho_lay_hang') && (
                <button
                  onClick={handleCancelOrder}
                  className="px-4 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                >
                  Hủy đơn hàng
              </button>
              )}
              {(order?.trang_thai_don_hang == 'cho_xac_nhan' || order?.trang_thai_don_hang == 'chu_y') && (
               <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700"
              >
                 Xác nhận
              </button>
              )}
              {order?.trang_thai_don_hang == 'cho_xac_nhan' && (
               <button
                onClick={handleAttention}
                className="px-4 py-2 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600"
              >
                 Chú ý
              </button>
              )}
              {order?.trang_thai_don_hang == 'dang_chuan_bi_hang' && (
               <button
                onClick={handlePrepareOrderSuccess}
                className="px-4 py-2 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700"
              >
                 Đơn hàng sẵn sàng
              </button>
              )}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
