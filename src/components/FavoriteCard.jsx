// FavoriteCard.js
import React from 'react';
import './favorite.css'

export default function FavoriteCard({ recipe }) {
  return (
    <div className="favorite-card">
      <div className="card-content">
        <img className="recipe-image" src={`http://localhost:5500/images/${recipe.coverImage}`} alt={recipe.title} />
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
      </div>
    </div>
  );
}
