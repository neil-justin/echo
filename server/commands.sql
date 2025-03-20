-- Not necessarily a sql command, but a psql command to open the database
psql -U neil echo

SELECT * FROM migrations;

SELECT * FROM users;

DROP TABLE migrations;

DROP TABLE users;