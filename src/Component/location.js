import React from "react"




const Location=({setLocation})=>{



    return(
        <div className="col-2 Hello">
        <div ><b>Location</b></div>
        <div style={{margin:"10px"}}> <input onChange={()=>{setLocation({lat:"17.4364653",long:"78.5203794"})}} type="radio" name="location"></input> Mettuguda</div>
        <div style={{margin:'10px'}}><input onChange={()=>{{setLocation({lat:"17.3615636",long:"78.4746645"})}}} type="radio" name="location"></input>Charminar</div>
        </div>

    )
}

export default Location