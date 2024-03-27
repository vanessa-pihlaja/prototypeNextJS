import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/searchcategories.module.css'; // Import your CSS module
import SaveRecipeModal from './SaveButton';

const getFirstImageUrl = (images) => {
  if (Array.isArray(images) && images.length > 0) {
    return images[0];
  }
  return images;
};

export default function SearchResultsComponent({ searchResults }) {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [visibleSets, setVisibleSets] = useState(1);

  const handleSaveClick = (recipe) => {
    setCurrentRecipe(recipe);
    setShowSaveModal(true);
  };

  const loadMoreRecipes = () => {
    setVisibleSets(prevVisibleSets => prevVisibleSets + 1);
  };

  return (
    <div>
      {Array.from({ length: visibleSets }, (_, index) => 
        <div key={index} className={styles.recipesGrid}>
          {searchResults.slice(index * 30, (index + 1) * 30).map((recipe) => (
            <div key={recipe._id} className={styles.recipeBlock}>
              <div className={styles.recipeCard}>
                <div className={styles.recipeImage} style={{ position: 'relative' }}>
                  <Link href={`/${recipe.title}`}>
                    <Image
                      width={200}
                      height={500}
                      className={styles.recipeImage}
                      src={getFirstImageUrl(recipe.images)}
                      alt={recipe.title}
                      layout="responsive"
                    />
                  </Link>
                  <button className={styles.buttonAtFirst} onClick={() => handleSaveClick(recipe)}>+</button>
                </div>
              </div>
              <h2 className={styles.recipeTitle}><Link href={`/${recipe.title}`}>{recipe.title}</Link></h2>
            </div>
          ))}
        </div>
      )}
      {searchResults.length > visibleSets * 30 && (
        <div className={styles.loadMoreContainer}>
          <button onClick={loadMoreRecipes} className={styles.loadMoreButton}>
            Load More
          </button>
        </div>
      )}
      {showSaveModal && <SaveRecipeModal recipe={currentRecipe} setShowSaveModal={setShowSaveModal} />}
    </div>
  );
};
