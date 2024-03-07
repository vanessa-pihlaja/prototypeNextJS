import Feed from '../components/Feed';
import feedService from '../src/services/feed';

// import TestComponent from './components/TestComponent';

export default function App({ recipes }) {
  return (
    <div>
      <header>
        <h1>miamia</h1>
      </header>
          <Feed recipes={recipes}/>
      <footer>
      </footer>
    </div>
  );
};


export async function getStaticProps() {
  
  // Fetch data from external API
  // const res = await fetch(`http://localhost:3000/api/recipes`)
  // const data = await res.json()

  const data = await feedService.getAll();

  //const subData = data.slice(0,200)
  //console.log(subData.length)
 
  // Pass data to the page via props
  return { props: { recipes: data } }

}