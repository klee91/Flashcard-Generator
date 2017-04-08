
//Basic card constructor
exports.BasicCard = function(front, back) {
	this.front = front;
	this.back = back;
};

//Cloze card constructor
exports.ClozeCard = function(text, cloze) {
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