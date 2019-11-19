var request = require('request-promise');
var config = require('../config');

const getClients = async (page) => {
    var options = {
        method: 'GET',
        url: `${config.apiUrl}clients?fields=name,description,client_id`,
        headers: {
            authorization: `${config.auth}`
        }
    };
    const data = await request(options)
    .catch(e => console.log(`Error in retreiving clients. ${e}`));
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
    .catch(e => console.log(`Error in deleting client: ${clientId}. ${e}`));
    return data;
}

const getClient = async (clientId) => {
    var options = {
        method: 'GET',
        url: `${config.apiUrl}clients/${clientId}?fields=name,description,client_id`,
        headers: {
            authorization: `${config.auth}`
        }
    };
    const data = await request(options)
    .catch(e => console.log(`Error in retreiving client: ${clientId}. ${e}`));
    return JSON.parse(data);
}

module.exports = {
    getClient: getClient,
    getClients: getClients,
    deleteClient: deleteClient
}
