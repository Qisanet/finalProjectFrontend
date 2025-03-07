import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import AllRecipe from "./pages/AllRecipe";
import Favorite from "./pages/Favorite";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import AddRecipe from "./pages/AddRecipe";
import MainNavigation from "./components/MainNavigation";
import axios from "axios";
import EditRecipe from "./pages/EditRecipe";

const getAllRecipes = async () => {
  try {
    const response = await axios.get("http://localhost:5500/recipe");
    return response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};

const getFavorites = () => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  return favorites;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainNavigation />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-recipe",
        element: <AllRecipe />,
        loader: getAllRecipes,
      },
      {
        path: "/favorite",
        element: <Favorite />,
        loader: getFavorites,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/add-recipe",
        element: <AddRecipe />,
      },
     {
      path:"/editRecipe/:id",
      element:<EditRecipe/>
     }
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}


