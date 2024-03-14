import React, { useState, useEffect } from 'react';
import recipeService from '../src/services/recipe'; 
import { useRouter } from 'next/router';
import styles from '../styles/recipe.module.css';
import Image from 'next/image'; // Import the Image component

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
        const lines = content.split('\n').filter(line => line.trim() !== '');
        return lines.map((line, index) => {
            return <p key={index}>{line}</p>;
        });
    };

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.recipeContainer}>
            <h1 className={styles.recipeTitle}>{recipe.title}</h1>
            {/* Update this part to use Next.js Image component */}
            {recipe.images && recipe.images[0] && (
                <div className={styles.recipeImage}>
                    <Image src={getFirstImageUrl(recipe.images)} alt={recipe.title} width={500} height={300} layout='responsive' />
                </div>
            )}
            {renderContent(recipe.content)}
            <p><a href={recipe.url} target="_blank" rel="noopener noreferrer">Katso alkuperäinen resepti</a></p>
        </div>
    );
};