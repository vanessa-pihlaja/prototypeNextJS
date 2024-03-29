import { useState, useEffect } from 'react';
import Feed from '../components/Feed';
import styles from '../styles/feed.module.css';
import Navbar from '@/components/Navbar';
import jwt from 'jsonwebtoken';

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [seed, setSeed] = useState('');
  const [batches, setBatches] = useState([]);
  const [showLoadMore, setShowLoadMore] = useState(false);


  useEffect(() => {
    // Generate a new seed on each component mount
    const newSeed = Date.now().toString();
    setSeed(newSeed);

    const handleScroll = () => {
      // Set showLoadMore to true if the page is scrolled, checking for any positive scrollY value
      if (window.scrollY > 0) {
        setShowLoadMore(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    fetchRecipes(1, newSeed); 
    return () => window.removeEventListener('scroll', handleScroll);
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
      {showLoadMore && (
      <button className={styles.loadMoreButton} onClick={loadMore}>Lataa lisää</button>
      )}
      <footer>
      </footer>
    </div>
  );
}


export async function getServerSideProps(context) {
  
  const token = context.req.cookies.token;
  const jwtSecret = process.env.JWT_SECRET
  try {
    if (!token) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
    jwt.verify(token, jwtSecret);
    return { props: {} };
  } catch (error) {
    
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
}