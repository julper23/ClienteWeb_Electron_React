const INITIAL_STATE = {
    coordenadasLocCrear: [null,null],
};

const loadCoordenadasLocCrear = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case "ADD_CoordenadasLocCrear":
            return { ...state, coordenadasLocCrear:action.coordenadasLocCrear};
        default:
            return state;
    }
};

export default loadCoordenadasLocCrear;