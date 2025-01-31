const Database = require('better-sqlite3');
let gardenDB

// function insert(table, params){
//     /*
//     PARAMS:
//     table   -> name of table we want to select from
//     params  -> columns you want to insert into
//             eg: { user_id: 0, name: 'Jesus' }
//     */
//     var keys = Object.keys(params);
//     let paramString = '('
//     let valString = '('

//     for (let index = 0; index < keys.length; index++) {
//         let strEnd = index != (keys.length - 1) ? ', ' : ')';
//         paramString += keys[index] + strEnd;
//         // valString += '@' + params[keys[index]] + strEnd;
//         valString += params[keys[index]] + strEnd;
//     }
//     const insertStatement = gardenDB.prepare(`INSERT INTO ${table} ${paramString} VALUES ${valString}`);
//     console.log(insertStatement)
//     insertStatement.run(params);
// }

function insert(table, params) {
    /*
    PARAMS:
    table   -> name of table we want to select from
    params  -> columns you want to insert into
            eg: { user_id: 0, name: 'Jesus' }
    */
    var keys = Object.keys(params);
    let paramString = '(';
    let valString = '(';

    // Generate columns and placeholders
    for (let index = 0; index < keys.length; index++) {
        let strEnd = index != (keys.length - 1) ? ', ' : ')';
        paramString += keys[index] + strEnd;
        valString += '?' + strEnd;
    }

    // Prepare the insert statement with placeholders
    const insertStatement = gardenDB.prepare(`INSERT INTO ${table} ${paramString} VALUES ${valString}`);

    // Get values to insert as an array
    const values = keys.map(key => params[key]);

    console.log(`Inserting values:`, values);  // Log the values you're inserting
    insertStatement.run(values);  // Pass values array to run() function
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

    if (cols.length == 0) {
        cols.push('*')
    }

    let paramString = '';

    for (let index = 0; index < cols.length; index++) {
        let strEnd = index != (cols.length - 1) ? ', ' : '';
        paramString += cols[index] + strEnd;
    }
    console.log(`SELECT ${paramString} FROM ${table} ${where}`)
    const stmt = gardenDB.prepare(`SELECT ${paramString} FROM ${table} ${where}`)
    return stmt.all()
}
// const row = gardenDB.prepare('SELECT * FROM users WHERE id = ?').get(userId);
// console.log(row.firstName, row.lastName, row.email);

// const sqlite3 = require('sqlite3').verbose();

// let gardenDB;

function setupDB(){
    gardenDB = new Database('./data/gardenDB.sqlite3', { verbose: (console.log) })
    setupUserTable()
    setupGardenTable()
    setupPlantTable()
    setupCatalogTable()
    setupColorTable()
};

function setupUserTable(){
    // temporarily doing this to control dummy data
    gardenDB.exec(`DROP TABLE IF EXISTS USERS`);
    const createQuery = `CREATE TABLE IF NOT EXISTS USERS(
        USER_ID NUMBER,
        USERNAME TEXT,
        PASSWORD TEXT
    )`
    gardenDB.exec(createQuery)
    populateUserTableWithDummyData(null)
}

function populateUserTableWithDummyData(dummyData){
    insert("USERS", {USER_ID: 0, USERNAME: 'ALMA', PASSWORD: 'BRATDIET123'})
    insert("USERS", {USER_ID: 1, USERNAME: 'OLIVE', PASSWORD: 'GAGNUM'})
}

function setupGardenTable(){
    const createQuery = `
    CREATE TABLE IF NOT EXISTS GARDENS(
        USER_ID NUMBER,
        CREATION_DATE TEXT,
        GARDEN_ID NUMBER
    )`
    gardenDB.exec(createQuery)
}

function setupPlantTable(){
    gardenDB.exec(`DROP TABLE IF EXISTS PLANTS`);
    const createQuery = `
    CREATE TABLE IF NOT EXISTS PLANTS(
        GARDEN_ID NUMBER,
        SEED_ID NUMBER,
        POS NUMBER,
        CREATION_DATE TEXT,
        COLOR_ID NUMBER
    )`
    gardenDB.exec(createQuery)
}

function setupCatalogTable(){
    gardenDB.exec(`DROP TABLE IF EXISTS CATALOG`);
    const createQuery = `
    CREATE TABLE IF NOT EXISTS CATALOG(
        SEED_ID NUMBER,
        AXIOM TEXT,
        RULESET TEXT,
        THETA REAL,
        BRANCH_LENGTH NUMBER,
        DEFAULT_COLOR NUMBER
    )`
    gardenDB.exec(createQuery)
    populateCatalogTable(null)
}

function populateCatalogTable(catalog) {
    catalog = {
            AXIOM: "F",
            RULESET: "F=F+F-F-FF+F+F-F",
            THETA: 0.3926991,
            BRANCH_LENGTH: 10,
            DEFAULT_COLOR: 2
        }

    for (let index = 0; index < 3; index++) {
        insert('CATALOG', {
            SEED_ID: index,
            AXIOM: catalog.AXIOM,
            RULESET: catalog.RULESET,
            THETA: catalog.THETA,
            BRANCH_LENGTH: catalog.BRANCH_LENGTH,
            DEFAULT_COLOR: index,
        })
    }
}


function setupColorTable(){
    gardenDB.exec(`DROP TABLE IF EXISTS COLORS`);
    const createQuery = `
    CREATE TABLE IF NOT EXISTS COLORS(
        COLOR_ID NUMBER,
        RED NUMBER,
        GREEN NUMBER,
        BLUE NUMBER,
        ALPHA NUMBER
    )`
    gardenDB.exec(createQuery)
    populateColorTable(null)
}

function populateColorTable(colors) {
    colors = [
        [92, 230, 239, 1],  // cyan (title borders)
        [72, 82, 86, 1],    // grey-blue (text secondary)
        [129, 96, 223, 1],  // porple (button color)
        [6, 31, 33, 1],     // dark-blue (primary background)
        [207, 211, 231, 1], // light-grey (text primary)
        [254, 97, 92, 1]       // pastel-red (button color)
    ]
    for (let index = 0; index < colors.length; index++) {
        let [ red, green, blue, alpha ] = colors[index];
        insert('COLORS', {COLOR_ID: index, RED: red, GREEN: green, BLUE: blue, ALPHA: alpha})
    }
    // gardenDB.insert('USERS', {USER_ID: 4, USERNAME: 'alma', PASSWORD: 'ALMAPASSWORDDD'})

}


module.exports = {setupDB, select, insert, remove};