export type url = string;

export interface State {
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
    addToCart: string;
    removeFromCart: string;
    updateQuantity: string;
    clearCart: string;
    updateTotal: string;
  };
}
