function exit() {
	// Todo: stop the TCP and HTTP service properly.
	// close the standard input.

	process.exit(1);
}

module.exports = exit;
