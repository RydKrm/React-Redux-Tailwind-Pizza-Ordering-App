import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/User/userSlice";
import CartSlice from "./features/Cart/CartSlice";

const store = configureStore({
    reducer:{
        user:userSlice,
        cart:CartSlice,
    }
})

export default store;