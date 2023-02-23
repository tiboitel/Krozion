const TcpServer = require('../server')
const { host, port, useCompression } = require('../../config/config');

function start() {

	const tcpServer = new TcpServer(host, port, useCompression);

	// Start the TCP Server.
	tcpServer.listen();

	// TODO: Start the HTTP API.
}

module.exports = start;
