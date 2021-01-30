import './index.css';
import React, { useState, useEffect} from 'react';
import Select from 'react-select';
import Perfil from '../home/profile';
import ChatRoom from "../home/ChatRoom/ChatRoom";
import useFormVista from '../../hooks/useFormVista';
import useCoordenadasCiudadCrear from '../../hooks/useCoordenadasCiudadCrear';
import useCoordenadasCiudadEditar from '../../hooks/useCoordenadasCiudadEditar';
import useCoordenadasLocEditar from '../../hooks/useCoordenadasLocEditar';
import useCoordenadasLocCrear from '../../hooks/useCoordenadasLocCrear';
import useSalaChat from '../../hooks/useSalaChat';
import useIpServer from '../../hooks/useIpServer';
import { Input, Row, Col,Upload,Alert } from 'antd';
import MapaCreaCiudad from './MapaCreaCiudad';
import MapaEditarCiudad from './MapaEditarCiudad';
import MapaEditarLocalizacion from './MapaEditarLocalizaciones';
import MapaEditarLocalizacionesPeque from './MapaEditarLocalizacionesPeque';
import MapaVisualizarCiudad from './MapaVisualizarCiudad';
import MapaCreaLocalizacion from './MapaCreaLocalizacion';
import ImgCrop from 'antd-img-crop';
import flecha_atras from '../../img/flecha_atras.png';
import axios from 'axios';
import MapaVisualizarRutas from './MapaVisualizar';
import 'antd/dist/antd.css';
import { UploadFile } from 'antd/lib/upload/interface';
import { LatLngExpression } from 'leaflet';
//Componente de menu de rutas y ciudades
const Menu = () => {
  //Array de vehiculos
  var vehiculosArrayEditar = [] as any;

  //Variables globales
  const {coordenadasCiudadCrear,setCoordenadasCiudadCrear} = useCoordenadasCiudadCrear();
  const { coordenadasLocEditar, setCoordenadasLocEditar } = useCoordenadasLocEditar();
  const {coordenadasLocCrear,setCoordenadasLocCrear} = useCoordenadasLocCrear();
  const {coordenadasCiudadEditar} = useCoordenadasCiudadEditar();
  const {formVista,setFormVista} = useFormVista();
  const {salaChat,setSalaChat} = useSalaChat();
  const {ipServer} = useIpServer();

  //Variables locales
  const [optionsVehiculos] = useState([{value: 'Andando',label: 'Andando'},{value: 'Bicicleta',label: 'Bicicleta'},{value: 'Coche',label: 'Coche'}]);
  const [optionsDificultad] = useState([{value: 'Facil',label: 'Facil'},{value: 'Medio',label: 'Medio'},{value: 'Dificil',label: 'Dificil'}]);
  const [vehiculosRutaEditar, setVehiculosRutaEditar] = useState(vehiculosArrayEditar[0]);
  const [fileListEditar, setFileListEditar] = useState<Array<UploadFile<any>>>([]);
  const [ coordenadasLocEditar2, setCoordenadasLocEditar2 ] = useState<any[]>([]);
  const [ciudadVisibleVisualizar,setCiudadVisibleVisualizar] = useState(false);
  const [nombreLocalizacionCrear, setnombreLocalizacionCrear] = useState("");
  const [usuariosArrayLoc, setUsuariosArrayLoc] = useState<any[][]>([]);
  const [ciudadVisualizar,setCiudadVisualizar] = useState(["","1","1"]);
  const [dificultadRutaEditar, setDificultadRutaEditar] = useState("");
  const [fileList, setFileList] = useState<Array<UploadFile<any>>>([]);
  const [ciudadVisibleEditar,setCiudadVisibleEditar] = useState(false);
  const [polyLine, setPolyLine] = useState<LatLngExpression[][]>([]);
  const [nombreCiudadEditar,setnombreCiudadEditar]= useState("null");
  const [optionsNombreCiudad, setOptionsNombreCiudad] = useState([]);
  const [ciudadesRutaEditar, setCiudadesRutaEditar] = useState("");
  const [arrayLongitud, setArrayLongitud] = useState<number[]>([]);
  const [cambiarDatosUsuario,setCambiarDatosUsuario] = useState(0);
  const [longitudRutaEditar, setLongitudRutaEditar] = useState(0);
  const [optionsRutaLoc, setOptionsRutaLoc] = useState<any[]>([]);
  const [preguntaEditarLoc, setPreguntaEditarLoc] = useState("");
  const [arrayLatitud, setArrayLatitud] = useState<number[]>([]);
  const [nombreCiudadcrear, setnombreCiudadcrear] = useState("");
  const [ciudadEditar,setCiudadEditar] = useState(["","1","1"]);
  const [respuestas, setRespuestas] = useState<string[][]>([]);
  const [nombreLocEditar2, setNombreLocEditar2] = useState("");
  const [nombreRutaEditar, setNombreRutaEditar] = useState("");
  const [idCiudadEditar,setidCiudadEditar] = useState("null");
  const [ciudadEliminar, setCiudadEliminar]= useState("null");
  const [nombreLocEditar, setNombreLocEditar] = useState("");
  const [optionsCiudades, setOptionsCiudades] = useState([]);
  const [optionsNomRutCT, setOptionsNomRutCT] = useState([]);
  const [nombreRutacrear, setnombreRutacrear] = useState("");
  const [preguntas, setPreguntas] = useState<string[]>([]);
  const [arrayGood, setArrayGood] = useState<any[][]>([]);
  const [idRutaEliminar,setIdRutaEliminar] = useState("");
  const [visibility, setVisibility] = useState("hidden");
  const [mapaEditarLoc, setMapaEditarLoc] = useState(1);
  const [mapaNoOculto,setMapaNoOculto] = useState(true);
  const [idRutaEditar, setidRutaEditar] = useState("");
  const [longitudRuta, setlongitudRuta] = useState(0);
  const [ocultoeditar, setOcultoEditar] = useState(0);
  const [mapaOculto,setMapaOculto] = useState(true);
  const [textoAlerta,setTextoAlerta] = useState("");
  const [rutasTodas, setRutasTodas] = useState([]);
  const [valueRadio, setValueRadio] = useState(1);
  const [idRutaLoc, setIdRutaLoc] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [dificultad, setDificultad] = useState();
  const [r1editar, setR1Editar] = useState("");
  const [r2editar, setR2Editar] = useState("");
  const [r3editar, setR3Editar] = useState("");
  const [r4editar, setR4Editar] = useState("");
  const [pregunta, setPregunta] = useState("");
  const [vehiculo, setVehiculo] = useState("");
  const [alerta,setAlerta] = useState("");
  const [ciudad, setCiudad] = useState();
  const [r1,setR1] = useState("");
  const [r2,setR2] = useState("");
  const [r3,setR3] = useState("");
  const [r4,setR4] = useState("");
  //ESTILOS
  const styles = {
    largeIcon: {
      width: 40,
      height: 40,
      margin: "auto"
    },
    p1: {
      marginLeft: 20
    },
    button: {
      width: 1100
    },
    radio: {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    },
    pregunta: {
      margin: 'auto',
      textAling: 'center',
      verticalAling: 'middle'
    },
    verde: {
      backgroundColor: 'green',
      color: 'white'
    },
    rojo: {
      backgroundColor: 'red',
      color: 'white'
    },
    mapa:{
      textAling:'Center'
    },
    textoMapa:{
      color:'white'
    }
  };

  //MOSTRAR ALERTA
  const mostrarAlerta = (texto:any,tipo:any) => {
    setTextoAlerta(texto);
    setAlerta(tipo);
    setTimeout(()=>{setAlerta("");setTextoAlerta("")},2000)
  }

  //CREAR CIUDAD
  const crearCiudad = () => {
    //Comprobamos que ningun dato este vacio
    if (coordenadasCiudadCrear === undefined || nombreCiudadcrear === "") {
      mostrarAlerta("Faltan datos por rellenar","error");
    }else{
      axios({
        method: 'get',
        url: 'http://'+ipServer+':8080/ciudades/nombre/'+ nombreCiudadcrear+'',
      }).then((response) => {
        return response.data;
      }).then((all) => {
        //Comprobamos que la ciudad no exista
        if(all==null){
          axios({
            method: 'post',
            url: 'http://'+ipServer+':8080/ciudades/newCiudad',
            data: {
              nombre: nombreCiudadcrear,
              latitude: coordenadasCiudadCrear[0],
              longitude: coordenadasCiudadCrear[1],
            }
          });
          setCoordenadasCiudadCrear();
          setnombreCiudadcrear("");
          setFormVista("default");
          mostrarAlerta("Ciudad añadida con exito","success");
        }else{
          mostrarAlerta("Este nombre de ciudad ya existe","error");
        }
      })
    }
  }

  //Buscar la ciudad para editarla
  const buscarCiudadEditar = (e: any) => {
    var urlCiudades = 'http://'+ipServer+':8080/ciudades/id/' + e;
    axios.get(urlCiudades).then((response) => {
      return response.data;
    }).then((ciudad) => {
      setCiudadEditar([ciudad.nombre, ciudad.latitude, ciudad.longitude]);
      setnombreCiudadEditar(ciudad.nombre);
      setidCiudadEditar(e);
      setCiudadVisibleEditar(true);
    })
  }

  //Editar ciudad
  const editarCiudad = () => {
    //Si el usuario no ha seleccionado nada en el mapa se cogen las coordenadas por defecto
    var urlE='http://'+ipServer+':8080/ciudades/updateCiudad/' + idCiudadEditar + "/" + nombreCiudadEditar + "/" + coordenadasCiudadEditar[0] + "/" + coordenadasCiudadEditar[1];
    if(coordenadasCiudadEditar[0]===null||coordenadasCiudadEditar[1]===null){
      urlE = 'http://'+ipServer+':8080/ciudades/updateCiudad/' + idCiudadEditar + "/" + nombreCiudadEditar + "/" + ciudadEditar[1] + "/" + ciudadEditar[2];
    }
    //Se comprueba que el nombre no este vacio
    if(nombreCiudadEditar===""){
      mostrarAlerta("Faltan datos por rellenar","error");
    }else{
      //Si el nombre de la ciudad era el mismo que antes se actualiza
      if(ciudadEditar[0]===nombreCiudadEditar){
        if (idCiudadEditar !== "") {
          axios({
            method: 'put',
            url: urlE
          });
          mostrarAlerta("Ciudad modificada con exito","success");
          setFormVista("default");
        }
      }else{
        //Si el nombre de la ciudad no es el de antes y es distinto a cualquiera de la BBDD se actualiza
        axios({
          method: 'get',
          url: 'http://'+ipServer+':8080/ciudades/nombre/'+ nombreCiudadEditar+'',
        }).then((response) => {
          return response.data;
        }).then((all) => {
          if(all==null){
            if (idCiudadEditar !== "") {
              axios({
                method: 'put',
                url: urlE
              });
              mostrarAlerta("Ciudad modificada con exito","success");
              setFormVista("default");
            }
          }else{            
            mostrarAlerta("Este nombre de ciudad ya existe","error");
          }
        })
      }
    }
  }

  //ELIMINAR CIUDAD
  const eliminarCiudad = () => {
    if (ciudadEliminar !== ""){
      axios({
        method: 'delete',
        url: 'http://'+ipServer+':8080/ciudades/deleteById/' + ciudadEliminar,
      });
      setCiudadEliminar("");
      setFormVista("default");
      mostrarAlerta("Ciudad eliminada con exito","success");
    }
  }

  //VISUALIZAR CIUDAD
  const buscarCiudadVisualizar = (e: any) => {
    var urlCiudades = 'http://'+ipServer+':8080/ciudades/id/' + e;
    axios.get(urlCiudades).then((response) => {
      return response.data;
    }).then((ciudad) => {
      setCiudadVisualizar([ciudad.nombre, ciudad.latitude, ciudad.longitude]);
      setCiudadVisibleVisualizar(true);
    })
  }


  //CREAR RUTAS
  const crearRutas = () => {
    //Comprobamos que todos los datos esten introducidos
    if(nombreRutacrear===""||longitudRuta===0||vehiculo===""||ciudad===undefined||dificultad===undefined||fileList.length===0){
      mostrarAlerta("Faltan datos por rellenar","error");
    }else{
      axios({
        method: 'get',
        url: 'http://'+ipServer+':8080/rutas/buscar/'+ nombreRutacrear+'',
      }).then((response) => {
        return response.data;
      }).then((all) => {
        //Comprobamos que no exista ninguna ruta con ese nombre
        if(all[0]===undefined){
          axios({
            method: 'post',
            url: 'http://'+ipServer+':8080/rutas/nuevaRuta',
            data: {
              nombre: nombreRutacrear,
              longitud: longitudRuta,
              ciudad: ciudad,
              vehiculo: vehiculo,
              dificultad: dificultad,
              tiempo: timeCalculate(longitudRuta, vehiculo),
              imagen: fileList[0]
            }
          });
          setDisabled(true);
          mostrarAlerta("Ruta creada con exito","success");
        }else{
          mostrarAlerta("Este nombre de ruta ya existe","error");
        }
      })
    }
  }

  //CREAR LOCALIZACIONES
  const crearLocalizaciones = () => {
    var arrayRespuestas = [r1, r2, r3, r4];
    var preguntaVar = [...preguntas, pregunta];
    var respuestaVar = [...respuestas, arrayRespuestas]
    var arrayGoodLocal: any[] = [];
    setPreguntas([...preguntas, pregunta])
    setRespuestas([...respuestas, arrayRespuestas])
    //Si el punto tiene pregunta comprobamos que tanto esta como las respuestas esten rellenadas
    if(valueRadio===2){
      if(r1 === ""||r2 === ""||r3 === ""||r4 === ""||pregunta===""){
        mostrarAlerta("Faltan datos por rellenar","error");
      }else{
        //Comprobamos que el punto tenga nombre y coordenadas
        if(coordenadasLocCrear[0]==null||nombreLocalizacionCrear === ""){
          mostrarAlerta("Faltan datos por rellenar","error");
        }else{
          if(coordenadasLocCrear[0]!==null){
            axios({
              method: 'post',
              url: 'http://'+ipServer+':8080/localizaciones/anadir',
              data: {
                nombre: nombreLocalizacionCrear,
                latitud: coordenadasLocCrear[0],
                longitud: coordenadasLocCrear[1],
                oculto: valueRadio,
                preguntas: preguntaVar,
                respuestas: respuestaVar,
                idRuta: idRutaLoc
              }
            })
            var localicaciones = { nombre: nombreLocalizacionCrear, latitud: coordenadasLocCrear[0], longitud: coordenadasLocCrear[1], oculto: valueRadio, respuestas: [respuestaVar], preguntas: preguntaVar }
            arrayGoodLocal = [...arrayGood, localicaciones];
            setArrayGood(arrayGoodLocal);
            buscarLocalicacionesRuta(idRutaLoc, arrayGoodLocal);
            setnombreLocalizacionCrear("");
            setCoordenadasCiudadCrear([]);
            setValueRadio(1);
            setPreguntas([]);
            setRespuestas([]);
            setR1("");
            setR2("");
            setR3("");
            setR4("");
            setPregunta("");
            mostrarAlerta("Localizacion creada con exito","success");
          }else{mostrarAlerta("Faltan datos por rellenar","error");}
        }
      }
    }else{
      //Comprobamos que el punto tenga nombre y coordenadas
      if(coordenadasLocCrear[0]==null||nombreLocalizacionCrear === ""){
        mostrarAlerta("Faltan datos por rellenar","error");
      }else{
        //Comprobamos que el punto tenga coordenadas
        if(coordenadasLocCrear[0]!==null){
          axios({
            method: 'post',
            url: 'http://'+ipServer+':8080/localizaciones/anadir',
            data: {
              nombre: nombreLocalizacionCrear,
              latitud: coordenadasLocCrear[0],
              longitud: coordenadasLocCrear[1],
              oculto: valueRadio,
              preguntas: preguntaVar,
              respuestas: respuestaVar,
              idRuta: idRutaLoc
            }
          })
          localicaciones = { nombre: nombreLocalizacionCrear, latitud: coordenadasLocCrear[0], longitud: coordenadasLocCrear[1], oculto: valueRadio, respuestas: [respuestaVar], preguntas: preguntaVar }
          arrayGoodLocal = [...arrayGood, localicaciones];
          setArrayGood(arrayGoodLocal);
          buscarLocalicacionesRuta(idRutaLoc, arrayGoodLocal);
          setnombreLocalizacionCrear("");
          setCoordenadasCiudadCrear([]);
          setValueRadio(1);
          setPreguntas([]);
          setRespuestas([]);
          setR1("");
          setR2("");
          setR3("");
          setR4("");
          setPregunta("");
          mostrarAlerta("Localizacion creada con exito","success");
        }else{mostrarAlerta("Faltan datos por rellenar","error");}
      }
    }
  }

  //ELIMINAR RUTA
  const eliminarRuta = () => {
    if(idRutaEliminar!==""){
      axios({
        method: 'delete',
        url: 'http://'+ipServer+':8080/rutas/deleteById/'+idRutaEliminar, 
      });
      setIdRutaEliminar("");
      mostrarAlerta("Ruta eliminada con exito","success");
      setFormVista("default");
    }
  }

  //EDITAR RUTA
  const editarRutas = ()=> {
    var urlE = 'http://'+ipServer+':8080/rutas/updateRutas/' + idRutaEditar;
    //Comprobamos que todos los campos esten rellenados
    if(nombreRutaEditar===""||longitudRutaEditar===0||isNaN(longitudRutaEditar)||ciudadesRutaEditar===""||vehiculosRutaEditar===""||dificultadRutaEditar===""||fileListEditar.length===0){
      mostrarAlerta("Comprueba los datos introducidos","error");
    }else{
      if(idRutaEditar !== ""){
        axios({
          method: 'put',
          url: urlE,
          data: {
            nombre: nombreRutaEditar,
            longitud: longitudRutaEditar,
            ciudad: ciudadesRutaEditar,
            vehiculo: vehiculosRutaEditar,
            dificultad: dificultadRutaEditar,
            imagen: fileListEditar[0]
          }
        });
        mostrarAlerta("Ruta modificada con exito","success");
      }else{mostrarAlerta("ERROR base de datos no detectada","error");}
    }
  }

  //CREAR LOCALIZACIONES
  const crearLocalizaciones2 = (e:any) => {
    //Buscamos la ruta a la que se le va a añadir la localizacion
    var urlLatLong = "http://"+ipServer+":8080/rutas/buscar/" + e;
    axios({
      method: 'get',
      url: urlLatLong
    }).then((response) => {
      return response.data;
    }).then((all) => {
      var arrayRespuestas = [r1, r2, r3, r4];
      var preguntaVar = [...preguntas, pregunta];
      var respuestaVar = [...respuestas, arrayRespuestas]
      var arrayGoodLocal: any[] = [];
      setPreguntas([...preguntas, pregunta])
      setRespuestas([...respuestas, arrayRespuestas])
      //Dependiendo de si el punto es una pregunta o no añadimos al array de la ruta el punto con las respuestas y la pregunta o solo el punto
      if(valueRadio===2){
        if(r1 === ""||r2 === ""||r3 === ""||r4 === ""||pregunta===""){
          mostrarAlerta("Faltan datos por rellenar","error");
        }else{
          if(coordenadasLocCrear[0]==null||nombreLocalizacionCrear === ""){
            mostrarAlerta("Faltan datos por rellenar","error");
          }else{
            if(coordenadasLocCrear[0]!==null){
              axios({
                method: 'post',
                url: 'http://'+ipServer+':8080/localizaciones/anadir',
                data: {
                  nombre: nombreLocalizacionCrear,
                  latitud: coordenadasLocCrear[0],
                  longitud: coordenadasLocCrear[1],
                  oculto: valueRadio,
                  preguntas: preguntaVar,
                  respuestas: respuestaVar,
                  idRuta: all[0]["_id"],
                }
              })
              for(var i = 0; i<all[0]["loc"].length;i++){
                arrayGoodLocal.push(all[0]["loc"][i]);
              }
              var localicaciones = { nombre: nombreLocalizacionCrear, latitud: coordenadasLocCrear[0], longitud: coordenadasLocCrear[1], oculto: valueRadio, respuestas: [respuestaVar], preguntas: preguntaVar }
              arrayGoodLocal.push(localicaciones);
              setArrayGood(arrayGoodLocal);
              buscarLocalicacionesRuta(all[0]["_id"], arrayGoodLocal);
              setnombreLocalizacionCrear("");
              setCoordenadasCiudadCrear([]);
              setValueRadio(1);
              setPreguntas([]);
              setRespuestas([]);
              setR1("");
              setR2("");
              setR3("");
              setR4("");
              setPregunta("");
              mostrarAlerta("Localizacion creada con exito","success");
            }else{mostrarAlerta("Faltan datos por rellenar","error");}
          }
        }
      }else{
        if(coordenadasLocCrear[0]==null||nombreLocalizacionCrear === ""){
          mostrarAlerta("Faltan datos por rellenar","error");
        }else{
          if(coordenadasLocCrear[0]!==null){
            axios({
              method: 'post',
              url: 'http://'+ipServer+':8080/localizaciones/anadir',
              data: {
                nombre: nombreLocalizacionCrear,
                latitud: coordenadasLocCrear[0],
                longitud: coordenadasLocCrear[1],
                oculto: valueRadio,
                preguntas: preguntaVar,
                respuestas: respuestaVar,
                idRuta: all[0]["_id"],
              }
            })
            //Ahora una vez añadida la localizacion al array
            for( i = 0; i<all[0]["loc"].length;i++){
              arrayGoodLocal.push(all[0]["loc"][i]);
            }
            localicaciones = { nombre: nombreLocalizacionCrear, latitud: coordenadasLocCrear[0], longitud: coordenadasLocCrear[1], oculto: valueRadio, respuestas: [respuestaVar], preguntas: preguntaVar }
            arrayGoodLocal.push(localicaciones);
            setArrayGood(arrayGoodLocal);
            //Pasamos los datos a la funcion buscarLocalizacionesRuta para actualizar los datos
            buscarLocalicacionesRuta(all[0]["_id"], arrayGoodLocal);
            setnombreLocalizacionCrear("");
            setCoordenadasCiudadCrear([]);
            setValueRadio(1);
            setPreguntas([]);
            setRespuestas([]);
            setR1("");
            setR2("");
            setR3("");
            setR4("");
            setPregunta("");
            mostrarAlerta("Localizacion creada con exito","success");
          }else{mostrarAlerta("Faltan datos por rellenar","error");}
        }
      }
    })
  }

  //EDITAR LOCALIZACIONES
  function editarLocalizacionesUpdate(e: any) {
    var urlEditar = "http://"+ipServer+":8080/localizaciones/updateLoc/" + e;
    var arrayRespuestas = [r1editar, r2editar, r3editar, r4editar];
    var preguntaVar = [...preguntas, preguntaEditarLoc];
    var respuestaVar = [...respuestas, arrayRespuestas]
    var respuestaVar2 = [respuestaVar];
    var nombre = "";
    //Si ha dejado el nombre vacio utilizamos el nombre que tenia por defecto
    if(nombreLocEditar2===""){
      nombre = nombreLocEditar
    }else{
      nombre = nombreLocEditar2
    }
    //Si la localizacion tiene preguntas comprobamos que estas no esten vacias
    //De igual manera actualizamos la localizacion si los datos son correctos
    if(ocultoeditar===2){
      if(preguntaEditarLoc===""||r1editar===""||r2editar===""||r3editar===""||r4editar===""){
        mostrarAlerta("Faltan datos por rellenar","error");
      }else{
        axios({
          method: 'put',
          url: urlEditar,
          data: {
            nombre: nombre,
            latitud: coordenadasLocEditar[0],
            longitud: coordenadasLocEditar[1],
            preguntas: preguntaVar,
            respuestas: respuestaVar2
          }
        })
        setNombreLocEditar(nombreLocEditar2);
        mostrarAlerta("Localizacion actualizada con exito","success");
      }
    }else{
      axios({
        method: 'put',
        url: urlEditar,
        data: {
          nombre: nombre,
          latitud: coordenadasLocEditar[0],
          longitud: coordenadasLocEditar[1],
          preguntas: preguntaVar,
          respuestas: respuestaVar2
        }
      })
      setNombreLocEditar(nombreLocEditar2);
      mostrarAlerta("Localizacion actualizada con exito","success");
    }
  }

  //EDITAR LOCALIZACIONES dentro de la ruta
  function editarLocalizacionesRuta(e: any, y: any) {
    var arrayRespuestas = [r1editar, r2editar, r3editar, r4editar];
    var preguntaVar = [...preguntas, preguntaEditarLoc];
    var respuestaVar = [...respuestas, arrayRespuestas];
    var respuestaVar2 = [respuestaVar]
    var loc: any[] = [];
    var nombre = "";
    //Si ha dejado el nombre vacio utilizamos el nombre que tenia por defecto
    if(nombreLocEditar2===""){
      nombre = nombreLocEditar
    }else{
      nombre = nombreLocEditar2
    }
    //Si la localizacion tiene preguntas comprobamos que estas no esten vacias
    //De igual manera actualizamos la localizacion si los datos son correctos
    if(ocultoeditar===2){
      if(preguntaEditarLoc===""||r1editar===""||r2editar===""||r3editar===""||r4editar===""){}else{
        for (var i = 0; i < rutasTodas.length; i++) {
          if (rutasTodas[i]["nombre"] === e) {
            loc = rutasTodas[i]["loc"];
            for (var z: any = 0; z < loc.length; z++) {
              if (loc[z]["nombre"] === y) {
                loc[z]["nombre"] = nombre;
                if(coordenadasLocEditar.length===0){
                  loc[z]["latitud"] = coordenadasLocEditar2[0];
                  loc[z]["longitud"] = coordenadasLocEditar2[1];
                }else{
                  loc[z]["latitud"] = coordenadasLocEditar[0];
                  loc[z]["longitud"] = coordenadasLocEditar[1];
                }
                loc[z]["preguntas"] = preguntaVar;
                loc[z]["respuestas"] = respuestaVar2;
              }
            }
          }
        }
        var urlEditar = "http://"+ipServer+":8080/rutas/actualizarRutasLocali/" + e
        axios({
          method: 'put',
          url: urlEditar,
          data: loc,
        })
      }
    }else{
      for (i = 0; i < rutasTodas.length; i++) {
        if (rutasTodas[i]["nombre"] === e) {
          loc = rutasTodas[i]["loc"];
          for (z = 0; z < loc.length; z++) {
            if (loc[z]["nombre"] === y) {
              loc[z]["nombre"] = nombre;
              if(coordenadasLocEditar.length===0){
                loc[z]["latitud"] = coordenadasLocEditar2[0];
                loc[z]["longitud"] = coordenadasLocEditar2[1];
              }else{
                loc[z]["latitud"] = coordenadasLocEditar[0];
                loc[z]["longitud"] = coordenadasLocEditar[1];
              }
              loc[z]["preguntas"] = preguntaVar;
              loc[z]["respuestas"] = respuestaVar2;
            }
          }
        }
      }
      urlEditar = "http://"+ipServer+":8080/rutas/actualizarRutasLocali/" + e
      axios({
        method: 'put',
        url: urlEditar,
        data: loc,
      })
    }
  }

  //ELIMIAR LOCALIZACION
  const eliminarLocalizaciones = (e: any) => {
    if (e !== ""){
      axios({
        method: 'delete',
        url: 'http://'+ipServer+':8080/localizaciones/deleteByName/' + e,
      });
      mostrarAlerta("Localizacion eliminada con exito","success");
    }
  }

  //ELIMINAR LOCALIZACION DE LA RUTA
  const eliminarLocalizacionesRuta = (e: any, y: any) => {
    var index = 0;
    for (var i = 0; i < rutasTodas.length; i++) {
      if (rutasTodas[i]["nombre"] === y) {
        var loc: [] = rutasTodas[i]["loc"];
        for (var z: any = 0; z < loc.length; z++) {
          if (loc[z]["nombre"] === e) {
            index = z;
          }
        }
      }
    }
    if (e !== ""){
      axios({
        method: 'delete',
        url: 'http://'+ipServer+':8080/rutas/eliminarRutasLocali/' + y + '/' + index,
      });
    }
  }

  //Comprobacion de cambio de imagen al crear
  const onChange = (file: any) => {
    //Si file tiene una foto la guardamos si no dejamos la foto vacia
    if(file.fileList.length!==0){
      setFileList(file.fileList)
    }else{
      setFileList([]);
    }
  };

  //Comprobacion de cambio de imagen al editar
  const onChangeEditar = (file: any) => {
    //Si file tiene una foto la guardamos si no dejamos la foto vacia
    if (file.fileList.length !== 0) {
      setFileListEditar(file.fileList)
    } else {
      setFileListEditar([]);
    }
  };

  //Recoger coordenadas de la localizacion a editar
  function editarLocalizaciones(e: any, y: any) {
    var urlLatLong = "http://"+ipServer+":8080/rutas/buscar/" + e;
    axios({
      method: 'get',
      url: urlLatLong
    }).then((response) => {
      return response.data;
    }).then((all) => {
      for (let loc of all[0]["loc"]) {
        if (y === loc["nombre"]) {
          setCoordenadasLocEditar2([loc["latitud"], loc["longitud"]])
        }
      }
    })
  }

  //Calcular el tiempo que se va a tardar dependiendo del vehiculo
  function timeCalculate(longitud: number, vehiculo: string) {
    if (vehiculo === "Bicicleta") {
      return (longitud / 15);
    }
    else if (vehiculo === "Coche") {
      return (longitud / 40);
    }
    else {
      return (longitud / 5);
    }
  }
  
  //Conseguir las localizaciones de la ruta
  function buscarLocRutas(e: any) {
    var arrayLoc = [] as any;
    var urlNombre = "http://"+ipServer+":8080/rutas/buscar/" + e;
    axios({
      method: 'get',
      url: urlNombre
    }).then((response) => {
      return response.data;
    }).then((all) => {
      if(all[0]["loc"]!==null){
        for (let loc of all[0]["loc"]) {
          arrayLoc.push({
            value: loc["nombre"],
            label: loc["nombre"]
          })
        }
      }
    })
    setOptionsRutaLoc(arrayLoc);
  }

  //Busca los usuarios que estan en la ruta para saber sus coordenadas
  async function verUsuariosMapa(e: any) {
    var url = 'http://'+ipServer+':8080/salas/buscarPorId/' + e;
    var arrayUsuarios: any[] = []
    var hayUsuarios = false;
    await axios({
      method: 'get',
      url: url,
    }).then((response) => {
      return response.data
    }).then((all) => {
      if(all!==""){
        hayUsuarios=true;
        arrayUsuarios.push(all["idUsuario"])
      }}
    )
    if(hayUsuarios){
      verUsuariosMapa2(arrayUsuarios);
      setCambiarDatosUsuario(cambiarDatosUsuario+1);
    }
  }

  //Coloca los usuarios en el mapa
  async function verUsuariosMapa2(e: any[]) {
    var arrayLocal: any[] = [...e]
    var arrayLocal2 : any[][]=[]; 
    for (var i = 0; i < arrayLocal[0].length; i++) {
      var url = 'http://'+ipServer+':8080/usuario/buscarPorId/' + arrayLocal[0][i]
      await axios({
        method: 'get',
        url: url
      }).then((response) => {
        return response.data
      }).then((all) => {
        arrayLocal2.push([[all["latitude"],all["longitude"]]])
      })
    }
    setUsuariosArrayLoc(arrayLocal2);
  }

  //Cuando seleccionamos una ruta para modificar esta funcion consigue los datos de esta para mostrarlos en pantalla
  function onChangeNombreEditar2(e: any) {
    var urlNombre = "http://"+ipServer+":8080/rutas/buscar/" + e;
    axios({
      method: 'get',
      url: urlNombre
    }).then((response) => {
      return response.data;
    }).then((all) => {
      all.map((all: any) => {
        setNombreRutaEditar(all["nombre"])
        setLongitudRutaEditar(all["longitud"])
        setVehiculosRutaEditar(all["vehiculo"])
        setCiudadesRutaEditar(all["ciudad"])
        setDificultadRutaEditar(all["dificultad"])
        setFileListEditar([all["imagen"]])
      })
    })
    setVisibility("visible");
  }

  //Funcion que consigue la id de la ruta que se ha creado para poder añadirle las localizaciones
  function buscarIdRutaCrear(e: any) {
    var urlNombre = "http://"+ipServer+":8080/rutas/buscar/" + e;
    axios({
      method: 'get',
      url: urlNombre
    }).then((response) => {
      return response.data;
    }).then((all) => {
      all.map((all: any) => {setIdRutaLoc(all['_id'])})
    })
  }

  //Actualiza los datos de las localizaciones en la ruta que le pasemos
  function buscarLocalicacionesRuta(e: any, data: any) {
    var urlE = 'http://'+ipServer+':8080/rutas/updateRutasLoc/' + e;
    if (e !== "") {
      axios({
        method: 'put',
        url: urlE,
        data
      });
    }
  }

  //Buscamos las localizaciones de la ruta a editar
  function locEditar(e: any, y: any) {
    var urlEditar = "http://"+ipServer+":8080/rutas/buscar/" + e;
    axios({
      method: 'get',
      url: urlEditar
    }).then((response) => {
      return response.data;
    }).then((all) => {
      for (let loc of all[0]["loc"]) {
        if (loc["nombre"] === y) {
          //Si no es una localizacion oculta colocamos la pregunta y las respuestas
          if(loc["oculto"]===2){
            setPreguntaEditarLoc(loc["preguntas"][0])
            setR1Editar(loc["respuestas"][0][0][0])
            setR2Editar(loc["respuestas"][0][0][1])
            setR3Editar(loc["respuestas"][0][0][2])
            setR4Editar(loc["respuestas"][0][0][3])
            setMapaNoOculto(!mapaNoOculto);
          }else{
            setMapaOculto(!mapaOculto);
          }
          setOcultoEditar(loc["oculto"])
        }
      }
    })
  }

  //Funcion para crear la linea de la ruta al visualizarla
  async function buscarPolyline(e: any, arrayLatitud: number[], arrayLongitud: number[]) {
    var modo = "";
    var arraypolis: LatLngExpression[][] = []
    var urlNombre = "http://"+ipServer+":8080/rutas/buscar/" + e;
    await axios({
      method: 'get',
      url: urlNombre
    }).then((response) => {
      return response.data;
    }).then((all) => {
      all.map((all: any) => {
        modo = all['vehiculo'];
      })
    })
    if (modo === "Bicicleta") {
      modo = "cycling-regular";
    } else if (modo === "Andando") {
      modo = "foot-walking";
    } else {
      modo = "driving-car";
    }
    var urlOpenRoute = "";
    for (var i = 0; i < arrayLongitud.length; i++) {
      var y = i + 1;
      if (i === arrayLongitud.length) {
        y = 0;
      }
      urlOpenRoute = "https://api.openrouteservice.org/v2/directions/" + modo + "?api_key=5b3ce3597851110001cf62487b23f8e4e3c64f3ea4f7419a4977c58f&start=" + arrayLongitud[i] + "," + arrayLatitud[i] + "&end=" + arrayLongitud[y] + "," + arrayLatitud[y];
      await axios({
        method: 'get',
        url: urlOpenRoute
      }).then((response) => {
        response.data.features[0].geometry.coordinates.map((cordenada: any, index: number) => {
          if (index < response.data.features[0].geometry.coordinates.length - 1) {
            var positionArray = response.data.features[0].geometry.coordinates[index + 1];
            arraypolis.push([cordenada[1], cordenada[0], positionArray[1], positionArray[0]])
          }
        })
      })
      setPolyLine(arraypolis);
    }
  }

  //Buscamos la informacion de la ruta para poder visualizarla
  async function onChangeNombreEditar(e: any) {
    var arrayLongitud: number[] = [];
      var arrayLatitud: number[] = [];
      var urlNombre = "http://"+ipServer+":8080/rutas/buscar/" + e;
      axios({
        method: 'get',
        url: urlNombre
      }).then((response) => {
        return response.data;
      }).then((all) => {
        for (let loc of all[0]["loc"]) {
          arrayLongitud.push(loc["longitud"]);
          arrayLatitud.push(loc["latitud"]);
        }
      })
      buscarPolyline(e, arrayLatitud, arrayLongitud);
      setArrayLongitud(arrayLongitud);
      setArrayLatitud(arrayLatitud);
  }

  //El useEffect se ejecuta cuando se inicia la aplicacion y cuando se actualiza cualquier variable de las que estan en el array final
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      (async () => {
        //Conseguimos las rutas para colocarlas en el select de crear
        var nombreRuta = [] as any;
        var urlNombre = "http://"+ipServer+":8080/rutas/todas/";
        await axios.get(urlNombre).then((response) => {
          setRutasTodas(response.data);
          return response.data;
        }).then((nombre) => {
          nombre.map((nombre: any) => {
            nombreRuta.push({
              value: nombre["_id"],
              label: nombre["nombre"]
            })
          })
          setOptionsNombreCiudad(nombreRuta);
        })
        //Conseguimos las rutas que tengan mas de 1 localizacion para colocarlas en el select de visualizar
        var nombreRutC = [] as any;
        var urlNombreC = "http://"+ipServer+":8080/rutas/casiTodas/";
        await axios.get(urlNombreC).then((response) => {
          return response.data;
        }).then((nombre) => {
          nombre.map((nombre: any) => {
            nombreRutC.push({
              value: nombre["_id"],
              label: nombre["nombre"]
            })
          })
          setOptionsNomRutCT(nombreRutC);
        })
        //Conseguimos las ciudades para colocarlas en los selects
        var ciudadArray = [] as any;
        var urlCiudades = "http://"+ipServer+":8080/ciudades/all";
        await axios.get(urlCiudades).then((response) => {
          return response.data;
        }).then((ciudades) => {
          ciudades.map((ciudad: any) => {
            ciudadArray.push({
              value: ciudad["id"],
              label: ciudad["nombre"]
            });
          })
          setOptionsCiudades(ciudadArray);
        })
      })();
    }
    //Dejamos las variables por defecto
    setlongitudRuta(0);
    setFileList([]);
    setDisabled(false);
    setVehiculo("");
    setCiudad(undefined);
    setDificultad(undefined);
    setnombreCiudadcrear("");
    setCoordenadasCiudadCrear();
    setnombreCiudadEditar("");
    setidCiudadEditar("");
    setCiudadVisibleEditar(false);
    setCiudadVisibleVisualizar(false);
    setCoordenadasLocEditar([]);
    if(formVista!=="crearLocalizaciones"&&formVista!=="editarLocCrear"){
      setnombreRutacrear("");
      setArrayGood([]);
    }
    if(salaChat!=="Global"&&formVista !== "visualizarRuta"){
      setSalaChat("Global");
    }
    
    return function cleanup() {
      mounted = false;
    };

  }, [formVista, arrayLongitud, polyLine,cambiarDatosUsuario]);

    return (
      <>
      {/*Los links son necesarios para que funcionen bien los mapas*/}
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"/>
      <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="></script>

      <Row>
        <Col span={6}><Perfil></Perfil></Col>
        <Col span={12}>
{/*MENU PRINCIPAL*/}
          {formVista==="default"&&<>
            <div className="espacios">
              {alerta==="success"&&<Alert message={textoAlerta} type="success" showIcon />}
              {alerta==="info"&&<Alert message={textoAlerta} type="info" showIcon />}
              {alerta==="warning"&&<Alert message={textoAlerta} type="warning" showIcon />}
              {alerta==="error"&&<Alert message={textoAlerta} type="error" showIcon />}
            </div>
            <div className="menus">
              <div className="Titulo"><h1 className="etiquetah">Ciudades</h1></div>
              <Row className="Botones">
                <Col span={6} className="Boton" onClick = {() =>setFormVista("crearCiudad")}><h1 className="etiquetah">Crear</h1></Col>
                <Col span={6} className="Boton" onClick = {() =>setFormVista("editarCiudad")}><h1 className="etiquetah">Editar</h1></Col>
                <Col span={6} className="Boton" onClick = {() =>setFormVista("eliminarCiudad")}><h1 className="etiquetah">Eliminar</h1></Col>
                <Col span={6} className="Boton" onClick = {() =>setFormVista("visualizarCiudad")}><h1 className="etiquetah">Visualizar</h1></Col>
              </Row>
            </div>
            <div className="menus">
              <div className="Titulo"><h1 className="etiquetah">Rutas</h1></div>
              <Row className="Botones">
                <Col span={6} className="Boton" onClick = {() =>setFormVista("crearRuta")}><h1 className="etiquetah">Crear</h1></Col>
                <Col span={6} className="Boton" onClick = {() =>setFormVista("editarRuta")}><h1 className="etiquetah">Editar</h1></Col>
                <Col span={6} className="Boton" onClick = {() =>setFormVista("eliminarRuta")}><h1 className="etiquetah">Eliminar</h1></Col>
                <Col span={6} className="Boton" onClick = {() =>{setVisibility("hidden");setFormVista("visualizarRuta")}}><h1 className="etiquetah">Visualizar</h1></Col>
              </Row>
            </div>
          </>}

{/*CREAR CIUDAD*/}
          {formVista==="crearCiudad"&&<>
          <div className="espacios">
              {alerta==="success"&&<Alert message={textoAlerta} type="success" showIcon />}
              {alerta==="info"&&<Alert message={textoAlerta} type="info" showIcon />}
              {alerta==="warning"&&<Alert message={textoAlerta} type="warning" showIcon />}
              {alerta==="error"&&<Alert message={textoAlerta} type="error" showIcon />}
            </div>
            <div className="menu">
              <div className="tituloMenu"><h1>CIUDADES</h1></div>
              <Row className="BotonesNavegacion">
              <Col span={6} className="Seleccionado" onClick = {() =>setFormVista("crearCiudad")}><h1 className="etiquetah">Crear</h1></Col>
              <Col span={6} className="Boton" onClick = {() =>setFormVista("editarCiudad")}><h1 className="etiquetah">Editar</h1></Col>
              <Col span={6} className="Boton" onClick = {() =>setFormVista("eliminarCiudad")}><h1 className="etiquetah">Eliminar</h1></Col>
              <Col span={6} className="Boton" onClick = {() =>setFormVista("visualizarCiudad")}><h1 className="etiquetah">Visualizar</h1></Col>
              </Row>
              <Row className="Contenido">
                <Col span={24}><h2>Nombre</h2></Col>
                <Col span={24}><Input className="nombreCiudad" type="text" value={nombreCiudadcrear} name="nombreString" onChange={(e)=>setnombreCiudadcrear(e.target.value)}/></Col>
                <Col span={24}><MapaCreaCiudad  Center={[43.339643763841615, -1.794031072876929]} Zoom={12} ></MapaCreaCiudad></Col>
                <Col span={8}></Col><Col span={8} className="Boton" onClick={()=>crearCiudad()}><h1 className="etiquetah">Crear</h1></Col><Col span={8}></Col>
                <Col span={6}><button className='botonImagen'onClick={()=>setFormVista("default")}><img width="45" height="45" src={flecha_atras} alt="salir"/></button></Col><Col span={18}></Col>
              </Row>
            </div>
          </>}
{/*EDITAR CIUDAD*/}
          {formVista==="editarCiudad"&&<>
          <div className="espacios">
              {alerta==="success"&&<Alert message={textoAlerta} type="success" showIcon />}
              {alerta==="info"&&<Alert message={textoAlerta} type="info" showIcon />}
              {alerta==="warning"&&<Alert message={textoAlerta} type="warning" showIcon />}
              {alerta==="error"&&<Alert message={textoAlerta} type="error" showIcon />}
            </div>
            <div className="menu">
              <div className="tituloMenu"><h1>CIUDADES</h1></div>
              <Row className="BotonesNavegacion">
              <Col span={6} className="Boton" onClick = {() =>setFormVista("crearCiudad")}><h1 className="etiquetah">Crear</h1></Col>
              <Col span={6} className="Seleccionado" onClick = {() =>setFormVista("editarCiudad")}><h1 className="etiquetah">Editar</h1></Col>
              <Col span={6} className="Boton" onClick = {() =>setFormVista("eliminarCiudad")}><h1 className="etiquetah">Eliminar</h1></Col>
              <Col span={6} className="Boton" onClick = {() =>setFormVista("visualizarCiudad")}><h1 className="etiquetah">Visualizar</h1></Col>
              </Row>
              <Row className="Contenido">
                {/*ciudadVisibleEditar nos hace ver el select para seleccionar una ciudad o el formulario de editar */}
                {ciudadVisibleEditar===false&&<>
                  <Col span={24} className="espacio45"></Col>
                  <Col span={8}></Col><Col span={8}><Select id="select_editar"options={optionsCiudades} onChange={(e:any)=>buscarCiudadEditar(e.value)}/></Col><Col span={8}></Col>
                  <Col span={24} className="espacioFondo2"></Col>
                  <Col span={6}><button className='botonImagen'onClick={()=>setFormVista("default")}><img width="45" height="45" src={flecha_atras} alt="salir"/></button></Col><Col span={18}></Col>
                </>}
                {ciudadVisibleEditar===true&&<>
                  <Col span={24}><h2>Nombre</h2></Col>
                  <Col span={24}><Input className="nombreCiudad" type="text" value={nombreCiudadEditar} defaultValue={nombreCiudadEditar} name="nombreString" onChange={(e)=>setnombreCiudadEditar(e.target.value)}/></Col>
                  <Col span={24}><MapaEditarCiudad  latt={parseFloat(ciudadEditar[1])} longg={parseFloat(ciudadEditar[2])} Center={[parseFloat(ciudadEditar[1]), parseFloat(ciudadEditar[2])]} Zoom={12} ></MapaEditarCiudad></Col>
                  <Col span={8}></Col><Col span={8} className="Boton" onClick={()=>editarCiudad()}><h1 className="etiquetah">Editar</h1></Col><Col span={8}></Col>
                  <Col span={6}><button className='botonImagen'onClick={()=>setFormVista("default")}><img width="45" height="45" src={flecha_atras} alt="salir"/></button></Col><Col span={18}></Col>
                </>}
              </Row>
            </div>
          </>}
{/*ELIMIAR CIUDAD*/}
          {formVista==="eliminarCiudad"&&<>
          <div className="espacios">
              {alerta==="success"&&<Alert message={textoAlerta} type="success" showIcon />}
              {alerta==="info"&&<Alert message={textoAlerta} type="info" showIcon />}
              {alerta==="warning"&&<Alert message={textoAlerta} type="warning" showIcon />}
              {alerta==="error"&&<Alert message={textoAlerta} type="error" showIcon />}
            </div>
              <div className="menu">
                <div className="tituloMenu"><h1>CIUDADES</h1></div>
                <Row className="BotonesNavegacion">
                <Col span={6} className="Boton" onClick = {() =>setFormVista("crearCiudad")}><h1 className="etiquetah">Crear</h1></Col>
                <Col span={6} className="Boton" onClick = {() =>setFormVista("editarCiudad")}><h1 className="etiquetah">Editar</h1></Col>
                <Col span={6} className="Seleccionado" onClick = {() =>setFormVista("eliminarCiudad")}><h1 className="etiquetah">Eliminar</h1></Col>
                <Col span={6} className="Boton" onClick = {() =>setFormVista("visualizarCiudad")}><h1 className="etiquetah">Visualizar</h1></Col>
                </Row>
                <Row className="Contenido">
                  <Col span={24} className="espacio45"></Col>
                  <Col span={8}></Col>
                  <Col span={8}><Select id="select_eliminar"options={optionsCiudades} onChange={(e:any)=>setCiudadEliminar(e.value)}/></Col>
                  <Col span={8}></Col>
                  <Col span={8}></Col><Col span={8} className="Boton" onClick={()=>eliminarCiudad()}><h1 className="etiquetah">Eliminar</h1></Col><Col span={8}></Col>
                  <Col span={24} className="espacioFondo"></Col>
                  <Col span={6}><button className='botonImagen'onClick={()=>setFormVista("default")}><img width="45" height="45" src={flecha_atras} alt="salir"/></button></Col><Col span={18}></Col>
                </Row>
              </div>
          </>}
{/*VISUALIZAR CIUDAD*/}
          {formVista==="visualizarCiudad"&&<>
          <div className="espacios">
              {alerta==="success"&&<Alert message={textoAlerta} type="success" showIcon />}
              {alerta==="info"&&<Alert message={textoAlerta} type="info" showIcon />}
              {alerta==="warning"&&<Alert message={textoAlerta} type="warning" showIcon />}
              {alerta==="error"&&<Alert message={textoAlerta} type="error" showIcon />}
            </div>
              <div className="menu">
                <div className="tituloMenu"><h1>CIUDADES</h1></div>
                  <Row className="BotonesNavegacion">
                  <Col span={6} className="Boton" onClick = {() =>setFormVista("crearCiudad")}><h1 className="etiquetah">Crear</h1></Col>
                  <Col span={6} className="Boton" onClick = {() =>setFormVista("editarCiudad")}><h1 className="etiquetah">Editar</h1></Col>
                  <Col span={6} className="Boton" onClick = {() =>setFormVista("eliminarCiudad")}><h1 className="etiquetah">Eliminar</h1></Col>
                  <Col span={6} className="Seleccionado" onClick = {() =>setFormVista("visualizarCiudad")}><h1 className="etiquetah">Visualizar</h1></Col>
                  </Row>
                  <Row className="Contenido">
                    {/*ciudadVisibleVisualizar nos hace ver el select para seleccionar una ciudad o nos muestra su informacion */}
                    {ciudadVisibleVisualizar===false&&<>
                      <Col span={24} className="espacio45"></Col>
                      <Col span={8}></Col>
                      <Col span={8}><Select id="select_editar"options={optionsCiudades} onChange={(e:any)=>buscarCiudadVisualizar(e.value)}/></Col>
                      <Col span={8}></Col>
                      <Col span={24} className="espacioFondo2"></Col>
                      <Col span={6}><button className='botonImagen'onClick={()=>setFormVista("default")}><img width="45" height="45" src={flecha_atras} alt="salir"/></button></Col><Col span={18}></Col>
                    </>}
                    {ciudadVisibleVisualizar===true&&<>
                      <Col span={24}><h1>{ciudadVisualizar[0]}</h1></Col>
                      <Col span={24}><MapaVisualizarCiudad  latt={parseFloat(ciudadVisualizar[1])} longg={parseFloat(ciudadVisualizar[2])} Center={[parseFloat(ciudadVisualizar[1]), parseFloat(ciudadVisualizar[2])]} Zoom={12} ></MapaVisualizarCiudad></Col>
                      <Col span={24} className="espacioParaBoton"></Col>
                      <Col span={6}><button className='botonImagen'onClick={()=>setFormVista("default")}><img width="45" height="45" src={flecha_atras} alt="salir"/></button></Col><Col span={18}></Col>
                      </>}
                  </Row>
              </div>
          </>}
{/*RUTAS*/}
{/*CREAR RUTA*/}
          {formVista==="crearRuta"&&<>
            <div className="espacios">
              {alerta==="success"&&<Alert message={textoAlerta} type="success" showIcon />}
              {alerta==="info"&&<Alert message={textoAlerta} type="info" showIcon />}
              {alerta==="warning"&&<Alert message={textoAlerta} type="warning" showIcon />}
              {alerta==="error"&&<Alert message={textoAlerta} type="error" showIcon />}
            </div>
            <div className="menu">
              <div className="tituloMenu"><h1>RUTAS</h1></div>
              <Row className="BotonesNavegacion">
              <Col span={6} className="Seleccionado" onClick = {() =>setFormVista("crearRuta")}><h1 className="etiquetah">Crear</h1></Col>
              <Col span={6} className="Boton" onClick = {() =>{setFormVista("editarRuta");setVisibility("hidden");}}><h1 className="etiquetah">Editar</h1></Col>
              <Col span={6} className="Boton" onClick = {() =>setFormVista("eliminarRuta")}><h1 className="etiquetah">Eliminar</h1></Col>
              <Col span={6} className="Boton" onClick = {() =>{setVisibility("hidden");setFormVista("visualizarRuta")}}><h1 className="etiquetah">Visualizar</h1></Col>
              </Row>
              <Row className="Contenido">
                <Col span={24} className="espacioFormulario"></Col>
                <Col span={1}></Col>
                  <Col span={10} className="contenidoFormulario"><h2>Nombre</h2></Col>
                    <Col span={2}></Col>
                  <Col span={10} className="contenidoFormulario"><h2>Longitud</h2></Col>
                <Col span={1}></Col>
                <Col span={1}></Col>
                  <Col span={10} className="contenidoFormulario"><Input type="text" value={nombreRutacrear} name="nombreRuta" onChange={(e) => { setnombreRutacrear(e.target.value); }}/></Col>
                    <Col span={2}></Col>
                  <Col span={10} className="contenidoFormulario"><Input type="number" value={longitudRuta} name="longitudRuta" onChange={(e) => setlongitudRuta(e.target.valueAsNumber)}/></Col>
                <Col span={1}></Col>
                <Col span={24} className="espacioFormulario"></Col>
                <Col span={1}></Col>
                  <Col span={10} className="contenidoFormulario"><h2>Vehiculo</h2></Col>
                    <Col span={2}></Col>
                  <Col span={10} className="contenidoFormulario"><h2>Ciudad</h2></Col>
                <Col span={1}></Col>
                <Col span={1}></Col>
                  <Col span={10} className="contenidoFormulario">
                    <Select options={optionsVehiculos} onChange={(e: any) => setVehiculo(e.value)} />
                  </Col>
                    <Col span={2}></Col>
                  <Col span={10} className="contenidoFormulario">
                    <Select options={optionsCiudades} onChange={(e: any) => setCiudad(e.label)} />
                  </Col>
                <Col span={1}></Col>
                <Col span={24} className="espacioFormulario"></Col>
                <Col span={6}></Col>
                  <Col span={12} className="contenidoFormulario"><h2>Dificultad</h2></Col>
                <Col span={6}></Col>
                <Col span={6}></Col>
                  <Col span={12} className="contenidoFormulario">
                    <Select options={optionsDificultad} onChange={(e: any) => setDificultad(e.value)} />
                  </Col>
                <Col span={6}></Col>
                <Col span={24} className="espacioFormulario"></Col>
                <Col span={6}></Col>
                  <Col span={12} className="contenidoFormularioImagen">
                    <ImgCrop rotate >
                      <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        className="Imagen"
                        fileList={fileList}
                        onChange={onChange}>
                        {fileList.length < 1 && 'Subir Foto'}
                      </Upload>
                    </ImgCrop>
                  </Col>
                <Col span={6}></Col>
                <Col span={24} className="espacioFormulario"></Col>
                <Col span={24} className="contenidoFormulario">
                  <Row className="RowBoton">
                    <Col span={8}></Col>
                    {disabled===false&&<Col span={8} className="ColBoton" onClick={() => {crearRutas();}}>Crear</Col>}
                    {disabled===true&&<Col span={8} className="ColBoton" onClick={() => {setFormVista("crearLocalizaciones");buscarIdRutaCrear(nombreRutacrear);setDisabled(false);}}>Crear Loc.</Col>}
                    <Col span={8}></Col>
                  </Row>
                </Col>
                <Col span={24} className="contenidoFormulario">
                  <Row className="RowBoton">
                    <Col span={2} ></Col>
                    <Col span={2} >
                      <button className='botonImagen'onClick={()=>setFormVista("default")}>
                        <img width="45" height="45" src={flecha_atras} alt="salir"/>
                      </button>
                    </Col>
                    <Col span={20} ></Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </>}
{/*CREAR Localizaciones*/}
          {formVista === "crearLocalizaciones" &&<>
          <div className="espacios">
              {alerta==="success"&&<Alert message={textoAlerta} type="success" showIcon />}
              {alerta==="info"&&<Alert message={textoAlerta} type="info" showIcon />}
              {alerta==="warning"&&<Alert message={textoAlerta} type="warning" showIcon />}
              {alerta==="error"&&<Alert message={textoAlerta} type="error" showIcon />}
            </div>
            <div className="menu">
              <div className="tituloMenu"><h1>RUTAS</h1></div>
              <Row className="BotonesNavegacion">
              <Col span={6} className="Seleccionado" onClick = {() =>setFormVista("crearRuta")}><h1 className="etiquetah">Crear</h1></Col>
              <Col span={6} className="Boton" onClick = {() =>{setFormVista("editarRuta");setVisibility("hidden");}}><h1 className="etiquetah">Editar</h1></Col>
              <Col span={6} className="Boton" onClick = {() =>setFormVista("eliminarRuta")}><h1 className="etiquetah">Eliminar</h1></Col>
              <Col span={6} className="Boton" onClick = {() =>{setVisibility("hidden");setFormVista("visualizarRuta")}}><h1 className="etiquetah">Visualizar</h1></Col>
              </Row>
              <Row className="Contenido">
              <Col span={24} className="espacioFormulario3"></Col>
              <Col span={24} className="contenidoFormulario3"><h2>Nombre</h2></Col>
              <Col span={6} className="contenidoFormulario3"></Col>
                <Col span={12} className="contenidoFormulario3">
                  <Input type="text" value={nombreLocalizacionCrear} name="nombreLocaliacion" onChange={(e) => setnombreLocalizacionCrear(e.target.value)} required={true} />
                </Col>
              <Col span={6} className="contenidoFormulario3"></Col>
              <Col span={24} className="espacioFormulario3"></Col>
                <Col span={4} className="contenidoFormulario3"></Col>
                  <Col span={7} className="BotnContForm3" onClick={()=>setValueRadio(1)}>Oculto</Col>
                    <Col span={2} className="contenidoFormulario3"></Col>
                  <Col span={7} className="BotnContForm3" onClick={()=>setValueRadio(2)}>Preguntas</Col>
                <Col span={4} className="contenidoFormulario3"></Col>
              <Col span={24} className="espacioFormulario3"></Col>
              <Col span={24} className="contenidoFormulario3">
                {valueRadio === 2 &&<h2>Pregunta</h2>}
              </Col>
              <Col span={6} className="contenidoFormulario3"></Col>
                <Col span={12} className="contenidoFormulario3">
                  {valueRadio === 2 &&<Input type="text" name="pregunta" onChange={(e) => setPregunta(e.target.value)} required={true} defaultValue={"¿?"} style={styles.pregunta} />}
                </Col>
              <Col span={6} className="contenidoFormulario3"></Col>
              <Col span={24} className="contenidoFormulario3">
                {valueRadio === 2 &&<h2>Respuestas</h2>}
              </Col>
              <Col span={1} className="contenidoFormulario3"></Col>
                <Col span={10} className="contenidoFormulario3">
                  {valueRadio === 2 &&<Input type="text" name="r1" onChange={(e) => setR1(e.target.value)} required={true} defaultValue={""} style={styles.verde} />}
                </Col>
              <Col span={2} className="contenidoFormulario3"></Col>
              <Col span={10} className="contenidoFormulario3">
                {valueRadio === 2 &&<Input type="text" name="r2" onChange={(e) => setR2(e.target.value)} required={true} defaultValue={""} style={styles.rojo} />}
              </Col>
              <Col span={1} className="contenidoFormulario3"></Col>
              <Col span={1} className="contenidoFormulario3"></Col>
                <Col span={10} className="contenidoFormulario3">
                  {valueRadio === 2 &&<Input type="text" name="r3" onChange={(e) => setR3(e.target.value)} required={true} defaultValue={""} style={styles.rojo} />}
                </Col>
              <Col span={2} className="contenidoFormulario3"></Col>
              <Col span={10} className="contenidoFormulario3">
                {valueRadio === 2 &&<Input type="text" name="r4" onChange={(e) => setR4(e.target.value)} required={true} defaultValue={""} style={styles.rojo} />}
              </Col>
              <Col span={1} className="contenidoFormulario3"></Col>
              <Col span={2} className="contenidoFormularioMapa"></Col>
                <Col span={20} className="contenidoFormularioMapa">
                  <MapaCreaLocalizacion Center={[43.339643763841615, -1.794031072876929]} Zoom={12}></MapaCreaLocalizacion>
                </Col>
              <Col span={2} className="contenidoFormularioMapa"></Col>
              <Col span={8} className="contenidoFormulario3"></Col>
                <Col span={8} className="BotnContForm3" onClick={() => crearLocalizaciones()}>Crear</Col>
              <Col span={8} className="contenidoFormulario3"></Col>
              <Col span={24}>
                  <Row className="RowBoton">
                    <Col span={2} ></Col>
                    <Col span={2} >
                      <button className='botonImagen'onClick={()=>setFormVista("default")}>
                        <img width="45" height="30" src={flecha_atras} alt="salir"/>
                      </button>
                    </Col>
                    <Col span={20} ></Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </>}
{/*Editar Rutas*/}
              {formVista === "editarRuta" &&<>
              <div className="espacios">
              {alerta==="success"&&<Alert message={textoAlerta} type="success" showIcon />}
              {alerta==="info"&&<Alert message={textoAlerta} type="info" showIcon />}
              {alerta==="warning"&&<Alert message={textoAlerta} type="warning" showIcon />}
              {alerta==="error"&&<Alert message={textoAlerta} type="error" showIcon />}
            </div>
              <div className="menu">
                <div className="tituloMenu"><h1>RUTAS</h1></div>
                <Row className="BotonesNavegacion">
                <Col span={6} className="Boton" onClick = {() =>setFormVista("crearRuta")}><h1 className="etiquetah">Crear</h1></Col>
                <Col span={6} className="Seleccionado" onClick = {() =>{setFormVista("editarRuta");setVisibility("hidden");}}><h1 className="etiquetah">Editar</h1></Col>
                <Col span={6} className="Boton" onClick = {() =>setFormVista("eliminarRuta")}><h1 className="etiquetah">Eliminar</h1></Col>
                <Col span={6} className="Boton" onClick = {() =>{setFormVista("visualizarRuta");setVisibility("hidden");}}><h1 className="etiquetah">Visualizar</h1></Col>
                </Row>
                <Row className="Contenido">
                  {visibility === "hidden" &&<>
                    <Col span={24} className="espacioFormulario"></Col>
                    <Col span={24} className="espacioFormulario"></Col>
                    <Col span={24} className="espacioFormulario"></Col>
                    <Col span={24} className="espacioFormulario"></Col>
                      <Col span={24} className="contenidoFormulario"></Col>
                      <Col span={8} className="contenidoFormulario"></Col>
                        <Col span={8} className="contenidoFormulario">
                          <Select options={optionsNombreCiudad} onChange={(e: any) => { onChangeNombreEditar2(e.label); setidRutaEditar(e.value); buscarLocRutas(e.label) }} />
                        </Col>
                      <Col span={8} className="contenidoFormulario"></Col>
                      <Col span={24} className="contenidoFormulario"></Col>
                      <Col span={24} className="contenidoFormulario"></Col>
                      <Col span={24} className="contenidoFormulario"></Col>
                      <Col span={24} className="contenidoFormulario"></Col>
                      <Col span={24} className="contenidoFormulario"></Col>
                      <Col span={24} className="contenidoFormulario"></Col>
                      <Col span={24} className="contenidoFormulario"></Col>
                      <Col span={24}>
                      <Row className="RowBoton">
                        <Col span={2} ></Col>
                        <Col span={2} >
                          <button className='botonImagen'onClick={()=>setFormVista("default")}>
                            <img width="45" height="45" src={flecha_atras} alt="salir"/>
                          </button>
                        </Col>
                        <Col span={20} ></Col>
                      </Row>
                    </Col>
                    <Col span={24} className="espacioFormulario"></Col>
                    <Col span={24} className="espacioFormulario"></Col>
                  </>}
                  {visibility === "visible" && vehiculosRutaEditar !== '' && ciudadesRutaEditar !== '' && dificultadRutaEditar !== '' &&<>
                    <Col span={24} className="espacioFormulario"></Col>
                    <Col span={1}></Col>
                      <Col span={10} className="contenidoFormulario"><h2>Nombre</h2></Col>
                        <Col span={2}></Col>
                      <Col span={10} className="contenidoFormulario"><h2>Longitud</h2></Col>
                    <Col span={1}></Col>
                    <Col span={1}></Col>
                      <Col span={10} className="contenidoFormulario"><Input type="text" value={nombreRutaEditar} name="nombreRuta" onChange={(e) => setNombreRutaEditar(e.target.value)} /></Col>
                        <Col span={2}></Col>
                      <Col span={10} className="contenidoFormulario"><Input type="number" value={longitudRutaEditar} name="nombreRuta" onChange={(e) => setLongitudRutaEditar(e.target.valueAsNumber)} /></Col>
                    <Col span={1}></Col>
                    <Col span={24} className="espacioFormulario"></Col>
                    <Col span={1}></Col>
                      <Col span={10} className="contenidoFormulario"><h2>Vehiculo</h2></Col>
                        <Col span={2}></Col>
                      <Col span={10} className="contenidoFormulario"><h2>Ciudad</h2></Col>
                    <Col span={1}></Col>
                    <Col span={1}></Col>
                      <Col span={10} className="contenidoFormulario">
                      <Select options={optionsVehiculos} onChange={(e: any) => setVehiculosRutaEditar(e.value)} defaultValue={{ value: vehiculosRutaEditar, label: vehiculosRutaEditar }} />
                      </Col>
                        <Col span={2}></Col>
                      <Col span={10} className="contenidoFormulario">
                      <Select options={optionsCiudades} onChange={(e: any) => setCiudadesRutaEditar(e.label)} defaultValue={{ value: ciudadesRutaEditar, label: ciudadesRutaEditar }} />
                      </Col>
                    <Col span={1}></Col>
                    <Col span={24} className="espacioFormulario"></Col>
                    <Col span={6}></Col>
                      <Col span={12} className="contenidoFormulario"><h2>Dificultad</h2></Col>
                    <Col span={6}></Col>
                    <Col span={6}></Col>
                      <Col span={12} className="contenidoFormulario">
                      <Select options={optionsDificultad} onChange={(e: any) => setDificultadRutaEditar(e.value)} defaultValue={{ value: dificultadRutaEditar, label: dificultadRutaEditar }} />
                      </Col>
                    <Col span={6}></Col>
                    <Col span={24} className="espacioFormulario"></Col>
                    <Col span={6}></Col>
                      <Col span={12} className="contenidoFormularioImagen">
                        <ImgCrop rotate>
                          <Upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            fileList={fileListEditar}
                            onChange={onChangeEditar}>
                            {fileList.length < 1 && 'Subir Foto'}
                          </Upload>
                        </ImgCrop>
                      </Col>
                    <Col span={6}></Col>
                    <Col span={24} className="espacioFormulario"></Col>
                    <Col span={24} className="contenidoFormulario">
                      <Row className="RowBoton">
                        <Col span={6}></Col>
                          <Col span={6} className="ColBoton" onClick={() => editarRutas()}>Editar</Col>
                          <Col span={6} className="ColBoton" onClick={() => { setFormVista("editarLocalizaciones"); setMapaEditarLoc(1) }}>Editar Loc.</Col>
                        <Col span={6}></Col>
                      </Row>
                    </Col>
                    <Col span={24} className="contenidoFormulario">
                      <Row className="RowBoton">
                        <Col span={2} ></Col>
                        <Col span={2} >
                          <button className='botonImagen'onClick={() => { setFormVista("default"); setVisibility("hidden"); setDisabled(true); setnombreRutacrear(""); setlongitudRuta(0); setCoordenadasLocCrear([]); setFileList([]) }}>
                            <img width="45" height="45" src={flecha_atras} alt="salir"/>
                          </button>
                        </Col>
                        <Col span={20} ></Col>
                      </Row>
                    </Col>
                  </>}
                </Row>
              </div>
            </>}
{/*Editar Localizaciones*/}
            {formVista === "editarLocalizaciones" &&<>
              <div className="espacios">
                {alerta==="success"&&<Alert message={textoAlerta} type="success" showIcon />}
                {alerta==="info"&&<Alert message={textoAlerta} type="info" showIcon />}
                {alerta==="warning"&&<Alert message={textoAlerta} type="warning" showIcon />}
                {alerta==="error"&&<Alert message={textoAlerta} type="error" showIcon />}
              </div>
              <div className="menu">
                <div className="tituloMenu"><h1>RUTAS</h1></div>
                <Row className="BotonesNavegacion">
                <Col span={6} className="Boton" onClick = {() =>{ setFormVista("crearRuta"); setDisabled(true); setnombreRutacrear(""); setlongitudRuta(0); setCoordenadasLocCrear([]); setFileList([]) }}><h1 className="etiquetah">Crear</h1></Col>
                <Col span={6} className="Seleccionado" onClick = {() =>{ setFormVista("editarRuta"); setVisibility("hidden"); setDisabled(true); setnombreRutacrear(""); setlongitudRuta(0); setCoordenadasLocCrear([]); setFileList([]) }}><h1 className="etiquetah">Editar</h1></Col>
                <Col span={6} className="Boton" onClick = {() =>{ setFormVista("eliminarRuta"); setDisabled(true); setnombreRutacrear(""); setlongitudRuta(0); setCoordenadasLocCrear([]); setFileList([]) }}><h1 className="etiquetah">Eliminar</h1></Col>
                <Col span={6} className="Boton" onClick = {() =>{ setFormVista("visualizarRuta"); setDisabled(true); setVisibility("hidden");setnombreRutacrear(""); setlongitudRuta(0); setCoordenadasLocCrear([]); setFileList([]) }}><h1 className="etiquetah">Visualizar</h1></Col>
                </Row>
                <Row className="Contenido">
                  {mapaEditarLoc === 1 &&<>
                    <Col span={24} className="espacioFormulario"></Col>
                    <Col span={8} className="contenidoFormulario3"></Col>
                      <Col span={8} className="contenidoFormulario3">
                        <Select options={optionsRutaLoc} onChange={(e: any) => { setMapaEditarLoc(2); setNombreLocEditar(e.value); editarLocalizaciones(nombreRutaEditar, e.label); locEditar(nombreRutaEditar, e.value) }} />
                      </Col>
                    <Col span={8} className="contenidoFormulario3"></Col>
                    <Col span={24} className="contenidoFormulario"></Col>
                    <Col span={24} className="contenidoFormulario"></Col>
                    <Col span={24} className="contenidoFormulario"></Col>
                    <Col span={24} className="contenidoFormulario"></Col>
                    <Col span={24} className="contenidoFormulario"></Col>
                    <Col span={24} className="contenidoFormulario"></Col>
                    <Col span={24} className="contenidoFormulario"></Col>
                    <Col span={24} className="espacioFormulario"></Col>
                    <Col span={24} className="espacioFormulario"></Col>
                    <Col span={8} className="contenidoFormulario"></Col>
                      <Col span={8} className="ColBoton2" onClick={()=>{setFormVista("editarLocCrear")}}>Crear</Col>
                    <Col span={8} className="contenidoFormulario"></Col>
                    <Col span={24}>
                      <Row className="RowBoton">
                        <Col span={2} ></Col>
                        <Col span={2} >
                          <button className='botonImagen'onClick={()=>{ setFormVista("default"); setVisibility("hidden"); setDisabled(true); setnombreRutacrear(""); setlongitudRuta(0); setCoordenadasLocCrear([]); setFileList([]) }}>
                            <img width="45" height="45" src={flecha_atras} alt="salir"/>
                          </button>
                        </Col>
                        <Col span={20} ></Col>
                      </Row>
                    </Col>
                    <Col span={24} className="espacioFormulario"></Col>
                    <Col span={24} className="espacioFormulario"></Col>
                  </>}
                  {mapaEditarLoc === 2 && ocultoeditar === 2 &&<>
                    <Col span={24} className="contenidoFormulario3"><h2>Nombre</h2></Col>
                    <Col span={8} className="contenidoFormulario3"></Col>
                    <Col span={8} className="contenidoFormulario3">
                      <Input type="text" defaultValue={nombreLocEditar} name="nombreRuta" onChange={(e) => { setNombreLocEditar2(e.target.value); }} />
                    </Col>
                    <Col span={8} className="contenidoFormulario3"></Col>
                    <Col span={24} className="contenidoFormulario3"><h2>Pregunta</h2></Col>
                    <Col span={8} className="contenidoFormulario3"></Col>
                    <Col span={8} className="contenidoFormulario3">
                      <Input type="text" value={preguntaEditarLoc} name="pregunta" onChange={(e) => { setPreguntaEditarLoc(e.target.value); }} />
                    </Col>
                    <Col span={8} className="contenidoFormulario3"></Col>
                    <Col span={1} className="contenidoFormulario3"></Col>
                      <Col span={10} className="contenidoFormulario3">
                        <Input type="text" value={r1editar} name="r1E" onChange={(e) => { setR1Editar(e.target.value); }} defaultValue={""} style={styles.verde} />
                      </Col>
                    <Col span={2} className="contenidoFormulario3"></Col>
                      <Col span={10} className="contenidoFormulario3">
                        <Input type="text" value={r2editar} name="r2E" onChange={(e) => { setR2Editar(e.target.value); }} defaultValue={""} style={styles.rojo} />
                      </Col>
                    <Col span={1} className="contenidoFormulario3"></Col>
                    <Col span={1} className="contenidoFormulario3"></Col>
                      <Col span={10} className="contenidoFormulario3">
                          <Input type="text" value={r3editar} name="r3E" onChange={(e) => { setR3Editar(e.target.value); }} defaultValue={""} style={styles.rojo} />
                      </Col>
                    <Col span={2} className="contenidoFormulario3"></Col>
                      <Col span={10} className="contenidoFormulario3">
                        <Input type="text" value={r4editar} name="r4E" onChange={(e) => { setR4Editar(e.target.value); }} defaultValue={""} style={styles.rojo} />
                      </Col>
                    <Col span={1} className="contenidoFormulario3"></Col>
                    <Col span={24} className="contenidoFormularioMapaPequeno">
                      {mapaNoOculto===true&&<MapaEditarLocalizacionesPeque Center={[coordenadasLocEditar2[0], coordenadasLocEditar2[1]]} Zoom={12} latt={coordenadasLocEditar2[0]} longg={coordenadasLocEditar2[1]}></MapaEditarLocalizacionesPeque>}
                      {mapaNoOculto===false&&<MapaEditarLocalizacionesPeque Center={[coordenadasLocEditar2[0], coordenadasLocEditar2[1]]} Zoom={12} latt={coordenadasLocEditar2[0]} longg={coordenadasLocEditar2[1]}></MapaEditarLocalizacionesPeque>}
                    </Col>
                    <Col span={24} className="espacioFormulario3"></Col>
                    <Col span={24} className="espacioFormulario3"></Col>
                    <Col span={3} className="contenidoFormulario"></Col>
                      <Col span={7} className="ColBoton2" onClick={() => { editarLocalizacionesUpdate(nombreLocEditar); editarLocalizacionesRuta(nombreRutaEditar, nombreLocEditar);setFormVista("default"); setVisibility("hidden"); setDisabled(true); setnombreRutacrear(""); setlongitudRuta(0); setCoordenadasLocCrear([]); setFileList([]) }}>Editar</Col>
                    <Col span={4} className="contenidoFormulario"></Col>
                      <Col span={7} className="ColBoton2" onClick={() => { eliminarLocalizaciones(nombreLocEditar); eliminarLocalizacionesRuta(nombreLocEditar,nombreRutaEditar);setFormVista("default"); setVisibility("hidden"); setDisabled(true); setnombreRutacrear(""); setlongitudRuta(0); setCoordenadasLocCrear([]); setFileList([]) }}>Eliminar</Col>
                    <Col span={3} className="contenidoFormulario"></Col>
                  </>}
                  {mapaEditarLoc === 2 && coordenadasLocEditar2[0] !== undefined &&<>
                    {ocultoeditar === 1&&<>
                      <Col span={24} className="espacioFormulario"></Col>
                      <Col span={8} className="contenidoFormulario3"></Col>
                        <Col span={8} className="contenidoFormulario3">
                          <Input type="text" defaultValue={nombreLocEditar} name="nombreRuta" onChange={(e) => { setNombreLocEditar2(e.target.value); }} />
                        </Col>
                      <Col span={8} className="contenidoFormulario3"></Col>
                      <Col span={24} className="contenidoFormularioMapaGrande">
                        {mapaOculto===true&&<MapaEditarLocalizacion Center={[coordenadasLocEditar2[0], coordenadasLocEditar2[1]]} Zoom={12} latt={coordenadasLocEditar2[0]} longg={coordenadasLocEditar2[1]}></MapaEditarLocalizacion>}
                        {mapaOculto===false&&<MapaEditarLocalizacion Center={[coordenadasLocEditar2[0], coordenadasLocEditar2[1]]} Zoom={12} latt={coordenadasLocEditar2[0]} longg={coordenadasLocEditar2[1]}></MapaEditarLocalizacion>}
                      </Col>
                      <Col span={24} className="espacioFormulario"></Col>
                      <Col span={24} className="espacioFormulario"></Col>
                      <Col span={24} className="espacioFormulario"></Col>
                      <Col span={24} className="contenidoFormulario"></Col>
                      <Col span={3} className="contenidoFormulario"></Col>
                        <Col span={7} className="ColBoton2" onClick={() => { editarLocalizacionesUpdate(nombreLocEditar); editarLocalizacionesRuta(nombreRutaEditar, nombreLocEditar);setFormVista("default"); setVisibility("hidden"); setDisabled(true); setnombreRutacrear(""); setlongitudRuta(0); setCoordenadasLocCrear([]); setFileList([]) }}>Editar</Col>
                      <Col span={3} className="contenidoFormulario"></Col>
                        <Col span={7} className="ColBoton2" onClick={() => { eliminarLocalizaciones(nombreLocEditar); eliminarLocalizacionesRuta(nombreLocEditar,nombreRutaEditar);setFormVista("default"); setVisibility("hidden"); setDisabled(true); setnombreRutacrear(""); setlongitudRuta(0); setCoordenadasLocCrear([]); setFileList([]) }}>Eliminar</Col>
                      <Col span={3} className="contenidoFormulario"></Col>
                    </>}
                    <Col span={24}>
                      <Row className="RowBoton">
                        <Col span={2} ></Col>
                        <Col span={2} >
                          <button className='botonImagen'onClick={()=>{ setFormVista("default"); setVisibility("hidden"); setDisabled(true); setnombreRutacrear(""); setlongitudRuta(0); setCoordenadasLocCrear([]); setFileList([]) }}>
                            <img width="45" height="45" src={flecha_atras} alt="salir"/>
                          </button>
                        </Col>
                        <Col span={20} ></Col>
                      </Row>
                    </Col>
                    <Col span={24} className="espacioFormulario"></Col>
                    <Col span={24} className="espacioFormulario"></Col>
                  </>}
                </Row>
              </div>
            </>}
{/*Editar Localizaciones Crear*/}
            {formVista === "editarLocCrear" &&<>
              <div className="espacios">
                {alerta==="success"&&<Alert message={textoAlerta} type="success" showIcon />}
                {alerta==="info"&&<Alert message={textoAlerta} type="info" showIcon />}
                {alerta==="warning"&&<Alert message={textoAlerta} type="warning" showIcon />}
                {alerta==="error"&&<Alert message={textoAlerta} type="error" showIcon />}
              </div>
              <div className="menu">
                <div className="tituloMenu"><h1>RUTAS</h1></div>
                <Row className="BotonesNavegacion">
                  <Col span={6} className="Boton" onClick = {() =>{ setFormVista("crearRuta"); setDisabled(true); setnombreRutacrear(""); setlongitudRuta(0); setCoordenadasLocCrear([]); setFileList([]) }}><h1 className="etiquetah">Crear</h1></Col>
                  <Col span={6} className="Seleccionado" onClick = {() =>{ setFormVista("editarRuta"); setVisibility("hidden"); setDisabled(true); setnombreRutacrear(""); setlongitudRuta(0); setCoordenadasLocCrear([]); setFileList([]) }}><h1 className="etiquetah">Editar</h1></Col>
                  <Col span={6} className="Boton" onClick = {() =>{ setFormVista("eliminarRuta"); setDisabled(true); setnombreRutacrear(""); setlongitudRuta(0); setCoordenadasLocCrear([]); setFileList([]) }}><h1 className="etiquetah">Eliminar</h1></Col>
                  <Col span={6} className="Boton" onClick = {() =>{ setFormVista("visualizarRuta"); setDisabled(true); setVisibility("hidden");setnombreRutacrear(""); setlongitudRuta(0); setCoordenadasLocCrear([]); setFileList([]) }}><h1 className="etiquetah">Visualizar</h1></Col>
                </Row>
                <Row className="Contenido">
                <Col span={24} className="espacioFormulario3"></Col>
                <Col span={24} className="contenidoFormulario3"><h2>Nombre</h2></Col>
                <Col span={6} className="contenidoFormulario3"></Col>
                  <Col span={12} className="contenidoFormulario3">
                    <Input type="text" value={nombreLocalizacionCrear} name="nombreLocaliacion" onChange={(e) => setnombreLocalizacionCrear(e.target.value)} required={true} />
                  </Col>
                <Col span={6} className="contenidoFormulario3"></Col>
                <Col span={24} className="espacioFormulario3"></Col>
                  <Col span={4} className="contenidoFormulario3"></Col>
                    <Col span={7} className="BotnContForm3" onClick={()=>setValueRadio(1)}>Oculto</Col>
                      <Col span={2} className="contenidoFormulario3"></Col>
                    <Col span={7} className="BotnContForm3" onClick={()=>setValueRadio(2)}>Preguntas</Col>
                  <Col span={4} className="contenidoFormulario3"></Col>
                <Col span={24} className="espacioFormulario3"></Col>
                <Col span={24} className="contenidoFormulario3">
                  {valueRadio === 2 &&<h2>Pregunta</h2>}
                </Col>
                <Col span={6} className="contenidoFormulario3"></Col>
                  <Col span={12} className="contenidoFormulario3">
                    {valueRadio === 2 &&<Input type="text" name="pregunta" onChange={(e) => setPregunta(e.target.value)} required={true} defaultValue={"¿?"} style={styles.pregunta} />}
                  </Col>
                <Col span={6} className="contenidoFormulario3"></Col>
                <Col span={24} className="contenidoFormulario3">
                  {valueRadio === 2 &&<h2>Respuestas</h2>}
                </Col>
                <Col span={1} className="contenidoFormulario3"></Col>
                  <Col span={10} className="contenidoFormulario3">
                    {valueRadio === 2 &&<Input type="text" name="r1" onChange={(e) => setR1(e.target.value)} required={true} defaultValue={""} style={styles.verde} />}
                  </Col>
                <Col span={2} className="contenidoFormulario3"></Col>
                <Col span={10} className="contenidoFormulario3">
                  {valueRadio === 2 &&<Input type="text" name="r2" onChange={(e) => setR2(e.target.value)} required={true} defaultValue={""} style={styles.rojo} />}
                </Col>
                <Col span={1} className="contenidoFormulario3"></Col>
                <Col span={1} className="contenidoFormulario3"></Col>
                  <Col span={10} className="contenidoFormulario3">
                    {valueRadio === 2 &&<Input type="text" name="r3" onChange={(e) => setR3(e.target.value)} required={true} defaultValue={""} style={styles.rojo} />}
                  </Col>
                <Col span={2} className="contenidoFormulario3"></Col>
                <Col span={10} className="contenidoFormulario3">
                  {valueRadio === 2 &&<Input type="text" name="r4" onChange={(e) => setR4(e.target.value)} required={true} defaultValue={""} style={styles.rojo} />}
                </Col>
                <Col span={1} className="contenidoFormulario3"></Col>
                <Col span={2} className="contenidoFormularioMapa"></Col>
                  <Col span={20} className="contenidoFormularioMapa">
                    <MapaCreaLocalizacion Center={[43.339643763841615, -1.794031072876929]} Zoom={12}></MapaCreaLocalizacion>
                  </Col>
                <Col span={2} className="contenidoFormularioMapa"></Col>
                <Col span={8} className="contenidoFormulario3"></Col>
                  <Col span={8} className="BotnContForm3" onClick={() => {crearLocalizaciones2(nombreRutaEditar);setFormVista("default"); setVisibility("hidden"); setDisabled(true); setnombreRutacrear(""); setlongitudRuta(0); setCoordenadasLocCrear([]); setFileList([])}}>Crear</Col>
                <Col span={8} className="contenidoFormulario3"></Col>
                <Col span={24}>
                    <Row className="RowBoton">
                      <Col span={2} ></Col>
                      <Col span={2} >
                        <button className='botonImagen'onClick={() => { setFormVista("default"); setVisibility("hidden"); setDisabled(true); setnombreRutacrear(""); setlongitudRuta(0); setCoordenadasLocCrear([]); setFileList([]) }}>
                          <img width="45" height="30" src={flecha_atras} alt="salir"/>
                        </button>
                      </Col>
                      <Col span={20} ></Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </>}
{/*Eliminar Rutas*/}
            {formVista === "eliminarRuta" &&<>
              <div className="espacios">
                {alerta==="success"&&<Alert message={textoAlerta} type="success" showIcon />}
                {alerta==="info"&&<Alert message={textoAlerta} type="info" showIcon />}
                {alerta==="warning"&&<Alert message={textoAlerta} type="warning" showIcon />}
                {alerta==="error"&&<Alert message={textoAlerta} type="error" showIcon />}
              </div>
              <div className="menu">
                <div className="tituloMenu"><h1>RUTAS</h1></div>
                <Row className="BotonesNavegacion">
                  <Col span={6} className="Boton" onClick = {() =>{ setFormVista("crearRuta"); setDisabled(true); setnombreRutacrear(""); setlongitudRuta(0); setCoordenadasLocCrear([]); setFileList([]) }}><h1 className="etiquetah">Crear</h1></Col>
                  <Col span={6} className="Boton" onClick = {() =>{ setFormVista("editarRuta"); setVisibility("hidden"); setDisabled(true); setnombreRutacrear(""); setlongitudRuta(0); setCoordenadasLocCrear([]); setFileList([]) }}><h1 className="etiquetah">Editar</h1></Col>
                  <Col span={6} className="Seleccionado" onClick = {() =>{ setFormVista("eliminarRuta"); setDisabled(true); setnombreRutacrear(""); setlongitudRuta(0); setCoordenadasLocCrear([]); setFileList([]) }}><h1 className="etiquetah">Eliminar</h1></Col>
                  <Col span={6} className="Boton" onClick = {() =>{ setFormVista("visualizarRuta"); setDisabled(true); setnombreRutacrear(""); setlongitudRuta(0); setCoordenadasLocCrear([]); setFileList([]) }}><h1 className="etiquetah">Visualizar</h1></Col>
                </Row>
                <Row className="Contenido">
                  <Col span={24} className="espacioFormulario"></Col>
                  <Col span={24} className="espacioFormulario"></Col>
                  <Col span={24} className="espacioFormulario"></Col>
                  <Col span={24} className="espacioFormulario"></Col>
                    <Col span={24} className="contenidoFormulario"></Col>
                    <Col span={8} className="contenidoFormulario"></Col>
                      <Col span={8} className="contenidoFormulario">
                        <Select options={optionsNombreCiudad} onChange={(e:any) =>setIdRutaEliminar(e.value)} />
                      </Col>
                    <Col span={8} className="contenidoFormulario"></Col>
                    <Col span={24} className="contenidoFormulario"></Col>
                    <Col span={24} className="contenidoFormulario"></Col>
                    <Col span={8} className="contenidoFormulario"></Col>
                      <Col span={8} className="ColBoton2" onClick={() => eliminarRuta()}>Eliminar</Col>
                    <Col span={8} className="contenidoFormulario"></Col>
                    <Col span={24} className="contenidoFormulario"></Col>
                    <Col span={24} className="contenidoFormulario"></Col>
                    <Col span={24} className="contenidoFormulario"></Col>
                    <Col span={24} className="contenidoFormulario"></Col>
                    <Col span={24}>
                    <Row className="RowBoton">
                      <Col span={2} ></Col>
                      <Col span={2} >
                        <button className='botonImagen'onClick={()=>setFormVista("default")}>
                          <img width="45" height="45" src={flecha_atras} alt="salir"/>
                        </button>
                      </Col>
                      <Col span={20} ></Col>
                    </Row>
                  </Col>
                  <Col span={24} className="espacioFormulario"></Col>
                  <Col span={24} className="espacioFormulario"></Col>
                </Row>
              </div>
            </>}
{/*VISUALIZAR Rutas*/}
            {formVista === "visualizarRuta" &&<>
              <div className="espacios">
                {alerta==="success"&&<Alert message={textoAlerta} type="success" showIcon />}
                {alerta==="info"&&<Alert message={textoAlerta} type="info" showIcon />}
                {alerta==="warning"&&<Alert message={textoAlerta} type="warning" showIcon />}
                {alerta==="error"&&<Alert message={textoAlerta} type="error" showIcon />}
              </div>
              <div className="menu">
                <div className="tituloMenu"><h1>RUTAS</h1></div>
                <Row className="BotonesNavegacion">
                <Col span={6} className="Boton" onClick = {() =>{ setFormVista("crearRuta"); setDisabled(true); setnombreRutacrear(""); setlongitudRuta(0); setCoordenadasLocCrear([]); setVisibility("hidden");setFileList([]) }}><h1 className="etiquetah">Crear</h1></Col>
                <Col span={6} className="Boton" onClick = {() =>{ setFormVista("editarRuta"); setVisibility("hidden"); setDisabled(true); setnombreRutacrear(""); setlongitudRuta(0); setCoordenadasLocCrear([]); setVisibility("hidden");setFileList([]) }}><h1 className="etiquetah">Editar</h1></Col>
                <Col span={6} className="Boton" onClick = {() =>{ setFormVista("eliminarRuta"); setDisabled(true); setnombreRutacrear(""); setlongitudRuta(0); setCoordenadasLocCrear([]); setVisibility("hidden");setFileList([]) }}><h1 className="etiquetah">Eliminar</h1></Col>
                <Col span={6} className="Seleccionado" onClick = {() =>{ setFormVista("visualizarRuta"); setDisabled(true); setnombreRutacrear(""); setlongitudRuta(0); setCoordenadasLocCrear([]); setFileList([]) }}><h1 className="etiquetah">Visualizar</h1></Col>
                </Row>
                <Row className="Contenido">
                  {visibility === "hidden" &&<>
                    <Col span={24} className="espacioFormulario"></Col>
                    <Col span={24} className="espacioFormulario"></Col>
                    <Col span={24} className="espacioFormulario"></Col>
                    <Col span={24} className="espacioFormulario"></Col>
                    <Col span={24} className="contenidoFormulario"></Col>
                    <Col span={8} className="contenidoFormulario"></Col>
                      <Col span={8} className="contenidoFormulario">
                        <Select options={optionsNomRutCT} onChange={(e:any) =>{setidRutaEditar(e.value);setVisibility("visible");onChangeNombreEditar(e.label);setSalaChat(e.label);verUsuariosMapa(e.value);setInterval(verUsuariosMapa, 20000,(e.value));}} />
                      </Col>
                    <Col span={8} className="contenidoFormulario"></Col>
                    <Col span={24} className="contenidoFormulario"></Col>
                    <Col span={24} className="contenidoFormulario"></Col>
                    <Col span={24} className="contenidoFormulario"></Col>
                    <Col span={24} className="contenidoFormulario"></Col>
                    <Col span={24} className="contenidoFormulario"></Col>
                    <Col span={24} className="contenidoFormulario"></Col>
                    <Col span={24} className="contenidoFormulario"></Col>
                    <Col span={24}>
                    <Row className="RowBoton">
                      <Col span={2} ></Col>
                      <Col span={2} >
                        <button className='botonImagen'onClick={()=>{setFormVista("default");setVisibility("hidden")}}>
                          <img width="45" height="45" src={flecha_atras} alt="salir"/>
                        </button>
                      </Col>
                      <Col span={20} ></Col>
                    </Row>
                    </Col>
                    <Col span={24} className="espacioFormulario"></Col>
                    <Col span={24} className="espacioFormulario"></Col>
                  </>}
                  {visibility === "visible" &&<>
                    <Col span={24} className="espacioFormulario"></Col>
                    <Col span={24} className="espacioFormulario"></Col>
                    <Col span={24} className="espacioFormulario"></Col>
                    <Col span={24} className="contenidoFormulario"></Col>
                    <Col span={24} className="contenidoFormularioMapaGrande">
                      {arrayLongitud.length < 1 ? null : polyLine.length < 1 ? null :<MapaVisualizarRutas Center={[43.338236874913086, -1.795033984714092]} Zoom={12} longitudArray={arrayLongitud} latitudArray={arrayLatitud} polyline={polyLine} usuarios={usuariosArrayLoc}></MapaVisualizarRutas>}
                    </Col>
                    <Col span={24} className="contenidoFormulario"></Col>
                    <Col span={24}>
                    <Col span={24} className="espacioFormulario"></Col>
                      <Row className="RowBoton">
                        <Col span={2} ></Col>
                        <Col span={2} >
                          <button className='botonImagen'onClick={()=>{setFormVista("default");setVisibility("hidden")}}>
                            <img width="45" height="45" src={flecha_atras} alt="salir"/>
                          </button>
                        </Col>
                        <Col span={20} ></Col>
                      </Row>
                    </Col>
                    <Col span={24} className="espacioFormulario"></Col>
                    <Col span={24} className="espacioFormulario"></Col>
                  </>}
                </Row>
              </div>
            </>}
          </Col>
        <Col span={6}><ChatRoom/></Col>
      </Row>
    </>
  )
}
export default Menu;