export type url = string;

export interface State {
  isLoggedIn: boolean;
  cartProductsCount: number;
  // cart: { [key: string]: number };
  cart: { [key: string]: number | string };
  total: number;
}
export interface Action {
  type: string;
  payload?: any;
}
export interface values {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  state: State;
  dispatch: React.Dispatch<Action>;
  actions: {
    addToWishlist: string;
    addToCart: string;
    removeFromCart: string;
    updateQuantity: string;
    clearCart: string;
    updateTotal: string;
    removeFromWishlist: string;
    clearWishlist: string;
    register: string;
    login: string;
    logout: string;
  };
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  type: string;
  category: string;
  subCategory: string;
  image: string[];
  [key: string]: any;
}
