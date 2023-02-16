const readline = require('readline');
const commands = {
  start: require('./commands/start'),
  stop: require('./commands/stop'),
  restart: require('./commands/restart'),
  exit: require('./commands/exit')
};

// Create the read line interface.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

// Welcome message on program startup.
console.log('[Krozion] Welcome on Krozion ! Use a command like:\r\n\r\n' +
'start : start listening on TCP.\r\n' +
'stop : stop the server from running.\r\n' +
'restart : restart the current server process.\r\n' +
'exit : close the program.\r\n\r\n' +
'Enjoy your ride with us ! :)\r\n' +
'>');

// For each line on standard input
rl.on('line', (line) => {
  const command = line.trim();
  // Check if the command exist
  if (command in commands) {
	if (command === 'exit') {
		rl.close();
	}
    commands[command]();
  } else {
    console.error(`Unknown command: ${command}`);
  }
});
