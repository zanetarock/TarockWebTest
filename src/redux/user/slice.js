import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { stat } from "fs";


const initialState = {
    loading: false,
    error: null,
    token: {
        userId:-1,
        userData:null
    },
};

export const signIn = createAsyncThunk(
    "user/signIn",
    async (userId, thunkAPI) => {
        const { data } = await axios.get(
         `http://35.184.195.100:3000/api/user/${userId}`
        );
        const token = { userId: data[0].internal_user_id, userData: data[0] }
        return token;
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logOut: (state) => {
            state.token = null;
            state.error = null;
            state.loading = false;
        },
    },
    extraReducers: {
        [signIn.pending.type]: (state) => {
            state.loading = true;
        },
        [signIn.fulfilled.type]: (state, action) => {
            state.token = action.payload;
            state.loading = false;
            state.error = null;
        },
        [signIn.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});
