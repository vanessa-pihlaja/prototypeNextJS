import Navbar from "@/components/Navbar";
import React, { useState, } from 'react';
import CategoriesComponent from "@/components/SearchCategories";
import SearchComponent from "@/components/SearchRecipes";
import SearchResultsComponent from "@/components/SearchRecipeResult"; 
import dbConnect from '../src/utils/dbConnect';
import Recipe from '../src/models/recipe';
import mongoose from 'mongoose';
import styles from '../styles/search.module.css'; 

export default function SearchPage({ categoriesWithRecipes }) {
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false); // Tracks whether a search is currently being performed

  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery);
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setSearching(false); // Ensure searching is false if the query is empty
      return;
    }

    setSearching(true); // Set searching to true when starting the search
    try {
      const response = await fetch(`/api/search?query=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    } finally {
      setSearching(false); // Ensure searching is set to false when the search is completed
    }
  };

  return (
    <div>
      <header><h1>miamia</h1></header>
      <Navbar />
      <SearchComponent onSearch={handleSearch} />
      {searching ? (
        <p></p> 
      ) : searchResults.length > 0 ? (
        <SearchResultsComponent searchResults={searchResults} />
      ) : query.trim() && !searching && searchResults.length === 0 ? (
        <div className={styles.eiTulosta}>
         <p>  Ei hakutuloksia </p>
        </div>
      ) : (
        <CategoriesComponent categories={categoriesWithRecipes} />
      )}
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
    { $match: { category: { $exists: true, $not: {$size: 0} } } },
    { $unwind: "$category" }, 
    {
      $group: {
        _id: "$category",
        coverImage: { $first: { $arrayElemAt: ["$images", 0] } },
        recipes: {
          $push: {
            id: "$_id",
            title: "$title",
            firstImage: { $arrayElemAt: ["$images", 0] },
            owner: "$owner",
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
        recipes: 1,
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