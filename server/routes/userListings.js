import express from 'express';
import { pbAdmin } from '../utils/dbms.js';

const router = express.Router();
export default router;

router.post('/listings/mine', function (req, res, next) {
    pbAdmin.collection('listings').getList(1, 100, { uid: req.sessionData.id }).then((records) => {
        res.json(records);
    }).catch((error) => {
        res.status(error.status).json({ error: error.data });
    });
});