import express from "express";
import mysql from "mysql";
import cors from "cors";
import multer from "multer";
import fs from "fs";

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());
app.use("/images", express.static("images"));

// ================= MULTER =================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync("images")) fs.mkdirSync("images");
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// ================= MYSQL =================
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "customers", // keep this if correct
});

db.connect((err) => {
  if (err) console.error("❌ MySQL error:", err);
  else console.log("✅ MySQL connected");
});

// ================= ROUTES =================

// CREATE
app.post("/customers", upload.single("book-image"), (req, res) => {
  const { first_name, last_name, email, address, book_title } = req.body;
  const book_image = req.file ? req.file.filename : null;

  if (!first_name || !last_name || !email || !address) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const sql = `
    INSERT INTO customers
    (first_name, last_name, email, address, book_title, book_image)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [first_name, last_name, email, address, book_title || "N/A", book_image],
    (err, result) => {
      if (err) {
        console.error("❌ INSERT ERROR:", err);
        return res.status(500).json(err);
      }
      res.json({ message: "Customer added", id: result.insertId });
    }
  );
});

// READ ALL
app.get("/customers", (req, res) => {
  db.query("SELECT * FROM customers", (err, data) => {
    if (err) {
      console.error("❌ FETCH ERROR:", err);
      return res.status(500).json(err);
    }
    res.json(data);
  });
});

// READ ONE
app.get("/customers/:id", (req, res) => {
  db.query(
    "SELECT * FROM customers WHERE id=?",
    [req.params.id],
    (err, data) => {
      if (err) return res.status(500).json(err);
      if (!data.length) return res.status(404).json({ message: "Not found" });
      res.json(data[0]);
    }
  );
});

// UPDATE
app.put("/customers/:id", upload.single("book-image"), (req, res) => {
  const id = req.params.id;
  const { first_name, last_name, email, address, book_title } = req.body;
  const book_image = req.file ? req.file.filename : null;

  let sql;
  let values;

  if (book_image) {
    sql = `
      UPDATE customers
      SET first_name=?, last_name=?, email=?, address=?, book_title=?, book_image=?
      WHERE id=?
    `;
    values = [first_name, last_name, email, address, book_title, book_image, id];
  } else {
    sql = `
      UPDATE customers
      SET first_name=?, last_name=?, email=?, address=?, book_title=?
      WHERE id=?
    `;
    values = [first_name, last_name, email, address, book_title, id];
  }

  db.query(sql, values, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Customer updated" });
  });
});

// DELETE
app.delete("/customers/:id", (req, res) => {
  db.query("DELETE FROM customers WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Customer deleted" });
  });
});

// ================= START =================
app.listen(5000, () => {
  console.log("🚀 Backend running on http://localhost:5000");
});
