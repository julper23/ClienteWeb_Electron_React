import Login from './views/login/index';
import Menu from './views/panel/index';
import './App.css';
import store from './store';
import {Provider} from 'react-redux';
import axios from 'axios';
import useVista from './hooks/useVista';
import useDatUsuario from './hooks/useDatUsuario';
import useIpServer from './hooks/useIpServer';
import React, {useEffect} from 'react';

function App() {
  //Variables globales
  const {vista,setVista} = useVista();
  const {ipServer} = useIpServer();
  const {setDatUsuario} = useDatUsuario();

  
  //Funcion para comprobar que el usuario este logueado
  useEffect(()=>{
    //Si esta logueado lo mantenemos logueado
    if(localStorage.getItem('usuario')){
      var urlId= 'http://'+ipServer+':8080/usuario/busId/'+localStorage.getItem('usuario');
      axios.get(urlId)
      .then((response) => {
        setDatUsuario(response.data)
        localStorage.setItem('usuario', response.data["id"]);
      });
      setVista("menu"); 
    }

  },[]);

  return (
    <Provider store={store}>
      {/*Cargamos los providers directamente en el app,
      para que las variables globales sean accesibles desde cualquier parte de la app */}
      <div className="App">
        {/*La variable global vista hace que se muestre el login o el menu */}
        {vista==="login"&&<Login></Login>}
        {vista==="menu"&&<Menu></Menu>}
      </div>
    </Provider>
  );
}

export default App;