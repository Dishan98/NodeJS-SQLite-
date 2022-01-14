const sqlite3 = require('sqlite3').verbose();
const axios = require('axios');

const db = new sqlite3.Database("./mock.db", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) console.error(err.message);

    console.log("Connection Successful!");
});

axios
    .get("https://random-data-api.com/api/users/random_user")
    .then((response) => {
        //console.log(response);
        const { data } = response;
        const { first_name } = data;
        const { last_name } = data;
        const { username } = data;
        const { email } = data;
        const { id } = data;
        const { password } = data;

        // const sql = 'INSERT INTO users (first_name, last_name, username, password, email, id) VALUES(?,?,?,?,?,?)';

        // db.run(
        //     sql,
        //     [first_name,last_name,username,password,email,id],
        //     (err) => {
        //         if (err) console.error(err.message);
        
        //         console.log("A new record has been added!");
        //     }
        // );
        
    })
    .catch((error) => {
        if (error) return console.error(error);
    });

    const sql = 'SELECT * FROM users';
        
    db.all(sql, [], (err, rows) => {
        if (err) console.error(err.message);
    
        rows.forEach((row) => {
            console.log(row);
        });
    });
    
// db.run(
//     'CREATE TABLE users(first_name, last_name, username, password, email, id)'
// );

db.close((err) => {
    if (err) return console.error(err.message);
});


