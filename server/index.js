const express = require("express");
const db = require("./db.js");

require("dotenv").config();
const cors = require("cors");
// initialise app
const app = express();

// midlewares
app.use(cors());
app.use(express.json());

//defautl route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to react notes app api" });
});

// api endpoints
app.get("/note", (req, res, next) => {
  console.log("getting all notes");
  db.all("SELECT * FROM notes", [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (!rows) return res.status(400).json({ error: "No note found" });
    res.status(200).json({ notes: rows });
  });
});

app.get("/note/:id", (req, res, next) => {
  console.log("getting single note");
  db.all("SELECT * FROM notes WHERE id= ?", [req.params.id], (err, row) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (row.length === 0)
      return res.status(400).json({ error: "No note found" });
    return res.status(200).json({ row });
  });
});

app.put("/note/:id", (req, res, next) => {
  const date = new Date();

  db.run(
    "UPDATE notes set title = ?, body = ?, updatedAt = ?  WHERE id= ?",
    [req.body.title, req.body.body, date.toISOString(), req.params.id],
    (err, row) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      return res.status(201).json({ message: "Note updated succesfully" });
    }
  );
});

app.post("/note", (req, res, next) => {
  const date = new Date();
  db.run(
    "INSERT INTO notes (title, body, createdAt, updatedAt) VALUES (?,?,?,?)",
    [req.body.title, req.body.body, date.toISOString(), date.toISOString()],
    (err, row) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(201).json({ message: "Note added succesfully" });
    }
  );
});

app.delete("/note/:id", (req, res, next) => {
  db.run("DELETE FROM notes WHERE id =? ", [req.params.id], (err, row) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    return res.status(200).json({ message: "Note deleted succesfully" });
  });
});

// app error handler
app.use((err, req, res, next) => {
  console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});

const port = process.env.PORT || 3000;
const host = "0.0.0.0";

app.listen(port, host, () => {
  console.log(`App started and running succesfully on PORT ${port}`);
});
