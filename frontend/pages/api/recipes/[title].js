import dbConnect from '../../../src/utils/dbConnect';
import Recipe from '../../../src/models/recipe';

export default async function handler(req, res) {
  const {
    query: { title },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const recipe = await Recipe.findOne({ title: decodeURIComponent(title) });
        if (!recipe) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: recipe });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
