import Navbar from "@/components/Navbar";
import React, { useState } from 'react';
import CategoriesComponent from "@/components/SearchCategories";
import SearchComponent from "@/components/SearchRecipes";
import SearchResultsComponent from "@/components/SearchRecipeResult"; 
import dbConnect from '../src/utils/dbConnect';
import Recipe from '../src/models/recipe';
import mongoose from 'mongoose';

export default function SearchPage({ categoriesWithRecipes }) {
  // State to hold the search results
  const [searchResults, setSearchResults] = useState([]);

  // Function to handle the search; called when a search is performed in the SearchComponent
  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]); // Clear results if the query is empty
      return;
    }

    // Fetch the search results from your API
    try {
      const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      setSearchResults(data); // Update the state with the fetched results
    } catch (error) {
      console.error("Error fetching search results: ", error);
      setSearchResults([]);
    }
  };

  return (
    <div>
      <header><h1>Miamia</h1></header>
      <Navbar />
      <SearchComponent onSearch={handleSearch} />
      {searchResults.length > 0 ? (
        <SearchResultsComponent searchResults={searchResults} />
      ) : (
        <CategoriesComponent categories={categoriesWithRecipes} />
      )}
      <footer></footer>
    </div>
  );
}

// Helper function to convert MongoDB ObjectIds to strings
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
        coverImage: { $first: { $arrayElemAt: ["$images", 0] } },
        recipes: {
          $push: {
            id: "$_id",
            title: "$title",
            firstImage: { $arrayElemAt: ["$images", 0] }
          }
        }
      }
    },
    { $match: { "_id": { $ne: "" } } },
    {
      $project: {
        _id: 0,
        category: "$_id",
        coverImage: 1,
        recipes: 1
      }
    }
  ];

  let categoriesWithRecipes = [];
  try {
    categoriesWithRecipes = await Recipe.aggregate(aggregationPipeline);
    categoriesWithRecipes = objectIdToString(categoriesWithRecipes);
  } catch (error) {
    console.error("Failed to aggregate data from the database", error);
  }

  return {
    props: { categoriesWithRecipes },
    revalidate: 10
  };
}
