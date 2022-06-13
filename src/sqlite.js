/**
 * Module handles database management
 *
 * Server API calls the methods in here to query and update the SQLite database
 */

// Utilities we need
const fs = require("fs");

// Initialize the database
const dbFile = "./.data/library.db";
const exists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const dbWrapper = require("sqlite");
let db;

/* 
We're using the sqlite wrapper so that we can make async / await connections
- https://www.npmjs.com/package/sqlite
*/
dbWrapper.open( {filename: dbFile, driver: sqlite3.Database} )
  .then(async (dBase) => {
    db = dBase;

    // We use try and catch blocks throughout to handle any database errors
    try {
      // Database doesn't exist yet
      if (!exists) {
        // Create users table
          console.log("Criando o Database users");
          await db.run(
            "CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, user VARCHAR[20], password VARCHAR[20])"
          );
          // Add default Admin user to the table
          await db.run(
            `INSERT INTO users (user, password) VALUES ("Admin", "${process.env.ADMIN_PASSWORD}")`
          );
        // Create books table
          console.log("Criando o Database books");
          await db.run(
            "CREATE TABLE books (isbn INTEGER PRIMARY KEY, name VARCHAR[40], author VARCHAR[40], quantity INTEGER)"
          );
          // Add default books to the table
          await db.run(
            "INSERT INTO books (isbn, name, author, quantity) VALUES (8532530788, 'Harry Potter e a Pedra Filosofal', 'J.K. Rowling', 1), (8556510787, 'A Guerra dos Tronos', 'GEORGE R. R. MARTIN', 2), (8599296361, 'A cabana', 'William Paul Young', 3)"
          );

        // We have a database already - write users records to log for info
      } else {
        console.log("Database already exists");
        //console.log( await db.all("SELECT * FROM users") )
        //console.log( await db.all("SELECT * FROM books") )
      }
    } catch (dbError) {
      console.error(dbError);
    } 
  });

// Our server script will call these methods to connect to the db
module.exports = {
  
  // Find user in the database
  getUser: async(user) => {
    console.log("exec getUser");
    // We use a try catch block in case of db errors
    try {
      let result = db.all(`SELECT * FROM users WHERE user="${user}"`);
      return result;
    } catch (dbError) {
      // Database connection error
      console.error(dbError);
    }
  },
  
  // Check specific password from user in the database
  getPassword: async(user, password) => {
    console.log("exec getPassword");
    // We use a try catch block in case of db errors
    try {
      let result = db.all(`SELECT * FROM users WHERE user="${user}" and password="${password}"`);
      return result;
    } catch (dbError) {
      // Database connection error
      console.error(dbError);
    }
  },
  
  // Create a new user in the database
  createUser: async(user, password) => {
    console.log("exec getPassword");
    // We use a try catch block in case of db errors
    try {
      await db.run(
        `INSERT INTO users (user, password) VALUES ("${user}", "${password}")`
      );
    } catch (dbError) {
      // Database connection error
      console.error(dbError);
    }
  },
  
  // Get all books in the database
  getBooks: async() => {
    console.log("exec getBooks");
    // We use a try catch block in case of db errors
    try {
      let result = await db.all("SELECT * FROM books");
      return result;
    } catch (dbError) {
      // Database connection error
      console.error(dbError);
    }
  }
  
};
