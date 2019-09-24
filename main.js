var token = require('./data/token');
var config = require('./config');
var clientData = require('./data/clients');

token.getToken().then(function (){
    var clients = clientData.getClients(0);
    console.log(clients);
    
})

