const mongoose = require('mongoose');
require('dotenv').config();
const Recipe = require('./src/models/recipe.js');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected successfully to MongoDB"))
  .catch(error => console.error("Connection error:", error));

async function main() {
  try {
    const sampleRecipe = new Recipe({
      title: "Sample Delicious Cake",
      content: "This is a simple recipe for a delicious cake...",
      images: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
      url: "https://example.com/recipe",
    });

    const result = await sampleRecipe.save();
    console.log(`Recipe inserted with the id: ${result._id}`);
  } catch (error) {
    console.error("Failed to insert recipes:", error);
  } finally {
    mongoose.disconnect();
  }
}

main().catch(console.error);
