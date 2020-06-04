const mysql = require('mysql');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'my-website',
    port: 8889
});

module.exports = connection;

// const mysqlssh = require('mysql-ssh');

// const connection = mysqlssh.connect(
//     {
//         host: '192.0.0.1',
//         port: '8889',
//         username: 'root',
//         password: 'root'
//     },
//     {
//         host: 'localhost',
//         user: 'root',
//         password: 'dkumse123',
//         database: 'cinemaArchive'
//     }
// )

module.exports = connection;