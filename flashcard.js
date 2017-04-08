
//variables npm and modules
var inquirer = require('inquirer');
var sql = require("./sql.js");
var mysql = require("mysql");
var constructor = require("./constructor.js");

//SQL connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Jaklee91!",
  database: "flashcardsDB"
});

//variables for user input
var user;
var type;
var question;
var answer;
var text;
var cloze;

inquirer.prompt([
	{
		type:"list",
		name: "usertype",
		message: "Are you an 'admin' or a 'user'?",
		choices: ["ADMIN", "USER"]
	}
]).then(function(answers){
	user = answers.usertype;
	//generate flashcard if admin
	if (user == "ADMIN") {
		inquirer.prompt([
			{
				type: "list",
				name: "cardtype",
				message: "What kind of flashcard do you want to generate?",
				choices: ["BASIC" , "CLOZE"]
			}
		]).then(function(answers) {
			type = answers.cardtype;
			if (type == "BASIC") {
				inquirer.prompt([
				{
					type: "input",
					name: "question",
					message: "Enter question"
				}, {
					type: "input",
					name: "answer",
					message: "Enter answer"
				}
				]).then(function(answers){
					question = answers.question;
					answer = answers.answer;
					flashcardGen();
				});
			} else if (type == "CLOZE") {
				inquirer.prompt([
				{
					type: "input",
					name: "text",
					message: "Enter text"
				}, {
					type: "input",
					name: "cloze",
					message: "Enter cloze"
				}
				]).then(function(answers){
					text = answers.text;
					cloze = answers.cloze;
					flashcardGen();
				});
			}
		});

	//read flashcards if user
	} else if (user == "USER") {
		inquirer.prompt([
			{
				type: "list",
				name: "cardtype",
				message: "What kind of flashcards do you want listed?",
				choices: ["BASIC" , "CLOZE"]
			}
		]).then(function(answers) {
			if (answers.cardtype == "BASIC") {
				sql.connection.query("SELECT * FROM basic", function(err, res) {
		  			if (err) {console.log(err)};
		  			for (var i = 0; i < res.length ; i++) {
		  				console.log("Question: " + res[i].question + " | " + "Answer: " + res[i].answer + " | ");
		  			}
		  			
				});
				sql.connection.end();
			} else if (answers.cardtype == "CLOZE") {
				sql.connection.query("SELECT * FROM cloze", function(err, res) {
		  			if (err) {console.log(err)};
		  			for (var i = 0; i < res.length ; i++) {
		  				console.log("Text: " + res[i].text + " | " + "Cloze: " + res[i].cloze + " | ");
		  			}
				});
				sql.connection.end();
			}
		});
	}
});

//Flashcard Generator Function
function flashcardGen() {

	//conditional check for either basic or cloze flashcard
	if (type == "BASIC") {
		var flashcardBasic = new constructor.BasicCard(question,answer);

		//MySQL database entry
		sql.connection.query("INSERT INTO basic (question,answer) VALUES (?, ?)", [question, answer], function(err, res) {
  			if (err) {console.log(err)};
  			console.log("Flashcard Added");
  			console.log(flashcardBasic);
		});
		connection.end();
	} else if (type == "CLOZE") {
		//error check if cloze arg is in text arg
		// if (cloze )
		var check = new RegExp(cloze);
		var result = check.test(text);

		//Error check if cloze exists in text. Case-sensitive.
		if (result === false) {
			console.log("Error has occured: " + cloze + " does not exist inside " + text + ". Please check and resubmit your input.");
		} else {
			var flashcardCloze = new constructor.ClozeCard(text, cloze);

			//MySQL database entry
			sql.connection.query("INSERT INTO cloze (text, cloze) VALUES (?, ?)", [text, cloze], function(err, res) {
  				if (err) {console.log(err)};
  				console.log("Flashcard added");
			});
			sql.connection.end();
			console.log(flashcardCloze);
		}
	}
};