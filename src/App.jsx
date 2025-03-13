// import "./App.css";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Home from "./pages/Home";
// import AllRecipe from "./pages/AllRecipe";
// import Favorite from "./pages/Favorite";
// import AboutUs from "./pages/AboutUs";
// import ContactUs from "./pages/ContactUs";
// import AddRecipe from "./pages/AddRecipe";
// import MainNavigation from "./components/MainNavigation";
// import axios from "axios";
// import EditRecipe from "./pages/EditRecipe";

// const getAllRecipes = async () => {
//   try {
//     const response = await axios.get("https://finalprojectbackend-3adu.onrender.com/recipe");
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching recipes:", error);
//     return [];
//   }
// };

// const getFavorites = () => {
//   const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
//   return favorites;
// };

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <MainNavigation />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "/all-recipe",
//         element: <AllRecipe />,
//         loader: getAllRecipes,
//       },
//       {
//         path: "/favorite",
//         element: <Favorite />,
//         loader: getFavorites,
//       },
//       {
//         path: "/about-us",
//         element: <AboutUs />,
//       },
//       {
//         path: "/contact-us",
//         element: <ContactUs />,
//       },
//       {
//         path: "/add-recipe",
//         element: <AddRecipe />,
//       },
//      {
//       path:"/editRecipe/:id",
//       element:<EditRecipe/>
//      }
//     ],
//   },
// ]);

// export default function App() {
//   return <RouterProvider router={router} />;
// }


import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import AllRecipe from "./pages/AllRecipe";
import Favorite from "./pages/Favorite";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import AddRecipe from "./pages/AddRecipe";
import MainNavigation from "./components/MainNavigation";
import axios from "axios";
import EditRecipe from "./pages/EditRecipe";
import ErrorPage from "./pages/ErrorPage"; // Add an error page

// Fetch all recipes from the backend
const getAllRecipes = async () => {
  try {
    const response = await axios.get("https://finalprojectbackend-3adu.onrender.com/recipe");
    return response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw new Error("Failed to fetch recipes"); // Throw error to trigger errorElement
  }
};

// Fetch favorites from localStorage or backend
const getFavorites = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return []; // Return empty array if no token
    }

    const response = await axios.get("https://finalprojectbackend-3adu.onrender.com/recipe/my/getFavorites", {
      headers: { authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching favorites:", error);
    throw new Error("Failed to fetch favorites"); // Throw error to trigger errorElement
  }
};

// Main router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainNavigation />,
    errorElement: <ErrorPage />, // Add an error page
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-recipe",
        element: <AllRecipe />,
        loader: getAllRecipes, // Fetch recipes on route load
      },
      {
        path: "/favorite",
        element: <Favorite />,
        loader: getFavorites, // Fetch favorites on route load
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
        path: "/editRecipe/:id",
        element: <EditRecipe />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}