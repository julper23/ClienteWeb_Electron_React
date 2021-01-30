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
var redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
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
var theMarker : L.Marker;
export default function MapaEditarCiudad({ Center, Zoom,latt,longg}: Mapa) {
  const {setCoordenadasCiudadEditar} = useCoordenadasCiudadEditar();
  var popup = L.popup();  
  var theMarker2 : L.Marker;
  var primero = true;
  function MyComponent() {
    const map = useMapEvents({
      click: (e: { latlng: { lat: any; lng: any; }; }) => {
        const { lat, lng } = e.latlng;
        if (theMarker != undefined) {
            map.removeLayer(theMarker);
          };
        theMarker = L.marker([lat,lng]).addTo(map);
        setCoordenadasCiudadEditar([lat,lng]);
      },
    });
    if(primero){theMarker2 = L.marker([latt,longg],{icon:redIcon}).addTo(map);primero=false}
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