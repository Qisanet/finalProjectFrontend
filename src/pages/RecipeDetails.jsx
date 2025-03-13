import { useLoaderData } from "react-router-dom";

export default function RecipeDetails() {
  const recipe = useLoaderData();

  return (
    <div className="recipe-details">
      <h1>{recipe.title}</h1>
      {/* <img src={`https://finalprojectbackend-3adu.onrender.com/images/${recipe.coverImage}`} alt={recipe.title} /> */}
      <img src={recipe.coverImage} alt={recipe.title} />

      <p>
        <strong>Time:</strong> {recipe.time} 
      </p>
      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Instructions</h3>
      <p>{recipe.instructions}</p>
    </div>
  );
}