import express from 'express';
import { sessionVerify } from '../utils/session-jwt.js';

const router = express.Router();
export default router;

// confirm credentials from provider
router.use(function (req, res, next) {
    sessionVerify(req, res, (error, req, res) => {
        if (error) {
            const _error = {
                code: 401,
                message: 'Unauthorized'
            };

            return res.status(_error.code).json({ error: _error });
        }

        // ok, continue
        next();
    });
});