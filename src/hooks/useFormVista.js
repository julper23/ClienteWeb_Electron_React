import {useSelector, useDispatch} from 'react-redux';

const useFormVista = () =>{
    const dispatch = useDispatch();
    const {formVista} = useSelector((state) => state.formVista);
    const setFormVista = (formVista)=>{
        dispatch({type:"ADD_FORMVISTA",formVista:formVista});
    };

    return{
        formVista,
        setFormVista,
    };

};

export default useFormVista;