import { useState, useEffect } from 'react';
import Feed from '../components/Feed';
import styles from '../styles/feed.module.css';
import Navbar from '@/components/Navbar';

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [seed, setSeed] = useState('');
  const [batches, setBatches] = useState([]);


  useEffect(() => {
    // Generate a new seed on each component mount
    const newSeed = Date.now().toString();
    setSeed(newSeed);

    fetchRecipes(1, newSeed); // Fetch initial batch of recipes
  }, []);

  const fetchRecipes = async (page, seed) => {
    const response = await fetch(`/api/recipes?page=${page}&seed=${seed}`);
    const newRecipes = await response.json();
    setBatches(prevBatches => [...prevBatches, newRecipes]);
  };

  const loadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
    fetchRecipes(currentPage + 1, seed);
  };

  return (
    <div>
            <header>
        <h1>miamia</h1>
      </header>
      <Navbar />
      <Feed batches={batches} />
      <button className={styles.loadMoreButton} onClick={loadMore}>Lataa lisää</button>
      <footer>
      </footer>
    </div>
  );
}
