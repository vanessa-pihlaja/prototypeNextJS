// pages/api/search.js
import dbConnect from '../../src/utils/dbConnect';
import Recipe from '../../src/models/recipe'; // Adjust the import path based on your project structure

export default async function handler(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'A query parameter is required.' });
  }

  await dbConnect();

  // Perform the search query
  const results = await Recipe.aggregate([
    {
      $search: {
        index: 'default', // Use the name of the index you created
        text: {
          query: query,
          path: ['title', 'content'], // Specify the fields you want to search in
          fuzzy: {}
        }
      }
    },
    {
      $limit: 20 // Limit the number of results (adjust as needed)
    },
    {
      $project: { title: 1, description: 1, images: 1 } // Specify which fields to include in the results
    }
  ]);

  res.status(200).json(results);
}
