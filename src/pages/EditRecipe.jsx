
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditRecipe() {
  const [recipeData, setRecipeData] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`http://localhost:5500/recipe/${id}`)
        .then((response) => {
          let res = response.data;
          setRecipeData({
            title: res.title,
            ingredients: res.ingredients.join(","),
            instructions: res.instructions,
            time: res.time,
          });
        });
    };
    getData();
  }, [id]);

  const onHandleChange = (e) => {
    let val =
      e.target.name === "ingredients"
        ? e.target.value.split(",")
        : e.target.name === "file"
        ? e.target.files[0]
        : e.target.value;
    setRecipeData((pre) => ({ ...pre, [e.target.name]: val }));
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:5500/recipe/${id}`, recipeData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: "bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => navigate("/all-recipe"));
  };

  return (
    <div className="add-recipe">
      <form className="form" onSubmit={onHandleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="input"
            name="title"
            onChange={onHandleChange}
            value={recipeData.title}
          />
        </div>
        <div className="form-group">
          <label>Time</label>
          <input
            type="text"
            className="input"
            name="time"
            onChange={onHandleChange}
            value={recipeData.time}
          />
        </div>
        <div className="form-group">
          <label>Ingredients</label>
          <textarea
            type="text"
            className="input-textarea"
            name="ingredients"
            rows="5"
            onChange={onHandleChange}
            value={recipeData.ingredients}
          />
        </div>
        <div className="form-group">
          <label>Instructions</label>
          <textarea
            type="text"
            className="input-textarea"
            name="instructions"
            rows="5"
            onChange={onHandleChange}
            value={recipeData.instructions}
          />
        </div>
        <div className="form-group">
          <label>Recipe Image</label>
          <input
            type="file"
            className="input"
            name="file"
            onChange={onHandleChange}
          />
        </div>
        <button type="submit">Edit Recipe</button>
      </form>
    </div>
  );
}