import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addOrder } from './OrdersApi';
const initialState = {
  orders:[],
  status: 'idle',
  currentOrderStatus:null
};

//we may need more info of current order

export const addOrderAsync = createAsyncThunk(
    'order/addOrder',
    async (order) => {
      const response = await addOrder(order);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );
  

export const counterSlice = createSlice({
  name: 'order',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
      resetOrder:(state)=>{
        state.currentOrderStatus = null
      }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(addOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        state.currentOrderStatus = action.payload
      });
  },
});
export const {resetOrder} = counterSlice.actions;
export const selectCurrentOrderStatus = (state) => state.order.currentOrderStatus;



export default counterSlice.reducer;
