import express from 'express'
import bodyParser from 'body-parser'

// Config sever
const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || 3000

const app = express()

// Recived data as json
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello world\n')
})

app.listen(PORT, HOST)

/* eslint-disable no-console */
console.log(`Running on http://${HOST}:${PORT}`)
/* eslint-enable no-console */

export default app
