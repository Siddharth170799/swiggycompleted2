import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import InitialComponents from "./initialComponent";


const SearchRestaurants=()=>{


    const [restaurantsName,setRestaurantsName]=useState("")

    const [restaurants,setRestaurants]=useState([])
    const navigate=useNavigate()
    // const Click = (id) => {
    //     // if (restaurants) {
    //       navigate(`/restaurant/${id}`)
    //       console.log(id)
    //     // } 
    //   }



    const GetRest=async()=>{

   await axios.get(`https://www.swiggy.com/dapi/restaurants/search/v3?lat=17.4485835&lng=%2078.39080349999999%20&str=${restaurantsName}&trackingId=undefined&submitAction=SUGGESTION&queryUniqueId=%2036a011f0-cc0b-c761-05ca-41488b0446d1&selectedPLTab=RESTAURANT`)
     .then((res)=>{
        setRestaurants(res.data.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards)
        
        console.log(res.data.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards)
     })
    }

    useEffect(()=>{
        GetRest()
    },[restaurantsName])


    return(
        <>
         <div id="header">
     <Link to="/"><div>Brand</div></Link> 
       <Link to='/dishes-'> <div>Search Dishes</div></Link>
        <div>Search Restaurants</div>
      {/* <Link to="/cart"> <div>Cart -{CartItems.length>0?CartItems.length:0} </div></Link> */}
      </div>

    <div>Dishes</div>
    <input
    style={{ width: "500px", textAlign: "center",margin:"100px" }}
    value={restaurantsName}
    onChange={(e) => setRestaurantsName(e.target.value)}
    class="form-control form-control-lg offset-5"
    type="text"
    placeholder="Search Restaurants"
    aria-label=".form-control-lg example"
  />

 

   {restaurants?.length> 0 ? <div class="row row-cols-1 row-cols-md-4 g-4"  >{restaurants.map((item,index)=>{
    return(
        <div key={index} className="card mb-3" style={{ width: "18rem" }} >
        <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item?.card?.card?.info?.cloudinaryImageId}`}
className="card-img-top restaurant-image" alt="..." />

        <div className="card-body">
          <h5 className="card-title">{item.card?.card?.info?.name}</h5>
          <div >
          <span> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star b" viewBox="0 0 16 16">
<path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
</svg>
</span>{ <span style={{margin:"10px"}}>{item?.card?.card?.info?.avgRating ? item.card?.card?.info?.avgRating : item.card?.card?.info?.avgRatingString}</span> }
          <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bicycle" viewBox="0 0 16 16">
<path d="M4 4.5a.5.5 0 0 1 .5-.5H6a.5.5 0 0 1 0 1v.5h4.14l.386-1.158A.5.5 0 0 1 11 4h1a.5.5 0 0 1 0 1h-.64l-.311.935.807 1.29a3 3 0 1 1-.848.53l-.508-.812-2.076 3.322A.5.5 0 0 1 8 10.5H5.959a3 3 0 1 1-1.815-3.274L5 5.856V5h-.5a.5.5 0 0 1-.5-.5m1.5 2.443-.508.814c.5.444.85 1.054.967 1.743h1.139zM8 9.057 9.598 6.5H6.402zM4.937 9.5a2 2 0 0 0-.487-.877l-.548.877zM3.603 8.092A2 2 0 1 0 4.937 10.5H3a.5.5 0 0 1-.424-.765zm7.947.53a2 2 0 1 0 .848-.53l1.026 1.643a.5.5 0 1 1-.848.53z"/>
</svg></span><span style={{margin:"20px"}}>{item?.card?.card?.info?.sla?.slaString}</span></div>
          <p className="card-text" style={{margin:'10px'}}>
            {item?.card?.card?.info?.cuisines.slice(0,3).join('')}
          </p>
          <p style={{margin:"10px"}}>{item?.card?.card?.info?.locality}</p>
         
        </div>
      </div>
    )

   })}</div>:""}
 
        </>
    )


    
}
export default SearchRestaurants