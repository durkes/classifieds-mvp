import express from 'express';
import { pbAdmin } from '../utils/dbms.js';

const router = express.Router();
export default router;

router.post('/listings', function (req, res, next) {
    const filter = null;
    const sort = req.body.sort || null;

    getListings({ sort: sort, filter: filter }, (error, records) => {
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

function getListings(params, callback) {
    params = params || {};

    const page = 1, perPage = 100;
    pbAdmin.collection('listings').getList(page, perPage, params).then((records) => {
        callback(null, records);
    }).catch((error) => {
        callback(error, null);
    });
}