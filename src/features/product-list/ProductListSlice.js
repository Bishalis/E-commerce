import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts ,fetchAllProductsFilter} from "./ProductApi";

const initialState = {
  products: [],
  status: "idle",
  totalItems:0
};

export const fetchAllProductAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
);


export const fetchAllProductByFilterAsync = createAsyncThunk(
  "product/fetchAllProductsFilter",
  async ({filter,sort,pagination}) => {
    const response = await fetchAllProductsFilter(filter,sort,pagination);
    return response.data;
  }
);

export const productListSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })

      .addCase(fetchAllProductByFilterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductByFilterAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
  },
});


export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;

export default productListSlice.reducer;

