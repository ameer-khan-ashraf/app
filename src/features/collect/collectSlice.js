import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCount, insertItem, storeImages } from "./collectAPI";

const initialState = {
  status: "idle",
  category: null,
  subcategory: null,
  attributes: {},
  media: [],
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const insert = createAsyncThunk("collect/insert", async (data) => {
  const { item, user }  = data;
  const response = await insertItem(item, user);
  // The value we return becomes the `fulfilled` action payload
  return response;
});

export const collectSlice = createSlice({
  name: "collect",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSubcategory: (state, action) => {
      state.subcategory = action.payload;
    },
    setAttributes: (state, action) => {
      state.attributes = action.payload;
    },
    setMedia: (state, action) => {
      state.media = action.payload;
    },
    resetCollect: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(insert.pending, (state) => {
        state.status = "loading";
      })
      .addCase(insert.fulfilled, (state, action) => {
        state.status = "idle";
      });
  },
});

export const {
  setCategory,
  setSubcategory,
  setAttributes,
  setMedia,
  resetCollect,
} = collectSlice.actions;

export default collectSlice.reducer;
