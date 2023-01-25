import express from 'express';
import { pbAdmin } from '../utils/dbms.js';

const router = express.Router();
export default router;

router.post('/listings/delete', function (req, res, next) {
    verifyRecordOwner({ id: req.body.id, uid: req.sessionData.id }, (error, isOwner) => {
        if (error) {
            // unexpected error
            return next(error);
        }

        if (!isOwner) {
            const error = {
                code: 404,
                message: 'Not Found'
            };

            return res.status(error.code).json({ error: error });
        }

        pbAdmin.collection('listings').delete(req.body.id).then(() => {
            res.json({});
        }).catch((error) => {
            res.status(error.status).json({ error: error.data });
        });
    });
});

router.post('/listings/update', function (req, res, next) {
    verifyRecordOwner({ id: req.body.id, uid: req.sessionData.id }, (error, isOwner) => {
        if (error) {
            // unexpected error
            return next(error);
        }

        if (!isOwner) {
            const error = {
                code: 404,
                message: 'Not Found'
            };

            return res.status(error.code).json({ error: error });
        }

        const data = {
            // uid: req.sessionData.id, // no need to pass unchanged fields
            year: req.body.year,
            mileage: req.body.mileage,
            price: req.body.price,
            type: req.body.type,
            headline: req.body.headline,
            description: req.body.description
        };

        pbAdmin.collection('listings').update(req.body.id, data).then((record) => {
            res.json({ id: record.id });
        }).catch((error) => {
            res.status(error.status).json({ error: error.data });
        });
    });
});


function verifyRecordOwner({ id, uid }, callback) {
    const filter = `(id='${id}' && uid='${uid}')`;

    pbAdmin.collection('listings').getFirstListItem(filter).then((record) => {
        callback(null, true);
    }).catch((error) => {
        if (error.status === 404) {
            return callback(null, false);
        }

        // unexpected error
        callback(error, null);
    });
}