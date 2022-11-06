import { createSlice } from "@reduxjs/toolkit";

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
    addItem: (state, action) => {
      const possibleItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (possibleItem) {
        possibleItem.quantity += action.payload.quantity;
        return;
      }
      state.cart = [...state.cart, action.payload];
    },
    removeItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    emptyCart: (state) => {
      state.cart = [];
    },
  },
});

export const { setCart, addItem, removeItem, emptyCart } = cartSlice.actions;

export const selectCart = (state) => state[cartSlice.name].cart;
export const selectCartCount = (state) =>
  state[cartSlice.name].cart.reduce((prev, curr) => prev + curr.quantity, 0);
