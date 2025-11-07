import { createServer } from 'node:http'
import app from './app.mjs'

const port = process.env.PORT

const server = createServer(app)

server.listen(port)