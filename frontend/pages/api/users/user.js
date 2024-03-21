import jwt from 'jsonwebtoken';
import dbConnect from '../../../src/utils/dbConnect';
import User from '../../../src/models/user';

export default async function handler(req, res) {
  await dbConnect();

  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    const decoded = jwt.verify(token, 'ba67b720d047a8c39ebe8c751167ccd7');
    const user = await User.findById(decoded.id).select('-password'); // Exclude password

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const savedCategories = [...new Set(user.savedRecipes.map(recipe => recipe.category))];

    res.status(200).json({ user: { id: user._id, username: user.username, name: user.name, categories: savedCategories } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
