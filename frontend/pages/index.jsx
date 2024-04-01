import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Feed from '../components/Feed';
import styles from '../styles/feed.module.css';
import Navbar from '@/components/Navbar';
import jwt from 'jsonwebtoken';

export default function App() {
  const [seed, setSeed] = useState('');
  const [batches, setBatches] = useState([]);
  const [showLoadMore, setShowLoadMore] = useState(true); // Initially true, assume there's something to load
  const [isLoading, setIsLoading] = useState(true);

  // Generate a new seed function
  const generateNewSeed = () => Date.now().toString();

  useEffect(() => {
    const loadBatchesSequentially = async () => {
      let currentSeed = Cookies.get('recipeFeedSeed');
      const lastSeedUpdateTime = Cookies.get('lastSeedUpdateTime');
      const currentTime = Date.now();
      const sevenMinutes = 7 * 60 * 1000;

      // Update seed if necessary
      if (!currentSeed || !lastSeedUpdateTime || currentTime - parseInt(lastSeedUpdateTime, 7) > sevenMinutes) {
        currentSeed = generateNewSeed();
        Cookies.set('recipeFeedSeed', currentSeed, { expires: 1 });
        Cookies.set('lastSeedUpdateTime', currentTime.toString(), { expires: 1 });
      }

      setSeed(currentSeed);

      // Load batches based on feedIndex or just the first batch
      const feedIndex = Number(sessionStorage.getItem('feedIndex')) || 1;
      for (let i = 1; i <= feedIndex; i++) {
        await fetchRecipes(i, currentSeed);
      }

      setIsLoading(false);
    };

    loadBatchesSequentially();
  }, []); // Empty dependency array means this effect runs once on mount

  const fetchRecipes = async (page, seed) => {
    const response = await fetch(`/api/recipes?page=${page}&seed=${seed}`);
    const newRecipes = await response.json();
    setBatches(prevBatches => [...prevBatches, newRecipes]);
  };

  const loadMore = async () => {
    setShowLoadMore(false); // Disable the button to prevent multiple clicks

    const currentFeedIndex = Number(sessionStorage.getItem('feedIndex')) || 0;
    const newFeedIndex = currentFeedIndex + 1;

    try {
      await fetchRecipes(newFeedIndex, seed);
      sessionStorage.setItem('feedIndex', newFeedIndex.toString()); // Update feedIndex only after successful fetch
    } catch (error) {
      console.error("Failed to fetch more recipes:", error);
      // Optionally handle the error, e.g., by showing an error message
    } finally {
      setShowLoadMore(true); // Re-enable the button
    }
  };

  useEffect(() => {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (!isLoading && batches.length && scrollPosition) {
      setTimeout(() => {
        window.scrollTo({
          top: scrollPosition,
          left: 0,
          behavior: "smooth",
        });
      }, 200); // You may need to adjust this delay
      sessionStorage.removeItem('scrollPosition');
    }
  }, [isLoading, batches]);
  return (
    <div>
      <header>
        <h1>miamia</h1>
      </header>
      <Navbar />
      <Feed batches={batches} />
      {showLoadMore && (
      <button className={styles.loadMoreButton} onClick={loadMore}>Näytä lisää</button>
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