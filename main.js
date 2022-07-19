import "./style.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import LayerGroup from "ol/layer/Group";
import OSM from "ol/source/OSM";
import Stamen from "ol/source/Stamen";

const layer = new TileLayer({
  opacity: 1,
  visible: true,
  extent: [0, 0, 0, 0],
  zIndex: 0,
  minResolution: 20,
  maxResolution: 2000,
  source: new OSM(),
});

const groupLayer = new LayerGroup({
  layers: [
    new TileLayer({
      source: new Stamen({ layer: "watercolor" }),
    }),
    new TileLayer({
      source: new Stamen({ layer: "terrain-labels" }),
    }),
  ],
});

const map = new Map({
  target: "map",
  layers: [layer, groupLayer],
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});
