
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import FavoriteCard from "../components/FavoriteCard";

// export default function Favorite() {
//   const [favorites, setFavorites] = useState([]);
//   const navigate = useNavigate();

//   // Fetch favorites from the backend
//   useEffect(() => {
//     const fetchFavorites = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         navigate("/login");
//         return;
//       }

//       try {
//         const response = await axios.get("https://finalprojectbackend-3adu.onrender.com/recipe/my/getFavorites", {
//           headers: { authorization: `Bearer ${token}` },
//         });
//         setFavorites(response.data);
//       } catch (error) {
//         console.error("Error fetching favorites:", error);
//       }
//     };

//     fetchFavorites();
//   }, [navigate]);

//   // Function to handle removing a favorite
//   const handleRemoveFavorite = async (recipeId) => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     try {
//       await axios.delete(`https://finalprojectbackend-3adu.onrender.com/recipe/${recipeId}/removeFavorite`, {
//         headers: { authorization: `Bearer ${token}` },
//       });

//       // Update the UI by filtering out the removed recipe
//       setFavorites((prevFavorites) =>
//         prevFavorites.filter((favorite) => favorite.recipe._id !== recipeId)
//       );
//     } catch (error) {
//       console.error("Error removing favorite:", error);
//     }
//   };

//   return (
//     <div className="favorite">
//       <h1>Favorite Recipes</h1>
//       <div className="recipe-grid">
//         {favorites.map((favorite) => (
//           <FavoriteCard
//             key={favorite.recipe._id}
//             recipe={favorite.recipe}
//             onRemove={handleRemoveFavorite} // Pass the remove function
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

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
        const response = await axios.get("https://finalprojectbackend-3adu.onrender.com/recipe/my/getFavorites", {
          headers: { authorization: `Bearer ${token}` },
        });
        setFavorites(response.data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
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
      await axios.delete(`https://finalprojectbackend-3adu.onrender.com/recipe/${recipeId}/removeFavorite`, {
        headers: { authorization: `Bearer ${token}` },
      });

      // Update the UI by filtering out the removed recipe
      setFavorites((prevFavorites) =>
        prevFavorites.filter((favorite) => favorite.recipe._id !== recipeId)
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
          favorites.map((favorite) => (
            <FavoriteCard
              key={favorite.recipe._id}
              recipe={favorite.recipe}
              onRemove={handleRemoveFavorite} // Pass the remove function
            />
          ))
        ) : (
          <div className="no-favorites-message">
          <p>You haven't favorited any recipes yet. <span>😊</span></p>
          <p>Feel free to favorite any recipe you like!</p>
        </div>
        )}
      </div>
    </div>
  );
}