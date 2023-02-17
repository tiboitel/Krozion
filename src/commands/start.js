const TcpServer = require('../server')
const { host, port } = require('../../config/config');

function start() {

	const tcpServer = new TcpServer(host, port);

	// Start the TCP Server.
	tcpServer.listen();

	// TODO: Start the HTTP API.
}

module.exports = start;
