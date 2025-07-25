"use client";
import { access } from "fs";
import React, { createContext, useContext, useReducer } from "react";

type Action =
  | { type: "ADD"; payload: Cart }
  | { type: "DELETE"; payload: Cart };

interface Cart {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

type CartState = {
  cart: Cart[];
};

const cartDefault = [
  {
    id: 1,
    name: "sang",
    image: "123.jpg",
    price: 600000,
    quantity: 5,
  },
  {
    id: 2,
    name: "Sang Sang 3",
    image: "123.jpg",
    price: 200000,
    quantity: 5,
  },
  {
    id: 3,
    name: "Sang Sang 4",
    image: "123.jpg",
    price: 600000,
    quantity: 3,
  },
];

function countReducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "ADD":
      return { cart: [action.payload, ...state.cart] };
    case "DELETE":
      return { cart: state.cart.filter((c, i) => c.id != action.payload.id) };
    default:
      return { cart: state.cart };
  }
}


// giá trị khởi tạo mặc định nếu không nằm trong CartContex.Provider
const CartContex = createContext<{
  state: CartState;
  dispatch: React.Dispatch<Action>;
}>({ state: { cart: cartDefault }, dispatch: () => {} });

export const CountProvider = ({ children }: { children: React.ReactNode }) => {

  // giá trị khởi tạo mặc định nếu nằm trong CartContex.Provider
  const [state, dispatch] = useReducer(countReducer, { cart: cartDefault });
  return (
    <CartContex.Provider value={{ state, dispatch }}>
      {children}
    </CartContex.Provider>
  );
};

export const useCart = () => useContext(CartContex);
