import "./App.css";
import React, { useState, useEffect } from "react";
import Map from "./Components/Deck/Maps/DeckMap";
import BathymetryData from "./Components/Deck/Maps/gpx";
import 'leaflet/dist/leaflet.css';
import PolyLineMap from "./Components/Deck/Maps/PolylineMap";
const App = () => {
const [view ,setView ] = useState(<div><h1>Data Visualization Testing</h1></div>);
  return (
    <div className="App">
    
        <div className="container">

            <div className="map">
                {view}
            </div>
            <div className="control">
                <button onClick={() => setView(<Map />)}>Deck Sample</button>
                <button onClick={() => setView(<BathymetryData /> )}>GPX Viewer</button>
                <button onClick={() => setView(<PolyLineMap /> )}>PolyLine Test</button>
            </div>
        </div>
    </div>
  );
};

export default App;