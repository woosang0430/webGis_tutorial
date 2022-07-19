import "./style.css";
import Map from "ol/Map";
import View from "ol/View";
import { defaults as defaultControls } from "ol/control";
import { defaults as defaultInteractions } from "ol/interaction";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { KeyboardPan, KeyboardZoom } from "ol/interaction";

const map = new Map({
  controls: defaultControls(),
  interactions: defaultInteractions().extend([
    new KeyboardPan(),
    new KeyboardZoom(),
  ]),
  layers: [new TileLayer({ source: new OSM() })],
  target: "map",
  keyboardEventTarget: document,
  view: new View({
    center: [14135193.892664503, 4512192.435216382],
    zoom: 13,
  }),
});
