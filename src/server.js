const net = require('net');
const zlib = require('zlib');
const Logger = require('./logger');

class TCPServer {
    constructor(host, port, useCompression) {
        this.logger = Logger;
        this.server = net.createServer();
        this.sockets = [];
        this.host = host;
        this.port = port;
        this.useCompression = useCompression;
        this.onClientDataReceived = this.onClientDataReceived.bind(this);

        console.log(`[INFO] UseCompression: ${this.useCompression}"`);
        // Callback on client connecting to the server.
        this.server.on('connection', (socket) => {
                const remote = `${socket.remoteAddress}:${socket.remotePort}`;
                console.log("[INFO] New client connection from %s", remote);

                // Set the mode to string encoded in UTF-8. Could be change on
                // // configuration file.
                socket.setEncoding('utf-8');

                // Keep a reference on the current client socket
                this.sockets.push(socket);

                // Set up socket events callbacks.
                // Callback on data received from client event.
                socket.on('data', this.onClientDataReceived);

                // Callback on socket close event.
                socket.on('close', () => {
                        const index = this.sockets.indexOf(socket);
                        if (index > -1) {
                        console.log("[INFO] Disconnection of client: %s:%s",
                                socket.remoteAddress, socket.remotePort);
                        // Client socket destruction.
                        socket.destroy();
                        // Remove reference of the client on sockets array.
                        this.sockets.splice(index, 1);
                        }
                        });

                // Callback on client socket error.
                socket.on('error', this.onError);
        });

        // Callback on server error.
        this.server.on('error', this.onError);
    }

    // Start the listening for incoming clients connections.
    listen() {
        this.server.listen(this.port, this.host, () => {
                console.log("[INFO] Start listening to %j", this.server.address());
                });
    }

    // Function callback when data is received on client socket.
    onClientDataReceived(data) {
        const compressionMode = this.useCompression ? 'zlib' : 'none';
        let processedData = data;

        if (compressionMode === 'zlib') {
            const buffer = Buffer.from(data, ('utf-8'));

            zlib.gunzip(buffer, (err, result) => {
                    if (err) {
                    console.error(`[ERROR] Error decompressing data: ${err}`);
                    return ;
                    }

                    const decompressedData = result.toString('utf-8');

                    processedData = decompressedData;
                    // Todo: call a proper data handler. This is just for test purpose.
                    });
        }

        const severity = processedData.split(':')[0];
        const message = processedData.split(':')[1];

        console.log("[RCV] <%s>:<%s>", severity, message);

        //Todo: Store data in database.

    }

    onError(error) {
        console.log("[ERROR]: %s", error);

        // Todo: Write the error on a log file.
    }
}

module.exports = TCPServer;
