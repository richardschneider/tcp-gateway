'use strict';

const url = require('url');
const net = require('net');
const WebSocketServer = require('ws').Server;

/**
 * Verify the client.
 */
function verifyClient(info) {
    var uri = url.parse(info.req.url, true);
    let remotePort = parseInt(uri.query.port, 10);
    if (isNaN(remotePort)) {
        console.log('invalid remote port:', uri.query.port);
        return false;
    }
    return true;
}

/**
 * Client is upgrading to WebSocket.  Open a socket to the remote.
 */
function connectClient(client) {
    var uri = url.parse(client.upgradeReq.url, true);
    console.log('connect client', uri.query);

    // Connect to the remote
    let remoteHost = uri.query.host || 'localhost';
    let remotePort = parseInt(uri.query.port, 10);
    let remote = net.connect(remotePort, remoteHost);
    remote
        .on('data', data => { client.send(data.toString()); })
        .on('error', e => { console.log('remote error', e); client.close(4000, e.message); })
        .on('end', () => client.close(1000, 'remote closed the connection'));
    client
        .on('message', data => { remote.write(data); })
        .on('error', () => remote.end())
        .on('end', () => remote.end());
}

function Gateway(opts) {
    opts = opts || {};
    opts.verifyClient = verifyClient;

    let server = new WebSocketServer(opts);
    server.on('connection', connectClient);
}

module.exports = Gateway;
