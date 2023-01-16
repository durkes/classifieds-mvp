import express from 'express';
import pb from './dbms.config.js';

const router = express.Router();
export default router;

router.post('/auth/create', function (req, res, next) {
    return res.json({});
});

router.post('/auth/update', function (req, res, next) {
    return res.json({});
});