import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    addCartItem: (state, action) => {
      const possibleItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (possibleItem) {
        const prevQuantity = possibleItem.quantity;
        Object.assign(possibleItem, action.payload);
        possibleItem.quantity = prevQuantity + action.payload.quantity;
        return;
      }
      state.cart = [...state.cart, action.payload];
    },
    updateCartItem: (state, action) => {
      const possibleItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (possibleItem) {
        Object.assign(possibleItem, action.payload);
      }
    },
    removeCartItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    removeCartItems: (state, action) => {
      state.cart = state.cart.filter(
        (item) => !action.payload.includes(item.id)
      );
    },
    emptyCart: (state) => {
      state.cart = [];
    },
    updateCartQuantity: (state, action) => {
      const possibleItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (possibleItem) {
        possibleItem.quantity = action.payload.quantity;
      }
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.cart,
      };
    },
  },
});

export const {
  setCart,
  addCartItem,
  removeCartItem,
  emptyCart,
  updateCartQuantity,
  removeCartItems,
  updateCartItem,
} = cartSlice.actions;

export const selectCart = (state) => state[cartSlice.name].cart;
export const selectCartItem = (id) => (state) =>
  state[cartSlice.name].cart.find((item) => item.id === id);
export const selectCartCount = (state) =>
  state[cartSlice.name].cart.reduce((prev, curr) => prev + curr.quantity, 0);
export const selectCartTotal = (state) =>
  state[cartSlice.name].cart.reduce(
    (prev, curr) => prev + curr.price * curr.quantity,
    0
  );
