import { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/searchcategories.module.css';
import Link from 'next/link';

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
            {/* Category Title always at the top */}
            <h2 
              className={styles.categoryTitle} 
              onClick={() => handleCategoryClick(categoryData.category)} 
              role="button" 
              tabIndex={0}
            >
              {categoryData.category}
            </h2>

            {/* Only show the cover image if the category is not selected */}
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

            {/* Recipes list for the selected category */}
            {selectedCategory === categoryData.category && (
              <div className={styles.recipesGrid}>
                {categoryData.recipes.map((recipe) => (
                  <div key={recipe.id} className={styles.recipeCard}>
                    {recipe.firstImage && (
                      <div>
                        <Image
                          width={200}
                          height={500}
                          style={{ width: '100%', height: '100%' }}
                          src={recipe.firstImage}
                          alt={recipe.title}
                          layout="responsive"
                        />
                      </div>
                    )}
                    <h3 className={styles.recipeTitle}>
                    <Link href={`/${recipe.title}`}>{recipe.title}</Link>
                    </h3>
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
