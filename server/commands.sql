-- Not necessarily a sql command, but a psql command to open the database
psql -U neil echo

SELECT * FROM migrations;

SELECT * FROM users;

SELECT * FROM conversations;

SELECT * FROM user_conversations;

DROP TABLE migrations;

DROP TABLE users;

DROP TABLE conversations;

DROP TABLE user_conversations;
