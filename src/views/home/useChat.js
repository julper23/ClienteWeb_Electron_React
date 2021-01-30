import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import useIpServer from '../../hooks/useIpServer';
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

//El chat necesita de una id de sala para poder entrar
//Los id de sala nos sirven para hablar solo con las personas que esten en esta misma
const useChat = (roomId) => {
  const {ipServer} = useIpServer();
  const SOCKET_SERVER_URL = "http://"+ipServer+":4000";
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();
  
  useEffect(() => {
    setMessages([]);
    //Nos conectamos al servidor creando un cliente con la ip del server y la id de la sala
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    //COn esta funcion capturamos el evento de nuevos mensajes
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        //Aqui comprobamos que el mensaje sea nuestro o de otra persona, para luego aplicarle distintos estilos
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      //Cargamos todos los mensajes en la variable messages
      setMessages((messages) => [...messages, incomingMessage]);
    });

    //Si nos desconectamos tenemos que avisar al servidor de que nos vamos
    return () => {
      socketRef.current.disconnect();
    };
    /*El useEffect se carga nada mas iniciar el programa,
    pero al poner roomId le decimos que cada vez que se cambie la id de sala, nos desconecte de la sala y nos meta en la otra*/
  }, [roomId]);

  //Funcion para enviar mensajes
  const sendMessage = (messageBody) => {
    //Creamos un evento emit con el evento newChatMessage para que el server sepa que es un nuevo mensaje
    //En el body enviamos el mensaje
    //En senderId enviamos nuestra id para saber quien manda el mensaje
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      senderId: socketRef.current.id,
    });
  };
  //Con este return hacemos que cada vez que alguien importe useChat pueda usar las funciones 
  //messages para conseguir los mensajes de la sala
  //y sendMessage para poder enviar un mensaje
  return { messages, sendMessage };
};

//Exportamos useChat para que puedan utilizar las funciones del cliente desde cualquier parte de la app
export default useChat;
