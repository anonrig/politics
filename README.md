Politics for node.js
===

Without the hassle, without the politics, let's just return json.

Usage
===

```javascript
const Politics = require('politics')
const app = new Politics({port: 8000})
const router = new Politics.Router()

router.get('/', (req, res) => ({hello: 'world'}))
router.get('/users(/:id)', ({params, query, method}, res) => ({id: params.id, query, method}))
router.delete('/users(/:id)', ({params, query, method}, res) => ({id: params.id, query, method}))
router.set404((req, res) => ({status: 404}))

app.setRouter(router)

app
  .listen()
  .then(() => console.info(`Server listening on port ${app.port}`))
  .catch(console.error)
```
