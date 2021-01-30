import "./mapa.css";
import React from 'react';
import { MapContainer, Marker, TileLayer, Popup, useMapEvents } from "react-leaflet";
import L ,{LatLngExpression} from "leaflet";
import "leaflet/dist/leaflet.css";
import useCoordenadasCiudadCrear from '../../hooks/useCoordenadasCiudadCrear';

export interface Mapa { Center: LatLngExpression, Zoom: number }

const myIcon = L.icon({
  iconUrl: 'https://www.flaticon.com/svg/static/icons/svg/1673/1673221.svg',
  iconSize: [10,10],
  iconAnchor: [32, 64],
  shadowAnchor : [4,62],
  popupAnchor:[12,-90]
});
const estilo = {  
  color: 'gold',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 20
};
var theMarker : L.Marker;
export default function MapaCreaCiudad({ Center, Zoom }: Mapa) {
  const {setCoordenadasCiudadCrear} = useCoordenadasCiudadCrear();
  var popup = L.popup();
  function MyComponent() {
    const map = useMapEvents({
      click: (e: { latlng: { lat: any; lng: any; }; }) => {
        const { lat, lng } = e.latlng;
        if (theMarker !== undefined) {
          map.removeLayer(theMarker);
        };
        theMarker = L.marker([lat,lng]).addTo(map);  
        setCoordenadasCiudadCrear([lat,lng]);
      }
    });
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