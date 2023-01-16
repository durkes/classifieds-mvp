import express from 'express';
import pb from '../utils/dbms.js';

const router = express.Router();
export default router;

router.post('/v1/login/email', function (req, res, next) {
    if (!req.body.username) {
        const error = {
            code: 400,
            message: 'Missing credentials'
        };

        return res.status(error.code).json({ error: error });
    }
    if (!req.body.password) {
        // check if user exists
        return res.json({ found: true }); // proceed to login
        return res.json({ found: false }); // prompt to create account
    }
});