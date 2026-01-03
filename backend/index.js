import express from "express";
import mysql from "mysql";
import cors from "cors";
import multer from "multer";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/images", express.static("images"));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync("images")) {
      fs.mkdirSync("images");
    }
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "book",
});

db.connect((err) => {
  if (err) {
    console.log("❌ DB ERROR:", err);
  } else {
    console.log("✅ MySQL Connected");
  }
});
app.get("/customers", (req, res) => {
  db.query("SELECT * FROM customers", (err, data) => {
    if (err) {
      console.log("MYSQL ERROR =>", err);
      return res.status(500).json(err);
    }
    res.json(data);
  });
});

// CREATE
app.post("/customers", upload.single("book-image"), (req, res) => {
  console.log("BODY:", req.body);
  console.log("FILE:", req.file);

  const { first_name, last_name, email, address, book_title } = req.body;
  const book_image = req.file ? req.file.filename : null;

  // ✅ VALIDATION
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
    [first_name, last_name, email, address, book_title , book_image],
    (err, result) => {
      if (err) {
        console.log("MYSQL ERROR =>", err);
        return res.status(500).json(err);
      }
      res.json({
        message: "Customer added successfully",
        id: result.insertId,
      });
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

  // ✅ If image updated
  if (book_image) {
    sql = `
      UPDATE customers
      SET first_name=?, last_name=?, email=?, address=?, book_title=?, book_image=?
      WHERE id=?
    `;
    values = [
      first_name,
      last_name,
      email,
      address,
      book_title,
      book_image,
      id,
    ];
  } else {
    sql = `
      UPDATE customers
      SET first_name=?, last_name=?, email=?, address=?, book_title=?
      WHERE id=?
    `;
    values = [first_name, last_name, email, address, book_title, id];
  }

  db.query(sql, values, (err) => {
    if (err) {
      console.log("MYSQL ERROR =>", err);
      return res.status(500).json(err);
    }
    res.json({ message: "Customer updated" });
  });
});

// DELETE
app.delete("/customers/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM customers WHERE id=?", [id], (err) => {
    if (err) {
      console.log("MYSQL ERROR =>", err);
      return res.status(500).json(err);
    }
    res.json({ message: "Customer deleted" });
  });
});


app.listen(5000, () => {
  console.log(" Backend running on http://localhost:5000");
});
