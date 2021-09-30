const { ServiceBroker } = require("moleculer");
const ApiGateway = require("moleculer-web");

const { UnAuthorizedError, ERR_NO_TOKEN, ERR_INVALID_TOKEN } = require("./errors");

// Create a ServiceBroker
const broker = new ServiceBroker({
    transporter: "nats://localhost:4222"
});

// Load API Gateway
broker.createService({      
	name: "api",
	mixins: [ApiGateway],

	settings: {

		routes: [
			{
				// Enable authorization
				authorization: true
			}
		]
	},

	methods: {
		/**
		 * Authorize the user from request 
		 *
		 * @param {Context} ctx
		 * @param {Object} route
		 * @param {IncomingMessage} req
		 * @param {ServerResponse} res
		 * @returns
		 */
		authorize(ctx, route, req, res) {
			let auth = req.headers["authorization"];
			if (auth && auth.startsWith("Bearer ")) {
				let token = auth.slice(7);
				if (token == "123456") {
					// Set the authorized user entity to `ctx.meta`
					ctx.meta.user = { id: 1, name: "John Doe" };
					return Promise.resolve(ctx);

				} else
					return Promise.reject(new UnAuthorizedError(ERR_INVALID_TOKEN));

			} else
				return Promise.reject(new UnAuthorizedError(ERR_NO_TOKEN));
		}
	}
});

// Start server
broker.start();

// Test
// http://localhost:3000/service/action