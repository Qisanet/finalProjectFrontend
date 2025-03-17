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


// App.jsx
import "./App.css"
// App.jsx

// App.jsx
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
import ErrorPage from "./pages/ErrorPage";

const getAllRecipes = async () => {
  try {
    const response = await axios.get("https://finalprojectbackend-3adu.onrender.com/recipe");
    return response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw new Error("Failed to fetch recipes");
  }
};

const getFavorites = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return [];
    }
    const response = await axios.get("https://finalprojectbackend-3adu.onrender.com/recipe/my/getFavorites", {
      headers: { authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching favorites:", error);
    throw new Error("Failed to fetch favorites");
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainNavigation />,
    errorElement: <ErrorPage />,
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
        path: "/editRecipe/:id",
        element: <EditRecipe />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} fallback={<div>Loading...</div>} />;
}