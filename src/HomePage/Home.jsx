import React from "react";
import GoogleMapComponent from "../Components/googlemaps/GoogleMapComponent";

function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Mapa de GoogleMaps</h1>
      <GoogleMapComponent />
    </div>
  );
}

export default Home;
