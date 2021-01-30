const INITIAL_STATE = {
    vista: "login",
};

const loadVista = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case "ADD_VISTA":
            return { ...state, vista:action.vista};
        default:
            return state;
    }
};

export default loadVista;