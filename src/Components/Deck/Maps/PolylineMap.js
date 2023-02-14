import React, { useEffect, useState } from "react";
import gpxdata from "./Track_02-AUG-13.gpx";
import gpxParser from "gpxparser";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import bath from "./CCIN11892_20150811_GPS_Track_Bathymetry_20130802_Cambridge_Bay.gpx";

const PolyLineMap = () => {
  const [data, setData] = useState("");
  const [geoJSON, setGeoData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(bath);
      const text = await response.text();
      setData(text);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (data === "") {
      return;
    }

    let gpx = new gpxParser();
    gpx.parse(data);
    setGeoData(gpx.toGeoJSON().features[0].geometry.coordinates);
  }, [data]);

  if (!geoJSON) {
    return null;
  }
  console.log(geoJSON.slice(0,-1));
  const limeOptions = { color: 'lime' }
  return (
    geoJSON !== null ? ( <MapContainer
        style={{ height: "300px", width: "500px", zIndex: 0, position: "relative" }}
          center={[51.0, 19.0]}
          zoom={4}
          maxZoom={18}
        >
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
          />
    
    
          {geoJSON.map((content, index) => (
            <Polyline pathOptions={limeOptions} positions={geoJSON[1].slice(0,-1)} key={index} />
    
            ))}
        </MapContainer>) : (<>Loading...</>)

  );
};

export default PolyLineMap;
