import Link from 'next/link';
import { useState, useEffect } from 'react';
import feedService from '../src/services/feed';
import styles from '../styles/feed.module.css';

export default function Feed () {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    feedService
      .getAll()
      .then(initialRecipes => {
        setRecipes(initialRecipes);
      });
  }, []);

  // Utility function to get the first image URL
  const getFirstImageUrl = (images) => {
    if (Array.isArray(images) && images.length > 0) {
      return images[0]; // Return the first image if it's an array with at least one URL
    }
    return images; // Return the image if it's not an array or is an empty array
  };

  return (
    <div>
      <div className={styles.feedcontainer}>
        {recipes.map(recipe => (
          <div className={styles.recipeCard} key={recipe.title}>
            
            <img className={styles.recipeImage} src={getFirstImageUrl(recipe.images)} alt={recipe.title} />
            <h2>
              <Link href={`/${recipe.title}`}>{recipe.title}</Link>
            </h2>
            {/* You can add more recipe details here */}
          </div>
        ))}
      </div>
      </div>
  );
}

