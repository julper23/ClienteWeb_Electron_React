const INITIAL_STATE = {
    arrayCiudades: [],
};

const loadArrayCiudades = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "ADD_arrayCiudades":
            return {...state, arrayCiudades: action.arrayCiudades };
        default:
            return state;
    }
};

export default loadArrayCiudades;