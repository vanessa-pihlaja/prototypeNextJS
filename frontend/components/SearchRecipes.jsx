import { useState } from 'react';
import styles from '../styles/search.module.css'; // Ensure you have this CSS file

const SearchComponent = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    if (newSearchTerm.trim() === '') {
      onSearch(''); // Immediately invoke onSearch with an empty string when search term is erased
    }
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
        required
      />
      <button type="submit" className={styles.searchButton}></button>
    </form>
  );
};

export default SearchComponent;
