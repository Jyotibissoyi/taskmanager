const { Pool } = require("pg");
const { dbConfig } = require("./dbPool");

let existingPool = null;

const dbConnection = async () => {
    const pool = new Pool(dbConfig);
    existingPool = pool

    pool.connect((err) => {
        if (err) {
            console.error("Error connecting to PostgreSQL:", err);
            return;
        } else {
            console.log("connected to postgres")
        }
    })
}

const pgConnect = () => {
    if (!existingPool) {
        existingPool = new Pool(dbConfig);
    }
    return existingPool
}

module.exports = { dbConnection, pgConnect }