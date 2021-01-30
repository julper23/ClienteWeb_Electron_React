import "./mapa.css";
import React, { useEffect, useState, } from 'react';
import { MapContainer, Marker, TileLayer, Popup, PolylineProps, Polyline, useMapEvents, } from "react-leaflet";
import L, { LatLngExpression, polyline } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Localizaciones } from './localizaciones';
import axios from "axios";

export interface MapaVisualizarRutas { Center: LatLngExpression, Zoom: number, longitudArray: any[], latitudArray: any[], polyline: LatLngExpression[][], usuarios: number[][] }

const myIcon = L.icon({
    iconUrl: 'https://www.flaticon.com/svg/static/icons/svg/1673/1673221.svg',
    iconSize: [40, 40],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
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
    radius: 200
};
export default function MapaVisualizarRutas({ Center, Zoom, longitudArray, latitudArray, polyline, usuarios }: MapaVisualizarRutas) {
    const [lista, setLista] = useState<Localizaciones[]>([]);
    useEffect(() => {
        let mounted = true;
        if (mounted) {
            var list: Localizaciones[] = []
            for (var i = 0; i < longitudArray.length; i++) {
                list.push(
                {
                    lat: latitudArray[i],
                    long: longitudArray[i]
                 })
            }
            setLista(list);
        }
        return function cleanup() {
            mounted = false;
        };
    }, []);
    var arrayUsuarios:any[][] = usuarios;
    return (
        <div>
            <MapContainer className="prueba" style={estilo} center={Center} zoom={Zoom} scrollWheelZoom={true}>
                <TileLayer attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {lista.map((item, index) => {
                    return (<Marker icon={redIcon} key={index} position={[item.lat, item.long]}></Marker>)
                }
                )}
                {polyline.map((poli: LatLngExpression[]) => {
                    return (<Polyline positions={[[poli[0], poli[1]], [poli[2], poli[3]]]}></Polyline>)
                })
                }
                {arrayUsuarios.map((item:any, index : any) => {
                    return (<Marker icon={myIcon} key={index} position={[item[0][0], item[0][1]]}></Marker>)
                })
                } 
            </MapContainer>
        </div>
    )
}
