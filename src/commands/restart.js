const TcpServer = require('../server')
const { database } = require('../../config/config');

function restart() {

	const tcpServer = new TcpServer(database.host, database.port);

	// TODO: Restart the TCP server.
}

module.exports = restart;
