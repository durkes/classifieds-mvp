import express from 'express';
import { pbAdmin } from '../utils/dbms.js';

const router = express.Router();
export default router;

router.post('/listings/delete', function (req, res, next) {
    // TODO: need to first confirm that this user owns this listing
    pbAdmin.collection('listings').delete(req.body.id).then(() => {
        res.json({});
    }).catch((error) => {
        res.status(error.status).json({ error: error.data });
    });
});