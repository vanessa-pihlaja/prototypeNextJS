import axios from 'axios';
import UserCategories from '@/components/UserCategories'
import LogoutButton from '@/components/Logout';
import Navbar from '@/components/Navbar';



export default function ProfilePage({ savedRecipes }) {

  console.log(`saved recipes on profile page ${savedRecipes}`)

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
    const { token } = req.cookies; 

    console.log(`token from cookies: ${token}`)
    
    if (!token) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const baseUrl = process.env.VERCEL_URL ? `${protocol}://${process.env.VERCEL_URL}` : 'http://localhost:3000';
    const apiUrl = `${baseUrl}/api/users/savedRecipe`;

    const response = await axios.get(apiUrl, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log(`the token: ${token}`)
    const savedRecipes = response.data;
    return { props: { savedRecipes } };

  } catch (error) {
    console.error(error);
    return {
      props: { savedRecipes: [] }
    };
  }
}
