import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  loading: true,
  error: null,
  data: null,
};

export const getResult = createAsyncThunk(
  "result/getResult",
  async (userId, thunkAPI) => {
    const { data } = await axios.get(`http://35.184.195.100:3000/api/result?userId=${userId}`);
    return data;
  }
);

export const resultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
    
  },
  extraReducers: {
    [getResult.pending.type]: (state) => {
      state.loading = true;
    },
    [getResult.fulfilled.type]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    [getResult.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  }
});
