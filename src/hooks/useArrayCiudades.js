import { useSelector, useDispatch } from 'react-redux';

const useArrayCiudades = () => {
    const dispatch = useDispatch();
    const { arrayCiudades } = useSelector((state) => state.arrayCiudades);
    const setArrayCiudades = (arrayCiudades) => {
        dispatch({ type: "ADD_arrayCiudades", arrayCiudades: arrayCiudades });
    };

    return {
        arrayCiudades,
        setArrayCiudades,
    };

};

export default useArrayCiudades;