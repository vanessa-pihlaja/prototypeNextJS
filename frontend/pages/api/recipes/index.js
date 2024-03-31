import dbConnect from '../../../src/utils/dbConnect';
import Recipe from '../../../src/models/recipe';

// Pseudo-random number generator
function mulberry32(seed) {
    return function() {
        let t = seed += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

// Seeded shuffle function
function seededShuffle(array, seed) {
    const rng = mulberry32(seed);
    const result = array.slice();
    for (let i = result.length - 1; i > 0; i--) {
        const swapIndex = Math.floor(rng() * (i + 1));
        [result[i], result[swapIndex]] = [result[swapIndex], result[i]];
    }
    return result;
}

// Cache for storing the shuffled recipes and the last shuffle time
let cache = {
    lastShuffleTime: null,
    shuffledRecipes: []
};

export default async function handler(req, res) {
    await dbConnect();
  
    const { page = 1 } = req.query;
    const batchSize = 20;
    const currentTime = new Date().getTime();
    const thirtyMinutes = 10 * 60 * 1000; // 10 minutes until updates

    // Shuffle only if more than 10 minutes have passed or if cache is empty
    if (!cache.lastShuffleTime || currentTime - cache.lastShuffleTime > thirtyMinutes) {
        let recipes = await Recipe.find({}).select('_id title owner images').lean();
        // Use a consistent seed based on the current half-hour to ensure the shuffle is consistent across requests
        const seed = Math.floor(currentTime / thirtyMinutes);
        cache.shuffledRecipes = seededShuffle(recipes, seed);
        cache.lastShuffleTime = currentTime;
    }
  
    const startIndex = (page - 1) * batchSize;
    const selectedRecipes = cache.shuffledRecipes.slice(startIndex, startIndex + batchSize).map(recipe => ({
        _id: recipe._id.toString(),
        title: recipe.title,
        owner: recipe.owner,
        firstImageUrl: recipe.images.length > 0 ? recipe.images[0] : null,
    }));
  
    res.status(200).json(selectedRecipes);
}
