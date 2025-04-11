-- Not necessarily a sql command, but a psql command to open the database
psql -U neil echo

SELECT * FROM migrations;
DROP TABLE migrations;

SELECT * FROM users;
DROP TABLE users;
DELETE FROM users;

SELECT * FROM conversations;
DROP TABLE conversations;
DELETE FROM conversations;

SELECT * FROM user_conversations;
DROP TABLE user_conversations;
DELETE FROM user_conversations;

SELECT * FROM messages;
DROP TABLE messages;
DELETE FROM messages;