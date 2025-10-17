// addUser.js
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

const url = "mongodb://127.0.0.1:27017"; // MongoDB URL
const dbName = "myproject"; // database name
let db;

// Connect to MongoDB
MongoClient.connect(url, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to MongoDB");
    db = client.db(dbName);
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Add user endpoint
app.post("/addUser", async (req, res) => {
  try {
    const { childName, parentName, parentEmail } = req.body;
    if (!childName || !parentName || !parentEmail) {
      return res.json({ success: false, message: "All fields are required" });
    }
    const collection = db.collection("users");
    await collection.insertOne({ childName, parentName, parentEmail });
    res.json({ success: true, message: "User added" });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "Database error" });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
