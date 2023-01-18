import express from 'express';
import { sessionVerify } from '../utils/session-jwt.js';

export const sessionData = express.Router();
export const sessionGate = express.Router();

// confirm credentials from provider
sessionData.use(function (req, res, next) {
    sessionVerify(req, res, (error, req, res) => {
        // req.sessionData attached
        next();
    });
});

sessionGate.use(function (req, res, next) {
    if (!req.sessionData.id) {
        const error = {
            code: 401,
            message: 'Unauthorized'
        };

        return res.status(error.code).json({ error: error });
    }

    // ok, continue
    next();
});