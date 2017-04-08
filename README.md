# Flashcard-Generator

**LIRI** (short for *Language Interpretation and Recognition Interface*) This is a simple flashcard generator application 
using Node.js. It prompts to the user asking if they are an ```'ADMIN'``` or ```'USER'```. 

```'ADMIN'``` allows for creation and storage of a flashcard, while ```'USER'``` can only read a list of flashcards.

There are two types of flashcards:

1. [```'BASIC'``] which have a front ("Who was the first president of the United States?"), and a back ("George Washington").
2. [```'CLOZE'```] which present partial text ("... was the first president of the United States."), and the full text when 
the user requests it ("George Washington was the first president of the United States.")

All flashcards are saved to a MySQL database. 