import express from 'express';
import bodyParser from 'body-parser';
import main from './main';

// Config sever
const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 5000;

const app = express();

// Recived data as json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

// API calls
app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

app.post('/api/tfidf', (req, res) => {
    res.send(main(req.body.form));
});

app.listen(PORT, HOST);

/* eslint-disable no-console */
console.log(`Running on http://${HOST}:${PORT}`);
/* eslint-enable no-console */

export default app;
