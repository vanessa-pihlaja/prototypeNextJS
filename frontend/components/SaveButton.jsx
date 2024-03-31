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

  
  const allCategories = useMemo(() => Array.from(new Set([
    ...suggestedCategories,
    ...userCategories
  ])), [userCategories, suggestedCategories]);

  const handleSave = async () => {
    let categoryName = '';
    try {
      const categoryName = selectedCategory === 'new' ? newCategory : selectedCategory;

      await axios.post('/api/users/savedRecipe', {
        userId: user.id,
        recipeId: recipe._id,
        category: categoryName,
      });

      if (!allCategories.includes(categoryName)) {
        userCategories.push(categoryName);
      }

      setSelectedCategory('');
      setNewCategory('');
      setShowSaveModal(false);
    } catch (error) {
      console.error('Error saving recipe:', error);
      alert(`Olet jo tallentanut kyseisen reseptin.`);
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={() => setShowSaveModal(false)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>Tallenna resepti</h2>
        <select className={styles.categoryList} value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">Valitse kategoria</option>
          {allCategories.map((categoryName) => (
            <option className={styles.categoryList} key={categoryName} value={categoryName} >{categoryName}</option>
          ))}
          <option value="new">+ Uusi kategoria</option>
        </select>
        {selectedCategory === 'new' && (
          <input
            type="text"
            placeholder=" Kategorian nimi"
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
