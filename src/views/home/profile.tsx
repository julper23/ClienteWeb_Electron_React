import './estilo.css';
import useDatUsuario from '../../hooks/useDatUsuario';
import React, { useState, useEffect } from 'react';
import { Row, Col} from 'antd';
import useSalaChat from '../../hooks/useSalaChat';
import useVista from '../../hooks/useVista';
//Componente donde se muestra el perfil
export default function Profile(){
    //Variables globales que se necesitan
    const {datUsuario,setDatUsuario} = useDatUsuario();
    const {setSalaChat} = useSalaChat();
    const {setVista} = useVista();

    //Variables locales
    const [nick,setNick] = useState("Usuario");

    /*Cada vez que iniciemos la aplicacion o la variable datUsuario se 
    *modifique todo lo que este en el useEffect se volvera a hacer*/
    useEffect(()=>{
        //Si existe un usuario colocamos su nombre en pantalla para que sepa que esta logueado con su usuario
        if(datUsuario != null){
            setNick(datUsuario["nombre"])
        }
    },[datUsuario])

    //Funcion con la cual nos deslogueamos de la aplicacion
    function Desloguearse(){
        localStorage.removeItem('usuario')
        setVista("login")
        setDatUsuario(null)
        setSalaChat("Global")
    }

    return (
        <Row id="fondo" >
            <Col span={5}></Col><Col span={14} className="espacioPerfil"></Col><Col span={5}></Col>
            <Col span={5}></Col><Col span={14} className="infoPerfil">
                {/*En esta row tenemos una imagen por defecto y el nombre del usuario */}
                <Row className="cuadroPerfilInfo">
                    <Col span={24} className="espacioPerfil"></Col>
                    <Col span={24} className="imagenCol">
                        <img src="https://img.icons8.com/bubbles/100/000000/user.png" alt={nick} className="imagen"/ >
                    </Col>
                    <Col span={24} className="espacioPerfil"></Col>
                    <Col span={24} className="espacioPerfil"></Col>
                    <Col span={24} className="espacioPerfil"></Col>
                    <Col span={24} className="nombreCol">
                        <h1>{nick}</h1>
                    </Col>
                    <Col span={24} className="espacioPerfil"></Col>
                </Row>
            </Col><Col span={5}></Col>
            <Col span={24} className="espacioPerfil"></Col>
            <Col span={5}></Col>
                <Col span={14} className="infoPerfil">
                    {/*En esta row tenemos la informacion de la app */}
                    <Row className="cuadroPerfilInfo">
                        <Col span={24} className="espacioPerfil"></Col>
                        <Col span={2}></Col><Col span={20} className="muchoTexto">Aplicacion creada por Endika Hernandez, Julen Perez y Enetz Rodriguez.<br></br> Proyecto final para el curso 2DAM3</Col><Col span={2}></Col>
                        <Col span={24} className="espacioPerfil"></Col>
                    </Row>
                </Col>
            <Col span={5}></Col>
            <Col span={5}></Col><Col span={14} className="espacioPerfil"></Col><Col span={5}></Col>
            <Col span={5}></Col><Col span={14} className="botonPerfil">
                {/*En esta row tenemos el boton para desLoguearnos */}
                <Row className="cuadroPerfilInfo">
                    <Col span={24} className="espacioPerfil"></Col>
                    <Col span={24} className="botonCerrarSesion" >
                        <div className="divEspacioBoton"></div>
                        <div className="divBotonLogOut" onClick = {() => Desloguearse()}>LogOut</div>
                        <div className="divEspacioBoton"></div>
                    </Col>
                    <Col span={24} className="espacioPerfil"></Col>
                </Row>
            </Col><Col span={5}></Col>
            <Col span={5}></Col><Col span={14} className="espacioPerfil"></Col><Col span={5}></Col>
        </Row>
    )
}
