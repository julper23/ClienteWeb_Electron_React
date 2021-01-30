import {useSelector, useDispatch} from 'react-redux';

const useCoordenadasCiudadCrear = () =>{
    const dispatch = useDispatch();
    const {coordenadasCiudadCrear} = useSelector((state) => state.coordenadasCiudadCrear);
    const setCoordenadasCiudadCrear = (coordenadasCiudadCrear)=>{
        dispatch({type:"ADD_CoordenadasCiudadCrear",coordenadasCiudadCrear:coordenadasCiudadCrear});
    };

    return{
        coordenadasCiudadCrear,
        setCoordenadasCiudadCrear,
    };

};

export default useCoordenadasCiudadCrear;