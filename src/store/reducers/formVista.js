const INITIAL_STATE = {
    formVista: "default",
};

const loadFormVista = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case "ADD_FORMVISTA":
            return { ...state, formVista:action.formVista};
        default:
            return state;
    }
};

export default loadFormVista;