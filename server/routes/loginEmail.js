import express from 'express';
import pb from '../utils/dbms.js';

const router = express.Router();
export default router;

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
            res.json({});
        });
    }
});

function getUserData(username, callback) {
    pb.collection('users').getFirstListItem(`(username='${username}' || email='${username}')`).then((userData) => {
        callback(null, userData);
    }).catch((error) => {
        callback(error, null);
    });
}

function authWithPassword(username, password, callback) {
    // username pararm can be username or email for authWithPassword
    pb.collection('users').authWithPassword(username, password).then((authData) => {
        callback(null, authData);
    }).catch((error) => {
        callback(error, null);
    });
}