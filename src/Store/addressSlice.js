import { createSlice } from '@reduxjs/toolkit';

const addressSlice = createSlice({
  name: 'address',
  initialState: {
    firstname: '',
    lastname: '',
    street: '',
    locality: '',
    country: '',
    pincode: '',
    phone: '',
  },
  reducers: {
    updateAddress: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateAddress } = addressSlice.actions;
export default addressSlice.reducer;
