var request = require('request-promise');
var config = require('../config');

const getToken = async () => {
    var options = {
        method: 'POST',
        url: 'https://asolvi-dev.eu.auth0.com/oauth/token',
        headers: {
            'content-type': 'application/json'
        },
        body: `{"client_id":"${config.client_id}","client_secret":"${config.client_secret}","audience":"${config.apiUrl}","grant_type":"client_credentials"}`
    };
    const data = await request(options);
    var bodyJson = JSON.parse(data);
    config.auth = `${bodyJson.token_type} ${bodyJson.access_token}`;
    return bodyJson;
}

module.exports = {
    getToken: getToken
}