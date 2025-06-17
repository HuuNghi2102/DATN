'use client'
import { redirect, useSearchParams } from "next/navigation"
import { useEffect } from "react";

const pageHandleGoogle = () => {
    const useSearchParam = useSearchParams();
    const accessToken = useSearchParam.get('accessToken');

    useEffect(()=>{
        if(accessToken){
            fetchUser();
        }else{
            alert('Token không hợp lệ vui lòng đăng nhập lại')
            window.location.href = '/login';
        }
    },[])

    const fetchUser = async () => {
            const res = await fetch('https://huunghi.id.vn/api/user/getUser',{
                headers : {
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${accessToken}`
                }
            })
            const result = await res.json();

            if(res.ok){
                const user = result.user;
                localStorage.setItem('accessToken',JSON.stringify(accessToken));
                localStorage.setItem('user',JSON.stringify(user));
                localStorage.setItem('typeToken',JSON.stringify('Bearer')); 
                window.location.href = '/userprofile'
            }else{
                alert('Token không hợp lệ vui lòng đăng nhập lại')
                window.location.href = '/login'
            }
        }



}

export default pageHandleGoogle;