// var firstPresident = new BasicCard(
//     "Who was the first president of the United States?", "George Washington");

// // "Who was the first president of the United States?"
// console.log(firstPresident.front); 

// // "George Washington"
// console.log(firstPresident.back); 

// var firstPresidentCloze = new ClozeCard(
//     "George Washington was the first president of the United States.", "George Washington");

// // "George Washington"
// console.log(firstPresidentCloze.cloze); 

// // " ... was the first president of the United States.
// console.log(firstPresidentCloze.partial); "

// // "George Washington was the first president of the United States.
// console.log(firstPresidentCloze.fullText): "

// // Should throw or log an error because "oops" doesn't appear in "This doesn't work"
// var brokenCloze("This doesn't work", "oops"); 

//variables for user input
var type = process.argv[2];
var question = process.argv[3];
var answer = process.argv[4];

function flashcardGen() {

	var BasicCard = function(front, back) {
		this.front = front;
		this.back = back;
	};

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
	if (type == "basic") {
		var flashcardBasic = new BasicCard(question,answer);
		console.log("Front: " + flashcardBasic.front);
		console.log("Back: " + flashcardBasic.back);
	} else {
		//error check if cloze arg is in text arg
		// if (cloze )
		var check = new RegExp(answer);
		var result = check.test(question);

		//Error check if cloze exists in text. Case-sensitive.
		if (result === false) {
			console.log("Error has occured: " + cloze + " does not exist in " + text ". Please check and resubmit your input.");
		} else {
			var flashcardCloze = new ClozeCard(question,answer);
			console.log("Text: " + flashcardCloze.text);
			console.log("Cloze: " + flashcardCloze.clozeDel());
			flashcardCloze.partial();
			flashcardCloze.fullText();
		}
	}
};

flashcardGen();




