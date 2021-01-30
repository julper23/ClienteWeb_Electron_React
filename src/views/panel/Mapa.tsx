import "./mapa.css";
import React from 'react';
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Localizaciones } from './localicaciones';

export interface Mapa { Center: LatLngExpression, Zoom: number }
const list: Localizaciones[] = [
  {
    lat: 43.339643763841615,
    long: -1.794031072876929,
    oculto: false
  },
  {
    lat: 43.33878542101421,
    long: -1.7949537527815072,
    oculto: false
  }
]
const myIcon = L.icon({
  iconUrl: 'https://www.flaticon.com/svg/static/icons/svg/1673/1673221.svg',
  iconSize: [40, 40],
  iconAnchor: [32, 64],
  shadowAnchor: [4, 62],
  popupAnchor: [12, -90]
});
const estilo = {
  color: 'gold',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 200
};
export default function Mapa({ Center, Zoom }: Mapa) {
  return (
    <div>
      <MapContainer className="prueba" style={estilo} center={Center} zoom={Zoom} scrollWheelZoom={true}>
        <TileLayer attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {list.map((item, index) =>
          <Marker icon={myIcon} key={index} position={[item.lat, item.long]}></Marker>
        )}
      </MapContainer>
    </div>
  )
}