import express from 'express';
import { pbUser } from '../utils/dbms.js';
import loginOAuthReq from './loginOAuthReq.js';
import { sessionCreate } from '../utils/session-jwt.js';

const router = express.Router();
export default router;

router.use(loginOAuthReq); // set state and get codeVerifier; redirect to provider login

// confirm credentials from provider
router.post('/v1/login/oauth', function (req, res, next) {
    if (req.body.state !== req.cookies.OAuthState) {
        const error = {
            code: 401,
            message: 'Invalid state parameter'
        };

        return res.status(error.code).json({ error: error });
    }

    pbUser.collection('users').authWithOAuth2(
        req.cookies.OAuthName,
        req.body.code,
        req.cookies.OAuthCodeVerifier,
        req.cookies.OAuthRedirectUri,

        // pass optional user create data
        {
            emailVisibility: false,
        }
    ).then((authData) => {
        // success
        sessionCreate({ username: authData.record.username, email: authData.record.email }, res, (error, res) => {
            // clean up cookies
            res.clearCookie('OAuthName');
            res.clearCookie('OAuthState');
            res.clearCookie('OAuthCodeVerifier');
            res.clearCookie('OAuthRedirectUri');

            res.json({});
        });
    }).catch((error) => {
        if (error.status === 400) {
            return res.status(error.status).json({ error: error.data });
        }

        // unsexpected error
        next(error);
    });
});