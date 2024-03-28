import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/searchcategories.module.css'; // Ensure this is the correct path to your CSS module
import SaveRecipeModal from './SaveButton'; // Ensure this is the correct path to your component

function CategoriesComponent({ categories }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  // State to manage the number of visible recipe sets (batches of 30 recipes)
  const [visibleRecipeSets, setVisibleRecipeSets] = useState({});

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null); // If the category is clicked again, it will close
    } else {
      setSelectedCategory(category); // Open the clicked category
      // Initialize visible sets for a newly selected category if not already set
      if (!visibleRecipeSets[category]) {
        setVisibleRecipeSets({ ...visibleRecipeSets, [category]: 1 });
      }
    }
  };

  const handleSaveClick = (recipe) => {
    setCurrentRecipe(recipe);
    setShowSaveModal(true);
  };

  const loadMoreRecipes = (category) => {
    // Increment the number of visible recipe sets for the category
    setVisibleRecipeSets({
      ...visibleRecipeSets,
      [category]: (visibleRecipeSets[category] || 1) + 1,
    });
  };

  return (
    <div className={styles.gridContainer}>
      <div className={styles.buttonContainer}>
        {selectedCategory && (
          <button
            id="backButton"
            className={`${styles.backButton} ${selectedCategory ? '' : styles.hidden}`}
            onClick={() => setSelectedCategory(null)}
            aria-label="Back to categories"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.backIcon}>
              <path d="M19 12H5"></path>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
        )}
      </div>
      {categories.map((categoryData, index) => {
        // If a category is selected and it's not the current one, don't render it
        if (selectedCategory && selectedCategory !== categoryData.category) {
          return null;
        }

        return (
          <div key={index} className={styles.categoryItem}>
            <div className={styles.catgoryWrapper}>
              <h2
                className={styles.categoryTitle}
                onClick={() => handleCategoryClick(categoryData.category)}
                role="button"
                tabIndex={0}
              >
                {categoryData.category}
              </h2>

              {selectedCategory !== categoryData.category && categoryData.coverImage && (
                <div
                  className={styles.categoryImageWrapper}
                  onClick={() => handleCategoryClick(categoryData.category)}
                  role="button"
                  tabIndex={0}
                >
                  <Image
                    src={categoryData.coverImage}
                    alt={`${categoryData.category} cover`}
                    layout="fill"
                    objectFit="cover"
                    className={styles.categoryImage}
                  />
                </div>
              )}
            </div>

            {selectedCategory === categoryData.category && (
              Array.from({ length: visibleRecipeSets[categoryData.category] || 1 }).map((_, setIndex) => (
                <div key={setIndex} className={styles.recipesGrid}>
                  {categoryData.recipes.slice(setIndex * 30, (setIndex + 1) * 30).map((recipe) => (
                    <div key={recipe.id} className={styles.recipeBlock}>
                      <div className={styles.recipeCard} style={{ position: 'relative' }}>
                        <Link href={`/${recipe.title}`}>
                          <div className={styles.recipeImageWrapper}>
                            <Image
                              width={200}
                              height={500}
                              src={recipe.firstImage}
                              alt={recipe.title}
                              layout="responsive"
                              className={styles.recipeImage}
                            />
                          </div>
                        </Link>
                        <button className={styles.buttonAtFirst} onClick={() => handleSaveClick(recipe)}>+</button>
                      </div>
                      <h2 className={styles.recipeTitle}><Link href={`/${recipe.title}`}>{recipe.title}</Link></h2>
                    </div>
                  ))}
                </div>
              ))
            )}
            {selectedCategory === categoryData.category && categoryData.recipes.length > (visibleRecipeSets[categoryData.category] || 1) * 30 && (
              <div className={styles.loadMoreContainer}>
                <button onClick={() => loadMoreRecipes(categoryData.category)} className={styles.loadMoreButton}>
                  Load More
                </button>
              </div>
            )}
          </div>
        );
      })}
      {showSaveModal && <SaveRecipeModal recipe={currentRecipe} setShowSaveModal={setShowSaveModal} />}
    </div>
  );
}

export default CategoriesComponent;
