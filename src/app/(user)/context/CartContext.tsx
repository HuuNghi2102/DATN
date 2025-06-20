'use client';
import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { CartItem } from '../compoments/CartItem';
import addToCart from '../compoments/addToCart';

type Action =
  | { type: 'SET_CART'; payload: CartItem[] }
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: { id_variant: number; size: string; color: string }}
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
        addToCart(action.payload);
        window.location.href ='/cart'
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
  // ✅ Nếu có token, lấy cart từ server
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const accessToken = localStorage.getItem('accessToken');
      const typeToken = localStorage.getItem('typeToken');

      if (accessToken && typeToken){
        const parseaccessToken = JSON.parse(accessToken);
        const parsetypeToken = JSON.parse(typeToken);
        fetch('https://huunghi.id.vn/api/cart/getListCartOfUser', {
          method: "GET",
          headers: {
            "Content-Type" : "application/json",
            "Authorization": ` ${parsetypeToken} ${parseaccessToken}`,
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
