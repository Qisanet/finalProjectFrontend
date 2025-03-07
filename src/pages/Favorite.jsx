// Favorite.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FavoriteCard from "../components/FavoriteCard"; // Import the FavoriteCard component

export default function Favorite() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        // Fetch the user's favorites from the backend
        const response = await axios.get("https://finalprojectbackend-3adu.onrender.com/recipe/my/getFavorites", {
          headers: { authorization: `Bearer ${token}` },
        });

        // Set the favorites state with the data returned from the backend
        setFavorites(response.data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        // Handle error (e.g., show a message to the user)
      }
    };

    fetchFavorites();
  }, [navigate]);

  return (
    <div className="favorite">
      <h1>Favorite Recipes</h1>
      <div className="recipe-grid">
        {favorites.map((favorite) => (
          <FavoriteCard key={favorite._id} recipe={favorite.recipe} /> // Pass the recipe data
        ))}
      </div>
    </div>
  );
}
