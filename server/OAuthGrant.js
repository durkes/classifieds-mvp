import express from 'express';
import pb from './dbms.config.js';

const router = express.Router();
export default router;

router.post('/oauth/confirm', function (req, res, next) {
    res.json(req.body);
});