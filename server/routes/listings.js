import express from 'express';
import { pbAdmin } from '../utils/dbms.js';

const router = express.Router();
export default router;

router.post('/listings', function (req, res, next) {
    const sort = req.body.sort || null;
    let types = [], filters = [];

    if (req.body.car) {
        types.push('type = "Car"');
    }
    if (req.body.truck) {
        types.push('type = "Truck"');
    }
    if (req.body.suv) {
        types.push('type = "SUV"');
    }
    if (req.body.other) {
        types.push('type = "Other"');
    }
    if (types.length) {
        filters.push('(' + types.join(' || ') + ')');
    }

    ['yearMin', 'yearMax', 'mileageMin', 'mileageMax', 'priceMin', 'priceMax'].forEach(param => {
        if (!req.body[param]) {
            return;
        }

        const paramLength = param.length;
        const field = param.substring(0, paramLength - 3);
        const operator = param.substring(paramLength - 3) === 'Min' ? ' >= ' : ' <= ';

        filters.push(field + operator + req.body[param]);
    });

    const filter = filters.join(' && ');
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

    getListings({ filter: `uid='${req.sessionData.id}'` }, (error, records) => {
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