require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
    const app = express();
    app.use(cors());
    app.use(express.json());

    // Assuming your Recipe model and mongoose connection setup are correct
    const Recipe = require('./models/recipe');

    // Adjusted function to correctly locate your JSON files within the /api directory
    function loadAndFilterRecipes(fileName) {
        const filePath = path.join(__dirname, fileName); // Correctly locate the JSON file
        try {
            let recipes = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            return recipes.filter(recipe => recipe.title && recipe.content && recipe.images && recipe.images.length > 0);
        } catch (error) {
            console.error(`Error reading file ${filePath}:`, error);
            return [];
        }
    }

    // Load and filter recipes
    let recipesContent = loadAndFilterRecipes('bellatable.json');
    let anninuunissaRecipes = loadAndFilterRecipes('anninuunissa.json');
    let recipes = [...recipesContent, ...anninuunissaRecipes]; // Combine and filter

    // API routes
    app.get('/api/recipes', (req, res) => {
        res.json(recipes);
    });

    app.get('/api/recipes/:title', (req, res) => {
        const title = req.params.title.toLowerCase(); // Assuming titles are case-insensitive
        const recipe = recipes.find(r => r.title.toLowerCase() === title);

        if (recipe) {
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.json(recipe);
        } else {
            res.status(404).send({ error: 'Recipe not found' });
        }
    });

    app.post('/api/recipes', (req, res) => {
        const body = req.body;

        if (!body.name || body.name.length === 0) {
            return res.status(400).json({ error: 'content missing' });
        }

        const recipe = new Recipe({
            name: body.name,
            content: body.content,
        });

        recipe.save().then(savedRecipe => {
            res.json(savedRecipe);
        });
    });

    // Next.js page handling
    app.all('*', (req, res) => {
        return handle(req, res);
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${PORT}`);
    });
});
