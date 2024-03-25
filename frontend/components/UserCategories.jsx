import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/usercategories.module.css';

const UserCategories = ({ savedRecipes = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  console.log(`saved recipes: ${savedRecipes}`)
  // This structure holds the first image for each category
  const categoryImages = savedRecipes.reduce((acc, recipe) => {
    if (!acc[recipe.category] && recipe.images?.length > 0) {
      acc[recipe.category] = recipe.images[0]; // Store the first image of the first recipe encountered in each category
    }
    return acc;
  }, {});

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category); // Toggle selection
  };

  const getFirstImageUrl = (images) => {
    if (Array.isArray(images) && images.length > 0) {
      return images[0]; // Return the first image if it's an array with at least one URL
    }
    return images; // Return the image if it's not an array or is an empty array
  };

  return (
    <div className={styles.gridContainer}>
      {Object.keys(categoryImages).map((category, index) => (
        <div key={index} className={styles.categoryItem}>
          <h2 onClick={() => handleCategoryClick(category)} style={{ cursor: 'pointer' }} className={styles.categoryTitle}>
            {category}
          </h2>
          {selectedCategory === null && (
            <div className={styles.categoryImageWrapper}>
              <Image
                src={categoryImages[category]}
                alt={`${category}`}
                layout="fill" // This tells Next.js to fill the parent div
                className={styles.categoryImage}
                objectFit="cover" // Adjust how the image fits within its box
              />
            </div>
          )}
         
          {selectedCategory === category && (
            <div>
              {savedRecipes.filter(recipe => recipe.category === category).map((recipe, recipeIndex) => (
                <div key={recipeIndex}>
                  <h3>{recipe.title}</h3>
                  <Image
                  width={200}
                  height={500}
                  style={{ width: '100%', height: '100%' }}
                  src={getFirstImageUrl(recipe.images)} 
                  alt={recipe.title}
                  layout="responsive"
                  priority
                />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserCategories;
