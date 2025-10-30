const { Client } = require("pg");
require("dotenv").config();

const USERS_TABLE = `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    membership BOOLEAN DEFAULT FALSE NOT NULL
);`;

const MESSAGES_TABLE = `CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    author INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
);`;

const SEED_USERS = `INSERT INTO users (username, password)
VALUES
  ('alice', 'password1'),
  ('bob', 'password2');`;

const SEED_MESSAGES = `INSERT INTO messages (title, content, author) VALUES ('Alice' ,'This is Alice first message', 1),
('Bob','This is Bob first message', 2);`;

async function main() {
    console.log("sending");
    const client = new Client({
      connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    });
    try {
        await client.connect();
        await client.query(USERS_TABLE);
        await client.query(MESSAGES_TABLE);
        await client.query(SEED_USERS);
        await client.query(SEED_MESSAGES)
        console.log("done")
    } catch (error) {
        console.log("Error:", error)
    } finally {
        await client.end();
    }
}

main();