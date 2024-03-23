import { configureStore } from "@reduxjs/toolkit";
import slice from "./slice";




const Store=configureStore({
    reducer:{
        Sid:slice
    }
})

export default Store