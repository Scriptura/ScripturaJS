-- ------------------------------------------------------------------------------
-- Cmd Data
-- Insertion de données
-- ------------------------------------------------------------------------------


-- @link http://stackoverflow.com/questions/766809/whats-the-difference-between-utf8-general-ci-and-utf8-unicode-ci

-- suppression d'une base de donnée
DROP DATABASE test;


-- suppression d'une table
DROP TABLE _config;


-- insertion de données directement en MySQL (exemple)
INSERT INTO _number_option VALUE('', 'Olivier', '100');


-- insertion de données via .csv
LOAD DATA LOCAL INFILE '/Users/olivierchavarin/Documents/Archives/web/Scriptura/ScripturaJS/resources/persons.csv'
INTO TABLE _person
FIELDS
	TERMINATED BY '`'
	ENCLOSED BY ''
	ESCAPED BY '\\'
LINES
	STARTING BY ''
	TERMINATED BY '¶'
IGNORE 0 LINES
-- (id, name, value); -- dénomination des colonnes, facultatif		
-- '\n' ou '\r\n' selon configuration système
-- ignorer X première(s) ligne(s)
