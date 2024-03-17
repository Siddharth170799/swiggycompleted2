import React from "react"




const Location=({setLocation})=>{



    return(
        <div className="col-2 Hello">
        <div ><b>Location</b></div>
        <div style={{margin:"10px"}}> <input onChange={()=>{setLocation({lat:"17.4364653",long:"78.5203794"})}} type="radio" name="location"></input> Mettuguda</div>
        <div style={{margin:'10px'}}><input onChange={()=>{{setLocation({lat:"17.3615636",long:"78.4746645"})}}} type="radio" name="location"></input>Charminar</div>
        <div style={{margin:'10px'}}><input onChange={()=>{{setLocation({lat:"17.4875418",long:"78.3953462"})}}} type="radio" name="location"></input>Kukatpally</div>
        <div style={{margin:'10px'}}><input onChange={()=>{{setLocation({lat:"17.4400802",long:"78.3489168"})}}} type="radio" name="location"></input>Gachibowli</div>
        <div style={{margin:'10px'}}><input onChange={()=>{{setLocation({lat:"17.4825428",long:"78.53973169999999"})}}} type="radio" name="location"></input>Ecil</div>
       
        </div>

    )
}

export default Location