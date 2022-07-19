import "./style.css";
import { Map, View } from "ol";
import {
  defaults as defaultControls,
  Attribution,
  FullScreen,
  MousePosition,
  OverviewMap,
  Rotate,
  ScaleLine,
  ZoomSlider,
  ZoomToExtent,
} from "ol/control.js";
import TileLayer from "ol/layer/Tile.js";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector.js";
import GeoJSON from "ol/format/GeoJSON";
import OSM from "ol/source/OSM.js";
import { createStringXY } from "ol/coordinate";

const attribution = new Attribution({
  collapsible: true,
});

const fullScreen = new FullScreen();

const mousePosition = new MousePosition({
  coordinateFormat: createStringXY(4),
  projection: "EPSG:4326",
  target: "coordinateDivId",
  undefinedHTML: "&nbsp;",
});

// 주로 쉽게 식별이 되는 layer를 넣어준다.
const overViewMap = new OverviewMap({
  collapsible: false,
  layers: [
    new VectorLayer({
      source: new VectorSource({
        url: "data/seoul_sgg.geojson",
        format: new GeoJSON(),
      }),
    }),
  ],
});

// shift + alt + mouse draft
const rotate = new Rotate();

const scaleLine = new ScaleLine({
  units: "metric", // degrees, imperial, us, nautical
});

const zoomSlider = new ZoomSlider();

// 초기 설정한 zoom으로 이동하는 것이 아닌 최대 줌으로 이동
const zoomToExtent = new ZoomToExtent();

// 이 친구의 경우 default control에 추가되어 있음
// const zoom = new Zoom();

const map = new Map({
  layers: [new TileLayer({ source: new OSM() })],
  // controls도 array에 각각 넣어줘도 작동함
  controls: defaultControls({ attribution: true }).extend([
    attribution,
    fullScreen,
    mousePosition,
    overViewMap,
    rotate,
    scaleLine,
    zoomSlider,
    zoomToExtent,
  ]),
  target: "map",
  view: new View({
    center: [14135193.892664503, 4512192.435216382],
    zoom: 13,
  }),
});

const controlList = map.getControls().getArray();

controlList.forEach(function (item, index) {
  if (item instanceof Attribution) {
    map.removeControl(item);
    console.log("removed !");
  }
});
