// import React, { useEffect, useState } from "react"
// import axios from "axios"


// const PartRestaurants=()=>{

//     const [fooddata,setfood]=useState('')

//     useEffect(async()=>{
//      const res =  await axios.get("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.4264161&lng=78.5529537&restaurantId=")
//         // .then((res)=>console.log(res.data?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards))
//         setfood(res.data?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards)
//         console.log(res)
//     },[])
//     return(
//         <div>Part Restaurants</div>
//     )
// }
// export default PartRestaurants
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const PartRestaurants = () => {
//     const [foodData, setFoodData] = useState();

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.4264161&lng=78.5529537&restaurantId=");
//                 setFoodData(response.data?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.slice(1));
//                 console.log(response);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             }
//         };
        
//         fetchData();

//     }, []);

//     return (

//         foodData.map((item)=>{
            
//                 <div>{item}</div>
            
        
//         })
        
//         // {foodData.map((item)=>{
//         //    console.log(item)
//         // })}
//     );
// };

// export default PartRestaurants;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./slice";
import { Link } from "react-router-dom";
import { computeHeadingLevel } from "@testing-library/react";

const PartRestaurants = () => {
    const [food, setFoodData] = useState([]);
    console.log(food,"foodatastart")
    
    const {id}=useParams()
    console.log(id)
    const dispatch=useDispatch()
    const CartItems=useSelector((state)=>state.Sid.cart)
    if(CartItems){
      console.log(CartItems ,"hello")
    }

    // let cart={
    //   name:food?.card?.info?.name,
    //   price:food?.card?.info?.price/100
    // }
   
const Fetch=async()=>{

    const resp= await axios.get(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.3684658&lng=78.531594099999998&restaurantId=${id}`)
       setFoodData(resp.data?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.slice(1))
       console.log(resp.data?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR.cards.slice(1))
}
    useEffect(() => {
      
        Fetch()

    }, []);
    console.log(food)

    return (
      <>
      <div id="header">
       <Link to="/"> <div>Brand</div></Link>
        <Link to={"/dishes"}> <div>Search Dishes</div></Link>
        <div>Search Restaurants</div>
      <Link to="/cart"> <div>Cart -{CartItems.length>0?CartItems.length:0} </div></Link>
      </div>

        <div style={{margin:"100px"}}>
           <div class="container">
            {food.length>0 ?<h1> { food[0].card?.card?.title} - {food[0].card?.card?.itemCards?.length}</h1>:""}
           
            <div class="row row-cols-1 row-cols-md-6 g-4 container">
                {food[0]?.card?.card?.itemCards.map((food)=>{
                 return(                
  <div class="col">
    <div class="card h-100">
      <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${food?.card?.info?.imageId}`} class="card-img-top imts" alt="..."/>
      <div class="card-body">
        <h5 class="card-title">
            {food?.card?.info?.name}
        </h5>
        {food?.card?.info?.isVeg ? <div id="veg" style={{color:"green"}}></div>:<div id="nonveg" style={{color:"red"}}></div>}
        <p style={{marginTop:"5px 0px"}}>Price : {food?.card?.info?.price ? food?.card?.info?.price/100 :food?.card?.info?.defaultPrice/100 } <span style={{display:"inline-block",margin:'10px'}}> Rating          <span>
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star b" viewBox="0 0 16 16">
  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
</svg>
  </span>  {food?.card?.info?.ratings?.aggregatedRating?.rating}<div style={{margin:"5px"}}>{food?.card?.info?.ratings?.aggregatedRating?.ratingCount}</div> 
</span></p>
        <p class="card-text">{food?.card?.info?.description?.slice(0,100)}</p>
        <button onClick={()=>{
          let cartItem={
            Name:food?.card?.info?.name,
            Price:food?.card?.info?.price/100,
            description:food?.card?.info?.description?.slice(0,100),
            Image:`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${food?.card?.info?.imageId}`
          }
          
          dispatch(addToCart({cartItem}))}}>Add To Cart</button>
      </div>
    </div>
  </div>)
                })}
                

 
</div>
</div>
            {/* {food.map((item, index) => {
                // <div key={index}>{item?.card?.card?.title}</div>
                if(item.card?.card?.title){
                console.log(item.card?.card?.title)
                if(item.card?.card?.itemCards){
                console.log(item.card?.card?.itemCards)}
            }
})} */}
        </div>


        <div>
           <div class="container">
            {food.length>0 ?<h1> { food[1].card?.card?.title} - {food[1].card?.card?.itemCards?.length}</h1>:""}
           
            <div class="row row-cols-1 row-cols-md-6 g-4 container">
                {food[1]?.card?.card?.itemCards?.map((food)=>{
                 return(                
  <div class="col">
    <div class="card h-100">
      <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${food?.card?.info?.imageId}`} class="card-img-top imts" alt="..."/>
      <div class="card-body">
        <h5 class="card-title">
            {food?.card?.card?.categories[0]?.title}
        </h5>
        {food?.card?.info?.isVeg ? <div id="veg" style={{color:"green"}}></div>:<div id="nonveg" style={{color:"red"}}></div>}
        <p style={{marginTop:"5px 0px"}}>Price : {food?.card?.info?.price/100} <span style={{display:"inline-block",margin:'10px'}}> Rating          <span> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star b" viewBox="0 0 16 16">
  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
</svg>
  </span>  {food?.card?.info?.ratings?.aggregatedRating?.rating}<div style={{margin:"5px"}}>{food?.card?.info?.ratings?.aggregatedRating?.ratingCount}</div> 
</span></p>
        <p class="card-text">{food?.card?.info?.description?.slice(0,100)}</p>
        <button onClick={()=>{
          let cartItem={
            Name:food?.card?.info?.name,
            Price:food?.card?.info?.price/100,
            description:food?.card?.info?.description?.slice(0,100),
            Image:`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${food?.card?.info?.imageId}`
          }
          
          dispatch(addToCart({cartItem}))}}>Add To Cart</button>
      </div>
    </div>
  </div>)
                })}
                

 
</div>
</div>
            {/* {food.map((item, index) => {
                // <div key={index}>{item?.card?.card?.title}</div>
                if(item.card?.card?.title){
                console.log(item.card?.card?.title)
                if(item.card?.card?.itemCards){
                console.log(item.card?.card?.itemCards)}
            }
})} */}
        </div>


        <div>
           <div class="container">
            {food.length>0 ?<h1> { food[2].card?.card?.title} - {food[2].card?.card?.itemCards?.length}</h1>:""}
           
            <div class="row row-cols-1 row-cols-md-6 g-4 container">
                {food[2]?.card?.card?.itemCards?.map((food)=>{
                 return(                
  <div class="col">
    <div class="card h-100">
      <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${food?.card?.info?.imageId}`} class="card-img-top imts" alt="..."/>
      <div class="card-body">
        <h5 class="card-title">
            {food?.card?.card?.categories[0]?.title}
        </h5>
        {food?.card?.info?.isVeg ? <div id="veg" style={{color:"green"}}></div>:<div id="nonveg" style={{color:"red"}}></div>}
        <p style={{marginTop:"5px 0px"}}>Price : {food?.card?.info?.price/100} <span style={{display:"inline-block",margin:'10px'}}> Rating          <span> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star b" viewBox="0 0 16 16">
  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
</svg>
  </span>  {food?.card?.info?.ratings?.aggregatedRating?.rating}<div style={{margin:"5px"}}>{food?.card?.info?.ratings?.aggregatedRating?.ratingCount}</div> 
</span></p>
        <p class="card-text">{food?.card?.info?.description?.slice(0,100)}</p>
        <button onClick={()=>{
          let cartItem={
            Name:food?.card?.info?.name,
            Price:food?.card?.info?.price/100,
            description:food?.card?.info?.description?.slice(0,100),
            Image:`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${food?.card?.info?.imageId}`
          }
          
          dispatch(addToCart({cartItem}))}}>Add To Cart</button>
      </div>
    </div>
  </div>)
                })}
                

 
</div>
</div>
            {/* {food.map((item, index) => {
                // <div key={index}>{item?.card?.card?.title}</div>
                if(item.card?.card?.title){
                console.log(item.card?.card?.title)
                if(item.card?.card?.itemCards){
                console.log(item.card?.card?.itemCards)}
            }
})} */}
        </div>

        <div>
           <div class="container">
            {food.length>0 ?<h1> { food[3].card?.card?.title} - {food[3].card?.card?.itemCards?.length}</h1>:""}
           
            <div class="row row-cols-1 row-cols-md-6 g-4 container">
                {food[3]?.card?.card?.itemCards?.map((food)=>{
                 return(                
  <div class="col">
    <div class="card h-100">
      <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${food?.card?.info?.imageId}`} class="card-img-top imts" alt="..."/>
      <div class="card-body">
        <h5 class="card-title">
            {food?.card?.card?.categories[0]?.title}
        </h5>
        {food?.card?.info?.isVeg ? <div id="veg" style={{color:"green"}}></div>:<div id="nonveg" style={{color:"red"}}></div>}
        <p style={{marginTop:"5px 0px"}}>Price : {food?.card?.info?.price/100} <span style={{display:"inline-block",margin:'10px'}}> Rating          <span> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star b" viewBox="0 0 16 16">
  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
</svg>
  </span>  {food?.card?.info?.ratings?.aggregatedRating?.rating}<div style={{margin:"5px"}}>{food?.card?.info?.ratings?.aggregatedRating?.ratingCount}</div> 
</span></p>
        <p class="card-text">{food?.card?.info?.description?.slice(0,100)}</p>
        <button onClick={()=>{
          let cartItem={
            Name:food?.card?.info?.name,
            Price:food?.card?.info?.price/100,
            description:food?.card?.info?.description?.slice(0,100),
            Image:`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${food?.card?.info?.imageId}`
          }
          
          dispatch(addToCart({cartItem}))}}>Add To Cart</button>
      </div>
    </div>
  </div>)
                })}
                

 
</div>
</div>
            {/* {food.map((item, index) => {
                // <div key={index}>{item?.card?.card?.title}</div>
                if(item.card?.card?.title){
                console.log(item.card?.card?.title)
                if(item.card?.card?.itemCards){
                console.log(item.card?.card?.itemCards)}
            }
})} */}
        </div>

        <div>
           <div class="container">
            {food.length>0 ?<h1> { food[4].card?.card?.title} - {food[4].card?.card?.itemCards?.length}</h1>:""}
           
            <div class="row row-cols-1 row-cols-md-6 g-4 container">
                {food[4]?.card?.card?.itemCards?.map((food)=>{
                 return(                
  <div class="col">
    <div class="card h-100">
      <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${food?.card?.info?.imageId}`} class="card-img-top imts" alt="..."/>
      <div class="card-body">
        <h5 class="card-title">
            {food?.card?.card?.categories[0]?.title}
        </h5>
        {food?.card?.info?.isVeg ? <div id="veg" style={{color:"green"}}></div>:<div id="nonveg" style={{color:"red"}}></div>}
        <p style={{marginTop:"5px 0px"}}>Price : {food?.card?.info?.price/100} <span style={{display:"inline-block",margin:'10px'}}> Rating          <span> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star b" viewBox="0 0 16 16">
  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
</svg>
  </span>  {food?.card?.info?.ratings?.aggregatedRating?.rating}<div style={{margin:"5px"}}>{food?.card?.info?.ratings?.aggregatedRating?.ratingCount}</div> 
</span></p>
        <p class="card-text">{food?.card?.info?.description?.slice(0,100)}</p>
        <button onClick={()=>{
          let cartItem={
            Name:food?.card?.info?.name,
            Price:food?.card?.info?.price/100,
            description:food?.card?.info?.description?.slice(0,100),
            Image:`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${food?.card?.info?.imageId}`
          }
          
          dispatch(addToCart({cartItem}))}}>Add To Cart</button>
      </div>
    </div>
  </div>)
                })}
                

 
</div>
</div>
            {/* {food.map((item, index) => {
                // <div key={index}>{item?.card?.card?.title}</div>
                if(item.card?.card?.title){
                console.log(item.card?.card?.title)
                if(item.card?.card?.itemCards){
                console.log(item.card?.card?.itemCards)}
            }
})} */}
        </div>


        <div>
           <div class="container">
            {food.length>0 ?<h1> { food[5].card?.card?.title} - {food[5].card?.card?.itemCards?.length}</h1>:""}
           
            <div class="row row-cols-1 row-cols-md-6 g-4 container">
                {food[5]?.card?.card?.itemCards?.map((food)=>{
                 return(                
  <div class="col">
    <div class="card h-100">
      <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${food?.card?.info?.imageId}`} class="card-img-top imts" alt="..."/>
      <div class="card-body">
        <h5 class="card-title">
            {food?.card?.card?.categories[0]?.title}
        </h5>
        {food?.card?.info?.isVeg ? <div id="veg" style={{color:"green"}}></div>:<div id="nonveg" style={{color:"red"}}></div>}
        <p style={{marginTop:"5px 0px"}}>Price : {food?.card?.info?.price/100} <span style={{display:"inline-block",margin:'10px'}}> Rating          <span> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star b" viewBox="0 0 16 16">
  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
</svg>
  </span>  {food?.card?.info?.ratings?.aggregatedRating?.rating}<div style={{margin:"5px"}}>{food?.card?.info?.ratings?.aggregatedRating?.ratingCount}</div> 
</span></p>
        <p class="card-text">{food?.card?.info?.description?.slice(0,100)}</p>
        <button onClick={()=>{
          let cartItem={
            Name:food?.card?.info?.name,
            Price:food?.card?.info?.price/100,
            description:food?.card?.info?.description?.slice(0,100),
            Image:`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${food?.card?.info?.imageId}`
          }
          
          dispatch(addToCart({cartItem}))}}>Add To Cart</button>
      </div>
    </div>
  </div>)
                })}
                

 
</div>
</div>
            {/* {food.map((item, index) => {
                // <div key={index}>{item?.card?.card?.title}</div>
                if(item.card?.card?.title){
                console.log(item.card?.card?.title)
                if(item.card?.card?.itemCards){
                console.log(item.card?.card?.itemCards)}
            }
})} */}
        </div>

        <div>
           <div class="container">
            {food.length>0 ?<h1> { food[6].card?.card?.title} - {food[6].card?.card?.itemCards?.length}</h1>:""}
           
            <div class="row row-cols-1 row-cols-md-6 g-4 container">
                {food[6]?.card?.card?.itemCards?.map((food)=>{
                 return(                
  <div class="col">
    <div class="card h-100">
      <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${food?.card?.info?.imageId}`} class="card-img-top imts" alt="..."/>
      <div class="card-body">
        <h5 class="card-title">
            {food?.card?.card?.categories[0]?.title}
        </h5>
        {food?.card?.info?.isVeg ? <div id="veg" style={{color:"green"}}></div>:<div id="nonveg" style={{color:"red"}}></div>}
        <p style={{marginTop:"5px 0px"}}>Price : {food?.card?.info?.price/100} <span style={{display:"inline-block",margin:'10px'}}> Rating          <span> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star b" viewBox="0 0 16 16">
  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
</svg>
  </span>  {food?.card?.info?.ratings?.aggregatedRating?.rating}<div style={{margin:"5px"}}>{food?.card?.info?.ratings?.aggregatedRating?.ratingCount}</div> 
</span></p>
        <p class="card-text">{food?.card?.info?.description?.slice(0,100)}</p>
        <button onClick={()=>{
          let cartItem={
            Name:food?.card?.info?.name,
            Price:food?.card?.info?.price/100,
            description:food?.card?.info?.description?.slice(0,100),
            Image:`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${food?.card?.info?.imageId}`
          }
          
          dispatch(addToCart({cartItem}))}}>Add To Cart</button>
      </div>
    </div>
  </div>)
                })}
                

 
</div>
</div>
            {/* {food.map((item, index) => {
                // <div key={index}>{item?.card?.card?.title}</div>
                if(item.card?.card?.title){
                console.log(item.card?.card?.title)
                if(item.card?.card?.itemCards){
                console.log(item.card?.card?.itemCards)}
            }
})} */}
        </div>


        <div>
           <div class="container">
            {food.length>0 ?<h1> { food[7].card?.card?.title} - {food[7].card?.card?.itemCards?.length}</h1>:""}
           
            <div class="row row-cols-1 row-cols-md-6 g-4 container">
                {food[7]?.card?.card?.itemCards?.map((food)=>{
                 return(                
  <div class="col">
    <div class="card h-100">
      <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${food?.card?.info?.imageId}`} class="card-img-top imts" alt="..."/>
      <div class="card-body">
        <h5 class="card-title">
            {food?.card?.card?.categories[0]?.title}
        </h5>
        {food?.card?.info?.isVeg ? <div id="veg" style={{color:"green"}}></div>:<div id="nonveg" style={{color:"red"}}></div>}
        <p style={{marginTop:"5px 0px"}}>Price : {food?.card?.info?.price/100} <span style={{display:"inline-block",margin:'10px'}}> Rating          <span> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star b" viewBox="0 0 16 16">
  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
</svg>
  </span>  {food?.card?.info?.ratings?.aggregatedRating?.rating}<div style={{margin:"5px"}}>{food?.card?.info?.ratings?.aggregatedRating?.ratingCount}</div> 
</span></p>
        <p class="card-text">{food?.card?.info?.description?.slice(0,100)}</p>
        <button onClick={()=>{
          let cartItem={
            Name:food?.card?.info?.name,
            Price:food?.card?.info?.price/100,
            description:food?.card?.info?.description?.slice(0,100),
            Image:`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${food?.card?.info?.imageId}`
          }
          
          dispatch(addToCart({cartItem}))}}>Add To Cart</button>
      </div>
    </div>
  </div>)
                })}
                

 
</div>
</div>
            {/* {food.map((item, index) => {
                // <div key={index}>{item?.card?.card?.title}</div>
                if(item.card?.card?.title){
                console.log(item.card?.card?.title)
                if(item.card?.card?.itemCards){
                console.log(item.card?.card?.itemCards)}
            }
})} */}
        </div>


        <div>
           <div class="container">
            {food.length>0 ?<h1> { food[8].card?.card?.title} - {food[8].card?.card?.itemCards?.length}</h1>:""}
           
            <div class="row row-cols-1 row-cols-md-6 g-4 container">
                {food[8]?.card?.card?.itemCards?.map((food)=>{
                 return(                
  <div class="col">
    <div class="card h-100">
      <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${food?.card?.info?.imageId}`} class="card-img-top imts" alt="..."/>
      <div class="card-body">
        <h5 class="card-title">
            {food?.card?.card?.categories[0]?.title}
        </h5>
        {food?.card?.info?.isVeg ? <div id="veg" style={{color:"green"}}></div>:<div id="nonveg" style={{color:"red"}}></div>}
        <p style={{marginTop:"5px 0px"}}>Price : {food?.card?.info?.price/100} <span style={{display:"inline-block",margin:'10px'}}> Rating          <span> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star b" viewBox="0 0 16 16">
  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
</svg>
  </span>  {food?.card?.info?.ratings?.aggregatedRating?.rating}<div style={{margin:"5px"}}>{food?.card?.info?.ratings?.aggregatedRating?.ratingCount}</div> 
</span></p>
        <p class="card-text">{food?.card?.info?.description?.slice(0,100)}</p>
        <button onClick={()=>{
          let cartItem={
            Name:food?.card?.info?.name,
            Price:food?.card?.info?.price/100,
            description:food?.card?.info?.description?.slice(0,100),
            Image:`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${food?.card?.info?.imageId}`
          }
          
          dispatch(addToCart({cartItem}))}}>Add To Cart</button>
        
      </div>
    </div>
  </div>)
                })}
                

 
</div>
</div>
            {/* {food.map((item, index) => {
                // <div key={index}>{item?.card?.card?.title}</div>
                if(item.card?.card?.title){
                console.log(item.card?.card?.title)
                if(item.card?.card?.itemCards){
                console.log(item.card?.card?.itemCards)}
            }
})} */}
        </div>


        
        <div>
           <div class="container">
            {food.length>0 ?<h1> { food[9].card?.card?.title} - {food[9].card?.card?.itemCards?.length}</h1>:""}
           
            <div class="row row-cols-1 row-cols-md-6 g-4 container">
                {food[9]?.card?.card?.itemCards?.map((food)=>{
                 return(                
  <div class="col">
    <div class="card h-100">
      <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${food?.card?.info?.imageId}`} class="card-img-top imts" alt="..."/>
      <div class="card-body">
        <h5 class="card-title">
            {food?.card?.card?.categories[0]?.title}
        </h5>
        {food?.card?.info?.isVeg ? <div id="veg" style={{color:"green"}}></div>:<div id="nonveg" style={{color:"red"}}></div>}
        <p style={{marginTop:"5px 0px"}}>Price : {food?.card?.info?.price/100} <span style={{display:"inline-block",margin:'10px'}}> Rating          <span> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star b" viewBox="0 0 16 16">
  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
</svg>
  </span>  {food?.card?.info?.ratings?.aggregatedRating?.rating}<div style={{margin:"5px"}}>{food?.card?.info?.ratings?.aggregatedRating?.ratingCount}</div> 
</span></p>
        <p class="card-text">{food?.card?.info?.description?.slice(0,100)}</p>
        <button onClick={()=>{
          let cartItem={
            Name:food?.card?.info?.name,
            Price:food?.card?.info?.price/100,
            description:food?.card?.info?.description?.slice(0,100),
            Image:`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${food?.card?.info?.imageId}`
          }
          
          dispatch(addToCart({cartItem}))}}>Add To Cart</button>
      </div>
    </div>
  </div>)
                })}
                

 
</div>
</div>
            {/* {food.map((item, index) => {
                // <div key={index}>{item?.card?.card?.title}</div>
                if(item.card?.card?.title){
                console.log(item.card?.card?.title)
                if(item.card?.card?.itemCards){
                console.log(item.card?.card?.itemCards)}
            }
})} */}
        </div>


        <div>
           <div class="container">
            {food.length>0 ?<h1> { food[10].card?.card?.title} - {food[10].card?.card?.itemCards?.length}</h1>:""}
           
            <div class="row row-cols-1 row-cols-md-6 g-4 container">
                {food[10]?.card?.card?.itemCards?.map((food)=>{
                 return(                
  <div class="col">
    <div class="card h-100">
      <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${food?.card?.info?.imageId}`} class="card-img-top imts" alt="..."/>
      <div class="card-body">
        <h5 class="card-title">
            {food?.card?.card?.categories[0]?.title}
        </h5>
        {food?.card?.info?.isVeg ? <div id="veg" style={{color:"green"}}></div>:<div id="nonveg" style={{color:"red"}}></div>}
        <p style={{marginTop:"5px 0px"}}>Price : {food?.card?.info?.price/100} <span style={{display:"inline-block",margin:'10px'}}> Rating          <span> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star b" viewBox="0 0 16 16">
  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
</svg>
  </span>  {food?.card?.info?.ratings?.aggregatedRating?.rating}<div style={{margin:"5px"}}>{food?.card?.info?.ratings?.aggregatedRating?.ratingCount}</div> 
</span></p>
        <p class="card-text">{food?.card?.info?.description?.slice(0,100)}</p>
        <button onClick={()=>{
          let cartItem={
            Name:food?.card?.info?.name,
            Price:food?.card?.info?.price/100,
            description:food?.card?.info?.description?.slice(0,100),
            Image:`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${food?.card?.info?.imageId}`
          }
          
          dispatch(addToCart({cartItem}))}}>Add To Cart</button>
      </div>
    </div>
  </div>)
                })}
                

 
</div>
</div>
            {/* {food.map((item, index) => {
                // <div key={index}>{item?.card?.card?.title}</div>
                if(item.card?.card?.title){
                console.log(item.card?.card?.title)
                if(item.card?.card?.itemCards){
                console.log(item.card?.card?.itemCards)}
            }
})} */}
        </div>




        </>
    );
};

export default PartRestaurants;