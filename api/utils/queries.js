/*
 * MESSAGE TABLE
 */
export const createMessageTable = `
DROP TABLE IF EXISTS messages;
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR DEFAULT '',
  message VARCHAR NOT NULL
  )
  `;

export const insertMessages = `
INSERT INTO messages(name, message)
VALUES ('chidimo', 'first message'),
      ('orji', 'second message')
`;

export const dropMessagesTable = 'DROP TABLE messages';

/*
 * USER TABLE
 */

export const createUserTable = `
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR DEFAULT '',
  access_token VARCHAR DEFAULT '',
  token_type VARCHAR DEFAULT '',
  expires_at VARCHAR DEFAULT '',
  expires_in VARCHAR DEFAULT '',
  refresh_token VARCHAR DEFAULT ''
  )
  `;

export const insertUser = `
INSERT INTO users(username, access_token)
VALUES ('jonas_dammen', '4ffbb914c20e7f1eee037590e70cfdf71b21b8e2')`;

export const dropUsersTable = 'DROP TABLE users';
