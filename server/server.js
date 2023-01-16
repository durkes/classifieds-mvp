import express from 'express';
import cookieParser from 'cookie-parser';
import { createProxyMiddleware } from 'http-proxy-middleware';
import OAuthReq from './OAuthReq.js';
import OAuthGate from './OAuthGate.js';
import authGate from './authGate.js';
import userCRUD from './userCRUD.js';

import path from 'path';
// path __dirname for module scope: https://stackoverflow.com/a/72462507
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const staticDir = '../dist'; // relative path
const custom404 = staticDir + '/404.html';
const port = 80;
const dbmsTarget = 'http://127.0.0.1:8090';

export default function server() {
    // https://expressjs.com/en/starter/basic-routing.html
    const app = express();

    // proxy to dbms (can be excluded in production with current app design)
    app.use(['/_/', '/api/'], createProxyMiddleware({ target: dbmsTarget }));

    // middleware
    app.use(cookieParser());
    app.use(express.json()); // parse incoming POST JSON data

    // route imports
    app.use([OAuthReq, OAuthGate]);
    app.use([authGate, userCRUD]);

    // serve static files
    app.use('/', express.static(path.join(__dirname, staticDir)));

    // react route prefixes
    app.get(['/listings/*', '/user/*'], function (req, res) {
        res.sendFile(path.join(__dirname, staticDir, '/index.html'));
    });

    app.get('/500', function (req, res) {
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

    app.listen(port, () => {
        console.log(`Server running at http://127.0.0.1:${port}/`);
    });
}