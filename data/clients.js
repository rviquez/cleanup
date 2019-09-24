var request = require('request');
var config = require('../config');
function getClients(page) {
    var options = {
        method: 'GET',
        url: `${config.apiUrl}clients?fields=name,description,client_id&per_page=${page}&include_totals=true`,
        headers: {
            authorization: `${config.auth}`
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
        return JSON.parse(body);
        
    });
}
module.exports = {
    getClients: getClients
}
