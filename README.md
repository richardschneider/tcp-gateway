# tcp-gateway

Browser code cannot directly access a TCP socket.  It's only full duplex stream is a WebSocket.  **tcp-gateway** is server/gateway/tunnel/proxy that allows bi-directional communication between the browser and a remote TCP socket.  The gateway 
forwards WebSocket writes to the remote TCP sockets and sends remote socket data to the browser as an Websocket data.

## Browser

    var socket = new WebSocket('http://.../tunnel?remote=...&port=...')
    
    // Respond to some data from the remote
    socket.onmessage = function(evt) { console.log(evt.data) }
    
    // Send some data to the remote
    socket.send('Hello world');

