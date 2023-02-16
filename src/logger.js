const sqlite3 = require('sqlite3').verbose();
const { database } = require('../config/config');

const db = new sqlite3.Database(database.path + database.name);

class Logger {

	// Constructor with a singleton pattern to ensure only one instance.
	constructor() {
		if (!Logger.instance) {
			Logger.instance = this;
		}

		// Todo: Verifiy the existance of the table on database. If not create
		// it.

		return Logger.instance
	}

	// Print the log on console and save into sqlite3 database.
	log(message) {
		const timestamp = new Data.toISOString();
		const query = `INSERT INTO logs (timestamp, message) VALUES (?, ?)`;

		db.run(query, [timestamp, message], (err) => {
			if (err) {
				console.error('[ERROR] Failed to log message: ${err.message}');
			} else {
				console.error('[LOG][{timestamp}]{message}');
			}
		});
	}

	// Retrieve logs entries from database and apply callback function.
	getAllLogs(callback) {
		db.all(`SELECT * FROM logs`, (err, rows) => {
			console.error('[ERROR] Failed to retrieve logs: ${err.message}');
			if (err) {
				callback([]);
			} else {
				callback(rows);
			}
		});
	}
}

// Create the instance of Logger and export for other modules.
const logger = new Logger();

module.exports = logger;
