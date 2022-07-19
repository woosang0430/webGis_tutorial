import "./style.css";
import { Map, View } from "ol";
import { Image as ImageLayer, Tile as TileLayer } from "ol/layer.js";
import proj4 from "proj4";
import Static from "ol/source/ImageStatic.js";
import ImageWMS from "ol/source/ImageWMS.js";
import OSM from "ol/source/OSM";
import { getCenter } from "ol/extent";
import { register } from "ol/proj/proj4";
import { transform } from "ol/proj";
proj4.defs(
  "EPSG:27700",
  "+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 " +
    "+x_0=400000 +y_0=-100000 +ellps=airy " +
    "+towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 " +
    "+units=m +no_defs"
);
register(proj4);
const imageExtent = [0, 0, 700000, 1300000];
const staticImageLayer = new ImageLayer({
  source: new Static({
    url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/" +
      "British_National_Grid.svg/2000px-British_National_Grid.svg.png",
    projection: "EPSG:27700",
    imageExtent: [0, 0, 700000, 1300000],
  }),
});
const geoserverImageLayer = new ImageLayer({
  extent: [-13884991, 2870341, -7455066, 6338219],
  source: new ImageWMS({
    url: "https://ahocevar.com/geoserver/wms",
    params: { LAYERS: "topp:states" },
    ratio: 1,
    serverType: "geoserver",
  }),
});
const map = new Map({
  target: "map",
  layers: [
    new TileLayer({ source: new OSM() }),
    staticImageLayer,
    geoserverImageLayer,
  ],
  view: new View({
    center: transform(getCenter(imageExtent), "EPSG:27700", "EPSG:3857"),
    zoom: 4,
  }),
});
