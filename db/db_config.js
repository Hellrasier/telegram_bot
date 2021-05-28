const {Pool} = require('pg')
require('dotenv').config()

module.exports = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: 'telegram_bot',
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT
})