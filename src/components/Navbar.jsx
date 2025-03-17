// import { NavLink } from "react-router-dom";

// export default function Navbar({ onLoginClick }) {
//   return (
//     <nav className="navbar">
//       <ul>
//         <li>
//           <NavLink to="/">Home</NavLink>
//         </li>
//         <li>
//           <NavLink to="/all-recipe">All Recipe</NavLink>
//         </li>
//         <li>
//           <NavLink to="/favorite">Favorite</NavLink>
//         </li>
//         <li>
//           <NavLink to="/about-us">About Us</NavLink>
//         </li>
//         <li>
//           <NavLink to="/contact-us">Contact Us</NavLink>
//         </li>
//         <li>
//           <button onClick={onLoginClick}>Login</button>
         
//         </li>
//       </ul>
//     </nav>
//   );
// }
// Navbar.js
// Navbar.js
// Navbar.js
// Navbar.js
// Navbar.js
import { NavLink } from "react-router-dom";

export default function Navbar({ onLoginClick, isLoggedIn }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload(); // Refresh the page to reset the state
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/all-recipe">All Recipe</NavLink>
        </li>
        <li>
          <NavLink to="/favorite">Favorite</NavLink>
        </li>
        <li>
          <NavLink to="/about-us">About Us</NavLink>
        </li>
        <li>
          <NavLink to="/contact-us">Contact Us</NavLink>
        </li>
        <li>
          {isLoggedIn ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <button onClick={onLoginClick}>Login</button>
          )}
        </li>
      </ul>
    </nav>
  );
}