import express from 'express';
import { pbAdmin } from '../utils/dbms.js';

const router = express.Router();
export default router;

router.post('/listings/item', function (req, res, next) {
    pbAdmin.collection('listings').getOne(req.body.id).then((record) => {
        const itemData = {
            id: record.id,
            year: record.year,
            mileage: record.mileage,
            price: record.price,
            type: record.type,
            headline: record.headline,
            description: record.description,
            images: record.images
        };

        if (record.uid === req?.sessionData?.id) {
            itemData.isOwner = true;
        }
        // TODO check if favorite
        // itemData.isFavorite = true;

        res.json(itemData);
    }).catch((error) => {
        res.status(error.status).json({ error: error.data });
    });
});