

import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainNavigation({ isLoggedIn, logout }) {
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} logout={logout} /> {/* Pass isLoggedIn and logout */}
      <Outlet />
      <Footer />
    </>
  );
}