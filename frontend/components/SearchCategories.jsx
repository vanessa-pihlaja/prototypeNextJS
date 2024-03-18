import { useState } from 'react';

function CategoriesComponent({ categories }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div>
      {categories.map((categoryData, index) => (
        <div key={index}>
          <button onClick={() => setSelectedCategory(categoryData.category)}>
            {categoryData.category}
          </button>
          {selectedCategory === categoryData.category && (
            <div>
              {categoryData.recipes.map((recipe, recipeIndex) => (
                <div key={recipe.id}>
                  <p>{recipe.title}</p>
                  {recipe.firstImage && (
                    <img src={recipe.firstImage} alt={recipe.title} style={{ width: '100px', height: '100px' }} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default CategoriesComponent;
