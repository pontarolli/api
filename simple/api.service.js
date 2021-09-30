const { ServiceBroker } = require("moleculer");
const ApiGateway        = require("moleculer-web");

const broker = new ServiceBroker({transporter: "nats://localhost:4222"});

broker.createService({      
	name: "api",
	mixins: [ApiGateway],
});

broker.start();

// Test
// http://localhost:3000/service/action
// http://localhost:3000/greeter/hello