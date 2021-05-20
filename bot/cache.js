var cache = {}

module.exports = {
    set: function(id, tasks) {
    cache[id] = tasks
},
    get: function(id){
        return cache[id]
    }
}