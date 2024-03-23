import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";

const initialState={
    cart:[]
}
const slice= createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart:(state,action)=>{

             state.cart.push(action.payload)
            
        },
        removeFromCart:(state,action)=>{
            console.log(action.payload,current(state.cart))
            // state.cart = state.cart.filter(item => item?.cartItem?.Name !== action.payload);
            // const x = state.cart.indexOf(action.payload)
            // console.log(x)
            // const newArray= state.cart.splice(x,1)
            //            state.cart=newArray

            state.cart=state.cart.filter((item)=>item.cartItem.Name!==action.payload)
        }
    }

})


export const {addToCart,removeFromCart}=slice.actions
export default slice.reducer