import "./style.css";
import { Map, View } from "ol";
import GeoJSON from "ol/format/GeoJSON.js";
import VectorLayer from "ol/layer/Vector.js";
import VectorSource from "ol/source/Vector.js";

const vectorLayer = new VectorLayer({
  source: new VectorSource({
    url: "data/seoul_sgg.geojson",
    format: new GeoJSON(),
  }),
});

const map = new Map({
  target: "map",
  layers: [vectorLayer],
  view: new View({
    center: [14135193.892664503, 4512192.435216382],
    zoom: 10,
  }),
});
