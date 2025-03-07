import { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import axios from "axios";

export default function AllRecipe() {
  const recipes = useLoaderData();
  const [searchQuery, setSearchQuery] = useState("");
  const [ownerStatus, setOwnerStatus] = useState({});
  const [favItems, setFavItems] = useState(JSON.parse(localStorage.getItem("favorites")) || []);
  const navigate = useNavigate();

  const token = localStorage.getItem("token"); // Get the token from localStorage

  useEffect(() => {
    const fetchOwnerStatus = async (recipeId) => {
      try {
        const response = await fetch(`http://localhost:5500/recipe/${recipeId}/isOwner`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        return data.isOwner;
      } catch (error) {
        console.error("Error fetching owner status:", error);
        return false; // Default to false if an error occurs
      }
    };

    const fetchAllOwnerStatus = async () => {
      const status = {};
      for (let recipe of recipes) {
        const isOwner = await fetchOwnerStatus(recipe._id);
        status[recipe._id] = isOwner;
      }
      setOwnerStatus(status);
    };

    fetchAllOwnerStatus();
  }, [recipes, token]);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // onDelete function
  const onDelete = async (id) => {
    try {
      await axios.delete(`https://finalprojectbackend-3adu.onrender.com/recipe/${id}`, {
        headers: { authorization: "Bearer " + token },
      });
      // Update the state after deleting
      setAllRecipes((recipes) => recipes.filter((recipe) => recipe._id !== id));
      // Remove from favorites
      const filterItem = favItems.filter((recipe) => recipe._id !== id);
      localStorage.setItem('favorites', JSON.stringify(filterItem));
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  // onEdit function
  const onEdit = (id) => {
    navigate(`/editRecipe/${id}`);
  };

  return (
    <div className="all-recipe">
      <h1>All Recipes</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={() => setSearchQuery(searchQuery)}>Search</button>
      </div>
      <div className="recipe-grid">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              isOwner={ownerStatus[recipe._id] || false}
              onDelete={onDelete}  // Pass onDelete to RecipeCard
              onEdit={onEdit}      // Pass onEdit to RecipeCard
            />
          ))
        ) : (
          <p>No recipes found. Try a different search!</p>
        )}
      </div>
    </div>
  );
}
