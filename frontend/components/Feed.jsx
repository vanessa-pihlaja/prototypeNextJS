import Link from 'next/link';
import styles from '../styles/feed.module.css';
import Image from 'next/image';

// Utility function to get the first image URL
const getFirstImageUrl = (images) => {
  if (Array.isArray(images) && images.length > 0) {
    return images[0]; // Return the first image if it's an array with at least one URL
  }
  return images; // Return the image if it's not an array or is an empty array
};

export default function Feed({ batches }) {
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
                  blurDataURL={'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='}
                  placeholder='blur'
                  priority
                  // unoptimized
                />
                <h2>
                  <Link href={`/${recipe.title}`}>{recipe.title}</Link>
                </h2>
                {/* You can add more recipe details here */}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
