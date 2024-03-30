import mongoose from 'mongoose';


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
    type: [String], 
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
  owner: {
    type: String,
    required: false
  }
});

// Create a model from the schema
// Use mongoose.models to avoid error on hot reload during development

const Recipe = mongoose.models.Recipe || mongoose.model('Recipe', recipeSchema);

export default Recipe;



