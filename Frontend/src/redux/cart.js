import { createSlice } from "@reduxjs/toolkit";
const INITIALSTATE = {
    cartCount: 0,
    cartSlice: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: INITIALSTATE,
    reducers: {
        addToCart: (state, action) => {
            state.cartCount += 1
        },
        increment: (state, action) => {
            state.cartCount += 1
        },
        decrement: (state, action) => {
            state.cartCount -= 1
        }
    }

})
export const { addToCart, increment, decrement } = cartSlice.actions;
export default cartSlice.reducer;