import React, { useState, useEffect } from 'react';
import recipeService from '../src/services/recipe'; 
import { useRouter } from 'next/router';
import styles from '../styles/recipe.module.css';


export default function Recipe () {
    const [recipe, setRecipe] = useState(null);
    const router = useRouter();
    const { title } = router.query;

    
    useEffect(() => {
        if (title) {
            recipeService.findRecipe({ title })
                .then(foundRecipe => {
                    setRecipe(foundRecipe);
                })
                .catch(error => {
                    console.error('Failed to fetch recipe:', error);
                });
        }
    }, [title]);


    const getFirstImageUrl = (images) => {
        return Array.isArray(images) && images.length > 0 ? images[0] : '';
    };

    const renderContent = (content) => {
        //console.log("Original content:", content);
        const lines = content.split('\n').filter(line => line.trim() !== '');
    
        return lines.map((line, index) => {
            //console.log(`Line ${index}:`, line);
            return <p key={index}>{line}</p>;
        });
    };

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.recipeContainer}>
            <h1 className={styles.recipeTitle}>{recipe.title}</h1>
            <img className={styles.recipeImage} src={getFirstImageUrl(recipe.images)} alt={recipe.title} />
            {renderContent(recipe.content)}
            <p><a href={recipe.url} target="_blank" rel="noopener noreferrer">Katso alkuperäinen resepti</a></p>
        </div>
    );
};
