import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  LoadScript,
} from "@react-google-maps/api";

require("dotenv").config();

const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

const containerStyle = {
	width: '100%',
	height: '250px'
  };

const center = {
    lat: 44.978333, lng: -93.263596
}

const array = [
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

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: key
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={1}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
		{array.map((place, index) => {
	return (
	  <Marker 
	  key={index} 
	  position={{ lat: place.lat, lng: place.lng }}
	  >
		{
		  <InfoWindow>
			<p>{place.name}</p>
			{/* <button>{place.name}</button> */}
		  </InfoWindow>
		}
	  </Marker>
	);
  })}


      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default Map;

