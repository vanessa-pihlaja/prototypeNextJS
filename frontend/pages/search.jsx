import Navbar from "@/components/Navbar";
import axios from 'axios';
import CategoriesComponent from "@/components/SearchCategories";
import dbConnect from '../src/utils/dbConnect';
import Recipe from '../src/models/recipe';
import mongoose from 'mongoose';



export default function SearchPage({categoriesWithRecipes}) {
    return (
      <div>
        <header>
          <h1>Miamia</h1>
        </header>
        <Navbar/>
        <CategoriesComponent categories={categoriesWithRecipes} />
        <footer></footer>
      </div>
    );
  }


  const objectIdToString = (value) => {
    if (Array.isArray(value)) {
      return value.map(v => objectIdToString(v));
    } else if (value && typeof value === 'object') {
      if (value instanceof mongoose.Types.ObjectId) {
        return value.toString();
      }
      return Object.keys(value).reduce((acc, key) => {
        acc[key] = objectIdToString(value[key]);
        return acc;
      }, {});
    }
    return value;
  };

  export async function getStaticProps() {
    await dbConnect(); 
  
    const aggregationPipeline = [
      { $match: { category: { $ne: null } } }, 
      {
        $group: {
          _id: "$category",
          coverImage: { $first: { $arrayElemAt: ["$images", 0] } }, // Get the first image of the first recipe
          recipes: {
            $push: {
              id: "$_id",
              title: "$title",
              firstImage: { $arrayElemAt: ["$images", 0] }
            }
          }
        }
      },
      { $match: { "_id": { $ne: "" } } }, // Exclude empty string categories
      {
        $project: {
          _id: 0,
          category: "$_id",
          coverImage: 1,
          recipes: 1
        }
      }
    ];
  
    // Execute the aggregation pipeline
    let categoriesWithRecipes = [];
    try {
      categoriesWithRecipes = await Recipe.aggregate(aggregationPipeline);
      categoriesWithRecipes = objectIdToString(categoriesWithRecipes); // Convert all ObjectIds to strings
    } catch (error) {
      console.error("Failed to aggregate data from the database", error);

    }

  return { 
    props: { categoriesWithRecipes }, 
    revalidate: 10
  };
  }