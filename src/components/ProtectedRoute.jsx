// ProtectedRoute.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import InputForm from "./InputForm";

export default function ProtectedRoute({ children }) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setIsLoginOpen(true); // Show login modal if no token
    }
  }, [token]);

  return (
    <>
      {token ? children : null}
      {isLoginOpen && (
        <Modal onClose={() => setIsLoginOpen(false)}>
          <InputForm onClose={() => setIsLoginOpen(false)} />
        </Modal>
      )}
    </>
  );
}