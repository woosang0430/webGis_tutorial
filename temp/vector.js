import "./style.css";
import Map from "ol/Map";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import View from "ol/View";
import DragAndDrop from "ol/interaction/DragAndDrop";
import GeoJSON from "ol/format/GeoJSON";
import Select from "ol/interaction/Select";
import Modify from "ol/interaction/Modify";
import Draw from "ol/interaction/Draw";
import Snap from "ol/interaction/Snap";

import proj4 from "proj4";
import { register } from "ol/proj/proj4";
import { transform } from "ol/proj";

proj4.defs(
  "EPSG:5179",
  "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
);
register(proj4);

const map = new Map({
  target: "map",
  layers: [
    new VectorLayer({
      source: new VectorSource({
        format: new GeoJSON(),
        url: "./data/countries.json",
      }),
    }),
  ],
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});
const source = new VectorSource();
const layer = new VectorLayer({
  source: source,
});
map.addLayer(layer);

map.addInteraction(
  new DragAndDrop({
    source: source,
    formatConstructors: [GeoJSON],
  })
);

const select = new Select();
map.addInteraction(select);

map.addInteraction(
  new Modify({
    features: select.getFeatures(),
  })
);

map.addInteraction(
  new Draw({
    type: "Polygon",
    source: source,
  })
);

map.addInteraction(
  new Snap({
    source: source,
  })
);

const clear = document.getElementById("clear");
clear.addEventListener("click", function () {
  source.clear();
});

const format = new GeoJSON({ featureProjection: "EPSG:3857" });
const download = document.getElementById("download");
source.on("change", function () {
  const features = source.getFeatures();
  const json = format.writeFeatures(features);
  download.href =
    "data:application/json;charset=utf-8," + encodeURIComponent(json);

  features.forEach(function (feature) {
    feature
      .getGeometry()
      .getCoordinates()
      .forEach(function (coordinates) {
        coordinates.forEach(function (coordinate) {
          console.log(coordinate);
          console.log(transform(coordinate, "EPSG:3857", "EPSG:5179"));
          console.log("------------------------------------------------");
        });
      });
  });
});
