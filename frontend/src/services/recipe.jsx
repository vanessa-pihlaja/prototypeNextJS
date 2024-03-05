import axios from 'axios';

// Utilize environment variable for the base URL
const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/recipes`;

const findRecipe = async ({ title }) => {
  console.log(baseUrl); 
  console.log(title);
  const response = await axios.get(`${baseUrl}/${encodeURIComponent(title)}`);
  
  return response.data;
  
};

export default { findRecipe };
