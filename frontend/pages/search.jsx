import axios from 'axios';
import LogoutButton from '@/components/Logout';
import Navbar from '@/components/Navbar';

export default function SearchPage() {
    return (
      <div>
        <LogoutButton/>
        <header>
          <h1>miamia</h1>
        </header>
        <Navbar/>
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
