'use client'
import React, { useEffect, useState } from 'react';

const PayPage = () => {

  const [errors,setErrors] = useState({
    name: '',
    phone: '',
    address: '',
    province: '',
    district : '',
    ward: '',
  });
  
  const [selectedProvince, setSelectedProvince] = useState<number>();
  const [selectedDistrict, setSelectedDistrict] = useState<number>();
  const [selectedWard, setSelectedWard] = useState<number>();

  const [selectedDiscount, setSelectedDiscount] = useState<any>();
  const [inputDiscount, setInputDiscount] = useState('');
  const [orderInfo, setOrderInfo] = useState({
    name: '',
    phone: '',
    address: '',
    totalOrder : 0,
    paymentMethod: 1,
    location: '',
    idVoucher : null
  });

  const [discountOptions, setDiscountOptions] = useState<any[]>([]);
  const [addressOfUser, setAddressOfUser] = useState<any[]>([]);
  const [carts, setCarts] = useState<any[]>([]);
  const [arrMethodPayment, setArrMethodPayment] = useState<any[]>([]);


  const [arrayProvince, setArrayProvince] = useState<any[]>([]);
  const [arrDistrict, setArrDistrict] = useState<any[]>([]);
  const [arrWard, setArrWard] = useState<any[]>([]);


  // hàm sử dụng địa chỉ giao hàng có sẵn của người dùng
  const changeAdress = (id_address:number) => {

    console.log('id_address', id_address);

    if(isNaN(id_address)) {
        setOrderInfo({
            ...orderInfo,
            name: '',
            phone: '',
            address: ''
        });
        return;
    }

    const address = addressOfUser.find((address) => address.id_dia_chi_giao_hang === id_address);

    setOrderInfo({...orderInfo,
        name: address?.ten_nguoi_nhan,
        phone: address?.so_dien_thoai_nguoi_nhan,
        address : address?.dia_chi_nguoi_nhan
    })
  }


  // hàm sử dụng mã giảm giá
  const useVoucher = async (codeVoucher:string,totalOrder:number) => {
    const res = await fetch(`https://huunghi.id.vn/api/voucher/useVoucher`,{
      method : "POST",
      headers : {
        "Content-Type" : "application/json",
      },
      body : JSON.stringify({
        codeVoucher : codeVoucher,
        totalOrder : totalOrder
      })
    })
    const result = await res.json();
    if(result.status == false){
      alert(result.message);
    }else{
      setSelectedDiscount(result.data.voucher)
      const voucher:any = result.data.voucher;
      setOrderInfo({
        ...orderInfo,
        totalOrder : carts.reduce((total:number, cart:any) => total + (cart.gia_san_pham * cart.so_luong_san_pham), 0) - ( voucher.loai_giam_gia === 'so_tien' ? voucher.gia_tri_giam : carts.reduce((total:number, cart:any) => total + (cart.gia_san_pham * cart.so_luong_san_pham), 0) / 100 * voucher.gia_tri_giam),
        idVoucher : voucher.id_ma_giam_gia,
      });
    }
  }


    // hàm lấy dữ liệu ban đầu
  const fetchData = async () => {

    const cartLocal = localStorage.getItem('cart');
    const accessTokenLocal = localStorage.getItem('accessToken');
    const typeTokenLocal = localStorage.getItem('typeToken');
    const userLocal = localStorage.getItem('user');

    // kiểm tra xem người dùng đã đăng nhập hay chưa
    if(!userLocal || !accessTokenLocal || !typeTokenLocal) {
        alert('Bạn chưa đăng nhập, vui lòng đăng nhập để tiếp tục');
        window.location.href = '/login';
        return;
    }

    const accessToken = JSON.parse(accessTokenLocal);
    const typeToken = JSON.parse(typeTokenLocal);
    const user = JSON.parse(userLocal);

    // kiểm tra giỏ hàng có sản phẩm không
    if (cartLocal) {
      const cartData = JSON.parse(cartLocal);
      if(cartData.length == 0) {
        alert('Giỏ hàng của bạn đang trống, vui lòng thêm sản phẩm vào giỏ hàng để thanh toán');
        window.location.href = '/collection/all';
        return;
      }
      setOrderInfo({...orderInfo, totalOrder : cartData.reduce((total:number, cart:any) => total + (cart.gia_san_pham * cart.so_luong_san_pham), 0)});
      setCarts(cartData);
      console.log(cartData);
    }


    // Lấy địa chỉ của người dùng
    const responseAddress = await fetch('https://huunghi.id.vn/api/address/listAddress', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${typeToken} ${accessToken}`,
      },
    });
    const resultAddress = await responseAddress.json();
    setAddressOfUser(resultAddress.data.address);

    // Lấy danh sách tỉnh/thành phố
    const responseProvince = await fetch('https://huunghi.id.vn/api/function/getProvince');
    const resultProvince = await responseProvince.json();
    setArrayProvince(resultProvince.province.data);

    // Lấy danh sách phương thức thanh toán
    const responsePaymentMethods = await fetch('https://huunghi.id.vn/api/paymentMethod/getAllMethod');
    const resultPaymentMethods = await responsePaymentMethods.json();
    setArrMethodPayment(resultPaymentMethods.data.paymentMethod);

    // Lấy danh sách mã giảm giá
    const responseDiscount = await fetch('https://huunghi.id.vn/api/voucher/getFourVoucher');
    const resultDiscount = await responseDiscount.json();
    console.log('resultDiscount', resultDiscount);
    setDiscountOptions(resultDiscount.data.vouchers);

  }


// Lấy danh sách quận/huyện theo tỉnh/thành phố
  const getDistrict = async (idProvince:number) =>{
    const res = await fetch(`https://huunghi.id.vn/api/function/getDistrict/${idProvince}`)
    const result = await res.json();
    const district = result.district.data;
    setArrDistrict(district);
  }


  // Lấy danh sách phường/xã theo quận/huyện
  const getWard = async (idDistrict:number) => {
    const res = await fetch(`https://huunghi.id.vn/api/function/getWard/${idDistrict}`)
    const result = await res.json();
    const ward = result.ward.data;
    setArrWard(ward);
    console.log('ward', ward);
  }


useEffect(() => {
    fetchData();
},[]);

const setLocation = (idWard:number) => {
    if(isNaN(idWard)){
        return;
    }
    setSelectedWard(idWard);
    const province = arrayProvince.find( province => province.ProvinceID == selectedProvince);
    const district = arrDistrict.find( district => district.DistrictID == selectedDistrict);
    const ward = arrWard.find( ward => ward.WardCode === idWard);

    console.log('pro',province.ProvinceName);
    console.log('dis',district.DistrictName);
    setOrderInfo({
        ...orderInfo,
        location : `${orderInfo.address} ${ward.WardName}, ${district.DistrictName}, ${province.ProvinceName}`,
    })

}

const Pay = async () => {
    
    let arrError:any = {}
    let flag = true; 
    
    if(selectedProvince === undefined) {
        arrError.province = 'Vui lòng chọn tỉnh/thành phố'
        flag = false;
    }

    if(selectedDistrict === undefined) {
        arrError.district = 'Vui lòng chọn quận/huyện'
        flag = false;
    }

    if(selectedWard === undefined) {
        arrError.ward = 'Vui lòng chọn phường/xã'
        flag = false;
    }

    if(orderInfo.phone === '') {
        arrError.phone = 'Vui lòng nhập số điện thoại';
        flag = false;
    }
    
    if(orderInfo.address === '') {
        arrError.address = 'Vui lòng nhập địa chỉ';
        flag = false;
    }
    if(orderInfo.name === '') {
        arrError.name = 'Vui lòng nhập tên';
        flag = false;
    }

    setErrors({...errors,
        name : arrError.name ? arrError.name : '',
        phone : arrError.phone ? arrError.phone : '',
        address : arrError.address ? arrError.address : '',
        province : arrError.province ? arrError.province : '',
        district : arrError.district ? arrError.district : '',
        ward : arrError.ward ? arrError.ward : '',
    })

    if(flag == true){

        const accessTokenLocal = localStorage.getItem('accessToken');
        const typeTokenLocal = localStorage.getItem('typeToken');
        const userLocal = localStorage.getItem('user');

        if(accessTokenLocal && typeTokenLocal && userLocal){
            try {
                const res = await fetch(`https://huunghi.id.vn/api/order/addOrder`,{
                    method : "POST",
                    headers : {
                        'Content-Type' : 'application/json',
                        'Authorization' : `${JSON.parse(typeTokenLocal)} ${JSON.parse(accessTokenLocal)}`
                    },
                    body : JSON.stringify({
                        name : orderInfo.name,
                        phone : orderInfo.phone,
                        address : orderInfo.address+' '+orderInfo.location,
                        totalOrder : orderInfo.totalOrder,
                        idVoucher : orderInfo.idVoucher ? orderInfo.idVoucher : null,
                        idPayment : orderInfo.paymentMethod,
                        items : carts
                    })
                })

                const result = await res.json();

                const idOrder = result.data.idOrder;

                if(res.ok){
                    localStorage.setItem('cart',JSON.stringify([]));
                    const responseDeleteCart = await fetch(`https://huunghi.id.vn/api/cart/deleteAllCartOfUser`,{
                        method : "DELETE",
                        headers : {
                            "Content-Type" : "application/json",
                            "Authorization" : `${JSON.parse(typeTokenLocal)} ${JSON.parse(accessTokenLocal)}`
                        }
                    })

                    if(orderInfo.paymentMethod == 3){
                        window.location.href = `/pagePaymentVNPay?idOrder=${idOrder}`
                    }else if(orderInfo.paymentMethod == 1){
                        window.location.href = `/successOrder?idOrder=${idOrder}`
                    }
                }else{
                    alert('Tạo đơn hàng không thành công');
                }
            } catch (error) {

                console.log(error);

            }
        }
    }

    

    
    
}





//   const f

  return (
    <div className="min-h-screen bg-gray-50 mt-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Order Form */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Delivery Information */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center space-x-4 w-80 h-auto">
                            <img src="/assets/images/LogoAgain.png" alt="160Store" className="h-20" />
                        </div> 
                    <h3 className="text-lg font-semibold mb-4">Thông tin giao hàng</h3>
                    
                    <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                        <i className="fas fa-user text-gray-500"></i>
                        </div>
                        <div>
                        <p className="text-gray-600">()</p>
                        <p className="text-blue-500 cursor-pointer hover:underline">Đăng xuất</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Thêm địa chỉ mới</label>
                            <select onChange={(e) => {changeAdress(parseInt(e.target.value))}} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                <option value="">Chọn địa chỉ giao hàng</option>
                                {addressOfUser.map((address,index) => (
                                    <option
                                        value={address.id_dia_chi_giao_hang}
                                        key={index}
                                    >
                                        {address.ten_nguoi_nhan+', '+address.so_dien_thoai_nguoi_nhan+', '+address.dia_chi_nguoi_nhan}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Họ và tên</label>
                            <input
                                type="text"
                                value={orderInfo.name}
                                onChange={(e) => setOrderInfo({...orderInfo, name: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập họ và tên"
                            />
                            {errors.name}
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Số điện thoại</label>
                            <input
                                type="text"
                                value={orderInfo.phone}
                                onChange={(e) => setOrderInfo({...orderInfo, phone: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.phone}
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Địa chỉ</label>
                            <input
                                type="text"
                                placeholder='Địa chỉ'
                                value={orderInfo.address}
                                onChange={(e) => setOrderInfo({...orderInfo, address: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.address}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-3 gap-2">
                            <select
                                // value={selectedProvince}
                                onChange={(e:any)=> {

                                    !isNaN(e.target.value) ? setSelectedProvince(e.target.value) : setSelectedProvince(undefined);

                                    setArrDistrict([]);
                                    setArrWard([]);

                                    setSelectedDistrict(undefined);
                                    setSelectedWard(undefined);

                                    !isNaN(e.target.value) ? getDistrict(e.target.value) : setArrDistrict([]);

                                }}
                                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                                <option>Chọn tỉnh/thành phố</option>
                                {arrayProvince.map((province,index)=>(
                                    <option 
                                        key={index}
                                        value={province.ProvinceID}
                                    >
                                        {province?.ProvinceName}
                                    </option>
                                ))}
                            </select>
                            {errors.province}
                            <select
                                onChange={(e:any) => {

                                    !isNaN(e.target.value) ? setSelectedDistrict(e.target.value) : setSelectedDistrict(undefined);

                                    setSelectedWard(undefined);

                                    !isNaN(e.target.value) ? getWard(e.target.value) : setArrWard([]);
                                }}

                                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                                <option >Chọn Quận/huyện</option>
                                {arrDistrict.map((district,index) => (
                                    <option 
                                        key={index}
                                        value={district.DistrictID}
                                    >
                                        {district.DistrictName}
                                    </option>
                                ))}
                            </select>
                            {errors.district}
                            <select
                                onChange={(e:any) => {

                                    if(!isNaN(e.target.value)) {
                                        setLocation(e.target.value);
                                        setSelectedWard(e.target.value)  
                                    };
                                }}
                                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                                <option value={undefined} >Chọn Phường/xã</option>
                                {arrWard.map((ward,index) => (
                                    <option 
                                        key={index}
                                        value={ward.WardCode}
                                    >
                                        {ward.WardName}
                                    </option>
                                ))}
                            </select>
                            {errors.ward}
                        </div>

                        </div>
                    </div>
                    {/* Shipping Method */}
                    <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">Phương thức vận chuyển</h3>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                        <i className="fas fa-file-alt text-gray-400 text-2xl"></i>
                        </div>
                        <p className="text-gray-500">Vui lòng chọn tỉnh / thành để có danh sách phương thức vận chuyển.</p>
                    </div>
                    </div>

                    {/* Payment Method */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold mb-4">Phương thức thanh toán</h3>
                        <div className="space-y-3">
                            <div className="ml-8 text-sm text-gray-600">
                            <p>Hiện tại là thành viên Silver hoặc Gold/Diamond, nhận viền áo cộng điểm giảm giá khi mua các sản phẩm.</p>
                            <p className="text-blue-500">- Freeship đơn từ 399K</p>
                            </div>
                            {arrMethodPayment.map((method, index) => (
                                <label key={index} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                                    <input
                                        type="radio"
                                        name="payment"
                                        checked={orderInfo.paymentMethod === method.id_phuong_thuc_thanh_toan}
                                        value={method.id_phuong_thuc_thanh_toan}
                                        onChange={(e) => setOrderInfo({...orderInfo, paymentMethod : parseInt(e.target.value)})}
                                        className="mr-3"
                                    />
                                    <img src={`https://huunghi.id.vn/${method.hinh_anh}`} width={50} height={50} alt="" />
                                    <span> {method.ten_phuong_thuc}</span>
                                </label>
                            ))}
                            {/* <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                            <input
                                type="radio"
                                name="payment"
                                value="vnpay"
                                checked={orderInfo.paymentMethod === 'vnpay'}
                                onChange={(e) => setOrderInfo({...orderInfo, paymentMethod: e.target.value})}
                                className="mr-3"
                            />
                                <img src="https://hstatic.net/0/0/global/design/seller/image/payment/vnpay_new.svg?v=6" width={50} height={50} alt="" />
                                <span> Thanh toán VNPay</span>
                            </label> */}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4">
                        <button className="px-6 py-3 text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-50">
                            Giỏ hàng
                        </button>
                        <button
                            onClick={(e) => Pay()}
                            className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                            Hoàn tất đơn hàng
                        </button>
                    </div>
                </div>
            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow p-6 sticky top-6">
                {carts.map((cart,index)=>(
                    <div key={index} className="flex items-center mb-6">
                        <img 
                        src={`https://huunghi.id.vn/storage/products/${cart.anh_san_pham}`}
                        alt="Product" 
                        className="w-12 h-12  rounded-lg mr-4"
                        />
                        <div className="flex-1">
                        <h4 className="font-medium">{cart.ten_san_pham}</h4>
                        <p className="text-sm text-gray-600">Số lượng: {cart.so_luong_san_pham}</p>
                        <p className="text-sm text-gray-500">{cart.mau_san_pham} / {cart.kich_thuoc_san_pham}</p>
                        </div>
                        <span className="font-semibold">{cart.gia_san_pham.toLocaleString('vi-VN')}đ</span>
                    </div>
                ))}
                    <hr className='mb-2' />
                <div className="flex items-center justify-between mb-4">
                    <input
                    value={inputDiscount}
                    onChange={(e) => setInputDiscount(e.target.value)}
                    type="text"
                    placeholder="Mã giảm giá"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mr-4"
                    />
                    <button onClick={() => useVoucher(inputDiscount, orderInfo.totalOrder)} className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500">
                    Sử dụng
                    </button>
                </div>
                
                <div className="mb-4">
                    <p className="text-blue-500 cursor-pointer hover:underline mb-3">
                    <i className="fas fa-plus mr-2"></i>Xem thêm mã giảm giá
                    </p>
                    <div className="flex flex-wrap gap-2">
                    {discountOptions.map((option, index) => (
                        <button
                        key={index}
                        onClick={() => setInputDiscount(option.ma_giam_gia)}
                        className={`px-3 py-1 border rounded-full text-sm transition-colors ${
                            selectedDiscount === option.value
                            ? 'border-blue-500 text-blue-500 bg-blue-50'
                            : 'border-blue-300 text-blue-600 hover:border-blue-500'
                        }`}
                        >
                        Giảm {option.loai_giam_gia == 'so_tien' ? option.gia_tri_giam.toLocaleString('vi-VN')+' đ' : option.gia_tri_giam+' %'}
                        </button>
                    ))}
                    </div>
                </div>
                    <hr className='mb-2' />
                <h3 className="text-lg font-semibold mb-4">Chương trình khách hàng thân thiết</h3> 
                    <hr className='mb-2' />
                <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                    <span>Tạm tính</span>
                    <span>{carts.reduce((total,cart) => total + cart.gia_san_pham * cart.so_luong_san_pham,0).toLocaleString('vi-VN')} đ</span>
                    </div>
                    <div className="flex justify-between">
                    <span>Giảm giá</span>
                    <span>{orderInfo.idVoucher ? ( selectedDiscount?.loai_giam_gia === 'so_tien'? selectedDiscount?.gia_tri_giam.toLocaleString('vi-VN') +' đ' : selectedDiscount?.gia_tri_giam+' %'  ) : 'Không có'}</span>
                    </div>
                    <div className="flex justify-between">
                    <span>Phí vận chuyển</span>
                    <span>-</span>
                    </div>
                    <hr className='mb-2' />
                    <div className="flex justify-between font-semibold text-lg">
                    <span>Tổng cộng</span>
                    <span>{orderInfo.totalOrder.toLocaleString('vi-VN')} đ</span>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
  );
};

export default PayPage;