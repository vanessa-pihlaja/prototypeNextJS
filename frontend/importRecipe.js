const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();
const Recipe = require('./src/models/recipe.js'); // Adjust the path as necessary

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected successfully to MongoDB"))
  .catch(error => console.error("Connection error:", error));

async function importRecipes() {
  try {
    // Ensure database connection is established
    await mongoose.connection;

    // Define the path to the JSON file directly
    const filePath = path.join(process.cwd(), 'data/ottolenghi.json');

    // Read the JSON file's content
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const recipes = JSON.parse(fileContents);

    // Add each valid recipe to the database
    for (const recipe of recipes) {
      // Check if the recipe meets the requirements
      if (!recipe.title || !recipe.content || !recipe.images || recipe.images.length === 0) {
        console.log(`Skipping recipe due to missing required fields: ${recipe.title}`);
        continue; // Skip this recipe and move to the next one
      }

      const savedRecipe = await Recipe.create(recipe);
      console.log(`Recipe "${savedRecipe.title}" added to the database.`);
    }

    console.log('All recipes imported successfully.');
  } catch (error) {
    console.error('Error importing recipes:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.disconnect();
  }
}

// Run the importRecipes function
importRecipes();
