import {useSelector, useDispatch} from 'react-redux';

const useCoordenadasLocCrear = () =>{
    const dispatch = useDispatch();
    const {coordenadasLocCrear} = useSelector((state) => state.coordenadasLocCrear);
    const setCoordenadasLocCrear = (coordenadasLocCrear)=>{
        dispatch({type:"ADD_CoordenadasLocCrear",coordenadasLocCrear:coordenadasLocCrear});
    };
    return{
        coordenadasLocCrear,
        setCoordenadasLocCrear,
    };

};

export default useCoordenadasLocCrear;