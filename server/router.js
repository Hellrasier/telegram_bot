const db = require('./../db/db')

module.exports = function(url, res) {
    return {
        '/api/tasks': {
            'GET': () => db.get().then(data => res.end(JSON.stringify(data)))
                .catch(err => console.log(err)),

            'POST': body => body.then(data => {
                try {
                    console.log(data)
                    data = JSON.parse(data)
                    db.insert(data)
                    console.log(`Sucessfully posted data: ${JSON.stringify(data)}`)
                    res.end(`Recived object ${data} sucessfully`)
                } catch(e) {
                    console.log(e)
                    res.end(`Error 500: ${e}`)
                }
            }),

            'DELETE': id => id.then(id => {
                db.delId(parseInt(id))
                res.end(`Deleted ${id} sucessfully`)
            }).catch(err => console.log(err)),

        }
    }[url]
}