import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/searchcategories.module.css'; // Use the same style sheet
import { useUser } from '../contexts/UserContext';
import axios from 'axios';
import Link from 'next/link';

const UserCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      if (!user?.id) return;
      try {
        const response = await axios.get('/api/users/savedRecipe', {
          headers: { 'X-User-ID': user.id },
        });
        setSavedRecipes(response.data);
      } catch (error) {
        console.error('Failed to fetch saved recipes:', error);
        setSavedRecipes([]);
      }
    };
    fetchSavedRecipes();
  }, [user?.id]);

  const categoryImages = savedRecipes.reduce((acc, recipe) => {
    if (recipe.images?.length > 0) {
      acc[recipe.category] = recipe.images[0];
    }
    return acc;
  }, {});

  const categoriesWithRecipes = Object.keys(categoryImages).filter(category =>
    savedRecipes.some(recipe => recipe.category === category)
  );

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  return (
    <div className={styles.gridContainer}>
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
      {categoriesWithRecipes.map((category, index) => {
        if (selectedCategory && selectedCategory !== category) {
          return null;
        }

        return (
          <div key={index} className={styles.categoryItem}>
            <h2 
              className={styles.categoryTitle} 
              onClick={() => handleCategoryClick(category)} 
              role="button" 
              tabIndex={0}
            >
              {category}
            </h2>

            {/* Conditional rendering to not show the category image if this category is selected */}
            {!selectedCategory && categoryImages[category] && (
              <div 
                className={styles.categoryImageWrapper} 
                onClick={() => handleCategoryClick(category)} 
                role="button" 
                tabIndex={0}
              >
                <Image
                  src={categoryImages[category]}
                  alt={`${category} cover`}
                  layout="fill"
                  objectFit="cover"
                  className={styles.categoryImage}
                />
              </div>
            )}

            {selectedCategory === category && (
              <div className={styles.recipesGrid}>
                {savedRecipes.filter(recipe => recipe.category === category).map((recipe, recipeIndex) => (
                  <div key={recipeIndex} className={styles.recipeBlock}>
                    <div className={styles.recipeCard} style={{ position: 'relative' }}>
                      <Link href={`/${recipe.title}`}>
                        <Image
                          width={200}
                          height={500}
                          src={recipe.images?.[0]}
                          alt={recipe.title}
                          layout="responsive"
                          className={styles.recipeImage}
                        />
                      </Link> 
                      <div className={styles.ownerName}>{recipe.owner}</div>
                    </div>
                    <h2 className={styles.recipeTitle}><Link href={`/${recipe.title}`}>{recipe.title}</Link></h2>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default UserCategories;
