const mysql = require('mysql');
var connection = mysql.createConnection({
    host:'us-cdbr-east-05.cleardb.net',
    user:'b063cdeb61e886',
    password:'694e0c62',
    database:'heroku_e7250236ba2c461',
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