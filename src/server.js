const net = require('net')
const {host, port} = require('../config/config')

const server = net.createServer()

let sockets = [];

// Listen on host:port
server.listen(host, port, () => {
	console.log("[Krozion] Start listening to %j", server.address())
})

// Set up callback on client connection.
server.on('connection', onClientConnection)
server.on('error', (err) => { console.log("[Krozion] Unable to start the TCP"
	+ "server.\r\n" + err)})

// Callback on client connection.
function onClientConnection(socket) {
	let remote

	remote = socket.remoteAddress + ":" + socket.remotePort
	console.log("[Krozion] New client connection from %s", remote);

	// Keep a reference on the current client socket
	sockets.push(socket)

	// Set up events.
	socket.on('data', onClientDataReceived)
	socket.on('close', onClientDisconnection)
	socket.on('error', onClientError)
}

// When data is received from client event handler.
function onClientDataReceived(data) {
	// Todo: call a proper data handler. This is just for test purpose.
	let severity
	let message

	severity = data.split(':')[0]
	message = data.split(':')[1]

	console.log("[RCV](" + socket.remoteAddress + " / " +
		socket.remotePort +") <" + severity + ">:<" + message + ">")
}

// When client disconnect event handler.
function onClientDisconnection(data) {
	let index

	// Found the index of the disconnected client.
	index = sockets.findIndex(function(curr) {
		return curr.remoteAddress === socket.remoteAddress &&
			curr.remotePort === socket.remotePort
	})

	// Remove reference of the client on sockets array.
	if (index !== -1)
		sockets.splice(index, 1)

	console.log("[Krozion] Disconnection of client: " + socket.remoteAddress +
		":" + socket.remotePort)
}

function onClientError(error) {
	console.log("[ERROR] : " + error)
}
