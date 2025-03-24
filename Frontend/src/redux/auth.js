import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios/axiosConfig";
const INITIALSTATE = {
    isAuth: false,
    isLoading: false,
    user: null
}
export const registerUser = createAsyncThunk('/register', async () => {
    const response = await axiosInstance.post("/register", data);
    return response.data
})
const authSlice = createSlice({
    name: 'Auth',
    initialState: INITIALSTATE,
    reducers: {
        checkAuth: () => {

        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true
        }).addCase(registerUser.fulfilled,(state,action)=>
        {
            state.isLoading=false,
            state.user=action.payload
            
        })
    }

})
export const { } = authSlice.actions;
export default authSlice.reducer;