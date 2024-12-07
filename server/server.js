const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("pg-promise")();

const app = express();
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());

const database = db(process.env.PG_URI);

app.get("/subcategories", async (req, res) => {
  try {
    const subCategories = await database.any("SELECT * FROM subcategories");
    res.status(200).json(subCategories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
app.get("/categories", async (req, res) => {
  try {
    const categories = await database.any("SELECT * FROM categories");
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/subcategories", async (req, res) => {
  const { name, category } = req.body;
  try {
    const newSubCategory = await database.one(
      "INSERT INTO subcategories(name, category) VALUES($1, $2) RETURNING *",
      [name, category]
    );
    res.status(201).json(newSubCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/subcategories/:id", async (req, res) => {
  const { id } = req.params;
  const { name, category } = req.body;
  try {
    const updatedSubCategory = await database.one(
      "UPDATE subcategories SET name=$1, category=$2 WHERE id=$3 RETURNING *",
      [name, category, id]
    );
    res.status(200).json(updatedSubCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/subcategories/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await database.none("DELETE FROM subcategories WHERE id=$1", [id]);
    res.status(200).json({ message: "Sub-category deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
