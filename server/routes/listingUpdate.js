import express from 'express';
import { pbAdmin } from '../utils/dbms.js';

const router = express.Router();
export default router;

router.post('/listings/update', function (req, res, next) {
    const data = {
        uid: req.sessionData.id,
        year: req.body.year,
        mileage: req.body.mileage,
        price: req.body.price,
        type: req.body.type,
        headline: req.body.headline,
        description: req.body.description
    };

    // TODO: first make sure that user owns this record
    pbAdmin.collection('listings').update(req.body.id, data).then((record) => {
        res.json({ id: record.id });
    }).catch((error) => {
        res.status(error.status).json({ error: error.data });
    });
});