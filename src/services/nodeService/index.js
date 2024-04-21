import express from 'express'
import fetch from 'node-fetch'

const app = express()
const port = 3001 // Default port or assigned by the service registry

// Middleware
app.use(express.json())

// Hello, World! route
app.get('/hello', (req, res) => {
  try {
    res.json({ message: 'Hello, World!' })
  } catch (err) {
    console.error('Error in /hello route:', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Heartbeat route
app.get('/heartbeat', (req, res) => {
  try {
    res.status(200).json({ status: 'ok' })
  } catch (err) {
    console.error('Error in /heartbeat route:', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Register the service with the service broker
fetch('http://localhost:3000/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'nodejs-service',
    port,
    heartbeatUrl: `http://localhost:${port}/heartbeat`,
  }),
})
  .then((response) => {
    if (response.ok) {
      console.log('Node.js microservice registered with the service broker')
    } else {
      console.error(
        'Failed to register Node.js microservice with the service broker'
      )
    }
  })
  .catch((error) => {
    console.error(
      'Error registering Node.js microservice with the service broker:',
      error
    )
  })

// Start the Express server
app.listen(port, () => {
  console.log(`Node.js service listening on port ${port}`)
})
