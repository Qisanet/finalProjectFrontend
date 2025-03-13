
// import React from 'react';
// import './favorite.css';

// export default function FavoriteCard({ recipe }) {
//   return (
//     <div className="favorite-card">
//       <div className="card-content">
//         {/* Check if coverImage is a Base64 string or a URL */}
//         {recipe.coverImage && recipe.coverImage.startsWith('data:image') ? (
//           <img className="recipe-image" src={recipe.coverImage} alt={recipe.title} />
//         ) : (
//           <img className="recipe-image" src={`https://finalprojectbackend-3adu.onrender.com/images/${recipe.coverImage}`} alt={recipe.title} />
//         )}
//         <div className="recipe-info">
//           <h3 className="recipe-title">{recipe.title}</h3>
//           <p className="recipe-time">
//             <strong>Time:</strong> {recipe.time} 
//           </p>
//           <h4 className="recipe-subheading">Ingredients</h4>
//           <ul className="ingredients-list">
//             {recipe.ingredients.map((ingredient, index) => (
//               <li key={index}>{ingredient}</li>
//             ))}
//           </ul>
//           <h4 className="recipe-subheading">Instructions</h4>
//           <p className="instructions">{recipe.instructions}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from 'react';
import './favorite.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function FavoriteCard({ recipe, onRemove }) {
  return (
    <div className="favorite-card">
      <div className="card-content">
        {/* Check if coverImage is a Base64 string or a URL */}
        {recipe.coverImage && recipe.coverImage.startsWith('data:image') ? (
          <img className="recipe-image" src={recipe.coverImage} alt={recipe.title} />
        ) : (
          <img className="recipe-image" src={`https://finalprojectbackend-3adu.onrender.com/images/${recipe.coverImage}`} alt={recipe.title} />
        )}
        <div className="recipe-info">
          <h3 className="recipe-title">{recipe.title}</h3>
          <p className="recipe-time">
            <strong>Time:</strong> {recipe.time} minutes
          </p>
          <h4 className="recipe-subheading">Ingredients</h4>
          <ul className="ingredients-list">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h4 className="recipe-subheading">Instructions</h4>
          <p className="instructions">{recipe.instructions}</p>
        </div>
        {/* Remove Icon */}
        <button className="remove-icon" onClick={() => onRemove(recipe._id)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
}