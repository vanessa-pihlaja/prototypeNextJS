// components/SearchResultsComponent.jsx
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/searchcategories.module.css';
import SaveRecipeModal from './SaveButton'

const getFirstImageUrl = (images) => {
  if (Array.isArray(images) && images.length > 0) {
    return images[0]; // Return the first image if it's an array with at least one URL
  }
  return images; // Return the image if it's not an array or is an empty array
};

export default function SearchResultsComponent ({ searchResults }) {

  const [showSaveModal, setShowSaveModal] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(null);

  const handleSaveClick = (recipe) => {
    setCurrentRecipe(recipe);
    setShowSaveModal(true);
  };

  return (
    <div className={styles.recipesGrid}>
      {searchResults.map((recipe) => (
        <div key={recipe._id} className={styles.recipeCard}>
  
            <div className={styles.recipeImageWrapper}>
              <Link href={`/${recipe.title}`}>
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
              </Link>
              <button className={styles.buttonAtFirst} onClick={() => handleSaveClick(recipe)}>+</button>
            </div>
            <h2 className={styles.recipeTitle}><Link href={`/${recipe.title}`}>{recipe.title}</Link></h2>
        </div>
      ))}
      {showSaveModal && <SaveRecipeModal recipe={currentRecipe} setShowSaveModal={setShowSaveModal} />}
    </div>
  );
};