import React, { useEffect, useState } from "react";
import axios from "axios";

import InitialComponents from "./Component/initialComponent";
import Location from "./Component/location";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Fetch = () => {
  const [data, setdata] = useState([]);
  const [location, setLocation] = useState({
    lat: "17.37240",
    long: "78.43780",
  });
  const [restaurantsName, setRestaurants] = useState("");
  const [filtered, filteredres] = useState([]);
  // const selector=useSelector((state)=>{
  //   return state.selector

  // })

  const GetData = async () => {
    const data2 = await axios.get(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${location.lat}&lng=${location.long}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING `
    );
    //console.log(res.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants))
    setdata(
      data2.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
    console.log(data2);
  };

  useEffect(() => {
    GetData();
  }, [location]);

  useEffect(() => {
    let filteredData = data.filter((name) =>
      name.info.name.toLowerCase().includes(restaurantsName.toLocaleLowerCase())
    );
    // setdata(filteredData)
    filteredres(filteredData);
    // console.log(filterResult)
  }, [restaurantsName]);
  console.log(filtered);

  return (
    <>
      <div id="header">
        <div>Brand</div>
       <Link to={"/dishes"}> <div>Search Dishes</div></Link>
       <Link to={'/rest'}> <div>Search Restaurants</div></Link>
       <Link to="/cart"> <div>Cart</div></Link>
      </div>
      <div style={{ textAlign: "center" }}>
        <b>
          <h1>Food Villa</h1>
        </b>
      </div>
      {/* <div className="container-fluid"> */}
      <div style={{ width: "400px", textAlign: "center",marginTop:"50px" }}>
        <input
          value={restaurantsName}
          onChange={(e) => setRestaurants(e.target.value)}
          class="form-control form-control-lg offset-5"
          type="text"
          placeholder="Search Restaurants"
          aria-label=".form-control-lg example"
        />
      </div>

      <div className="row location-restaurant-wrapper ">
        {
          <div className="col-2 Hello">
            <div>
              <Location setLocation={setLocation} />
            </div>
            {/* <div ><b>Location</b></div>
        <div style={{margin:"10px"}}> <input onChange={()=>{setLocation({lat:"17.4364653",long:"78.5203794"})}} type="radio" name="location"></input> Mettuguda</div>
        <div style={{margin:'10px'}}><input onChange={()=>{{setLocation({lat:"17.3615636",long:"78.4746645"})}}} type="radio" name="location"></input>Charminar</div> */}
          </div>
        }
        {/* <div ><Location setLocation={setLocation}/></div> */}

        {
          <div className="col-10 d-flex flex-wrap justify-content-around Hello2">
            <div>
              <InitialComponents filtered={filtered} restaurants={data} />
            </div>

            {/* {data.length>0 ? data.map((item, index) => (
            <div key={index} className="card mb-3" style={{ width: "18rem" }}>
              <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item?.info?.cloudinaryImageId}`}
 className="card-img-top restaurant-image" alt="..." />
 
              <div className="card-body">
                <h5 className="card-title">{item.info.name}</h5>
                <div >
                <span> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star b" viewBox="0 0 16 16">
  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
</svg>
  </span>{ <span style={{margin:"10px"}}>{item?.info?.avgRating ? item.info.avgRating : item.info.avgRatingString}</span> }
                <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bicycle" viewBox="0 0 16 16">
  <path d="M4 4.5a.5.5 0 0 1 .5-.5H6a.5.5 0 0 1 0 1v.5h4.14l.386-1.158A.5.5 0 0 1 11 4h1a.5.5 0 0 1 0 1h-.64l-.311.935.807 1.29a3 3 0 1 1-.848.53l-.508-.812-2.076 3.322A.5.5 0 0 1 8 10.5H5.959a3 3 0 1 1-1.815-3.274L5 5.856V5h-.5a.5.5 0 0 1-.5-.5m1.5 2.443-.508.814c.5.444.85 1.054.967 1.743h1.139zM8 9.057 9.598 6.5H6.402zM4.937 9.5a2 2 0 0 0-.487-.877l-.548.877zM3.603 8.092A2 2 0 1 0 4.937 10.5H3a.5.5 0 0 1-.424-.765zm7.947.53a2 2 0 1 0 .848-.53l1.026 1.643a.5.5 0 1 1-.848.53z"/>
</svg></span><span style={{margin:"20px"}}>{item?.info?.sla?.slaString}</span></div>
                <p className="card-text" style={{margin:'10px'}}>
                  {item?.info?.cuisines.slice(0,3).join('')}
                </p>
                <p style={{margin:"10px"}}>{item?.info?.locality}</p>
               
              </div>
            </div>
          )):<Shimmer/>} */}
          </div>
        }

        {/* <div><InitialComponents restaurants={data}/></div> */}
      </div>
    </>
  );
};

export default Fetch;
