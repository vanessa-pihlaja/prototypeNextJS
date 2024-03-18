import Navbar from "@/components/Navbar";
import axios from 'axios';
import CategoriesComponent from "@/components/SearchCategories";
import LogoutButton from '@/components/Logout';


export default function SearchPage({categories}) {
    return (
      <div>
        <LogoutButton/>
        <header>
          <h1>Miamia</h1>
        </header>
        <Navbar/>
        <CategoriesComponent categories={categories} />
        <footer></footer>
      </div>
    );
  }




export async function getServerSideProps(context) {
  try {
    const res = await axios.get('http://localhost:3000/api/search/categories');
    const categories = res.data;
  
    return { props: { categories } };

  } catch (error) {
    console.error(error);
    return { props: { categories: [] } };
  }
}