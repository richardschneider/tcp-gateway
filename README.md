# tcp-gateway

Browser code cannot directly access a TCP socket.  It's only full duplex stream is a WebSocket.  **tcp-gateway** is server/gateway/tunnel/proxy that allows bi-directional communication between the browser and a TCP socket.  The gateway 
forwards WebSocket writes to the remote TCP sockets and sends remote socket data to the browser as an Websocket data.

