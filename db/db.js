const pool = require('./db_config')

const jsToSQL = x => {
    if (typeof x == 'string') return "'" + x + "'"
    if (typeof x == 'object') {
        x = x.map(v => '"' + v + '"')
        return `'{` + x + `}'`
    } 
    else return x
}


module.exports = {
    getId: id => {
        const sql = `SELECT * FROM tasks WHERE id=${id}`
        return pool.query(sql)
        .then(res => res.rows)
    },
    
    delId: id => {
        const sql = `DELETE FROM tasks WHERE id=${id}`
        return pool.query(sql)
        .then(res => console.log(res.command))
    },
    
    get: clause => pool.query(`SELECT * FROM tasks ${clause == undefined ? '' : `WHERE ` + clause}`)
        .then(res => res.rows),
    
    del: clause => pool.query(`DELETE FROM tasks WHERE ${clause}`)
        .then(res => console.log(res.command)),

    update: clause => args_object => {
        const set = []
        for (let col in args_object) {
            set.push(col + '=' + jsToSQL(args_object[col]))
        }
        const sql =  `UPDATE tasks SET ${set.join(',')} WHERE ${clause}`
        return pool.query(sql).then(res => console.log(res.command))
            .catch(err => console.log(err))
    },

    insert: args_object => {
        var sql_into = Object.keys(args_object).join(',')
        var sql_values = Object.values(args_object).map(jsToSQL).join(',')
        const sql = `INSERT INTO tasks (${sql_into}) VALUES (${sql_values})`
        return pool.query(sql).then(res => console.log(res.command))
            .catch(err => console.log(err))
    }
    
}


