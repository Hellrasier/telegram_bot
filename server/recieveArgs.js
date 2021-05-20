module.exports = req => new Promise((resolve) => {
    const buffer = [];
    req.on('data', chunk => {
        buffer.push(chunk)
    }).on('end', () => {
        var body = buffer.toString()
        body = body.replace(/'/g, "`")
        console.log(`Resolved body: ${body}`)
        resolve(body)
    })
})