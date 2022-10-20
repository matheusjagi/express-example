const express = require('express');
const crypto = require("crypto");
const tokenValidation = require("../middleware/token-validation.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(tokenValidation);

const CRYPTOGRAPHY_DATA = {
    cipher : "sha256",
    publicKey : "-----BEGIN RSA PUBLIC KEY-----\n" +
        "MIIBCgKCAQEA0YYYL/2t+zapxiUbpHa7B9RlhamxlhkdoY0/cJBUKDMi0043UqQf\n" +
        "THEmusocuhpS5kL1AJzeZ1qananEcMqJ+nGv2kZGKGxtaYXNPWERZCt/B7kqlcMQ\n" +
        "p7tkHLnYWoip+vlz5j5qucI/RnNjma/PPe4RKzRZJbpc3J2NIQF/9zBoUlePKJW+\n" +
        "1RO+cQmVt6oMNL8Bq5bFJrY1/uhk0T291MAosfC2yMwUcCFacE2KuKX5u16GNe7z\n" +
        "NBOqnj3SsELuu3xEP9ZnCyS/hy+hQ4z6/tiOB4Afm3EHZ+iavQZYhHlvBtCRxH7z\n" +
        "1znkzsnw9zxEVWwcZpwASR3Kk/Xj7A7VawIDAQAB\n" +
        "-----END RSA PUBLIC KEY-----"
};

app.post('/public-key', function (req, res) {
    const json = req.body;
    res.status(200).send(encrypt(JSON.stringify(json)));
});

function encrypt(payload) {
    return crypto.publicEncrypt({
            key: CRYPTOGRAPHY_DATA.publicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: CRYPTOGRAPHY_DATA.cipher
        },
        Buffer.from(payload)
    ).toString('base64');
}

app.listen(3002, function () {
    console.log('Microsserviço iniciado na porta 3002');
});