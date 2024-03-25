import jwt from 'jsonwebtoken';
import axios from 'axios';
import UserCategories from '@/components/UserCategories'
import LogoutButton from '@/components/Logout';
import Navbar from '@/components/Navbar';



export default function ProfilePage({ savedRecipes }) {
    return (
      <div>
        <LogoutButton/>
        <header>
          <h1>miamia</h1>
        </header>
        <Navbar/>
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

    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/savedRecipe`
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
    return {
      props: { savedRecipes: [] }
    };
  }
}
