import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await fetch(
        `http://localhost:4000/Details?email=${formData.email}&password=${formData.password}`
      );
      const data = await response.json();

      if (data.length > 0) {
        setMessage("Login successful ✅");
       localStorage.setItem("loggedInUser", JSON.stringify(data[0]));
        navigate("/home");
        window.location.reload();
      
      } else {
        setMessage("Invalid email or password ❌");
      }
    } catch (error) {
      setMessage("Something went wrong");
    }
  };

  return (
    <>
      <div className="loginSection">
        <div>
          <h1>LOGIN FORM</h1>
          <form className="loginForm" onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
            <br />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
            <br />
            <a href="/signup">Sign up?</a>
            <br /> <br />
            <button type="submit">Login</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
