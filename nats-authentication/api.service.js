const { ServiceBroker } = require("moleculer");
const ApiGateway = require("moleculer-web");

// Create a ServiceBroker
const broker = new ServiceBroker({
    transporter: {
		type: 'NATS',
		options: {
			url: "nats://localhost:4222",
			user: 'admin',
			pass: '1234'
		}
	}	
});

// Load API Gateway
broker.createService({      
	name: "api",
	mixins: [ApiGateway],
});

// Start server
broker.start();

// Test
// http://localhost:3000/service/action