import React from 'react';
import "./ChatRoom.css";
import useChat from "../useChat";
import useSalaChat from '../../../hooks/useSalaChat';
import {Row, Col} from 'antd';

//Componente Chat
const ChatRoom = () => {
  //Variables globales
  const {salaChat} = useSalaChat();
  const { roomId } ={roomId: salaChat};
  const { messages, sendMessage } = useChat(roomId);

  //Variablas locales
  const [newMessage, setNewMessage] = React.useState("");

  //Esta funcion hace que el texto del imput donde se escribe el mensaje pueda cambiar cuando el usuario escriba
  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  //Funcion que envia el mensaje
  const handleSendMessage = () => {
    //Si el mensaje no esta vacio lo envia y resetea el imput para que el mensaje se quite de ahi
    if(newMessage!==""){
      sendMessage(newMessage);
      setNewMessage("");
    }
  };

  return (
    <div id="chat">
      <div id="menu">
        {/*Este h1 nos muestra en que sala estamos */}
        <h1 className="room-name">Chat: {roomId}</h1>
      </div>
      <Row>
        <Col span={2}></Col>
          <Col span={20}>
            <div id="global">
              {/*Esta lista nos muestra los mensajes
              *Si el mensaje es nuestro el mensaje quedara con el estilo my-message
              *Si el mensaje no es nuestro el mensaje quedara con el estilo received-message
              *En el message.body va el texto del mensaje
              * */}
              <ol className="messages-list">
                {messages.map((message, i) => (
                  <li
                    key={i}
                    className={`message-item ${
                      message.ownedByCurrentUser ? "my-message" : "received-message"
                    }`}
                  >
                    {message.body}
                  </li>
                ))}
              </ol>
            </div>
        </Col>
        <Col span={2}></Col>
        <Col span={2}></Col>
          <Col span={20}>
            {/*Input donde escribimos el mensaje para poder enviarlo */}
            <input name="usermsg" type="text" id="usermsg" size={15} value={newMessage} onChange={handleNewMessageChange} placeholder="Escribe un mensaje aquí" className="new-message-input-field"/>
          </Col>
        <Col span={2}></Col>
        <Col span={8}></Col>
          {/*Boton para enviar el mensaje */}
          <Col span={8}>
            <div className="espacioChat"></div>
            <div onClick={handleSendMessage} className="BotonChat">
              Enviar
            </div>
          </Col>
        <Col span={8}></Col>
      </Row> 
    </div>
  );
};

export default ChatRoom;
