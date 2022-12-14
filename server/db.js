const sqlite3 = require("sqlite3");

// db source
const dbSource = "db.sqlite";

let db = new sqlite3.Database(dbSource, (err) => {
  if (err) {
    // console log error
    console.error("Error opening database " + err.message);
  } else {
    console.log("Connected to the SQlite database.");
    db.run(
      `CREATE TABLE notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title text UNIQUE,
        body text, 
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )`,
      (err) => {
        if (err) {
          console.log(err);
          console.log("Table already exists.");
        } else {
          const date = new Date();
          // Table created, seed some dummy data
          var insert =
            "INSERT INTO notes (title, body, createdAt, updatedAt) VALUES (?,?,?,?)";
          db.run(insert, [
            "Dummy Title",
            "A long dummy body tezt",
            date.toISOString(),
            date.toISOString(),
          ]);
        }
      }
    );
  }
});
module.exports = db;
