import { useState } from 'react';
import Feed from '../components/Feed';
import feedService from '../src/services/feed';
import styles from '../styles/feed.module.css';

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
      <Feed batches={visibleBatches} />
      <div className={styles.loadMoreContainer}>
      {visibleBatches.length < loadedBatches.length && (
        <button className={styles.loadMoreButton} onClick={loadMore}>Load More</button>
      )}
        </div>
      <footer></footer>
    </div>
  );
};

export async function getStaticProps() {
  // Fetch data from external API or service
  const data = await feedService.getAll();

  // Assume we divide all recipes into batches of 200
  const batchSize = 50;
  const batches = [];
  for (let i = 0; i < data.length; i += batchSize) {
    batches.push(data.slice(i, i + batchSize));
  }

  // Pass all batches to the page via props
  return { props: { initialBatches: batches } };
}
