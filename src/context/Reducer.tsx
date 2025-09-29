interface Cart {
  [productId: string]: {
    [size: string]: number;
  };
}
const calculateCount = (cart: Cart) => {
  let quantity = 0;
  for (const key in cart) {
    for (const size in cart[key]) {
      quantity += cart[key][size];
    }
  }
  return quantity;
};

export default function reducer(state: any, action: any) {
  let updatedCart = {} as Cart;
  switch (action.type) {
    case "ADD_TO_CART":
      updatedCart = { ...state.cart };
      if (updatedCart[action.payload.id]) {
        updatedCart[action.payload.id][action.payload.size]
          ? (updatedCart[action.payload.id][action.payload.size] += 1)
          : (updatedCart[action.payload.id][action.payload.size] = 1);
      } else {
        updatedCart[action.payload.id] = {
          [action.payload.size]: 1,
        };
      }
      return {
        ...state,
        cart: updatedCart,
        cartProductsCount: calculateCount(updatedCart),
      };
    case "UPDATE_QUANTITY":
      updatedCart = { ...state.cart };
      updatedCart[action.payload.id][action.payload.size] = parseInt(
        action.payload.quantity
      );
      return {
        ...state,
        cart: updatedCart,
        cartProductsCount: calculateCount(updatedCart),
      };
    case "REMOVE_FROM_CART":
      updatedCart = { ...state.cart };
      delete updatedCart[action.payload.id][action.payload.size];
      if (Object.keys(updatedCart[action.payload.id]).length === 0) {
        delete updatedCart[action.payload.id];
      }
      return {
        ...state,
        cart: updatedCart,
        cartProductsCount: calculateCount(updatedCart),
      };

    case "UPDATE_TOTAL":
      return {
        ...state,
        total: action.payload.total,
      };
    case "CLEAR_CART":
      return {
        ...state,
        cart: {},
        cartProductsCount: 0,
        total: 0,
      };
    case "ADD_TO_WISHLIST":
      updatedCart = { ...state.wishlist };
      if (updatedCart[action.payload.id]) {
        updatedCart[action.payload.id][action.payload.size]
          ? (updatedCart[action.payload.id][action.payload.size] += 1)
          : (updatedCart[action.payload.id][action.payload.size] = 1);
      } else {
        updatedCart[action.payload.id] = {
          [action.payload.size]: 1,
        };
      }
      return {
        ...state,
        wishlist: updatedCart,
        wishlistProductsCount: calculateCount(updatedCart),
      };
    case "REMOVE_FROM_WISHLIST":
      updatedCart = { ...state.wishlist };
      delete updatedCart[action.payload.id][action.payload.size];
      return {
        ...state,
        wishlist: updatedCart,
        wishlistProductsCount: calculateCount(updatedCart),
      };
    case "CLEAR_WISHLIST":
      return {
        ...state,
        wishlist: {},
        wishlistProductsCount: 0,
      };
    case "REGISTER":
      console.log("User registration:", action.payload);
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case "LOGIN":
      console.log("User login:", action.payload);
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case "LOGOUT":
      console.log("User logout");
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
}
