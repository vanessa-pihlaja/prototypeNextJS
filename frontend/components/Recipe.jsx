import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/recipe.module.css'; // Make sure your styles are correctly linked
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
        return html.replace(/<[^>]*>?/gm, '');
    }      

    const renderContent = (content) => {
        // Insert a newline before each <ul> and <ol> to ensure space is added before these elements
        const preprocessedContent = content.replace(/(<ul>|<ol>)/g, '\n$1');
      
        // Strip HTML and split into lines, then filter out empty lines
        const lines = stripHtml(preprocessedContent).split('\n').filter(line => line.trim() !== '');
      
        // Map each line to a <p> tag for rendering
        return lines.map((line, index) => <p key={index}>{line}</p>);
      };
      

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.recipeContainer}>
            <div className={styles.buttonContainer}>
                <button
                    className={styles.backButton}
                    onClick={() => router.back()}
                    aria-label="Back"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.backIcon}>
                        <path d="M19 12H5"></path>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                </button>
            </div>
            <h1 className={styles.recipeTitle}>{recipe.title}</h1>
            {recipe.images && recipe.images.length > 0 && (
                <div className={styles.recipeImage}>
                    <Image
                        src={getFirstImageUrl(recipe.images)}
                        alt={recipe.title}
                        width={150}
                        height={300}
                        layout="responsive"
                        blurDataURL={'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='}
                        placeholder='blur'
                        priority
                    />
                </div>
            )}
            <div className={styles.contentAfterImage}></div>
            <div className={styles.buttonContainer}>
                <div className={styles.ownerName}>{recipe.owner}</div>
                <button className={styles.buttonAtFirst} onClick={() => handleSaveClick(recipe)}>Tallenna</button>
            </div>
            {showSaveModal && <SaveRecipeModal recipe={currentRecipe} setShowSaveModal={setShowSaveModal} />}

            <p className={styles.recipeContent}>{renderContent(recipe.content)}</p>

            <div className={styles.recipeUrl}>
                <p><a href={recipe.url} target="_blank" rel="noopener noreferrer">Katso alkuperäinen resepti</a></p>
            </div>
        </div>
    );
}
