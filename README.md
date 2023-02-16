## Krozion

Krozion is a simple yet professional Node.js TCP server that receives log messages from external applications and accepts command-line commands. It is designed to be fast, reliable, and easy to use.

# Features

    - Receives log messages over a TCP connection
    - Stores log messages in an SQLite database
    - Provides a simple API for sending log messages
    - Accepts command-line commands for starting, stopping, and restarting the server
    - Customizable configuration settings
    - Documented and tested codebase

# Usage

To use Krozion, first clone the repository and install the dependencies:

`git clone https://github.com/<username>/krozion.git
cd krozion
npm install`

Next, create a configuration file by copying the example config file:

`cp config/config.example.js config/config.js`

Edit the config.js file to customize the settings, such as the port number and log file location.

To start the server, run the following command:

`npm start`

To send a log message to the server, use a TCP client to connect to the server and send the message in the following format:

`<severity>:<message>`

For example:

`error:Something went wrong!`

To stop the server, use the following command:

`npm run stop`

To restart the server, use the following command:

`npm run restart`

For more information on the available command-line commands, see the Commands section below.
API

Krozion provides a simple API for sending log messages to the server. The API endpoints are as follows:

    POST /log - Send a log message in the following JSON format:

    json

    {
        "severity": "info",
        "message": "Something happened"
    }

    The severity field can be one of debug, info, warn, or error.

# Commands

Krozion provides the following command-line commands:

    `npm start - Start the server
    npm run stop - Stop the server
    npm run restart - Restart the server`

# Contributing

Contributions are welcome! To contribute to Krozion, please follow these steps:

    Fork the repository
    Create a new branch for your changes
    Make your changes and commit them
    Push your changes to your forked repository
    Submit a pull request

# License

Krozion is licensed under the MIT license. See the LICENSE file for more details.

Thank you for using Krozion! If you have any issues or suggestions, please submit an issue or pull request.
