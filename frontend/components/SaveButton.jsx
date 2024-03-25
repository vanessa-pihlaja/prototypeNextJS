import React, { useState, useMemo } from 'react';
import axios from 'axios';
import styles from '../styles/SaveButton.module.css';
import { useUser } from '../contexts/UserContext';

const SaveRecipeModal = ({ recipe, setShowSaveModal }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const { user } = useUser(); 

  const suggestedCategories = [
    'Nopeat arkiruoat',
    'Jälkkärit',
    'Brunssi',
  ]

  const userCategories = user?.categories || [];

  // Merge user categories with suggested categories and ensure uniqueness
  const allCategories = useMemo(() => Array.from(new Set([
    ...suggestedCategories,
    ...userCategories
  ])), [userCategories, suggestedCategories]);

  const handleSave = async () => {
    try {
      const categoryName = selectedCategory === 'new' ? newCategory : selectedCategory;

      await axios.post('/api/users/savedRecipe', {
        userId: user.id,
        recipeId: recipe._id,
        category: categoryName,
      });

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
          {allCategories.map((categoryName) => (
            <option key={categoryName} value={categoryName}>{categoryName}</option>
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
        <button className={styles.saveButton} onClick={handleSave}>Tallenna</button>
        <button className={styles.backButton} onClick={() => setShowSaveModal(false)}>Peruuta</button>
      </div>
    </div>
  );
};

export default SaveRecipeModal;
