import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import "./MapContainer.css";
require('dotenv').config();

function MapContainer() {
	const dispatch = useDispatch();
	const history = useHistory();
	const jobItem = useSelector((store) => store.JobReducer);

	const [ selected, setSelected ] = useState({});
  
	const onSelect = item => {
	  setSelected(item);
	}

	useEffect(() => {
		dispatch({ type: "GET_VENUE" });
	  }, []);

	const handleDetails = (details) => {
      console.log("Details", details);
      dispatch({ type: "GET_JOB_DETAILS", payload: details.id });
      history.push(`details/${details.id}`);
    };

  const mapStyles = {
    height: "40vh",
    width: "100%"};
  
  const defaultCenter = {
    lat: 44.978333, lng: -93.263596
  }
  
  return (
	  <div className="mapContainer">
     <LoadScript
	 googleMapsApiKey={`${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenter}>
         {
            jobItem.map((venue, index) => {
              return (
              <Marker key={index} 
			  position={venue.location}
			  onClick={() => onSelect(venue)}
			  />
              )
            })
         }
		 {
            selected.location && 
            (
              <InfoWindow
              position={selected.location}
              clickable={true}
              onCloseClick={() => setSelected({})}
            >
              <div className="infoWindow" onClick={() => handleDetails(selected)}>
			  <h3>${selected.pay}</h3>
			  <p>{selected.service}</p>
			  </div>
            </InfoWindow>
            )
         }


     </GoogleMap>
     </LoadScript>
	 </div>
  )
}
export default MapContainer;