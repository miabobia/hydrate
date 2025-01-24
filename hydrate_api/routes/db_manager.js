const Database = require('better-sqlite3');
let gardenDB

// const row = gardenDB.prepare('SELECT * FROM users WHERE id = ?').get(userId);
// console.log(row.firstName, row.lastName, row.email);

// const sqlite3 = require('sqlite3').verbose();

// let gardenDB;

function setup(){
    gardenDB = new Database('./data/gardenDB.sqlite3', { verbose: (console.log) })

    const createQuery = `CREATE TABLE IF NOT EXISTS USERS(
                USER_ID NUMBER,
                USERNAME TEXT,
                PASSWORD TEXT
            )`
    gardenDB.exec(createQuery)
}

function insert(table, params){
    /*
    PARAMS:
    table   -> name of table we want to select from
    params  -> columns you want to insert into
            eg: { user_id: 0, name: 'Jesus' }
    */
    var keys = Object.keys(params);
    let paramString = '('
    let valString = '('

    for (let index = 0; index < keys.length; index++) {
        let strEnd = index != (keys.length - 1) ? ', ' : ')';
        paramString += keys[index] + strEnd;
        valString += '@' + keys[index] + strEnd;
    }
    const insertStatement = gardenDB.prepare(`INSERT INTO ${table} ${paramString} VALUES ${valString}`);
    insertStatement.run(params);
}

function remove(table, where){
    /*
    PARAMS:
    table   -> name of table we want to select from
    params  -> columns you want to insert into
            eg: { user_id: 0, name: 'Jesus' }
    */
    const removeStatement = gardenDB.prepare(`DELETE FROM ${table} ${where}`)
    removeStatement.run();
}

function select(table, cols, where){
    /*
    PARAMS:
    table -> name of table we want to select from
    cols  -> columns you want to select
            -> if cols is empty string defaults to `*` 
    where -> conditions on query

    RETURNS:
    array of rows fetched from query
    [
        {col1, col2, col3, ...},
    ]
    */

    let colString = ''

    if (cols.length == 0){
        cols = '*'
    }else if (cols.length == 1){
        colString = cols[0]
    }

    let paramString = ''

    for (let index = 0; index < cols.length; index++) {
        let strEnd = index != (cols.length - 1) ? ', ' : '';
        paramString += cols[index] + strEnd;
    }
    console.log(`SELECT ${paramString} FROM ${table} ${where}`)
    const stmt = gardenDB.prepare(`SELECT ${paramString} FROM ${table} ${where}`)
    return stmt.all()
}

module.exports = {setup, select, insert, remove};