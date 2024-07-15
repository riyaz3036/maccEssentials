import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {},
  reducers: {
    // Replace the entire product object
    setProduct: (state, action) => {
      return { ...action.payload };
    },
    // Clear the product object
    clearProduct: () => {
      return {};
    },
  },
});

export const { setProduct, clearProduct } = productSlice.actions;
export default productSlice.reducer;
