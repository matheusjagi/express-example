// Including generateKeyPair from crypto module
const { generateKeyPair } = require('crypto');

// Calling generateKeyPair() method
// with its parameters
generateKeyPair('rsa', {
    modulusLength: 2048,    // options
    publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem'
    }
}, (err, publicKey, privateKey) => { // Callback function
    if(!err)
    {
        // Prints new asymmetric key pair
        console.log("Public Key is : ", publicKey);
        console.log();
        console.log("Private Key is: ", privateKey);
    }
    else
    {
        // Prints error
        console.log("Errr is: ", err);
    }

});