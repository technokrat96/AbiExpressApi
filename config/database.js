var lib = require("../lib");

var settings = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '@Technokrat1996',
        database: 'db_abiexpress',
    }
};

var db = require('knex')(settings);

module.exports = db;