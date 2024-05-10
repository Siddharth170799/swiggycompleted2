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

const CartItems=useSelector((state)=>state.Sid.cart)
  if(CartItems){
    console.log(CartItems ,"hello")
  }


  const GetData = async () => {
    const data2 = await axios.get(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${location.lat}&lng=${location.long}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING `
    );
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
   
    setdata(filteredData)

   
  }, [restaurantsName]);
  console.log(filtered);

  return (
    <>
      <div id="header">
        <div>Brand</div>
       <Link to={"/dishes"}> <div>Search Dishes</div></Link>
       <Link to={'/rest'}> <div>Search Restaurants</div></Link>
       <Link to="/cart"> <div>Cart - {CartItems.length > 0 ? CartItems.length:0}</div></Link>
      </div>
      <div style={{ textAlign: "center" }}>
        <b>
          <h1>Food Villa</h1>
        </b>
      </div>
   
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

      <div className="row location-restaurant-wrapper  ">
        {
          <div className="col-2 Hello">
            <div>
              <Location setLocation={setLocation} />
            </div>
           
          </div>
        }

          {
          <div className="col-10  d-flex flex-wrap justify-content-around Hello2 ">
            {/* <div className="row"> */}
              <InitialComponents filtered={filtered} restaurants={data} restaurantsName={restaurantsName}  />
            {/* </div> */}

           
          </div>
        }
  
      </div>
    </>
  );
};

export default Fetch;
