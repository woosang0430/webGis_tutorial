import './style.css';
import View from 'ol/View';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new XYZ({
        // vworld
        //일반도 :  
        //url :'http://xdworld.vworld.kr:8080/2d/Base/201710/{z}/{x}/{y}.png'
        //위성영상 : 
        //url :'http://xdworld.vworld.kr:8080/2d/Satellite/201710/{z}/{x}/{y}.jpeg'
        //지형도(하이브리드) : 
        //url :'http://xdworld.vworld.kr:8080/2d/Hybrid/201710/{z}/{x}/{y}.png'
        // 회색조 : 
        //url :'http://xdworld.vworld.kr:8080/2d/gray/201710/{z}/{x}/{y}.png'
        //지형도(하이브리드) : 
        //url :'http://xdworld.vworld.kr:8080/2d/midnight/201710/{z}/{x}/{y}.png'

        //google
        //일반도 :  
        //url :'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'
        //위성영상 : 
        //url :'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
        //지형도 : 
        //url :'https://mt1.google.com/vt/lyrs=t&x={x}&y={y}&z={z}'
        //지형도(하이브리드) : 
        //url :'https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}'
        //위성지도 : 
        url :'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'

      })
    })
  ],
  view: new View({
    center : [ 14138984.363280362, 4514923.621443103 ],
    zoom : 11
  })
});
