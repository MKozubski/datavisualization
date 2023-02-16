import React, { useEffect, useState } from "react";
import gpxdata from "../data//Track_02-AUG-13.gpx";
import gpxParser from "gpxparser";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import bath from "../data/CCIN11892_20150811_GPS_Track_Bathymetry_20130802_Cambridge_Bay.gpx";

const PolyLineMap = () => {
  // Define state variables using hooks
  const [data, setData] = useState("");
  const [geoJSON, setGeoData] = useState(null);
  const [coords, setCoords] = useState([]);
  const [name, setname] = useState("");

  // Use an effect hook to fetch the data from the bathymetry file
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(bath);
      const text = await response.text();
      setData(text);
    }
    fetchData();
  }, []);

  // Use an effect hook to parse the data and extract the coordinates
  useEffect(() => {
    if (data === "") {
      return;
    }

    let gpx = new gpxParser();
    gpx.parse(data);

    // Set the name state variable to the name of the track
    setname(gpx.toGeoJSON().features[0].properties.name);

    // Set the geoJSON state variable to the array of coordinates
    setGeoData(gpx.toGeoJSON().features[0].geometry.coordinates);
  }, [data]);

  // Use an effect hook to convert the coordinates to the format expected by Polyline
  useEffect(() => {
    let newArray = [];
    if (geoJSON) {
      geoJSON.forEach((element) => {
        newArray.push([element[1], element[0]]);
      });
    }
    if (newArray.length >= 1) {
      setCoords(newArray);
    }
    console.log(newArray);
  }, [geoJSON]);

  // If the geoJSON has not been loaded yet, return null
  if (!geoJSON) {
    return null;
  }

  // If the geoJSON has been loaded, return the PolyLineMap component
  return geoJSON !== null ? (
    <>
      <h4>{name}</h4>
      <MapContainer
        style={{
          height: "300px",
          width: "500px",
          zIndex: 0,
          position: "relative",
        }}
        center={[69.11868280984892, -105.04560470581056]}
        zoom={9}
        maxZoom={15}
      >
        <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}" />

        <Polyline
          pathOptions={{ fillColor: "red", color: "blue" }}
          positions={coords}
        />
      </MapContainer>
    </>
  ) : (
    <>Loading...</>
  );
};

export default PolyLineMap;
