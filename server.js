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

// Connect to MongoDB
MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    console.log("Connected to MongoDB");
    db = client.db(dbName);
  })
  .catch(err => console.error(" MongoDB connection error:", err));


app.post("/addUser", async (req, res) => {
  try {
    const { childName, parentName, parentEmail } = req.body;

    if (!childName || !parentName || !parentEmail) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const collection = db.collection("users");

    // Optional: Check if user already exists
    const existingUser = await collection.findOne({ childName, parentEmail });
    if (existingUser) {
      return res.status(200).json({ success: true, message: "User already exists" });
    }

    await collection.insertOne({ childName, parentName, parentEmail });
    res.json({ success: true, message: "User added successfully" });

  } catch (err) {
    console.error(" Error adding user:", err);
    res.status(500).json({ success: false, message: "Database error" });
  }
});


app.post("/saveScore", async (req, res) => {
  try {
    const { childName, quizType, score, total, date } = req.body;

    const collectionMap = {
      "Word Image Quiz": "wordImageResults",
      "Build Word Quiz": "buildWordResults",
      "Numbers Quiz": "numberQuizResults",
      "Shapes Quiz": "shapesQuizResults",
      "Colors Quiz": "colorsQuizResults"
    };

    const collectionName = collectionMap[quizType];
    if (!collectionName) {
      return res.status(400).json({ success: false, message: "Invalid quiz type" });
    }

    const collection = db.collection(collectionName);
    await collection.insertOne({ childName, quizType, score, total, date });

    res.json({ success: true, message: "Score saved successfully" });

  } catch (err) {
    console.error(" Error saving score:", err);
    res.status(500).json({ success: false, message: "Database error" });
  }
});

app.listen(5000, () => console.log(" Server running on http://localhost:5000"));
