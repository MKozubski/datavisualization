import React, { useState } from "react";
import DeckGL, { MapController } from "deck.gl";

import { renderLayers } from "./RenderLayers";

import "./styles.css";

const Map = () => {
  // Set the initial viewState using the useState hook
  const [viewState] = useState({
    longitude: -105.04560470581056,
    latitude: 69.11868280984892,
    zoom: 10,
    maxZoom: 16,
  });

  // Render the map and layers
  return (
    <>
      <h4>Deck.GL</h4>
      <div style={{ position: "relative" }}>
        <DeckGL
          layers={renderLayers()} // Render the layers using the renderLayers function
          controller={{ type: MapController }} // Set the controller to MapController
          initialViewState={viewState} // Use the viewState set using the useState hook
          width={"501px"} // Set the width of the map
          height={"301px"} // Set the height of the map
          position={"relative"} // Set the position of the map
        />
      </div>
    </>
  );
};

export default Map;
