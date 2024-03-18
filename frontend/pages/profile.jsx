import jwt from 'jsonwebtoken';
import axios from 'axios';
import UserCategories from '@/components/UserCategories'
import Navbar from '@/components/Navbar';

export default function ProfilePage({ savedRecipes }) {
    return (
      <div>
        <header>
          <Navbar/>
          <h1>Your profile</h1>
        </header>
        <UserCategories savedRecipes={savedRecipes} />
        <footer></footer>
      </div>
    );
  }
  


export async function getServerSideProps(context) {
  try {
    const { req } = context;
    const { token } = req.cookies; // Extract the token from the request cookies

    console.log(`token from cookies: ${token}`)
    
    if (!token) {
      // Handle the case where the token is not present. For example:
      // Redirect to login page or return an empty props object
      return {
        redirect: {
          destination: '/login', // Assuming you have a login page
          permanent: false,
        },
      };
    }

    // Here, you don't need to decode the token to get the userId since the server should do that.
    const apiUrl = `http://localhost:3000/api/users/savedRecipe`; 
    const response = await axios.get(apiUrl, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
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
