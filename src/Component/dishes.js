import React, { useDebugValue, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addToCart } from "./slice";




const Dishes=()=>{

    const [dishName,setDishName]=useState('')/////for input bar////
    const [dishes,setDishes]=useState([])  ////if dishes are there then only the variable gets updated///
    const CartItems=useSelector((state)=>state.Sid.cart)
    if(CartItems){
      console.log(CartItems ,"hello")
    }
    const navigate=useNavigate()
    const dispatch= useDispatch()
    const getDishes=async()=>{
        const getdata =await axios.get(`https://www.swiggy.com/dapi/restaurants/search/v3?lat=17.37240&lng=78.43780%20&str=${dishName}%20Burger&trackingId=undefined&submitAction=SUGGESTION&queryUniqueId=b4c44c2e-%20543b-5ba6-75f7-573f4f1bf387`)
    // setDishName()
    // .then((res)=>{
    //     if(res.data.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH){

    //     }
    // )}
    .then((res)=>{
        if(res.data.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH){
            setDishes(res.data.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH.cards?.slice(1))
           
        }
    })
    
    }
    useEffect(()=>{
        getDishes()
    },[dishName])
    console.log(dishes)

return(
    <>
     <div id="header">
     <Link to="/"><div>Brand</div></Link> 
        <div>Search Dishes</div>
      <Link to="/rest"  ><div>Search Restaurants</div></Link>
      <Link to="/cart"> <div>Cart -{CartItems.length>0?CartItems.length:0} </div></Link>
      </div>

    <div>Dishes</div>
    <input
    style={{ width: "500px", textAlign: "center",margin:"100px" }}
    value={dishName}
    onChange={(e) => setDishName(e.target.value)}
    class="form-control form-control-lg offset-5"
    type="text"
    placeholder="Search Dishes"
    aria-label=".form-control-lg example"
  />
<div>

<div class="row">
    {dishes.map((item)=>{
        return(

            <div className="col-md-3">
        <div class="card mb-3 col" style={{maxWidth: "540px"}}>
           <div> <h4>{item?.card?.card?.restaurant?.info?.name}</h4>
          <button onClick={()=>{
            navigate(`/restaurant/${item?.card?.card?.restaurant?.info?.id}`)
          }}>View Restaurant</button></div>
        <div class="row g-0">
          <div class="col-md-5 " style={{textAlign:"center"}}>
            <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item?.card?.card?.info?.imageId}`} class="img-fluid rounded-start dishes-size" alt="..."/>
            <div style={{textAlign:"center"}}> <button onClick={()=>{
          let cartItem={
            Name:item?.card?.card?.restaurant?.info?.name,
            Price:item?.card?.card?.info?.price ? item?.card?.card?.info?.price/100 : item?.card?.card?.info?.defaultprice/100,
            description:item?.card?.card?.info?.description?.slice(0,100),
            Image:`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item?.card?.card?.info?.imageId}`
          }
          
          dispatch(addToCart({cartItem}))}}>Add To Cart</button></div>
          </div>
          <div class="col-md-7">
            <div class="card-body">
              <h5 class="card-title">{item?.card?.card?.info?.name}</h5>
              <div>         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star b" viewBox="0 0 16 16">
  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
</svg> {item?.card?.card?.restaurant?.info?.avgRating ? item?.card?.card?.restaurant?.info?.avgRating: item?.card?.card?.restaurant?.info?.avgRatingString} <span ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bicycle" viewBox="0 0 16 16">
  <path d="M4 4.5a.5.5 0 0 1 .5-.5H6a.5.5 0 0 1 0 1v.5h4.14l.386-1.158A.5.5 0 0 1 11 4h1a.5.5 0 0 1 0 1h-.64l-.311.935.807 1.29a3 3 0 1 1-.848.53l-.508-.812-2.076 3.322A.5.5 0 0 1 8 10.5H5.959a3 3 0 1 1-1.815-3.274L5 5.856V5h-.5a.5.5 0 0 1-.5-.5m1.5 2.443-.508.814c.5.444.85 1.054.967 1.743h1.139zM8 9.057 9.598 6.5H6.402zM4.937 9.5a2 2 0 0 0-.487-.877l-.548.877zM3.603 8.092A2 2 0 1 0 4.937 10.5H3a.5.5 0 0 1-.424-.765zm7.947.53a2 2 0 1 0 .848-.53l1.026 1.643a.5.5 0 1 1-.848.53z"/>
</svg>{item?.card?.card?.restaurant?.info?.sla?.slaString}</span></div>
             
              <p class="card-text"><div class="text-body-secondary" style={{margin:"10px"}}><b>{item?.card?.card?.info?.price ? item?.card?.card?.info?.price/100 : item?.card?.card?.info?.defaultprice/100 } rps</b></div></p>
              <p class="card-text">{item?.card?.card?.info?.description?.slice(0,50)}</p>
           
            </div>
          </div>
        </div>
      </div>





      </div>)
    })}
    </div>



</div>

  </>
)

}

export default Dishes