import React, { useState } from "react";
import { auth, signInWithEmailAndPassword } from "../backend/firebase";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../backend/firebase"; // Firestore instance
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Authenticate user
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = userCredential.user.uid;

      // Fetch user role from Firestore (admins collection)
      const adminDoc = await getDoc(doc(db, "admins", userId));
      if (adminDoc.exists()) {
        const adminData = adminDoc.data();

        // Redirect based on role
        if (adminData.role === "superadmin") {
          navigate("/admin-dashboard");
        } else if (adminData.role === "general-admin") {
          navigate("/general-admin-dash");
        } else {
          console.error("Invalid role: ", adminData.role);
          alert("Your account doesn't have the necessary permissions.");
        }
      } else {
        console.error("Admin document not found.");
        alert("Error: Admin details not found. Please contact support.");
      }
    } catch (error) {
      console.error("Error signing in: ", error.message);
      alert("Failed to log in. Please check your credentials.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
