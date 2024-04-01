import { useState, useEffect } from 'react';
import Feed from '../components/Feed';
import styles from '../styles/feed.module.css';
import Navbar from '@/components/Navbar';
import jwt from 'jsonwebtoken';

export default function App() {
  // const [currentPage, setCurrentPage] = useState(1);
  const [seed, setSeed] = useState('');
  const [batches, setBatches] = useState([]);
  const [showLoadMore, setShowLoadMore] = useState(false);

  const [isLoading, setIsLoading] = useState(true);



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

    const feedIndex = Number(sessionStorage.getItem('feedIndex'));

    if (feedIndex) {
      for (let i = 1; i <= feedIndex; i += 1) {
        fetchRecipes(i, newSeed); 
      } 
    } else {
      fetchRecipes(1, newSeed); 
    }

    setIsLoading(false); 
    // fetchRecipes(1, newSeed); 

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

    

  useEffect(() => {
  const scrollPosition = sessionStorage.getItem('scrollPosition');
  if (!isLoading && batches.length && scrollPosition) {
    // Use a timeout to give the browser a chance to render
    setTimeout(() => {
      window.scrollTo({
        top: scrollPosition,
        left: 0,
        behavior: "smooth",
      });
    }, 200); // You may need to adjust this delay
    sessionStorage.removeItem('scrollPosition');
  }
}, [isLoading, batches]); // Add isLoading to the dependency array



  const fetchRecipes = async (page, seed) => {
    const response = await fetch(`/api/recipes?page=${page}&seed=${seed}`);
    const newRecipes = await response.json();
    setBatches(prevBatches => [...prevBatches, newRecipes]);

  };

  const loadMore = () => {
    // setCurrentPage(prevPage => prevPage + 1);

    const currentFeedIndex = Number(sessionStorage.getItem('feedIndex'));

    const feedIndex = currentFeedIndex == 0 ? 1 : currentFeedIndex

    fetchRecipes(feedIndex + 1, seed);
    
    sessionStorage.setItem('feedIndex', feedIndex ? feedIndex + 1 : 2);

  };

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