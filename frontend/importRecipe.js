const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();
const Recipe = require('./src/models/recipe.js'); // Import your Mongoose model

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected successfully to MongoDB"))
  .catch(error => console.error("Connection error:", error));

async function importRecipes() {
  try {
    // Ensure database connection is established
    await mongoose.connection;

    // Get a list of JSON files in the /scripts directory
    const scriptDir = path.join(process.cwd(), 'data');
    const files = fs.readdirSync(scriptDir);

    // Iterate through each JSON file and add its contents to the database
    for (const file of files) {
      const filePath = path.join(scriptDir, file);
      const fileContents = fs.readFileSync(filePath, 'utf-8');
      const recipes = JSON.parse(fileContents);

      // Add each valid recipe to the database
      for (const recipe of recipes) {
        // Check if the recipe meets the requirements
        if (!recipe.title || !recipe.content || !recipe.images || recipe.images.length === 0) {
          console.log(`Skipping recipe due to missing required fields.`);
          continue; // Skip this recipe and move to the next one
        }

        const savedRecipe = await Recipe.create(recipe);
        console.log(`Recipe "${savedRecipe.title}" added to the database.`);
      }
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
