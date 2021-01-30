const INITIAL_STATE = {
    coordenadasCiudadCrear: [null,null],
};

const loadCoordenadasCiudadCrear = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case "ADD_CoordenadasCiudadCrear":
            return { ...state, coordenadasCiudadCrear:action.coordenadasCiudadCrear};
        default:
            return state;
    }
};

export default loadCoordenadasCiudadCrear;