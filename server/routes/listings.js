import express from 'express';
import { pbAdmin } from '../utils/dbms.js';

const router = express.Router();
export default router;

router.post('/listings', function (req, res, next) {
    getListings(null, (error, records) => {
        if (error) {
            // unexpected error
            return next(error);
        }
        res.json(records);
    });
});

router.post('/listings/mine', function (req, res, next) {
    if (!req.sessionData.id) {
        const error = {
            code: 401,
            message: 'Unauthorized'
        };

        return res.status(error.code).json({ error: error });
    }

    getListings(`uid='${req.sessionData.id}'`, (error, records) => {
        if (error) {
            return next(error);
        }
        res.json(records);
    });
});

function getListings(filter, callback) {
    const page = 1, perPage = 100;
    pbAdmin.collection('listings').getList(page, perPage, {
        filter: filter
    }).then((records) => {
        callback(null, records);
    }).catch((error) => {
        callback(error, null);
    });
}