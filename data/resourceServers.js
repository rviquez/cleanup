var request = require('request-promise');
var config = require('../config');

const getResourceServers = async () => {
    var options = {
        method: 'GET',
        url: `${config.apiUrl}resource-servers`,
        headers: {
            authorization: `${config.auth}`
        }
    };
    const data = await request(options)
    .catch(e => console.log(`Error in retreiving resource servers. ${e}`));
    return JSON.parse(data);
}

const deleteResourceServer = async (resourceServerId) => {
    var options = {
        method: 'DELETE',
        url: `${config.apiUrl}resource-servers/${resourceServerId}`,
        headers: {
            authorization: `${config.auth}`
        }
    };
    const data = await request(options)
    .catch(e => console.log(`Error in deleting resource server: ${resourceServerId}. ${e}`));
    return data;
}

const getResourceServer = async (resourceServerId) => {
    var options = {
        method: 'GET',
        url: `${config.apiUrl}resource-servers/${resourceServerId}`,
        headers: {
            authorization: `${config.auth}`
        }
    };
    const data = await request(options)
    .catch(e => console.log(`Error in retreiving resource server: ${resourceServerId}. ${e}`));
    return JSON.parse(data);
}

module.exports = {
    getResourceServer: getResourceServer,
    getResourceServers: getResourceServers,
    deleteResourceServer: deleteResourceServer
}
