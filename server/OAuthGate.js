import express from 'express';
import pb from './dbms.config.js';

const router = express.Router();
export default router;

router.post('/oauth/confirm', function (req, res, next) {
    if (req.body.state !== req.cookies.OAuthState) {
        const error = {
            code: 401,
            message: 'Invalid state parameter'
        };

        return res.status(error.code).json({ error: error });
    }

    pb.collection('users').authWithOAuth2(
        req.cookies.OAuthName,
        req.body.code,
        req.cookies.OAuthCodeVerifier,
        req.cookies.OAuthRedirectUri,

        // pass optional user create data
        {
            emailVisibility: false,
        }
    ).then((authData) => {
        console.log(authData);
        res.json({});
    }).catch((error) => {
        if (error.status === 400) {
            return res.status(error.status).json({ error: error.data });
        }

        next(error);
    });
});