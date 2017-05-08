CREATE DATABASE flashcardsDB;

USE flashcardsDB;

CREATE TABLE basic (
	id INT(11) AUTO_INCREMENT NOT NULL,
    `question` varchar(60) NOT NULL,
    `answer` varchar(60) NOT NULL,
     PRIMARY KEY (id)
);

CREATE TABLE cloze (
	id INT(11) AUTO_INCREMENT NOT NULL,
    `text` varchar(60) NOT NULL,
    `cloze` varchar(60) NOT NULL,
    PRIMARY KEY (id)
);

SELECT * FROM basic;
SELECT * FROM cloze;

insert cloze values ('a', 'b');
delete from basic where id =1;