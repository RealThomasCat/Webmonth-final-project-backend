const { Client } = require('pg');
const client = new Client(

    `postgres://eczxbsam:m0QXMe5tZz6I0SmPnefd1OmhA5BNHUpV@john.db.elephantsql.com/eczxbsam`

    // {
    // user: process.env.PSQL_USER,
    // host: process.env.PSQL_HOST,
    // database: process.env.PSQL_DB,
    // password: process.env.PSQL_PASS,
    // port: 5432,
    // }
);

module.exports = client;