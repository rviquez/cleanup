const token = require('./data/token');
const clientData = require('./data/clients');
const resourceServerData = require('./data/resourceServers');
const fs = require('fs');

const init = async () => {
    let servers = ['TRVWWEB1.devops.asolvi.com', 'TRVWWEB2.devops.asolvi.com','https://trvwweb1.devops.asolvi.com/', 'https://trvwweb2.devops.asolvi.com/']
    let exclude = ['InsiderLatest', 'insiderlatest','19153', '22185', '23102', '23605', '24113','24153', '24190', '24197', '24199', '24222', '24268', '24310',
                    '24411', '24414', '24419', '24511', '24560', '24590', '24637', '24653', '24661', '24663', '24665', '24705'];
    const tokenUpdated = await token.getToken();

    let applications = await clientData.getClients();
    let apis = await resourceServerData.getResourceServers();

    let filteredApplications = filterData(servers, applications);
    filteredApplications = excludeData(exclude, filteredApplications);
    writeFile('applicationsToBeDeleted.json', filteredApplications);
    
    filteredApplications.map(application => {
        clientData.deleteClient(application.client_id);
        writeLogFile('applicationLog.txt', "Deleted client: "+ application.name + " - " + application.client_id +"\n");       
    });

    let filteredApis = filterData(servers, apis);
    filteredApis = excludeData(exclude, filteredApis);
    writeFile('apisToBeDeleted.json', filteredApis);

    filteredApis.map(api => {
        resourceServerData.deleteResourceServer(api.id);
        writeLogFile('apiLog.txt', "Deleted resource-server: "+ api.name + " - " + api.id +"\n");  
    })
};

const filterData = (filterArray, clientList) => {
    let result = [];
    filterArray.map(el => {
        clientList.map(item=>{
            if(item.name.includes(el)){
                result.push(item)
            }
        })
    })
    return result;
};

const excludeData = (filterArray, clientList) => {
    filterArray.map(el => {
        clientList = clientList.filter(client => !client.name.includes(el));
    })
    return clientList;
};

const writeFile = (fileName, data)=>{
    fs.writeFile(fileName, JSON.stringify(data), (err) => {
        if (err) throw err;
      })
};

const writeLogFile = (fileName, data) => {
    fs.appendFile(fileName, data, (err) => {
        if (err) throw err;
      })      
};

init();

