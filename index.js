const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// connect to mongodb
const mongoURL = "mongodb://mongo:27017/mydatabase";
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

// define schema and model
const itemSchema = new mongoose.Schema({
  name: String,
});
const Item = mongoose.model("Item", itemSchema);

// routes
app.post("/item", async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.send(newItem);
});

app.get("/items", async (req, res) => {
  const items = await Item.find();
  res.send(items);
});

app.get("/", async (req, res) => {
  res.send("Hello World");
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
