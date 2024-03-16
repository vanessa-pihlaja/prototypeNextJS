import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/feed.module.css';
import Image from 'next/image';
import SaveRecipeModal from './SaveRecipeModal';


// Utility function to get the first image URL
const getFirstImageUrl = (images) => {
  if (Array.isArray(images) && images.length > 0) {
    return images[0]; // Return the first image if it's an array with at least one URL
  }
  return images; // Return the image if it's not an array or is an empty array
};

export default function Feed({ batches }) {

  const [showSaveModal, setShowSaveModal] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(null);

  const handleSaveClick = (recipe) => {
    setCurrentRecipe(recipe);
    setShowSaveModal(true);
  };


  return (
    <div>
      {batches.map((recipes, batchIndex) => (
        <div key={batchIndex} className={styles.batchContainer}>
          <div className={styles.feedcontainer}>
            {recipes.map(recipe => (
              <div className={styles.recipeCard} key={recipe.title}>
                <Image
                  width={200}
                  height={500}
                  style={{ width: '100%', height: '100%' }}
                  className={styles.recipeImage} 
                  src={getFirstImageUrl(recipe.images)} 
                  alt={recipe.title}
                  layout="responsive"
                  blurDataURL={'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='}
                  placeholder='blur'
                  priority
                  // unoptimized
                />
                <h2>
                  <Link href={`/${recipe.title}`}>{recipe.title}</Link>
                </h2>
                <button onClick={() => handleSaveClick(recipe)}>Tallenna</button>
              </div>
            ))}
          </div>
        </div>
      ))}
      {/* Modal or dropdown for saving the recipe to a category */}
      {showSaveModal && <SaveRecipeModal recipe={currentRecipe} setShowSaveModal={setShowSaveModal} />}
    </div>
  );
}
