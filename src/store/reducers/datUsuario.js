const INITIAL_STATE = {
    datUsuario: null,
};

const loadDatUsuario = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case "ADD_USUARIO":
            return { ...state, datUsuario:action.datUsuario};
        default:
            return state;
    }
};

export default loadDatUsuario;