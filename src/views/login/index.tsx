import './index.css';
import { Input, Button,Row,Col} from 'antd';
import React, { useState } from 'react';
import axios from 'axios';
import useDatUsuario from '../../hooks/useDatUsuario';
import useVista from '../../hooks/useVista';
import useFormVista from '../../hooks/useFormVista';
import useIpServer from '../../hooks/useIpServer';
import { Alert } from 'antd';
import 'antd/dist/antd.css';

//Componente de login y registro
const Login = () => {

  //Variables globales
  const {setDatUsuario} = useDatUsuario();
  const {setVista} = useVista();
  const {ipServer} = useIpServer();
  const {setFormVista} = useFormVista();

  //Variables locales
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [alerta,setAlerta] = useState("");
  const [textoAlerta,setTextoAlerta] = useState("");
  const [vistaRegistro,setVistaRegistro]=useState(false);


  //Funcion para mostrar una alerta al usuario
  const mostrarAlerta = (texto:any,tipo:any) => {
    //Mostramos la alerta
    setTextoAlerta(texto);
    setAlerta(tipo);
    //Despues de 2 segundos la ocultamos
    setTimeout(()=>{setAlerta("");setTextoAlerta("")},2000)
  }

  //Funcion para loguearse
  const logearse = () => {
    var urlNick= 'http://'+ipServer+':8080/usuario/'+nombre+"/"+password;
    var urlId= 'http://'+ipServer+':8080/usuario/'+nombre;
    //Si el nombre o la contraseña estan vacias pedimos que se comprueben los datos
    if(nombre===""||password===""){
      mostrarAlerta("COMPRUEBA LOS DATOS INTRODUCIDOS","error");
    }else{
      axios.get(urlNick)
      .then((response) => {
        //Si el usuario no es correcto pedimos que compruebe los datos
        if(response.data===false){
          mostrarAlerta("COMPRUEBA LOS DATOS INTRODUCIDOS","error");
        }
        //Si el usuario es correcto lo logueamos
        if(response.data===true){
          axios.get(urlId)
          .then((response) => {
            setDatUsuario(response.data[0])
            localStorage.setItem('usuario', response.data[0]["id"]);
          });
          setVista("menu");
          setFormVista("default");
        }
      })
    }
  };
  
  //Funcion para registrarse
  const Registrarse = () => {
    var urlNick = 'http://'+ipServer+':8080/usuario/'+nombre;
    if(nombre===""||password===""){
      mostrarAlerta("COMPRUEBA LOS DATOS INTRODUCIDOS","error");
    }else{
      axios.get(urlNick)
      .then((response) => {
        return response.data[0];
      }).then((usuarios) => {
        //Si el usuario no existe creamos uno
        if(usuarios==null){
          axios({
            method: 'post',
            url: 'http://'+ipServer+':8080/usuario/newUsuario', 
            data: {
              nombre : nombre,
              contrasena: password,
              avatar : "avatares/avatarPorDefecto.jpg",
              "admin" : false
            }
          }).then(() => {
            setNombre("");
            setPassword("");
            setVistaRegistro(false);
            mostrarAlerta("Usuario registrado con exito","success");
          });
        //Si el usuario existe indicamos al usuario para que cambie el nombre
        }else{
          mostrarAlerta("El usuario ya existe","error");
        }
      })
    }
  }

  return (<>
    <Row justify="space-around" align="middle" id="row">
      <Col span={6}></Col>
        {/*Dependiendo de la alerta que se quiera mostrar, aparecera una u otra */}
        <Col span={12} className="alerta">
          {alerta==="success"&&<Alert message={textoAlerta} type="success" showIcon />}
          {alerta==="info"&&<Alert message={textoAlerta} type="info" showIcon />}
          {alerta==="warning"&&<Alert message={textoAlerta} type="warning" showIcon />}
          {alerta==="error"&&<Alert message={textoAlerta} type="error" showIcon />}
        </Col>
      <Col span={6}></Col>
      <Col span={7}></Col>
        <Col span={10}>
          {/*Si el usuario se esta logueando aparecera esta parte */}
          {vistaRegistro===false&&<>
            <h1>Login</h1>
            <h2>Nombre</h2>
            <Input id="nick2" type="text" value={nombre} name="nombreString" onChange={(e)=>setNombre(e.target.value)}/>
            <h2>Contraseña</h2>
            <Input.Password type="text" value={password} name="passwordString" onChange={(e)=>setPassword(e.target.value)}/>
            <div id="espacio"></div>
            <Button onClick = {() =>logearse()}>Iniciar Sesion</Button>
            <Button onClick = {() =>setVistaRegistro(true)}>Registrarse</Button>
          </>}
          {/*Si el usuario se esta registrando aparecera esta parte */}
          {vistaRegistro===true&&<>
            <h1>Registro</h1>
            <h2>Nombre</h2>
            <Input id="nick2" type="text" value={nombre} name="nombreString" onChange={(e)=>setNombre(e.target.value)}/>
            <h2>Contraseña</h2>
            <Input.Password type="text" value={password} name="passwordString" onChange={(e)=>setPassword(e.target.value)}/>
            <div id="espacio"></div>
            <Button onClick = {() =>setVistaRegistro(false)}>Iniciar Sesion</Button>
            <Button onClick = {() =>Registrarse()}>Registrarse</Button>
          </>}
        </Col>
      <Col span={7}></Col>
      <Col span={6}></Col>
        <Col span={12}></Col>
      <Col span={6}></Col>
    </Row>
  </>);
};
export default Login;