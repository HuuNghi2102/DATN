'use client';
import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { CartItem } from '../compoments/CartItem';

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
      const exist = state.cart.find(item =>
        item.id_variant === action.payload.id_variant &&
        item.size === action.payload.size &&
        item.color === action.payload.color
      );
      let newCart;
      if (exist) {
        newCart = state.cart.map(item =>
          item.id_variant === action.payload.id_variant &&
          item.size === action.payload.size &&
          item.color === action.payload.color
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        newCart = [...state.cart, action.payload];
      }

      // ✅ Lưu vào localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(newCart));
      }

      return { cart: newCart };
    }

    case 'REMOVE_FROM_CART': {
      const newCart = state.cart.filter(item =>
        !(
          item.id_variant === action.payload.id_variant &&
          item.size === action.payload.size &&
          item.color === action.payload.color
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
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        try {
          const parsed = JSON.parse(storedCart);
          if (Array.isArray(parsed)) {
            dispatch({ type: 'SET_CART', payload: parsed });
          }
        } catch (e) {
          console.error('Cart JSON không hợp lệ:', e);
        }
      }
    }
  }, []);

  // ✅ Nếu có token, lấy cart từ server
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const accessToken = localStorage.getItem('accessToken');
      const typeToken = localStorage.getItem('typeToken') || 'Bearer';

      if (accessToken) {
        fetch('https://huunghi.id.vn/api/cart/getListCartOfUser', {
          headers: {
            Authorization: `${typeToken} ${accessToken}`,
          },
        })
          .then(res => res.json())
          .then(data => {
            if (Array.isArray(data?.cart)) {
              dispatch({ type: 'SET_CART', payload: data.cart });

              // Lưu vào localStorage luôn nếu muốn
              localStorage.setItem('cart', JSON.stringify(data.cart));
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
