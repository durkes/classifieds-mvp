import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
// path __dirname for module scope: https://stackoverflow.com/a/72462507
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const staticDir = 'dist'; // relative path
const custom404 = staticDir + '/404.html';
const port = 80;
const app = express();

// https://expressjs.com/en/starter/basic-routing.html

// proxy to dbms
const dbmsTarget = 'http://127.0.0.1:8090';
app.use('/_/', createProxyMiddleware({ target: dbmsTarget }));
app.use('/api/', createProxyMiddleware({ target: dbmsTarget }));

app.use('/', express.static(path.join(__dirname, staticDir)));

app.use('/500', function (req, res) {
    const error = new Error('forced error for testing');
    throw error;
});

// custom 404
app.use(function (req, res) {
    res.status(404);
    res.sendFile(path.join(__dirname, custom404));
});

// custom 500
app.use(function (error, req, res, next) {
    res.status(500);
    res.send('500: Internal Server Error');

    console.error(error); // debug
});

app.listen(port);