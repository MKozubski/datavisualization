import { TileLayer, BitmapLayer, GeoJsonLayer } from "deck.gl";
import geoData from "../data/pref.geojson";

/**
 * Renders the layers for the deck.gl map
 * @param {Object} props - properties passed to the function
 * @returns {Array} an array of layers to render
 */

export function renderLayers(props) {
  // GeoJsonLayer to render the geoJSON data
  const geoJSONlayer = new GeoJsonLayer({
    id: "geojson-layer",
    data: geoData,
    pickable: true,
    stroked: true,
    filled: true,
    getFillColor: [0, 160, 0, 180],
    getLineColor: [0, 0, 0, 255],
    lineWidthMinPixels: 1
  });

  // TileLayer to render the basemap
  const tileLayer = new TileLayer({
    data: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",

    minZoom: 0,
    maxZoom: 19,
    tileSize: 256,

    renderSubLayers: (props) => {
      const {
        bbox: { west, south, east, north }
      } = props.tile;

      return new BitmapLayer(props, {
        data: null,
        image: props.data,
        bounds: [west, south, east, north]
      });
    }
  });

  return [tileLayer, geoJSONlayer];
}
