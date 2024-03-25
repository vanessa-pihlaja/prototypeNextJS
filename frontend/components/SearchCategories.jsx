import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/searchcategories.module.css';
import Link from 'next/link';
import SaveRecipeModal from './SaveButton'


function CategoriesComponent({ categories }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(null);

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null); // If the category is clicked again, it will close
    } else {
      setSelectedCategory(category); // Open the clicked category
    }
  };

  const handleSaveClick = (recipe) => {
    setCurrentRecipe(recipe);
    setShowSaveModal(true);
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
              <div className={styles.recipesGrid}>
                {categoryData.recipes.map((recipe) => (
                  <div key={recipe.id} className={styles.recipeBlock}> {/* Move key prop here */}
                    <div className={styles.recipeCard} style={{ position: 'relative' }}>
                      <Link href={`/${recipe.title}`}>
                        {recipe.firstImage && (
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
                        )}
                      </Link>
                      <button className={styles.buttonAtFirst} onClick={() => handleSaveClick(recipe)}>+</button>
                    </div>
                    <h2 className={styles.recipeTitle}><Link href={`/${recipe.title}`}>{recipe.title}</Link></h2>
                  </div>
                ))}
                {showSaveModal && <SaveRecipeModal recipe={currentRecipe} setShowSaveModal={setShowSaveModal} />}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default CategoriesComponent;
