const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();
const Recipe = require('./src/models/recipe.js');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected successfully to MongoDB"))
  .catch(error => console.error("Connection error:", error));

async function importRecipes() {
  try {
    await mongoose.connection;

    const filePath = path.join(process.cwd(), 'data/ottolenghi.json');

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
    mongoose.disconnect();
  }
}

importRecipes();
