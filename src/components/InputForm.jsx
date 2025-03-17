// import { useState } from "react";
// import axios from "axios";

// export default function InputForm({ onClose }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [username, setUsername] = useState(""); // Add username state
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const endpoint = isSignUp ? "signUp" : "login";
    
//     const userData = isSignUp 
//       ? { username, email, password}  // Include username when signing up
//       : { email, password };

//     try {
//       const response = await axios.post(`https://finalprojectbackend-3adu.onrender.com/${endpoint}`, userData);
//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("user", JSON.stringify(response.data.user));
//       onClose();
//     } catch (err) {
//       setError(err.response?.data?.error || "An error occurred");
//     }
//   };

//   return (
//     <form className="login-form" onSubmit={handleSubmit}>
//       <h2>{isSignUp ? "Sign Up" : "Login"}</h2>

//       {isSignUp && ( // Show username field only in sign-up mode
//         <div className="form-group">
//           <label>Username:</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="Enter your username"
//             required
//           />
//         </div>
//       )}

//       <div className="form-group">
//         <label>Email:</label>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Enter your email"
//           required
//         />
//       </div>

//       <div className="form-group">
//         <label>Password:</label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Enter your password"
//           required
//         />
//       </div>

//       {error && <p className="error">{error}</p>}
//       <button type="submit">{isSignUp ? "Sign Up" : "Login"}</button>

//       <p onClick={() => setIsSignUp(!isSignUp)}>
//         {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
//       </p>
//     </form>
//   );
// }
// InputForm.js
// InputForm.js
// InputForm.js
import { useState } from "react";
import axios from "axios";

export default function InputForm({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignUp ? "signUp" : "login";

    const userData = isSignUp
      ? { username, email, password }
      : { email, password };

    try {
      const response = await axios.post(
        `http://localhost:5500/${endpoint}`,
        userData
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      onClose(); // Close the modal and redirect
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>{isSignUp ? "Sign Up" : "Login"}</h2>

      {isSignUp && (
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
      )}

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
      </div>

      {error && <p className="error">{error}</p>}
      <button type="submit">{isSignUp ? "Sign Up" : "Login"}</button>

      <p onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
      </p>
    </form>
  );
}