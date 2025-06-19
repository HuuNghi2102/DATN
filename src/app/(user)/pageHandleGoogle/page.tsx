'use client'
import { redirect, useSearchParams } from "next/navigation"
import { useEffect } from "react";

const pageHandleGoogle = () => {
    const useSearchParam = useSearchParams();
    const accessToken = useSearchParam.get('accessToken');

    useEffect(() => {
        if (accessToken) {
            fetchUser();
        } else {
            alert('Token không hợp lệ vui lòng đăng nhập lại')
            window.location.href = '/login';
        }
    }, [])

    const fetchUser = async () => {
        const res = await fetch('https://huunghi.id.vn/api/user/getUser', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        })
        const result = await res.json();

        if (res.ok) {
            const carts = localStorage.getItem('cart');
            if (carts) {
                const arrCarts = JSON.parse(carts);
                const resAddCart = await fetch(`https://huunghi.id.vn/api/cart/insertArrayCart`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({
                        carts: arrCarts
                    })
                })
            }
            const user = result.user;
            localStorage.setItem('accessToken', JSON.stringify(accessToken));
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('typeToken', JSON.stringify('Bearer'));
            window.location.href = '/userprofile'
        } else {
            alert('Token không hợp lệ vui lòng đăng nhập lại')
            window.location.href = '/login'
        }
    }



}

export default pageHandleGoogle;