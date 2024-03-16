import dbConnect from '../../../src/utils/dbConnect';
import User from '../../../src/models/user';
import Recipe from '../../../src/models/recipe';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const { userId, recipeId, category } = req.body;

      const recipe = await Recipe.findById(recipeId);
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const isDuplicate = user.savedRecipes.some(savedRecipe => 
        savedRecipe.recipeId.equals(recipeId) && savedRecipe.category === category
      );

      if (isDuplicate) {
        return res.status(400).json({ error: 'Recipe already saved in this category' });
      }

      user.savedRecipes.push({ recipeId, category });
      await user.save();

      res.status(200).json({ message: 'Recipe saved successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

  } else if (req.method === 'GET') {
    try {
      const token = req.headers.authorization?.split(' ')[1]
      if (!token) {
        return res.status(401).json({ error: 'Token not provided' });
      }
  
      const decoded = jwt.verify(token, 'ba67b720d047a8c39ebe8c751167ccd7');
      const userId = decoded.id;
  
       const user = await User.findById(userId)
      .populate({
        path: 'savedRecipes.recipeId',
        model: 'Recipe' // Ensure this matches the name of your recipe model
      })

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const savedRecipes = user.savedRecipes.map(({ recipeId, category }) => ({
        title: recipeId.title,
        content: recipeId.content,
        images: recipeId.images,
        url: recipeId.url,
        category
      }));
  
      res.status(200).json(savedRecipes);
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        return res.status(403).json({ error: "Invalid token" });
      }
      res.status(500).json({ error: error.message });
    }
  }
  else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end('Method Not Allowed');
  }
}  