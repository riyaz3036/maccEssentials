import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add a product to the cart if it doesn't already exist
    addToCart: (state, action) => {
      const product = action.payload;
      // Check if the product is already in the cart
      if (!state.some(item => item.asin === product.asin)) {
        state.push(product);
      }
    },
    // Remove a product from the cart
    removeFromCart: (state, action) => {
      return state.filter(item => item.asin !== action.payload);
    },
    // Clear the entire cart
    clearCart: () => {
      return [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
