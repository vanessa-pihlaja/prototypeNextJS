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

    function stripHtmlAndPrepareForSpacing(html) {
        let modifiedHtml = html
            .replace(/<ul>/g, '[EMPTY_LINE_HERE]<ul>')
            .replace(/<\/ul>/g, '</ul>[EMPTY_LINE_HERE]')
            .replace(/<ol>/g, '[EMPTY_LINE_HERE]<ol>')
            .replace(/<\/ol>/g, '</ol>[EMPTY_LINE_HERE]');

        const strippedHtml = modifiedHtml.replace(/<[^>]*>?/gm, '');
        return strippedHtml;
    }

    const renderContent = (content) => {
        const lines = stripHtmlAndPrepareForSpacing(content)
            .split('\n')
            .filter(line => line.trim() !== '' || line.includes('[EMPTY_LINE_HERE]'));

        return lines.map((line, index) => {
            if (line.includes('[EMPTY_LINE_HERE]')) {
                return <div key={index} className={styles.emptyLine}></div>;
            } else {
                return <p key={index}>{line}</p>;
            }
        });
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
