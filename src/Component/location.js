import React, { useEffect, useState } from "react"
import axios from "axios"




const Location=({setLocation})=>{

    const [location,setLocationName]=useState("")
    const [locationName,setLocationNameNew]=useState([])


    const getData=async()=>{
        const data=await axios.get(`https://www.swiggy.com/dapi/misc/place-autocomplete?input=${location}&types=`)
       console.log(data.data)
       if(data.data?.data){
        setLocationNameNew(data.data?.data)
       }
    }
    useEffect(()=>{
        getData()
    },[location])

    const geometry= (placeID)=>{
       axios.get(`https://www.swiggy.com/dapi/misc/address-recommend?place_id=${placeID}`)
       .then((res)=>{
        console.log(res.data.data[0]?.geometry.location)
        let location=res.data?.data[0]?.geometry.location
        setLocation({lat:location.lat, long:location.lng})
       })
    }



    return(
        // <div className="col-2 Hello">
        // <div ><b>Location</b></div>
        // <div style={{margin:"10px"}}> <input onChange={()=>{setLocation({lat:"17.4364653",long:"78.5203794"})}} type="radio" name="location"></input> Mettuguda</div>
        // <div style={{margin:'10px'}}><input onChange={()=>{{setLocation({lat:"17.3615636",long:"78.4746645"})}}} type="radio" name="location"></input>Charminar</div>
        // <div style={{margin:'10px'}}><input onChange={()=>{{setLocation({lat:"17.4875418",long:"78.3953462"})}}} type="radio" name="location"></input>Kukatpally</div>
        // <div style={{margin:'10px'}}><input onChange={()=>{{setLocation({lat:"17.4400802",long:"78.3489168"})}}} type="radio" name="location"></input>Gachibowli</div>
        // <div style={{margin:'10px'}}><input onChange={()=>{{setLocation({lat:"17.4825428",long:"78.53973169999999"})}}} type="radio" name="location"></input>Ecil</div>
       
        // </div>

        <>
           <input
          value={location}
          onChange={(e) => setLocationName(e.target.value)}
          
          type="text"
          placeholder="Search Location"
          
        />
       <div class="list-group location-list-group">
            {locationName.length > 0 ? locationName.map((item,i)=>{
                 return(
                    <a onClick={()=>{
                        geometry(item.place_id)

                    }} href="#" class="list-group-item list-group-item-action"
                    >{item.description}</a>
                 )
            }):""}
   </div>
        </>

    )
}

export default Location