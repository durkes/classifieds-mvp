import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export function sessionCreate(sessionData, req, res, callback) {
    res.cookie('isLoggedIn', 1);
    res.cookie('userEmail', sessionData.email || sessionData.username);

    const expiresIn = '30d'; // eg. 60s, 24h, 7d
    res.cookie('userToken', jwtSign(sessionData, { expiresIn: expiresIn }),
        {
            httpOnly: true,
            // secure: true, // true in production
        });

    callback(null, req, res);
}

export function sessionLogout(req, res, callback) {
    res.clearCookie('isLoggedIn');
    res.clearCookie('userEmail');
    res.clearCookie('userToken');
    callback(null, req, res);
}

export function sessionVerify(req, res, callback) {
    jwt.verify(req.cookies.userToken, secret, function (error, decoded) {
        if (error) {
            return sessionLogout(req, res, (_error, req, res) => {
                callback(error, req, res);
            });
        }

        req.sessionData = decoded;
        callback(null, req, res);
    });
}

const secret = crypto.randomBytes(64).toString('hex');
export function jwtSign(payload, options, callback) {
    const token = jwt.sign(payload, secret, options);

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