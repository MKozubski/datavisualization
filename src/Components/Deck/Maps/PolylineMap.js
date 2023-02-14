import React, { useEffect, useState } from "react";
import gpxdata from "./Track_02-AUG-13.gpx";
import gpxParser from "gpxparser";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import logo from "./logo.png";
import L from "leaflet";
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
  const limeOptions = { color: 'lime' }
  return (
    <MapContainer
    style={{ height: "300px", width: "500px", zIndex: 0, position: "relative" }}
      center={[51.0, 19.0]}
      zoom={4}
      maxZoom={18}
    >
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
      />


      {geoJSON.map((content, index) => (
        <Polyline pathOptions={limeOptions} positions={[content[1], content[0]]} />

        ))}

    
    </MapContainer>
  );
};

export default PolyLineMap;
