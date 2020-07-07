import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";

import "./Map.css";

const Map = props => {
  const [viewport, setViewport] = useState({
    latitude: props.coordinates.lat,
    longitude: props.coordinates.lng,
    width: "100%",
    height: "100%",
    zoom: 16
  });
  return (
    <div className={`map ${props.className}`} style={props.style}>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoiZ29wYWxwdXJvaGl0NTQiLCJhIjoiY2s3eDZ4M21wMDk5djNwbzJmOW81cHAweSJ9.l-T1Kg9MDIclP11NMJq_Xw"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        Pinch to zoom in and out
        <Marker
          key={props.id}
          latitude={props.coordinates.lat}
          longitude={props.coordinates.lng}
        >
          <button className="marker-btn">
            <img
              src="https://i.ya-webdesign.com/images/blue-map-pin-png-1.png"
              alt={props.title}
            />
          </button>
        </Marker>
      </ReactMapGL>
    </div>
  );
};

export default Map;
