import { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/searchcategories.module.css';

function CategoriesComponent({ categories }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null); // If the category is clicked again, it will close
    } else {
      setSelectedCategory(category); // Open the clicked category
    }
  };

  return (
    <div className={styles.gridContainer}>
      {categories.map((categoryData, index) => {
        // If a category is selected and it's not the current one, don't render it
        if (selectedCategory && selectedCategory !== categoryData.category) {
          return null;
        }

        return (
          <div key={index} className={styles.categoryItem}>
            {/* Toggle area */}
            <div
              className={styles.categoryToggle}
              onClick={() => handleCategoryClick(categoryData.category)}
              role="button"
              tabIndex={0}
              onKeyPress={() => handleCategoryClick(categoryData.category)} // For accessibility
            >
              {/* Hide the cover image if this category is the one that's currently open */}
              {selectedCategory !== categoryData.category && categoryData.coverImage && (
                <div className={styles.categoryImageWrapper}>
                  <Image
                    src={categoryData.coverImage}
                    alt={`${categoryData.category} cover`}
                    layout="fill"
                    objectFit="cover"
                    className={styles.categoryImage}
                  />
                </div>
              )}
              <h2 className={styles.categoryTitle}>{categoryData.category}</h2>
            </div>
            {/* Recipes list */}
            {selectedCategory === categoryData.category && (
              <div className={styles.recipesGrid}>
                {categoryData.recipes.map((recipe, recipeIndex) => (
                  <div key={recipe.id} className={styles.recipeItem}>
                    <p>{recipe.title}</p>
                    {recipe.firstImage && (
                      <div className={styles.categoryImageWrapper}>
                        <Image
                          src={recipe.firstImage}
                          alt={recipe.title}
                          layout="responsive"
                          width={100} // These values are placeholders
                          height={100} // Adjust based on your aspect ratio
                          objectFit="cover"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default CategoriesComponent;