"use client";
import { createContext, useState, useReducer } from "react";
import reducer from "@/context/Reducer";
import { State, Action, values } from "@/data/types";

export const ShopContext = createContext({} as values);

const ShopContextProvider = ({ children }: { children: React.ReactNode }) => {
  //
  const initialState = {
    cartProductsCount: 0,
    cart: {},
    total: 0,
  };
  const actions = {
    addToCart: "ADD_TO_CART",
    removeFromCart: "REMOVE_FROM_CART",
    updateQuantity: "UPDATE_QUANTITY",
    clearCart: "CLEAR_CART",
    updateTotal: "UPDATE_TOTAL",
  };

  // Define types for state and action

  const [state, dispatch] = useReducer<any, any>(reducer, initialState);
  //
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const values = {
    search,
    setSearch,
    showSearch,
    setShowSearch,
    state,
    dispatch,
    actions,
  };

  return <ShopContext.Provider value={values}>{children}</ShopContext.Provider>;
};
export default ShopContextProvider;
