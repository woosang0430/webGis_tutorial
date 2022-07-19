import "./style.css";
import View from "ol/View";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import TileWMS from "ol/source/TileWMS";
const map = new Map({
  target: "map",
  layers: [
    new TileLayer({
      source: new TileWMS({
        url: "http://localhost:8080/geoserver/wms",
        params: { LAYERS: "world", TILED: true },
        serverType: "geoserver",
        transition: 0,
      }),
    }),
  ],
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});
