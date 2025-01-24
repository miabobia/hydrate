const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./data/emoticons_db.sqlite3');
const jsonData = JSON.parse(fs.readFileSync('./data/emoticons.json', 'utf8'));

Object.entries(jsonData).forEach(([category, emoticonList]) => {
    emoticonList.forEach(emoticon => {
        console.log(category, emoticon);
        // stmt.run(category, emoticon);
    });
});
// db.serialize(() => {
    // db.run("CREATE TABLE lorem (info TEXT, test INTEGER)");

    // const stmt = db.prepare("INSERT INTO lorem VALUES (?, ?)");
    // for (let i = 0; i < 10; i++) {
    //     stmt.run("Ipsum " + i, i);
    // }
    // stmt.finalize();

    // db.each("SELECT rowid AS id, info, test FROM lorem", (err, row) => {
    //     console.log(row.id + ": " + row.info + " -> " + row.test);
    // });
// });

db.close();