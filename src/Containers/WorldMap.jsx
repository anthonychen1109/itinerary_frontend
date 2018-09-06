import React, { Component } from "react";
import HEREMap, {Circle} from "react-here-maps";

export default class Map extends Component {
   render() {
       // center the map somewhere in London
       const center = {
           lat: 51.5,
           lng: 0,
       };

       return (
           <HEREMap
               appId={"kHTyFmWw2tCVf1y2jdFt"}
               appCode={"NlVmkWh4Hl4xAZMIlMv60g"}
               center={center}
               zoom={8}
               hidpi={true}
           >
               <Circle
                   {...center}
                   strokeColor="#1275E8"
                   fillColor="rgba(212, 92, 91, 0.2)"
                   lineWidth={2}
                   radius={10000}
               />
           </HEREMap>
       )
   }
}
