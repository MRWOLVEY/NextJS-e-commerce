"use client";
import { createContext, useState, useReducer, useEffect } from "react";
import reducer from "@/context/Reducer";
import { State, Action, values } from "@/data/types";
import { register } from "module";
import { set } from "zod";

export const ShopContext = createContext({} as values);

const ShopContextProvider = ({ children }: { children: React.ReactNode }) => {
  // Check if we're in the browser environment before accessing document.cookie
  const checkCookieAuth = () => {
    if (typeof window !== "undefined") {
      return document.cookie.includes("token=loggedin");
    }
    return false; // Default to false during SSR
  };

  const initialState = {
    cartProductsCount: 0,
    cart: {},
    wishlistProductsCount: 0,
    wishlist: {},
    total: 0,
    isLoggedIn: false, // Always start with false for SSR consistency
    user: null,
  };
  const actions = {
    addToCart: "ADD_TO_CART",
    addToWishlist: "ADD_TO_WISHLIST",
    removeFromCart: "REMOVE_FROM_CART",
    removeFromWishlist: "REMOVE_FROM_WISHLIST",
    updateQuantity: "UPDATE_QUANTITY",
    clearCart: "CLEAR_CART",
    clearWishlist: "CLEAR_WISHLIST",
    updateTotal: "UPDATE_TOTAL",
    register: "REGISTER",
    setAuth: "SET_AUTH",
    login: "LOGIN",
    logout: "LOGOUT",
  };

  // Define types for state and action

  const [state, dispatch] = useReducer<any, any>(reducer, initialState);

  // Update auth state after component mounts to ensure client/server consistency
  useEffect(() => {
    const isLoggedIn = checkCookieAuth();
    if (state.isLoggedIn !== isLoggedIn) {
      dispatch({ type: actions.setAuth, payload: isLoggedIn });
    }
  }, []);

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
