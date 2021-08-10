import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
require('dotenv').config();

function MapContainer() {
	const dispatch = useDispatch();
	const jobItem = useSelector((store) => store.JobReducer);

	useEffect(() => {
		dispatch({ type: "GET_VENUE" });
	  }, []);

	const locations = [
		{
		  name: "The Hutton House",
		  lat: 44.99497276974862,
		  lng: -93.41553105850683,
		},
		{
		  name: "Silverwood Park",
		  lat: 45.04800564145538,
		  lng: -93.22312600268164,
		},
		{
		  name: "Hidden Meadow and Barn",
		  lat: 44.484745529394715,
		  lng: -92.13573074133765,
		},
		{
		  name: "Aria",
		  lat: 44.98495516700579,
		  lng: -93.26840007015348,
		},
		{
		  name: "McNamara Alumni Center",
		  lat: 44.97508048418076,
		  lng: -93.22747530268451,
		},
		{
		  name: "Minneapolis Event Centers",
		  lat: 44.98716170847079,
		  lng: -93.25373953156898,
		},
	  ];

  const mapStyles = {
    height: "30vh",
    width: "100%"};
  
  const defaultCenter = {
    lat: 44.978333, lng: -93.263596
  }
  
  return (
     <LoadScript
	 googleMapsApiKey={`${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenter}>
         {
            jobItem.map((venue, index) => {
              return (
              <Marker key={index} position={venue.location}/>
              )
            })
         }
     </GoogleMap>
     </LoadScript>
  )
}
export default MapContainer;