import { useState } from "react";
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios"; // Import Axios

export default function RecipeCard({ recipe, isOwner, onDelete, onEdit }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const toggleFavorite = async () => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem("token");
  
      // Check if the token is available
      if (!token) {
        console.error("No token found. Please log in first.");
        return;
      }
  
      // Assuming you have an API endpoint for adding a recipe to favorites
      const response = await axios.post(
        "http://localhost:5500/recipe/addFavorite", 
        { recipeId: recipe._id },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );
  
      // Check if the request was successful and update the UI accordingly
      if (response.status === 200) {
        setIsFavorite(!isFavorite); // Toggle the favorite state
      }
    } catch (error) {
      console.error("Error adding recipe to favorites:", error);
    }
  };
  

  return (
    <div className="recipe-card" onClick={() => setShowDetails(!showDetails)}>
      <img src={`http://localhost:5500/images/${recipe.coverImage}`} alt={recipe.title} />
      <h3>{recipe.title}</h3>
      <p>
        <BsStopwatchFill /> {recipe.time}
      </p>

      {/* Icons for Favorite, Edit, and Delete */}
      <div className="icon-buttons">
        <button onClick={(e) => { e.stopPropagation(); toggleFavorite(); }}>
          <FaHeart color={isFavorite ? "red" : "gray"} />
        </button>

        {isOwner && (
          <>
            <button onClick={(e) => { e.stopPropagation(); onEdit(recipe._id); }}>
              <FaEdit />
            </button>

            <button onClick={(e) => { e.stopPropagation(); onDelete(recipe._id); }}>
              <MdDelete />
            </button>
          </>
        )}
      </div>

      {showDetails && (
        <div className="recipe-details">
          <h4>Ingredients</h4>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h4>Instructions</h4>
          <p>{recipe.instructions}</p>
        </div>
      )}
    </div>
  );
}
