// server.js
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

const url = "mongodb://127.0.0.1:27017";
const dbName = "myproject";
let db;


MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    console.log("✅ Connected to MongoDB");
    db = client.db(dbName);

    // Start server only after DB is ready
    app.listen(5000, () => console.log(" Server running on http://localhost:5000"));
  })
  .catch(err => console.error(" MongoDB connection error:", err));

// ✅ Signup endpoint
app.post("/signup", async (req, res) => {
  try {
    const { childName, parentName, parentEmail, password } = req.body;

    if (!childName || !parentName || !parentEmail || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const collection = db.collection("users");

    const existingUser = await collection.findOne({ parentEmail });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    await collection.insertOne({ childName, parentName, parentEmail, password });
    res.json({ success: true, message: "Signup successful" });
  } catch (err) {
    console.error("❌ Error during signup:", err);
    res.status(500).json({ success: false, message: "Database error" });
  }
});

// ✅ Login endpoint
app.post("/login", async (req, res) => {
  try {
    const { parentEmail, childName, password } = req.body;

    if (!parentEmail || !childName || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const collection = db.collection("users");
    const user = await collection.findOne({ parentEmail, childName });

    if (!user) return res.status(401).json({ success: false, message: "User not found" });
    if (user.password !== password)
      return res.status(401).json({ success: false, message: "Incorrect password" });

    res.json({ success: true, childName: user.childName });
  } catch (err) {
    console.error("❌ Error during login:", err);
    res.status(500).json({ success: false, message: "Database error" });
  }
});

// ✅ Save quiz scores endpoint
app.post("/saveScore", async (req, res) => {
  try {
    const { childName, quizType, score, total, date } = req.body;

    if (!childName || !quizType || score == null || !total || !date) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Map each quiz type to its corresponding collection
    const collectionMap = {
      "Colors Quiz": "colorsQuizResults",
      "Shapes Quiz": "shapesQuizResults",
      "Numbers Quiz": "numberQuizResults",
      "Build Word Quiz": "buildWordResults"
    };

    const collectionName = collectionMap[quizType];
    if (!collectionName) {
      return res.status(400).json({ success: false, message: "Invalid quiz type" });
    }

    const collection = db.collection(collectionName);

    await collection.insertOne({
      childName,
      quizType,
      score,
      total,
      date
    });

    res.json({ success: true, message: "Score saved successfully" });
  } catch (err) {
    console.error(" Error saving score:", err);
    res.status(500).json({ success: false, message: "Database error" });
  }
});
