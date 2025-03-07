import logo from "../assets/images.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import InputForm from "../components/InputForm";

export default function Home() {
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="home">
      <Navbar onLoginClick={() => setIsLoginOpen(true)} />
      <div className="home-content">
        <h1>Welcome to our Habesha Food Recipe</h1>
        <img className="logo" src={logo} alt="Food Logo" />
        <button onClick={() => navigate("/all-recipe")}>Explore Recipes</button>
        <button onClick={() => navigate("/add-recipe")}>Share Recipe</button>
      </div>
      {isLoginOpen && (
        <Modal onClose={() => setIsLoginOpen(false)}>
          <InputForm onClose={() => setIsLoginOpen(false)} />
        </Modal>
      )}
    </div>
  );
}