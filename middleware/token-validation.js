const crypto = require("crypto");

function decrypt(payload) {
    return crypto.privateDecrypt(
        {
            key: process.env.PRIVATE_KEY,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: process.env.CIPHER
        },
        payload
    );
}

module.exports = function validator(req, res, next) {
    const token = req.header('authorization');

    if (token === 'AbcDEfGh12345') {
        req.body = JSON.parse(decrypt(new Buffer(req.body.payload, 'base64')));
        next();
    } else {
        res.status(401);
        res.send('Unauthorized');
    }
}