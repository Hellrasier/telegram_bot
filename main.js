const launchBot = require('./bot/bot_api.js')
const http = require('http')
const router = require('./server/router')
const {port} = require('./server/serverConfig')
const sendStatic = require('./server/sendStatic.js')
const body = require('./server/recieveArgs')

launchBot()

http.createServer((req, res) => {
    let {url, method} = req
    console.log(`Url got: ${url}`)
    url.split('/')[1] == 'api' ? router(url, res)[method](body(req)) : sendStatic(url, res)
}).listen(port)

