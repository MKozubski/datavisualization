
import React, { useEffect, useState } from "react";
import gpxdata from "./Track_02-AUG-13.gpx";
import gpxParser from "gpxparser";
import DeckGL, { MapController } from "deck.gl";

import { renderLayers } from "./RenderLayers";

import "./styles.css";



const Map = () => {
  const [viewState] = useState({
    longitude: 135.0066832,
    latitude: 37.9619195,
    zoom: 4,
    maxZoom: 16
  });

  return (
    <div style={{position:"relative"}}>
      <DeckGL
        layers={renderLayers()}
        controller={{ type: MapController }}
        initialViewState={viewState}
        width={"501px"}
        height={"301px"}
        position={"relative"}
      />
    </div>
  );
};

export default Map;