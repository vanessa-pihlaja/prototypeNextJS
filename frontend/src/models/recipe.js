const mongoose = require("mongoose");

// Define the schema for the recipe
const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  images: {
    type: [String], // Assuming multiple image URLs per recipe
    required: true
  },
  url: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: false
  },
});

// Create a model from the schema
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
