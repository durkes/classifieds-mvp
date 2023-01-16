import express from 'express';
import pb from './dbms.config.js';

const router = express.Router();
export default router;

router.post('/auth/login', function (req, res, next) {
    if (!req.body.username) {
        const error = {
            code: 400,
            message: 'Missing credentials'
        };

        return res.status(error.code).json({ error: error });
    }
    if (!req.body.password) {
        // if user exists, request password
        // if new user, new account form
        const error = {
            code: 400,
            message: 'No user specified'
        };

        return res.status(error.code).json({ error: error });
    }

    return res.json({});
});