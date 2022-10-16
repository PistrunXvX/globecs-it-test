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
	if(request.query.term) {
		data = JSON.parse(jsonArray).filter((elem)=> elem.name.toLowerCase().search(request.query.term.toLowerCase()) !== -1);
	} else {
		data = JSON.parse(jsonArray);
	}
	reply.view("index.hbs", {data: data});
});

const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
