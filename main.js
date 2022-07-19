import "./style.css";
import { Map, View } from "ol";
import LayerGroup from "ol/layer/Group";
import TileWMS from "ol/source/TileWMS";
import XYZ from "ol/source/XYZ";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

const groupLayer = new LayerGroup({
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
    new TileLayer({
      extent: [-13884991, 2870341, -7455066, 6338219],
      source: new TileWMS({
        url: "https://ahocevar.com/geoserver/wms",
        params: { LAYERS: "topp:states", TILED: true },
        serverType: "geoserver",
        transition: 0,
      }),
    }),
    new TileLayer({
      source: new XYZ({
        url: "http://tile.stamen.com/terrain/{z}/{x}/{y}.png",
      }),
    }),
  ],
});

const map = new Map({
  target: "map",
  layers: [groupLayer],
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});
