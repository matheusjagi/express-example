const express = require('express')
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded());

const tokenValidation = require("../middleware/token-validation.js");
app.use(tokenValidation);

app.post('/test', function (req, res) {
    res.status(200).send(req.body);
});

app.listen(3001, function () {
    console.log('Microsserviço iniciado na porta 3001');
});