import { useState } from 'react';
import styles from '../styles/search.module.css'; // Ensure you have this CSS file

const SearchComponent = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from causing a page reload
    onSearch(searchTerm); // Trigger the search in the parent component
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchbar}>
      <input
        type="text"
        placeholder="Hae reseptejä..."
        value={searchTerm}
        onChange={handleSearchChange}
        className={styles.searchInput}
        required // Ensures that the button shows up even if input is not focused but has content
      />
      <button type="submit" className={styles.searchButton}></button>
    </form>
  );
};

export default SearchComponent;
