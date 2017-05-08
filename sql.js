var mysql = require("mysql");
var connection = mysql.createConnection({
 host: "localhost",
 port: 3306,

 // Your username
 user: 'root',

 // Your password
 password: 'Jaklee91!',
 database: 'flashcardsDB'
});

connection.connect();

connection.query('SHOW DATABASES;', function(error, results, fields) {
	if (error) throw error;
});

connection.end();