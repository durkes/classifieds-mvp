import express from 'express';
import { sessionVerify } from '../utils/session-jwt.js';

const router = express.Router();
export default router;

// confirm credentials from provider
router.use(function (req, res, next) {
    sessionVerify(req, res, (error, req, res) => {
        if (error) {
            res.status(401);
            return res.json({});
        }

        // ok, continue
        next();
    });
});