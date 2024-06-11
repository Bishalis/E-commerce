import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { fetchCount } from './counterAPI';
import {
  fetchLoggedInUser,
  fetchLoggedInOrders,
  updateUser,
} from "./UserApi";

const initialState = {
  status: "idle",
  userInfo: null, // this will have more info
};

export const fetchUserLoggedInOrderAsync = createAsyncThunk(
  "user/fetchLoggedInOrders",
  async () => {
    const response = await fetchLoggedInOrders();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchloggedInUserAsync = createAsyncThunk(
  "user/fetchLoggedInUser",
  async () => {
    const response = await fetchLoggedInUser();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (id) => {
    const response = await updateUser(id);
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
        state.userInfo.orders = action.payload;
      })

      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(fetchloggedInUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchloggedInUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      });
  },
});


export const selectUserOrders = (state) => state.user.userInfo.orders;
export const selectUserInfo = (state) => state.user.userInfo;

export default counterSlice.reducer;


