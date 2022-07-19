import "./style.css";
import Map from "ol/Map";
import View from "ol/View";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import DragAndDrop from "ol/interaction/DragAndDrop";
import Select from "ol/interaction/Select";
import Modify from "ol/interaction/Modify";
import Draw from "ol/interaction/Draw";
import Snap from "ol/interaction/Snap";

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

// vectorData를 브라우저로 바로 옮실 수 있음
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
    source,
  })
);

// 이미 그려진 vector data를 수정하는데 사용
map.addInteraction(
  new Snap({
    source,
  })
);
const clearBtn = document.querySelector("#clear");
clearBtn.addEventListener("click", () => {
  source.clear();
});

const format = new GeoJSON({ featureProjection: "EPSG:3857" });
const download = document.querySelector("#download");

source.on("change", () => {
  const features = source.getFeatures();
  const json = format.writeFeatures(features);
  download.href = `data:application/json;charset=utf-8, ${encodeURIComponent(
    json
  )}`;
});
