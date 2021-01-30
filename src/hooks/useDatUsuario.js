import {useSelector, useDispatch} from 'react-redux';

const useDatUsuario = () =>{
    const dispatch = useDispatch();
    const {datUsuario} = useSelector((state) => state.datUsuario);
    const setDatUsuario = (datUsuario)=>{
        dispatch({type:"ADD_USUARIO",datUsuario:datUsuario});
    };

    return{
        datUsuario,
        setDatUsuario,
    };

};

export default useDatUsuario;