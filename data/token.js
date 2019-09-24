var request = require('request');
var config = require('../config');

function getToken() {
    var options = {
        method: 'POST',
        url: 'https://asolvi-dev.eu.auth0.com/oauth/token',
        headers: {
            'content-type': 'application/json'
        },
        body: `{"client_id":"${config.client_id}","client_secret":"${config.client_secret}","audience":"${config.apiUrl}","grant_type":"client_credentials"}`
    };

    return new Promise(function (resolve, reject) {
        request(options, function (error, response, body) {
            if (error) {
                reject(error);
            } else {
                var bodyJson = JSON.parse(body);
                config.auth = `${bodyJson.token_type} ${bodyJson.access_token}`;
                resolve(config.auth);
            }
            

        });
    })
}

module.exports = {
    getToken: getToken
}