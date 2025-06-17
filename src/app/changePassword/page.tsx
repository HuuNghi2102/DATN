'use client';
import React, { useEffect, useState } from 'react';
import userInterface from '../compoments/userInterface';
import Link from 'next/link';

export default function ChangePassword() {
  const [user, setUser] = useState<userInterface>();
  const [accessToken,setAccessToken] = useState('');
  const [typeToken,setTypeToken] = useState('');
  const [message,setMessage] =useState('');
  const [formPassword,setFormPassword] = useState({
    passOld : '',
    passNew : '',
    passConfirm : '',
  })

  const [errPassword,setErrPassword] = useState({
    passOld : '',
    passNew : '',
    passConfirm : '',
  })



  const changeValue = (e:any) => {
    const {name , value} = e.target;
    setFormPassword((element) => ({
      ...element,
      [name] : value
    }))
  }

  const changePass = async () => {
    const res = await fetch('https://huunghi.id.vn/api/user/changePassword',{
      method : "POST",
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : `${typeToken} ${accessToken}`
      },
      body : JSON.stringify({
        password : formPassword.passOld,
        newPassword : formPassword.passNew,
        confirmPassword : formPassword.passConfirm,
      })
    })
    const result = await res.json();

    if(result.status == false){
      if(result.errors){
        const err = result.errors
        setErrPassword({
          passOld : err.password  ? err?.password[0] : '',
          passNew : err.newPassword ?  err?.newPassword[0] : '' ,
          passConfirm : err.confirmPassword ? err?.confirmPassword[0] : '',
        })
        return;
      }
      setErrPassword({
        passOld :  '',
        passNew :  '' ,
        passConfirm :  '',
      })
      setMessage(result.message);
      return;
    }else{
      setErrPassword({
        passOld :  '',
        passNew : '' ,
        passConfirm :  '',
      })
      setFormPassword({
        passOld :  '',
        passNew : '' ,
        passConfirm :  '',
      })
      localStorage.setItem('accessToken',JSON.stringify(result.data.token));
      alert(result.message);
    }
  }


  useEffect(() => {

    const u = localStorage.getItem('user');
    const tokenLocal = localStorage.getItem('accessToken');
    const typeTokenLocal = localStorage.getItem('typeToken');

    if (u && tokenLocal && typeTokenLocal) {
      const uu = JSON.parse(u);
      setUser(uu);
      setAccessToken(JSON.parse(tokenLocal));
      setTypeToken(JSON.parse(typeTokenLocal));
    }else{
      alert('Bạn vui lòng đăng nhập!');
      window.location.href = '/login'
    }
  }, []);

  const menuItems = [
    { icon: 'fas fa-user', text: 'Hồ sơ của tôi', href: '/userprofile' },
    { icon: 'fas fa-clipboard-list', text: 'Đơn hàng của tôi', href: '/history-order' },
    { icon: 'fas fa-question-circle', text: 'Yêu cầu hỗ trợ', href: '/yeucauhotro' },
    { icon: 'fas fa-map-marker-alt', text: 'Sổ địa chỉ', href: '/sodiachi' },
    { icon: 'fas fa-ticket-alt', text: 'Vouchers', href: '/' },
    { icon: 'fas fa-heart', text: 'Sản phẩm đã xem', href: '/' },
    { icon: 'fas fa-lock', text: 'Đổi mật khẩu', href: '/changePassword', active: true }
  ];

  return (
    <div className="min-h-screen bg-gray-100 pt-[12%]">
      {/* Font Awesome */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      />

      {/* Breadcrumb */}
      <div className="bg-white border-b px-40 py-3">
        <div className="max-w-[1200px] mx-auto">
          <nav className="text-sm text-gray-600">
            <span><a href="/">Trang chủ</a></span> / <span className="font-medium">Yêu cầu hỗ trợ</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1200px] mx-auto p-4 flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-80 bg-white rounded-lg shadow-sm max-h-[530px] sticky top-40">
          <div className="p-4 border-b bg-gray-50 rounded-t-lg">
            <div className="flex items-center gap-2">
              <i className="fas fa-user text-gray-600"></i>
              <span className="font-medium">Tài khoản của bạn</span>
            </div>
          </div>
          <div className="p-2">
            <div className="text-sm text-gray-600 px-3 py-2">
              Hi, {user?.ten_user || 'Khách'}
            </div>
            <ul className="space-y-1">
              {menuItems.map((item, index) => (
                <li key={index}>
                <Link href={item.href}>
                    <button
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors ${
                        item.active
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
        <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Đổi mật khẩu</h2>

          <div className="mb-4">
            <input name="passOld" id="old" onChange={(e)=> changeValue(e)} type="password" className='w-full h-12 p-4 border-2 rounded-md'  value={formPassword.passOld} placeholder='Mật khẩu cũ' /> <br />
            {errPassword.passOld}
            <input name="passNew" id="new" onChange={(e)=> changeValue(e)} type="password" className='w-full h-12 p-4 my-3 border-2 rounded-md' value={formPassword.passNew}   placeholder='Mật khẩu mới' /> <br />
            {errPassword.passNew}
            <input name="passConfirm" id="Confirm" onChange={(e)=> changeValue(e)} type="password" className='w-full h-12 p-4 border-2 rounded-md' value={formPassword.passConfirm}   placeholder='Xác nhận mật khẩu mới' />
            {errPassword.passConfirm}
          </div>
            {message}
          <div className="flex space-x-3 justify-end">
            <button onClick={()=>changePass()} className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
              Thay đổi
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}
