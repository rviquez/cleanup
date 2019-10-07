var token = require('./data/token');
var clientData = require('./data/clients');

var pages = 0;

const init = async () =>{
    const tokenUpdated = await token.getToken();
    const clients = await clientData.getClients(pages);
    pages = Math.floor(clients.total/100);
    console.log(await getAllCustomerData(clients, pages));
};

const getAllCustomerData = async (clients, pages) =>{
    var result = clients.clients;
    //console.log(result);
    for (let i = 1; i < pages; i++) {
        const clientsData = await clientData.getClients(pages).then((newClientList)=>{
            //console.log(newClientList.clients);
            result.push(newClientList.clients);
        });
    }
    //console.log([].concat.apply([], result).length);
    return [].concat.apply([], result);//flattens the arrray of arrays
};

init();

