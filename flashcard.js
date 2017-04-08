
//variables npm and modules
var inquirer = require('inquirer');
const fs = require('fs');
var mysql = require("mysql");

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

//
// connection.connect(function(err) {
//   if (err) {console.log(err)};
//   console.log("connected as id " + connection.threadId);
// });

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
				connection.query("SELECT * FROM basic", function(err, res) {
		  			if (err) {console.log(err)};
		  			for (var i = 0; i < res.length ; i++) {
		  				console.log("Question: " + res[i].question + " | " + "Answer: " + res[i].answer + " | ");
		  			}
		  			
				});
				connection.end();
			} else if (answers.cardtype == "CLOZE") {
				connection.query("SELECT * FROM cloze", function(err, res) {
		  			if (err) {console.log(err)};
		  			for (var i = 0; i < res.length ; i++) {
		  				console.log("Text: " + res[i].text + " | " + "Cloze: " + res[i].cloze + " | ");
		  			}
				});
				connection.end();
			}
		});
	}
});

//Flashcard Generator Function
function flashcardGen() {

	//Basic card constructor
	var BasicCard = function(front, back) {
		this.front = front;
		this.back = back;
	};

	//Cloze card constructor
	var ClozeCard = function(text, cloze) {
		this.text = text;
		this.cloze = cloze;
		this.clozeDel = function() {
			return this.cloze;
		};
		this.partial = function() {
			var self = this.text
			var partialtext = self.replace(this.cloze , "...");
			console.log("Partial Text: " + partialtext);
		};
		this.fullText = function() {
			console.log("Full Text: " + this.text);
		};
	};

	//conditional check for either basic or cloze flashcard
	if (type == "BASIC") {
		var flashcardBasic = new BasicCard(question,answer);

		//MySQL database entry
		connection.query("INSERT INTO basic (question,answer) VALUES (?, ?)", [question, answer], function(err, res) {
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
			var flashcardCloze = new ClozeCard(text, cloze);

			//MySQL database entry
			connection.query("INSERT INTO cloze (text, cloze) VALUES (?, ?)", [text, cloze], function(err, res) {
  				if (err) {console.log(err)};
  				console.log("Flashcard added");
			});
			connection.end();
			console.log(flashcardCloze);
		}
	}
};