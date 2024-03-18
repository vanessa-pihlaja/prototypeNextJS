import Navbar from "@/components/Navbar";
import axios from 'axios';

export default function SearchPage() {
    return (
      <div>
        <header>
          <Navbar/>
          <h1>Kategoriat ja haku</h1>
        </header>
        <footer></footer>
      </div>
    );
  }




export async function getServerSideProps(context) {
  try {


    // Here, you don't need to decode the token to get the userId since the server should do that.
    const apiUrl = `http://localhost:3000/api/users/savedRecipe`; 
    const response = await axios.get(apiUrl, {
    });

    console.log(`the token: ${token}`)
    const savedRecipes = response.data;
    console.log(savedRecipes)
    return { props: { savedRecipes } };

  } catch (error) {
    console.error(error);
    // Depending on the error, handle it accordingly
    // For example, you might want to redirect to a login page on authentication failure
    return { props: { savedRecipes: [] } };
  }
}
