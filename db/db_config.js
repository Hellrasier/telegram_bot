const {Pool} = require('pg')

module.exports = new Pool({
    host: '127.0.0.1',
    port: 5432,
    database: 'telegram_bot_tasks',
    user: 'postgres',
    password: 'qwerty4147628'
})