const INITIAL_STATE = {
    salaChat: "Global",
};

const loadSalaChat = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case "ADD_salaChat":
            return { ...state, salaChat:action.salaChat};
        default:
            return state;
    }
};

export default loadSalaChat;