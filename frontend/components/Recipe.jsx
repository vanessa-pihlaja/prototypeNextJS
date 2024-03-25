import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/recipe.module.css';
import Image from 'next/image';
import SaveRecipeModal from './SaveButton';

export default function Recipe() {
    const [recipe, setRecipe] = useState(null);
    const router = useRouter();
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [currentRecipe, setCurrentRecipe] = useState(null);
    const { title } = router.query;

    const handleSaveClick = (recipe) => {
      setCurrentRecipe(recipe);
      setShowSaveModal(true);
    };

    useEffect(() => {
        if (title) {
            fetch(`/api/recipes/${encodeURIComponent(title)}`)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        setRecipe(data.data);
                    }
                })
                .catch(error => {
                    console.error('Failed to fetch recipe:', error);
                });
        }
    }, [title]);

    const getFirstImageUrl = (images) => {
        return Array.isArray(images) && images.length > 0 ? images[0] : '';
    };

    function stripHtml(html) {
        // This is a simplistic method and might not handle all edge cases.
        return html.replace(/<[^>]*>?/gm, '')
      }      

    const renderContent = (content) => {
        const lines = stripHtml(content).split('\n').filter(line => line.trim() !== '');
        return lines.map((line, index) => <p key={index}>{line}</p>);
    };

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.recipeContainer}>
          <h1 className={styles.recipeTitle}>{recipe.title}</h1>
          {recipe.images && recipe.images.length > 0 && (
        <div className={styles.recipeImage}>
          <Image
            src={getFirstImageUrl(recipe.images)} // Use your utility function
            alt={recipe.title}
            width={150}
            height={300}
            layout="responsive"
          />
          <div className={styles.buttonContainer}>
            <button className={styles.buttonAtFirst} onClick={() => handleSaveClick(recipe)}>Tallenna</button>
          </div>
          {showSaveModal && <SaveRecipeModal recipe={currentRecipe} setShowSaveModal={setShowSaveModal} />}
        </div>
        
      )}
          <p className={styles.recipeContent}>{renderContent(recipe.content)}</p>
          <p><a href={recipe.url} target="_blank" rel="noopener noreferrer">Katso alkuperäinen resepti</a></p>
        </div>
      )
}
