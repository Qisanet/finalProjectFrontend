

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function AddRecipe() {
//   const navigate = useNavigate();
//   const [recipeData, setRecipeData] = useState({
//     title: "",
//     ingredients: "",
//     instructions: "",
//     time: "",
//     file: "",
//   });
//   const [base64, setBase64] = useState("");
//  const handleFileUpload = (event) => {
//  const file = event.target.files[0];
//  if (file) {
//  const reader = new FileReader();
//  reader.onloadend = () => {
//  setBase64(reader.result);
//  setRecipeData((prev) => ({
//   ...prev,
//   file: base64, // Save the Cloudinary URL
// }));
// console.log(recipeData)
//  };
//  reader.readAsDataURL(file);
//  }
//  };

//   const handleChange = async (e) => {
//     const { name, value, files } = e.target;
//     if (base64) {
 
//        console.log("basee 64" ,base64)

     
//         setRecipeData((prev) => ({
//           ...prev,
//           file: base64, // Save the Cloudinary URL
//         }));
      
//     } else {
//       setRecipeData((prev) => ({
//         ...prev,
//         [name]: value,
//         file:base64
//       }));
//     }
//     console.log("receipe data ",recipeData)
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     for (const key in recipeData) {
//       formData.append(key, recipeData[key]);
//     }
//     try {
//       await axios.post("https://finalprojectbackend-3adu.onrender.com/recipe", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           authorization: "Bearer " + localStorage.getItem("token"),
//         },
//       });
//       navigate("/all-recipe");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="add-recipe">
//       <h1>Share Your Recipe</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Title:</label>
//           <input type="text" name="title" value={recipeData.title} onChange={handleChange} required />
//         </div>
//         <div className="form-group">
//           <label>Ingredients:</label>
//           <textarea name="ingredients" value={recipeData.ingredients} onChange={handleChange} required />
//         </div>
//         <div className="form-group">
//           <label>Instructions:</label>
//           <textarea name="instructions" value={recipeData.instructions} onChange={handleChange} required />
//         </div>
//         <div className="form-group">
//           <label>Time:</label>
//           <input type="text" name="time" value={recipeData.time} onChange={handleChange} required />
//         </div>
//         <div className="form-group">
//           <label>Image:</label>
//           <input type="file" name="file" onChange={handleFileUpload}   accept="image/*" required />
//         </div>
//         <button type="submit">Share Recipe</button>
//       </form>
//     </div>
//   );
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddRecipe() {
  const navigate = useNavigate();
  const [recipeData, setRecipeData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    time: "",
    file: "", // This will store the Base64 string
  });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setRecipeData((prev) => ({
          ...prev,
          file: base64String, // Save the Base64 image
        }));
        console.log("Base64 Image:", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://finalprojectbackend-3adu.onrender.com/recipe", recipeData, {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      navigate("/all-recipe");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="add-recipe">
      <h1>Share Your Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input type="text" name="title" value={recipeData.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Ingredients:</label>
          <textarea name="ingredients" value={recipeData.ingredients} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Instructions:</label>
          <textarea name="instructions" value={recipeData.instructions} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Time:</label>
          <input type="text" name="time" value={recipeData.time} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Image:</label>
          <input type="file" name="file" onChange={handleFileUpload} accept="image/*" required />
        </div>
        {recipeData.file && (
          <img src={recipeData.file} alt="Preview" style={{ width: "200px", marginTop: "10px" }} />
        )}
        <button type="submit">Share Recipe</button>
      </form>
    </div>
  );
}
