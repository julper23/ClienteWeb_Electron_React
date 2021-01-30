import {useSelector, useDispatch} from 'react-redux';

const useIpServer = () =>{
    const dispatch = useDispatch();
    const {ipServer} = useSelector((state) => state.ipServer);
    const setIpServer = (ipServer)=>{
        dispatch({type:"ADD_ipServer",ipServer:ipServer});
    };

    return{
        ipServer,
        setIpServer,
    };

};

export default useIpServer;