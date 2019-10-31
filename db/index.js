require('dotenv').config();
const { Pool } = require('pg');
const named = require('node-postgres-named');
const db = {
    user: process.env.LOCAL_DATABASE_USER,
    host: 'localhost',
    database: process.env.LOCAL_DATABASE_NAME,
    password: process.env.LOCAL_DATABASE_PASSWORD,
    port: process.env.LOCAL_DATABASE_PORT
};

let pool;
if (process.env.DATABASE_URL) {
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: true
    });
} else {
    pool = new Pool(db);
}


let _pool = {
    query : pool.query.bind(pool),
    client: async function () {
        let client;
        client = await pool.connect();
        named.patch(client);
        return client;
    }
};

named.patch(_pool);

module.exports = _pool;