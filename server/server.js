import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
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

    // proxy to dbms
    app.use('/_/', createProxyMiddleware({ target: dbmsTarget }));
    app.use('/api/', createProxyMiddleware({ target: dbmsTarget }));

    // oauth login
    app.get('/login/oauth/twitter', function (req, res) {
        const twitterUrl = 'https://twitter.com/i/oauth2/authorize?client_id=VjF4M1ZZWHU3UFZPWDVGNnFMa2o6MTpjaQ&code_challenge=GNgMBsSMsmRldL0vcu6kQHWblZjhefHnxeRyBxj5EH4&code_challenge_method=S256&response_type=code&scope=users.read+tweet.read&state=UMyn7TccCXM25deDg3SjmkhRKktR3d&redirect_uri=' + req.query.redirect_uri;
        res.redirect(twitterUrl);
    });
    app.get('/login/oauth/google', function (req, res) {
        const googleUrl = 'https://accounts.google.com/o/oauth2/auth?client_id=424900776121-kfnpvgahhjhu5373mm39p8po3knt5i2i.apps.googleusercontent.com&code_challenge=SOvsAZsdR_HvJhzJQMUtDs2dppfG3Be99-2Y2ohQy54&code_challenge_method=S256&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&state=XhnOUX421WQQN3Tb5PI091KHDiEKV2&redirect_uri=' + req.query.redirect_uri;
        res.redirect(googleUrl);
    });

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

    return app.listen(port);
}