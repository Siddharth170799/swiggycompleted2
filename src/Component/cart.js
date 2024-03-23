import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "./slice";
import { current } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";


const Cart=()=>{
    const CartItems=useSelector((state)=>state.Sid.cart)
    // if(CartItems){
    //   console.log(CartItems ,"hello")
    // }
    
let result=CartItems.reduce((acc,item)=>{
  acc=acc+item.Price
  return acc
},0)

const dispatch=useDispatch()
   
useEffect(()=>{

},[CartItems])



    return(
        <>
<div id="header">
  <Link to='/'> <div>Brand</div></Link> 
        <Link to={"/dishes"}> <div>Search Dishes</div></Link>
        <div>Search Restaurants</div>
      <div style={{textDecoration:"none"}}>Cart -{CartItems.length>0?CartItems.length:0} </div>
      </div>

        <div style={{textAlign:"center",margin:"100px"}}><h1>Cart Items <span>Price ={result} </span></h1></div>

        <div className="d-flex">
            {CartItems.map((restaurant)=>{
             return(
                <div class="card mb-3" style={{maxWidth: "540px"}}>
                <div class="row g-0">
                  <div class="col-md-4">
                    <img src={restaurant?.cartItem?.Image} class="img-fluid rounded-start" alt="..."/>
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">{restaurant?.cartItem?.Name}</h5>
                     
                      <p class="card-text"><div class="text-body-secondary"><b>{restaurant?.cartItem?.Price}</b></div></p>
                      <p class="card-text">{restaurant?.cartItem?.description}</p>
                      <button onClick={()=>{dispatch(removeFromCart(restaurant?.cartItem?.Name))}} >Remove From Cart</button>
                    </div>
                  </div>
                </div>
              </div>
             )
            })}
  


</div>
        </>
    )
}
export default Cart


