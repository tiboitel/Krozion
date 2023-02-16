const TcpServer = require('../server')
const { host, port } = require('../../config/config');

function start() {
	// Start the TCP Server.
	const tcpServer = new TcpServer(host, port);
	tcpServer.listen();

	// TODO: Start the HTTP API.
}

module.exports = start;
