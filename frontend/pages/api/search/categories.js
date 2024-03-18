import dbConnect from '../../../src/utils/dbConnect';
import Recipe from '../../../src/models/recipe';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const categoriesWithRecipes = await Recipe.aggregate([
        {
          $group: {
            _id: "$category",
            recipes: {
              $push: {
                id: "$_id",
                title: "$title",
                firstImage: { $arrayElemAt: ["$images", 0] }
              }
            }
          }
        },
        {
          $project: {
            _id: 0,
            category: "$_id",
            recipes: 1
          }
        }
      ]);

      res.status(200).json(categoriesWithRecipes);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch categories and recipes', message: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end('Method Not Allowed');
  }
}
