
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FavoriteCard from "../components/FavoriteCard";

export default function Favorite() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  // Fetch favorites from the backend
  useEffect(() => {
    const fetchFavorites = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          "https://finalprojectbackend-3adu.onrender.com/recipe/my/getFavorites",
          { headers: { authorization: `Bearer ${token}` } }
        );

        console.log("Favorites API Response:", response.data); // Debugging

        // Ensure response data is an array before updating state
        if (Array.isArray(response.data)) {
          setFavorites(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setFavorites([]);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
        setFavorites([]); // Handle error by resetting to an empty array
      }
    };

    fetchFavorites();
  }, [navigate]);

  // Function to handle removing a favorite
  const handleRemoveFavorite = async (recipeId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      // Send a request to the backend to permanently remove the favorite
      await axios.delete(
        `https://finalprojectbackend-3adu.onrender.com/recipe/${recipeId}/removeFavorite`,
        { headers: { authorization: `Bearer ${token}` } }
      );

      // Update the UI by filtering out the removed recipe
      setFavorites((prevFavorites) =>
        prevFavorites.filter(
          (favorite) => favorite.recipe && favorite.recipe._id !== recipeId
        )
      );
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  return (
    <div className="favorite">
      <h1>Favorite Recipes</h1>
      <div className="recipe-grid">
        {favorites.length > 0 ? (
          favorites.map((favorite) =>
            favorite.recipe ? ( // Ensure favorite.recipe exists
              <FavoriteCard
                key={favorite.recipe._id}
                recipe={favorite.recipe}
                onRemove={handleRemoveFavorite}
              />
            ) : null
          )
        ) : (
          <p>No favorite recipes found. Add some recipes to your favorites!</p>
        )}
      </div>
    </div>
  );
}
