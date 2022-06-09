const mysql = require('mysql');
var connection = mysql.createConnection({
    host:'bslk6hhog904u5rcv98k-mysql.services.clever-cloud.com',
    user:'udoeef3xihhrnjxr',
    password:'AXMm4IyvWQBEGK0RP3W1',
    database:'bslk6hhog904u5rcv98k',
    port:'3306'
})

connection.connect(function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("DB is conected");
    }
})
//
module.exports = connection;