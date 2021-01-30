import {useSelector, useDispatch} from 'react-redux';

const useCoordenadasCiudadEditar = () =>{
    const dispatch = useDispatch();
    const {coordenadasCiudadEditar} = useSelector((state) => state.coordenadasCiudadEditar);
    const setCoordenadasCiudadEditar = (coordenadasCiudadEditar)=>{
        dispatch({type:"ADD_CoordenadasCiudadEditar",coordenadasCiudadEditar:coordenadasCiudadEditar});
    };

    return{
        coordenadasCiudadEditar,
        setCoordenadasCiudadEditar,
    };

};

export default useCoordenadasCiudadEditar;