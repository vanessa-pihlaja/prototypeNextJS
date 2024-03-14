import fs from 'fs';
import path from 'path';

// Loads recipes from a JSON file and filters out incomplete entries
const loadAndFilterRecipes = (fileName) => {
  const filePath = path.join(process.cwd(), 'data', fileName); // Adjust the path as necessary
  console.log(filePath)
  try {
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const recipes = JSON.parse(fileContents);
    return recipes.filter(recipe => recipe.title && recipe.content && recipe.images && recipe.images.length > 0);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return [];
  }
};

// Shuffles an array in place
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
  };


// Function to load, filter, and shuffle all recipes from specified files
export function getAllRecipes() {
    let recipes = [
      ...loadAndFilterRecipes('../data/bellatable.json'),
      ...loadAndFilterRecipes('../data/anninuunissa.json'),
      ...loadAndFilterRecipes('../data/liemessa.json'),
      ...loadAndFilterRecipes('../data/viimeistamuruamyoten.json'),
    ];
  
    shuffleArray(recipes);
    return recipes;
  }
  
  // Function to get a recipe by title
  export function getRecipeByTitle(title) {
    const allRecipes = getAllRecipes();
    return allRecipes.find(recipe => recipe.title.toLowerCase() === title.toLowerCase());
  }  