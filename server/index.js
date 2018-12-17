import express from 'express'

const app = express()

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('Hello world\n')
})

app.listen(PORT, HOST)

/* eslint-disable no-console */
console.log(`Running on http://${HOST}:${PORT}`)
/* eslint-enable no-console */

export default app
