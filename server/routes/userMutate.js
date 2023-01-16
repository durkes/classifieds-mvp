import express from 'express';
import pb from '../utils/dbms.js';

const router = express.Router();
export default router;

router.post('/v1/user/create', function (req, res, next) {
    createUser(req.body.username, req.body.password, (error, response) => {
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

    pb.collection('users').create(data).then((response) => {
        callback(null, response);
    }).catch((error) => {
        callback(error, null);
    });
}