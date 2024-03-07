//import React, { useState, useEffect } from 'react';
//import { useRouter } from 'next/router';
//import recipeService from '../../src/services/recipe'; 
//import styles from '../../styles/recipe.module.css';
import Recipe from '../../components/Recipe';



export default function RecipePage () {

    /*
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
        console.log("Original content:", content);
        const lines = content.split('\n').filter(line => line.trim() !== '');
    
        return lines.map((line, index) => {
            console.log(`Line ${index}:`, line);
            return <p key={index}>{line}</p>;
        });
    };
    
    


    if (!recipe) {
        return <div>Loading...</div>;
    }

    */
    return (
        <div>
            <header>
                <h1>miamia</h1>
            </header>

        <Recipe />  

        
        <footer></footer>
        </div>
    );
};

/*export async function getStaticProps() {
  
    // Fetch data from external API
    // const res = await fetch(`http://localhost:3000/api/recipes`)
    // const data = await res.json()
  
    const data = await recipeService.findRecipe();
  
    //const subData = data.slice(0,200)
    //console.log(subData.length)
   
    // Pass data to the page via props
    return { props: { recipe: data } }
  
  }
*/
/* TÄÄ OLI AIEMMIN RECIPE RETURNISSA, LAITA TAKAS JOS TARVII
  <div className={styles.recipeContainer}>
  <h1 className={styles.recipeTitle}>{recipe.title}</h1>
  <img className={styles.recipeImage} src={getFirstImageUrl(recipe.images)} alt={recipe.title} />
  {renderContent(recipe.content)}
  <p><a href={recipe.url} target="_blank" rel="noopener noreferrer">Katso alkuperäinen resepti</a></p>
</div>
*/