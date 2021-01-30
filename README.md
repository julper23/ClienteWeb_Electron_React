# ClienteWeb_Electron_React
Para poder lanzar el cliente
	1.-Hacemos git clone del proyecto
	#RECORDAR QUE SIN EL SERVIDOR DEL CHAT NI LA API LA APLICACION NO FUNCIONARA CORRECTAMENTE
	2.-Ejecutamos $yarn para que los modulos que no esten instalados se descarguen
	3.-Configuramos la ip de los servidores(que sera la misma para los dos, la api en el puerto 8080 y el chat en el 4000)
	   en el archivo src/store/reducers/ipServer.js en el apartado INITIAL_STATE
	4.-Ejecutamos el comando yarn start o ejecutamos el archivo AppEjecutable.bat
