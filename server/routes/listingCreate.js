import express from 'express';
import { pbAdmin } from '../utils/dbms.js';

const router = express.Router();
export default router;

router.post('/listings/create', function (req, res, next) {
    res.json({
        sessionData: req.sessionData,
        body: req.body
    });
});

function getUserData(username, callback) {
    pbAdmin.collection('users').getFirstListItem(`(username='${username}' || email='${username}')`).then((userData) => {
        callback(null, userData);
    }).catch((error) => {
        callback(error, null);
    });
}