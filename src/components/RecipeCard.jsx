import { useState } from "react";
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglass } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function RecipeCard({ recipe, isOwner, onDelete, onEdit }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const toggleFavorite = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. Please log in first.");
        return;
      }

      setIsFavorite((prev) => !prev);

      const response = await axios.post(
        "https://finalprojectbackend-3adu.onrender.com/recipe/addFavorite",
        { recipeId: recipe._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) {
        setIsFavorite((prev) => !prev);
        console.error("Failed to update favorite status");
      }
    } catch (error) {
      console.error("Error adding recipe to favorites:", error);
      setIsFavorite((prev) => !prev);
    }
  };

  return (
    <div className="recipe-card" onClick={() => setShowDetails(!showDetails)}>
      <img src={recipe.coverImage} alt={recipe.title} />
      <h3>{recipe.title}</h3>
      <p>
        < BsStopwatchFill className="time-icon" />
        {recipe.time} minutes
      </p>

      {/* Icons for Favorite, Edit, and Delete */}
      <div className="icon-buttons">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite();
          }}
          className="icon-button favorite-button"
        >
          <FaHeart  color={isFavorite ? "red" : "gray"} />
        </button>

        {isOwner && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(recipe._id);
              }}
              className="icon-button-for-ed-de"
            >
              <FaEdit />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(recipe._id);
              }}
              className="icon-button-for-ed-de"
            >
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

