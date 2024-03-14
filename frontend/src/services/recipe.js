import axios from 'axios';

// Utilize environment variable for the base URL
const baseUrl = 'api/recipes';

const findRecipe = async ({ title }) => {
  console.log(baseUrl); 
  console.log(title);
  const response = await axios.get(`${baseUrl}/${encodeURIComponent(title)}`);
  
  return response.data;
  
};

const recipeService = { findRecipe };
export default recipeService;
