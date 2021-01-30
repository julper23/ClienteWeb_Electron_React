const INITIAL_STATE = {
    coordenadasCiudadEditar: [null,null],
};

const loadCoordenadasCiudadEditar = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case "ADD_CoordenadasCiudadEditar":
            return { ...state, coordenadasCiudadEditar:action.coordenadasCiudadEditar};
        default:
            return state;
    }
};

export default loadCoordenadasCiudadEditar;