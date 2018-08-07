const Express = require('./index')
const app = new Express({port: 8000})
const router = new Express.Router()

router.get('/', (req, res) => ({hello: 'world'}))
router.get('/users(/:id)', ({params, query, method}, res) => ({id: params.id, query, method}))
router.delete('/users(/:id)', ({params, query, method}, res) => ({id: params.id, query, method}))
router.set404((req, res) => ({status: 404}))

app.setRouter(router)

app
  .listen()
  .then(() => console.info(`Server listening on port ${app.port}`))
  .catch(console.error)