import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/SaveButton.module.css'
import { useUser } from '../contexts/UserContext';



const SaveRecipeModal = ({ recipe, setShowSaveModal }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const { user } = useUser(); 
  console.log(user);

  // Include your suggested categories here
  // This could also come from props or state if you want it to be more dynamic
  const suggestedCategories = [
    { name: 'Vege' },
    { name: 'Nopeat arkiruoat' },
    { name: 'Pastat' },
    // Add more categories as needed
  ];

  const handleSave = async () => {
    try {
      // Logic to handle saving the recipe with the selected or new category
      console.log(`Saving ${recipe._id} to category:`, selectedCategory || newCategory);
      console.log('Recipe title:', recipe.title);
      const categoryName = selectedCategory === 'new' ? newCategory : selectedCategory;
      // Access user information from context


      console.log("UserID:", user?.id);
      await axios.post('/api/users/savedRecipe', {
        userId: user.id,
        recipeId: recipe._id,
        category: categoryName,
      });
      
      // Reset modal state
      setSelectedCategory('');
      setNewCategory('');
      setShowSaveModal(false);

    } catch (error) {
      console.error('Error saving recipe:', error);
      alert('Failed to save recipe.');
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={() => setShowSaveModal(false)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Tallenna resepti</h2>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">Valitse kategoria</option>
          {suggestedCategories.map((category) => (
            <option key={category.name} value={category.name}>{category.name}</option>
          ))}
          <option value="new">+ Uusi kategoria</option>
        </select>
        {selectedCategory === 'new' && (
          <input
            type="text"
            placeholder="Category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        )}
        <button onClick={handleSave}>Tallenna</button>
        <button onClick={() => setShowSaveModal(false)}>Peruuta</button>
      </div>
    </div>
  );
};

export default SaveRecipeModal;
