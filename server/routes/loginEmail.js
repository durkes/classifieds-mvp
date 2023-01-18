import express from 'express';
import { pbAdmin, pbUser } from '../utils/dbms.js';
import { sessionCreate, sessionLogout } from '../utils/session-jwt.js';

const router = express.Router();
export default router;

router.get('/v1/logout', function (req, res, next) {
    sessionLogout(req, res, (error, req, res) => {
        res.json({});
    });
});

router.post('/v1/login/email', function (req, res, next) {
    // username/email will be the same for this app and referenced generally as username
    if (!req.body.username) {
        const error = {
            code: 400,
            message: 'Missing credentials'
        };

        return res.status(error.code).json({ error: error });
    }

    if (!req.body.password) {
        // logout in case existing session
        sessionLogout(req, res, (error, req, res) => {
            res.cookie('userEmail', req.body.username);

            getUserData(req.body.username, (error, userData) => {
                if (error) {
                    if (error.status === 404) {
                        return res.json({ found: false }); // prompt to create account
                    }

                    // unexpected error
                    return next(error);
                }

                // success
                res.json({ found: true }); // proceed to login
            });
        });
    }
    else {
        authWithPassword(req.body.username, req.body.password, (error, authData) => {
            if (error) {
                if (error.status === 400) {
                    return res.status(error.status).json({ error: error.data });
                }

                // unexpected error
                return next(error);
            }

            // success
            sessionCreate({ id: authData.record.id, username: authData.record.username, email: authData.record.email }, req, res, (error, req, res) => {
                res.json({});
            });
        });
    }
});

function getUserData(username, callback) {
    pbAdmin.collection('users').getFirstListItem(`(username='${username}' || email='${username}')`).then((userData) => {
        callback(null, userData);
    }).catch((error) => {
        callback(error, null);
    });
}

function authWithPassword(username, password, callback) {
    // must clear session with current app design to avoid linking OAuth to existing user session, user conflicts, etc.
    pbUser.authStore.clear();

    // username pararm can be username or email for authWithPassword
    pbUser.collection('users').authWithPassword(username, password).then((authData) => {
        callback(null, authData);
    }).catch((error) => {
        callback(error, null);
    });
}