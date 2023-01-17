import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export const secret = crypto.randomBytes(64).toString('hex');
export default jwt;

export function jwtSign(payload, callback) {
    const expiresIn = '30d'; // eg. 60s, 24h, 7d
    const token = jwt.sign(payload, secret, { expiresIn: expiresIn });

    if (callback) {
        return callback(null, token);
    }
    return token;
}

export function jwtVerify(token, callback) {
    jwt.verify(token, secret, function (error, decoded) {
        callback(error, decoded);
    });
}