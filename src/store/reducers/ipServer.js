const INITIAL_STATE = {
    ipServer: "localhost",
};
//20.71.38.29
const loadIpServer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case "ADD_ipServer":
            return { ...state, ipServer:action.ipServer};
        default:
            return state;
    }
};

export default loadIpServer;