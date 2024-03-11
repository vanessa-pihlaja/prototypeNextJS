import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/feed.module.css';
import Image from 'next/image';

// Utility function to get the first image URL
const getFirstImageUrl = (images) => {
  if (Array.isArray(images) && images.length > 0) {
    return images[0];
  }
  return images;
};

// Assume each Image component calls this when it finishes loading
const onImageLoad = (batchIndex, setImageLoaded) => {
  setImageLoaded((prev) => {
    const newLoaded = [...prev];
    newLoaded[batchIndex] = true;
    return newLoaded;
  });
};

export default function Feed({ batches }) {
  // Track loaded state for each batch
  const [imageLoaded, setImageLoaded] = useState(new Array(batches.length).fill(false));

  // Reveal batches when the first batch's images are loaded
  useEffect(() => {
    if (imageLoaded[0]) {
      // Potentially wait for more batches to be "preloaded" here
      // For simplicity, we're just checking the first batch
      setImageLoaded(new Array(batches.length).fill(true));
    }
  }, [imageLoaded]);

  return (
    <div>
      {batches.map((recipes, batchIndex) => (
        <div key={batchIndex} className={`${styles.batchContainer} ${imageLoaded[batchIndex] ? styles.visible : styles.hidden}`}>
          <div className={styles.feedcontainer}>
            {recipes.map((recipe) => (
              <div className={styles.recipeCard} key={recipe.title}>
                <Image
                  width={200}
                  height={500}
                  style={{ width: '100%', height: '100%' }}
                  className={styles.recipeImage}
                  src={getFirstImageUrl(recipe.images)}
                  alt={recipe.title}
                  placeholder="blur"
                  blurDataURL={'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='}
                  priority={batchIndex === 0}
                  onLoad={() => onImageLoad(batchIndex, setImageLoaded)}
                />
                <h2>
                  <Link href={`/${recipe.title}`}>{recipe.title}</Link>
                </h2>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}