import { getRecipeByTitle } from '../../../src/utils/recipes';

export default function handler(req, res) {
  const { title } = req.query;
  const recipe = getRecipeByTitle(title);

  if (recipe) {
    res.status(200).json(recipe);
  } else {
    res.status(404).json({ error: 'Recipe not found' });
  }
}