const TcpServer = require('../server')
const { database } = require('../../config/config');

function restart() {

	const tcpServer = new TcpServer(database.host, database.port);

	// Start the TCP Server.
	tcpServer.listen();

	// TODO: Start the HTTP API.
}

module.exports = restart;
