// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const mercurius = require('mercurius')
const schema = require('./schema/schema')

fastify.register(mercurius, {
  schema,
  graphiql: true,
})

// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen(4000)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
