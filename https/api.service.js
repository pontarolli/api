const { ServiceBroker } = require("moleculer");
const ApiGateway        = require("moleculer-web");
const fs                = require("fs");


// Create a ServiceBroker
const broker = new ServiceBroker({
    transporter: "nats://localhost:4222"
});

// Load API Gateway
broker.createService({      
	name: "api",
	mixins: [ApiGateway],

	settings: {
		
		// HTTPS server with certificate
		// To generate the key and certificate I used openssl with the following command in prompt command
		// openssl req -newkey rsa:2048 -nodes -keyout key.pem -x509 -days 365 -out certificate.pem                                     
		https: {
			key: fs.readFileSync("ssl/key.pem"),
			cert: fs.readFileSync("ssl/certificate.pem")
		},
	}
});

// Start server
broker.start();

// Test
// http://localhost:3000/service/action