// components/SearchResultsComponent.jsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/searchcategories.module.css'; // Adjust path as needed

const SearchResultsComponent = ({ searchResults }) => {
  return (
    <div className={styles.recipesGrid}>
      {searchResults.map((recipe) => (
        <div key={recipe._id} className={styles.recipeCard}>
          <Link href={`/${recipe.title}`} passHref>
            <div className={styles.recipeImageWrapper}>
              {recipe.images && recipe.images[0] && (
                <Image
                  src={recipe.images[0]}
                  alt={recipe.title}
                  width={200}
                  height={200} // Adjust dimensions as needed
                  layout="responsive"
                  objectFit="cover"
                  className={styles.recipeImage}
                />
              )}
            </div>
            <h3 className={styles.recipeTitle}>{recipe.title}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SearchResultsComponent;
