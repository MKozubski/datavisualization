import React, { useEffect, useState } from "react";
import gpxdata from "../data/Track_02-AUG-13.gpx";
import bath from "../data/CCIN11892_20150811_GPS_Track_Bathymetry_20130802_Cambridge_Bay.gpx";
import gpxParser from "gpxparser";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"; // Map and marker components
import "leaflet/dist/leaflet.css"; // Leaflet CSS
import MarkerClusterGroup from "react-leaflet-cluster"; // Library for clustering markers
import logo from "./logo.png"; // Marker icon image
import L from "leaflet"; // Leaflet library for creating map markers

const BathymetryData = () => {
  const [data, setData] = useState("");
  const [geoJSON, setGeoData] = useState(null);
  const [name, setname] = useState("");

  // For creating map markers
  const myIcon = L.icon({
    iconUrl: logo,
    iconSize: [30, 30],
  });

  // Fetch bathymetry data from GPX file
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(bath);
      const text = await response.text();
      setData(text);
    }
    fetchData();
  }, []);

  // Process bathymetry data from GPX file into GeoJSON format
  useEffect(() => {
    if (data === "") {
      return;
    }

    let gpx = new gpxParser();
    gpx.parse(data);
    setname(gpx.toGeoJSON().features[0].properties.name);
    setGeoData(gpx.toGeoJSON().features[0].geometry.coordinates);
  }, [data]);

  // Render map and markers using the processed bathymetry data
  if (!geoJSON) {
    return null;
  }

  return (
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
        zoom={4}
        maxZoom={18}
      >
        <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}" />

        <MarkerClusterGroup icon={myIcon} zoom={10}>
          {geoJSON.map((content, index) => (
            <Marker
              position={[content[1], content[0]]}
              key={index}
              icon={myIcon}
            >
              <Popup>
                {content[1]} {content[0]}
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </>
  );
};

export default BathymetryData;
