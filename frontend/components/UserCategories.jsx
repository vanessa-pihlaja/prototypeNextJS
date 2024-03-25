import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/usercategories.module.css';
import { useUser } from '../contexts/UserContext';
import axios from 'axios';

const UserCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [savedRecipes, setSavedRecipes] = useState([]); // State to store fetched recipes
  const { user } = useUser(); // Access user context

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      // Exit early if no user ID is available
      if (!user?.id) return;

      try {
        // Replace '/api/users/savedRecipe' with your actual API endpoint that expects a user ID
        // Adjust headers or params as per your API's authentication mechanism
        const response = await axios.get('/api/users/savedRecipe', {
          headers: { 'X-User-ID': user.id },
        });
        setSavedRecipes(response.data); // Update state with fetched recipes
      } catch (error) {
        console.error('Failed to fetch saved recipes:', error);
        setSavedRecipes([]); // Reset or handle error state as needed
      }
    };

    fetchSavedRecipes();
  }, [user?.id]); // Re-fetch recipes whenever the user ID changes

  
  const categoryImages = savedRecipes.reduce((acc, recipe) => {
    if (!acc[recipe.category] && recipe.images?.length > 0) {
      acc[recipe.category] = recipe.images[0]; 
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
