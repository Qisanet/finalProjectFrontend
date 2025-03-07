import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import axios from 'axios';
import RecipeCard from './RecipeCard';

export default function RecipeItems() {
  const recipes = useLoaderData();
  const [allRecipes, setAllRecipes] = useState([]);
  const [ownershipMap, setOwnershipMap] = useState({}); // Store ownership status
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const favItems = JSON.parse(localStorage.getItem('favorites')) || [];
  const token = localStorage.getItem("token");

  useEffect(() => {
    setAllRecipes(recipes);
    checkOwnership(recipes);
  }, [recipes]);

  const checkOwnership = async (recipes) => {
    const ownershipStatus = {};
    const requests = recipes.map(async (recipe) => {
      try {
        const response = await axios.get(`https://finalprojectbackend-3adu.onrender.com/recipe/${recipe._id}/isOwner`, {
          headers: { authorization: "Bearer " + token },
        });
        console.log(response);
        ownershipStatus[recipe._id] = response.data.isOwner;
      } catch (error) {
        console.error("Error checking ownership:", error);
        ownershipStatus[recipe._id] = false;
      }
    });

    await Promise.all(requests);
    setOwnershipMap(ownershipStatus);
  };

  const onDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5551/recipe/${id}`, {
        headers: { authorization: "Bearer " + token },
      });
      setAllRecipes((recipes) => recipes.filter((recipe) => recipe._id !== id));
      const filterItem = favItems.filter((recipe) => recipe._id !== id);
      localStorage.setItem('favorites', JSON.stringify(filterItem));
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const onEdit = (id) => {
    navigate(`/editRecipe/${id}`);
  };

  return (
    <div className="card-container">
      {allRecipes?.map((item) => (
        <RecipeCard
          key={item._id}
          recipe={item}
          isOwner={ownershipMap[item._id] || false} // Pass ownership status
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
