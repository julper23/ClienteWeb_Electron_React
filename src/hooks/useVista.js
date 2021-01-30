import {useSelector, useDispatch} from 'react-redux';

const useVista = () =>{
    const dispatch = useDispatch();
    const {vista} = useSelector((state) => state.vista);
    const setVista = (vista)=>{
        dispatch({type:"ADD_VISTA",vista:vista});
    };

    return{
        vista,
        setVista,
    };

};

export default useVista;