import express from 'express';
import { pbAdmin } from '../utils/dbms.js';
import { sessionCreate } from '../utils/session-jwt.js';

const router = express.Router();
export default router;

router.post('/v1/user/create', function (req, res, next) {
    createUser(req.body.username, req.body.password, (error, record) => {
        if (error) {
            if (error.status === 400) {
                return res.status(error.status).json({ error: error.data });
            }

            // unexpected error
            return next(error);
        }

        // success
        sessionCreate({ username: record.username, email: record.email }, res, (error, res) => {
            res.json({});
        });
    });
});

router.put('/v1/user/update', function (req, res, next) {
    return res.json({});
});

function createUser(username, password, callback) {
    const data = {
        // username: username,
        email: username,
        emailVisibility: false,
        password: password,
        passwordConfirm: password
    };

    pbAdmin.collection('users').create(data).then((record) => {
        callback(null, record);
    }).catch((error) => {
        callback(error, null);
    });
}