import React, { useEffect, useState } from "react";
import gpxdata from "./Track_02-AUG-13.gpx";
import gpxParser from "gpxparser";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import MarkerClusterGroup from "react-leaflet-cluster";
import logo from "./logo.png";
import L from "leaflet";
import bath from "./CCIN11892_20150811_GPS_Track_Bathymetry_20130802_Cambridge_Bay.gpx"
const BathymetryData = () => {
  const [data, setData] = useState("");
  const [geoJSON, setGeoData] = useState(null);

  const myIcon = L.icon({
    iconUrl: logo,
    iconSize: [30, 30],
  });
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

      <MarkerClusterGroup icon={myIcon} zoom={10}>
      {geoJSON.map((content, index) => (
        <Marker position={[content[1], content[0]]} key={index} icon={myIcon}>
            <Popup>{content[1]} {content[0]}</Popup>
        </Marker>
        ))}
      </MarkerClusterGroup>
    
    </MapContainer>
  );
};

export default BathymetryData;
