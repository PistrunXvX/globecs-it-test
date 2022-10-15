const fs = require('fs');
const fastify = require('fastify')({ logger: true });
const path = require('path');

fastify.register(require('fastify-cors'), {});

fastify.register(require("point-of-view"), {
	engine: {
	  handlebars: require("handlebars"),
	},
  });

fastify.register(require('fastify-static'), {
	root: path.join(__dirname, 'public'),
	prefix: '/public/',
  });

fastify.get('/', async (request, reply) => {
	jsonArray = fs.readFileSync('./users.json', 'utf8');
	data = JSON.parse(jsonArray);
	console.log(data);
	reply.view("index.hbs", {data: data});
	// 	if (err) {
	// 		console.log('File read failed:', err);
	// 		return;
	// 	}
		
		// if(request.query.term)
		// {
		// 	const result = JSON.parse(data).filter((elem)=> elem.name.toLowerCase().search(request.query.term.toLowerCase()) !== -1);
		// 	reply.send("xui");
		// }
	// 	else
	// 	{
	// 		reply.send(data);
	// 	}

	// })
});

// fastify.get('/index', (request, reply) => {
// 	console.log(data);
// 	reply.view("index.hbs", {data: JSON.stringify(data)});
// });

const start = async () => {
  try {
    await fastify.listen(3001)
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
