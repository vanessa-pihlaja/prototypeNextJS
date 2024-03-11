import Feed from '../components/Feed';
import feedService from '../src/services/feed';

export default function App({ batches }) {
  return (
    <div>
      <header>
        <h1>miamia</h1>
      </header>
      <Feed batches={batches} />
      <footer>
      </footer>
    </div>
  );
};

export async function getStaticProps() {
  // Fetch data from external API or service
  const data = await feedService.getAll();


  // Create batches of 200 recipes
  const batchSize = 50;
  const batches = [];
  for (let i = 0; i < data.length; i += batchSize) {
    batches.push(data.slice(i, i + batchSize));
  }

  // Pass data to the page via props in the form of batches
  return { props: { batches } };
}
