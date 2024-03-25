import { useState } from 'react';
import Feed from '../components/Feed';
import styles from '../styles/feed.module.css';
import dbConnect from '../src/utils/dbConnect';
import Recipe from '../src/models/recipe';
import Navbar from '@/components/Navbar';


export default function App({ initialBatches }) {
  const [visibleBatches, setVisibleBatches] = useState(initialBatches.slice(0, 1)); // Start with the first batch visible
  const [loadedBatches, setLoadedBatches] = useState(initialBatches); // Keep track of all loaded batches

  const loadMore = () => {
    const nextIndex = visibleBatches.length; // Determine the next batch to show
    if (nextIndex < loadedBatches.length) {
      setVisibleBatches([...visibleBatches, loadedBatches[nextIndex]]); // Update visible batches to include the next one
    }
  };

  return (
    <div>
      <header>
        <h1>miamia</h1>
      </header>
      <Navbar/>
      <Feed batches={visibleBatches} />
      <div className={styles.loadMoreContainer}>
      {visibleBatches.length < loadedBatches.length && (
        <button className={styles.loadMoreButton} onClick={loadMore}>Load More</button>
      )}
        </div>
      <footer>
      </footer>
    </div>
  );
};

// Function to shuffle an array (Fisher-Yates shuffle algorithm)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export async function getStaticProps() {
  await dbConnect(); // Ensure the database connection is established

  // Fetch data from the database
  const result = await Recipe.find({}); // Adjust your query as needed

  // Convert documents to JSON and shuffle the array to randomize
  const data = shuffleArray(result.map(doc => {
    const recipe = doc.toObject();
    recipe._id = recipe._id.toString(); // Convert ObjectId to string
    return recipe;
  }));

  // Assume we divide all recipes into batches of 50
  const batchSize = 50;
  const batches = [];
  for (let i = 0; i < data.length; i += batchSize) {
    batches.push(data.slice(i, i + batchSize));
  }

  // Pass all batches to the page via props
  return { props: { initialBatches: batches }, revalidate: 10 }; // You can adjust revalidate as necessary
}
