import express from 'express';
import pb from '../utils/dbms.js';

const router = express.Router();
export default router;

router.post('/v1/user/create', function (req, res, next) {
    return res.json({});
});

router.put('/v1/user/update', function (req, res, next) {
    return res.json({});
});