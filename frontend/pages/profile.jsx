import axios from 'axios';
import UserCategories from '@/components/UserCategories'
import LogoutButton from '@/components/Logout';
import Navbar from '@/components/Navbar';



export default function ProfilePage({ savedRecipes, debugMessages }) {

  console.log(`saved recipes on profile page ${savedRecipes}`)
  console.log('Debug messages:', debugMessages);

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
    let debugMessages = []; // Initialize an array to hold debug messages
  
    try {
      const { req } = context;
      const { token } = req.cookies; 
  
      debugMessages.push(`token from cookies: ${token}`);
      
      if (!token) {
        return {
          props: { savedRecipes: [], debugMessages }, // Pass the debug messages as a prop
          redirect: {
            destination: '/login',
            permanent: false,
          },
        };
      }
  
      const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
      const baseUrl = process.env.VERCEL_URL ? `${protocol}://${process.env.VERCEL_URL}` : 'http://localhost:3000';
      const apiUrl = `/api/users/savedRecipe`;
  
      const response = await axios.get(apiUrl, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
  
      debugMessages.push(`API URL: ${apiUrl}`);
      const savedRecipes = response.data;
  
      return { props: { savedRecipes, debugMessages } }; // Pass debug messages to the component
  
    } catch (error) {
      console.error(error);
      debugMessages.push(`Error: ${error.message}`);
      return {
        props: { savedRecipes: [], debugMessages }, // Include debug messages in the case of an error
      };
    }
  }
  