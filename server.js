process.title = 'marko-fastify' // To enable 'npm stop' and 'npm restart'. See scripts.stop in package.json
const path = require('path')
const fastify = require('fastify')()
fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'static'),
  prefix: '/static/'
})
fastify.register(require('point-of-view'), {
  engine: {
    marko: require('marko')
  }
})
require('lasso').configure({
  plugins: [
    "lasso-marko"
  ]
})

fastify.get('/', (req, reply) => {
  reply.view('/index.marko', {
    name: 'Frank',
    count: 30,
    colors: ['red', 'green', 'blue']
  })
})

fastify.listen(8080, err => {
  if (err) throw err
  console.log(`Server listening on ${fastify.server.address().port}`)
})
