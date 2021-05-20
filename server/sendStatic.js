const {MIME_TYPES, path_static} = require('./serverConfig')   
const fs = require('fs')
const {readFile} = fs.promises

module.exports = (url, res) => {
    url = url.split('/')[1] ? url : '/index.html'
    return readFile(path_static + url).then(buffer => {
            const file_type = url.split('.')[1]
            res.writeHead(200, {'Content-Type': MIME_TYPES[file_type]})
            res.end(buffer)
        })
        .catch(err => {
            res.writeHead(404, {'Content-Type': MIME_TYPES.html})
            res.end(`<h2>404: Not found file ${url}</h2>`)
        }) 
}