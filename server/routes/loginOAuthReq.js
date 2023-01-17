import express from 'express';
import { pbUser } from '../utils/dbms.js';

const router = express.Router();
export default router;

router.get('/v1/login/oauth/twitter', function (req, res, next) {
    const providerName = 'twitter';
    resOAuthReq(providerName, req, res, next);
});

router.get('/v1/login/oauth/google', function (req, res, next) {
    const providerName = 'google';
    resOAuthReq(providerName, req, res, next);
});

function resOAuthReq(providerName, req, res, next) {
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
    pbUser.collection('users').listAuthMethods().then((authMethods) => {
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