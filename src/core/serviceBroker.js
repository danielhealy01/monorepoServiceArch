import express from 'express'
import http from 'node:http'

const services = {}

export function start() {
  const app = express()
  const port = 3000

  // Add middleware to parse request body as JSON
  app.use(express.json())

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  // Route to show services active
  app.get('/services', (req, res) => {
    res.json(services)
  })

  // Register a service
  app.post('/register', (req, res) => {
    const { name, port, heartbeatUrl } = req.body
    registerService(name, port, heartbeatUrl)
    res.status(200).json({ message: `Service ${name} registered successfully` })
  })

  app.listen(port, () => {
    console.log(`Listening from app ${port}`)
  })

  console.log('service broker started')
}

export function registerService(name, port, heartbeatUrl) {
  services[name] = { port, heartbeatUrl, status: 'running' }
  console.log(
    `Service ${name} registered on port ${port} in the service broker`
  )
  console.log(
      `Service object holds...
      ${services.hasOwnProperties}`
  )
}
