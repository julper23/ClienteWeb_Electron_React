import { useSelector, useDispatch } from 'react-redux';

const useCoordenadasLocEditar = () => {
    const dispatch = useDispatch();
    const { coordenadasLocEditar } = useSelector((state) => state.coordenadasLocEditar);
    const setCoordenadasLocEditar = (coordenadasLocEditar) => {
        dispatch({ type: "ADD_CoordenadasLocEditar", coordenadasLocEditar: coordenadasLocEditar });
    };

    return {
        coordenadasLocEditar,
        setCoordenadasLocEditar,
    };

};

export default useCoordenadasLocEditar;