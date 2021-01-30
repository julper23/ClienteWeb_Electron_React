import "./mapa.css";
import React from 'react';
import { MapContainer, Marker, TileLayer, Popup, useMapEvents } from "react-leaflet";
import L ,{LatLngExpression} from "leaflet";
import "leaflet/dist/leaflet.css";
import useCoordenadasCiudadEditar from '../../hooks/useCoordenadasCiudadEditar';

export interface Mapa { Center: LatLngExpression, Zoom: number , latt:number, longg:number}

const myIcon = L.icon({
  iconUrl: 'https://www.flaticon.com/svg/static/icons/svg/1673/1673221.svg',
});
var greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
const estilo = {  
  color: 'gold',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 20
};
export default function MapaVisualizarCiudad({ Center, Zoom,latt,longg}: Mapa) {
  const {setCoordenadasCiudadEditar} = useCoordenadasCiudadEditar();
  var popup = L.popup();  
  var theMarker2 : L.Marker;
  function MyComponent() {
    const map = useMapEvents({});
    theMarker2 = L.marker([latt,longg],{icon:greenIcon}).addTo(map);
    return null;
  }
  return (
    <div>
      <MapContainer 
        id="p"
        className="prueba"
        style={estilo}
        center={Center}
        zoom={Zoom}
        scrollWheelZoom={true}
      >
        <TileLayer  attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>   
        <MyComponent />
      </MapContainer>
    </div>
  ) 
}