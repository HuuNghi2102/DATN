'use client';
import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { CartItem } from '../compoments/CartItem';
import { log } from 'node:console';

type Action =
  | { type: 'SET_CART'; payload: CartItem[] }
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: { id_variant: number; size: string; color: string } }
  | { type: 'CLEAR_CART' };

type CartState = {
  cart: CartItem[];
};

const initialState: CartState = {
  cart: [],
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

function cartReducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case 'SET_CART':
      return { cart: action.payload };

    case 'ADD_TO_CART': {
      const accessToken = localStorage.getItem("accessToken");
      const typeToken = localStorage.getItem("typeToken");
      const user = localStorage.getItem("user");
      if (accessToken && typeToken && user) {
        const parsetoken = JSON.parse(accessToken);
        console.log(parsetoken)
        const parsetypeToken = JSON.parse(typeToken);
        console.log(parsetypeToken);
        fetch("https://huunghi.id.vn/api/cart/addToCart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer 60|7ivF4jPa1tTb85iUutQ28xBWnRqll5ZXoMubO5Gk846e5728`
          },
          body: JSON.stringify({
            name: action.payload.ten_san_pham,
            image: action.payload.anh_san_pham,
            slug: action.payload.duong_dan,
            size: action.payload.kich_thuoc_san_pham,
            color: action.payload.mau_san_pham,
            quantity: action.payload.so_luong_san_pham,
            price: action.payload.gia_san_pham,
            idVariant: action.payload.id_san_pham_bien_the,
          })
        })
          .then(res => res.json())
          .then(data => {
            alert(data.message);
            return;
          })
          .catch(err => console.error('Lỗi tải cart từ server:', err));
      
      }
      const exist = state.cart.find(item =>
        item.id_san_pham_bien_the === action.payload.id_san_pham_bien_the &&
        item.kich_thuoc_san_pham === action.payload.kich_thuoc_san_pham &&
        item.mau_san_pham === action.payload.mau_san_pham
      );
      let newCart;
      if (exist) {
        newCart = state.cart.map(item =>
          item.id_san_pham_bien_the === action.payload.id_san_pham_bien_the &&
          item.kich_thuoc_san_pham === action.payload.kich_thuoc_san_pham &&
          item.mau_san_pham === action.payload.mau_san_pham
            ? { ...item, quantity: item.so_luong_san_pham + action.payload.so_luong_san_pham }
            : item
        );
      } else {
        newCart = [...state.cart, action.payload];
      }

      // ✅ Lưu vào localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(newCart));
      }
      // window.location.href = '/cart'
      return { cart: newCart };

    }

    case 'REMOVE_FROM_CART': {
      const newCart = state.cart.filter(item =>
        !(
          item.id_san_pham_bien_the === action.payload.id_variant &&
          item.kich_thuoc_san_pham === action.payload.size &&
          item.mau_san_pham === action.payload.color
        )
      );
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(newCart));
      }
      return { cart: newCart };
    }

    case 'CLEAR_CART': {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('cart');
      }
      return { cart: [] };
    }
    default:
      return state;
  }
}

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // ✅ Load cart từ localStorage trước (không cần token)
  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const storedCart = localStorage.getItem('cart');
  //     if (storedCart) {
  //       try {
  //         const parsed = JSON.parse(storedCart);
  //         if (Array.isArray(parsed)) {
  //           dispatch({ type: 'SET_CART', payload: parsed });
  //         }
  //       } catch (e) {
  //         console.error('Cart JSON không hợp lệ:', e);
  //       }
  //     }
  //   }
  // }, []);

  // ✅ Nếu có token, lấy cart từ server
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const accessToken = localStorage.getItem('accessToken');
      const typeToken = localStorage.getItem('typeToken') || 'Bearer';

      if (accessToken) {
        fetch('https://huunghi.id.vn/api/cart/getListCartOfUser', {
          method: "GET",
          headers: {
            "Content-Type" : "application/json",
            "Authorization": ` ${JSON.parse(typeToken)} ${JSON.parse(accessToken)}`,
          },
        })
          .then(res => res.json())
          .then(data => {
            if (Array.isArray(data?.data.carts)) {
              dispatch({ type: 'SET_CART', payload: data.data.carts });
              // Lưu vào localStorage luôn nếu muốn
              localStorage.setItem('cart', JSON.stringify(data.data.carts));
            }
          })
          .catch(err => console.error('Lỗi tải cart từ server:', err));
      }
    }
  }, []);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
