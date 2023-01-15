import express from 'express';
import pb from './dbms.config.js';

const router = express.Router();
export default router;

router.get('/oauth/twitter', function (req, res, next) {
    const providerName = 'twitter';
    resOAuthRoute(providerName, req, res, next);
});

router.get('/oauth/google', function (req, res, next) {
    const providerName = 'google';
    resOAuthRoute(providerName, req, res, next);
});

function resOAuthRoute(providerName, req, res, next) {
    getAuthProvider(providerName, (error, provider) => {
        if (error) {
            return next(error);
        }

        res.cookie('OAuthName', provider.name);
        res.cookie('OAuthState', provider.state);
        res.cookie('OAuthCodeVerifier', provider.codeVerifier);
        res.cookie('OAuthRedirectUri', req.query.redirect_uri);

        res.redirect(provider.authUrl + req.query.redirect_uri);
    });
}

function getAuthProvider(providerName, callback) {
    pb.collection('users').listAuthMethods().then((authMethods) => {
        let provider;

        for (const _provider of authMethods.authProviders) {
            if (_provider.name === providerName) {
                provider = _provider;
                break;
            }
        }

        callback(null, provider);
    }).catch((error) => {
        callback(error, null);
    });
}