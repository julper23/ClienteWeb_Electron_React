import {createStore, combineReducers} from "redux";
import {datUsuario, vista , formVista,coordenadasLocEditar, coordenadasCiudadCrear,coordenadasCiudadEditar, arrayCiudades, coordenadasLocCrear, salaChat, ipServer} from "./reducers";
const reducers = combineReducers({
    datUsuario,
    vista,
    formVista,
    coordenadasCiudadCrear,
    coordenadasCiudadEditar,
    arrayCiudades,
    coordenadasLocCrear,
    salaChat,
    ipServer,
    coordenadasLocEditar
});

export default createStore(reducers);