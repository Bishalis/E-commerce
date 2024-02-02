import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { fetchCount } from './counterAPI';
import { fetchLoggedInUserOrders } from "./UserApi";

const initialState = {
  userOrders:[],  
  status: "idle",
};

export const fetchUserLoggedInOrderAsync = createAsyncThunk(
  "user/fetchLoggedInUserOrders",
  async (id) => {
    const response = await fetchLoggedInUserOrders(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserLoggedInOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserLoggedInOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userOrders = action.payload;
      });
  },
});

export const selectUserOrders = (state) => state.user.userOrders;

export default counterSlice.reducer;
