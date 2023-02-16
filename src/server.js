const net = require('net');
const Logger = require('./logger');

class TCPServer {
  constructor(host, port) {
    this.logger = Logger;
    this.server = net.createServer();
    this.sockets = [];
    this.listen = this.listen.bind(this);
	this.host = host;
	this.port = port;
    this.onClientConnection = this.onClientConnection.bind(this);
    this.onClientDataReceived = this.onClientDataReceived.bind(this);
    this.onClientDisconnection = this.onClientDisconnection.bind(this);
    this.onClientError = this.onClientError.bind(this);
  }

  listen() {
    this.server.listen(this.port, this.host, () => {
      console.log("[Krozion] Start listening to %j", this.server.address());
    });

    // Set up callback on client connection.
    this.server.on('connection', this.onClientConnection);
    this.server.on('error', this.onClientError);
  }

  onClientConnection(socket) {
    const remote = `${socket.remoteAddress}:${socket.remotePort}`;
    console.log("[Krozion] New client connection from %s", remote);

    // Keep a reference on the current client socket
    this.sockets.push(socket);

    // Set up events.
    socket.on('data', this.onClientDataReceived);
    socket.on('close', this.onClientDisconnection);
    socket.on('error', this.onClientError);
  }

  onClientDataReceived(data) {
    // Todo: call a proper data handler. This is just for test purpose.
    let severity;
    let message;

    severity = data.split(':')[0];
    message = data.split(':')[1];

    const remote = `${this.socket.remoteAddress} / ${this.socket.remotePort}`;
    console.log("[RCV](%s) <%s>:<%s>", remote, severity, message);
  }

  onClientDisconnection(data) {
    const index = this.sockets.findIndex((curr) => {
      return curr.remoteAddress === this.socket.remoteAddress &&
        curr.remotePort === this.socket.remotePort;
    });

    // Remove reference of the client on sockets array.
    if (index !== -1) {
      this.sockets.splice(index, 1);
    }

    console.log("[Krozion] Disconnection of client: %s:%s",
      this.socket.remoteAddress, this.socket.remotePort);
  }

  onClientError(error) {
    console.log("[ERROR]: %s", error);
  }
}

module.exports = TCPServer;
