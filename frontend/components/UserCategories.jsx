import React from 'react';

const UserCategories = ({ savedRecipes = [] }) => {
  // Ensure savedRecipes defaults to an empty array to handle cases where it might be undefined

  console.log(savedRecipes)

  return (
    <div>
      {savedRecipes.map((item, index) => (
        <div key={index}>
          <h2>{item.category}</h2>
          <div>
            <h3>{item.title}</h3> 
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserCategories;
