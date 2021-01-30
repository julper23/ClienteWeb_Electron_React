const INITIAL_STATE = {
    coordenadasLocEditar: [],
};

const loadCoordenadasLocEditar = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "ADD_CoordenadasLocEditar":
            return {...state, coordenadasLocEditar: action.coordenadasLocEditar };
        default:
            return state;
    }
};

export default loadCoordenadasLocEditar;