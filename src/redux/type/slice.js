import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  loading: true,
  error: null,
  data: null,
};

export const getType = createAsyncThunk(
  "resultType/getType",
  async (type, thunkAPI) => {
    const { data } = await axios.get(`http://35.184.195.100:3000/api/card/${type}`);
    
    return data;
  }
);

export const typeSlice = createSlice({
  name: "resultType",
  initialState,
  reducers: {
    
  },
  extraReducers: {
    [getType.pending.type]: (state) => {
      state.loading = true;
    },
    [getType.fulfilled.type]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    [getType.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  }
});
