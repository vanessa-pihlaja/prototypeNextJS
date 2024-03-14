import { getAllRecipes } from '../../../src/utils/recipes';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const recipes = getAllRecipes();
    res.status(200).json(recipes);
  } else {
    // Handle other methods or return a 405 Method Not Allowed error
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}