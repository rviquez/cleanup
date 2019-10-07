var request = require('request-promise');
var config = require('../config');

const getClients = async (page) => {
    var options = {
        method: 'GET',
        url: `${config.apiUrl}clients?fields=name,description,client_id&per_page=100&page=${page}&include_totals=true`,
        headers: {
            authorization: `${config.auth}`
        }
    };
    const data = await request(options);
    return JSON.parse(data);
}

const deleteClient = async (clientId) => {
    var options = {
        method: 'DELETE',
        url: `${config.apiUrl}clients/${clientId}`,
        headers: {
            authorization: `${config.auth}`
        }
    };
    const data = await request(options)
    .catch(e => console.log(`Error in deleting client ${clientId}`));
    return JSON.parse(data);
}

module.exports = {
    getClients: getClients,
    deleteClient: deleteClient
}
