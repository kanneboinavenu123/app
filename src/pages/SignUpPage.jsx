import React from 'react'
import { useState } from "react";


const SignupPage = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
    const checkResponse = await fetch(
      `http://localhost:4000/Details?email=${formData.email}`
    );
    const existingUsers = await checkResponse.json();

    if (existingUsers.length > 0) {
      setMessage("Email is already registered ❌");
      return;
    }
 
            const response = await fetch("http://localhost:4000/Details", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Failed to submit form");
            const data = await response.json();
            setMessage("Form submitted successfully!");
            console.log(data);
            setFormData({ name: "", email: "", password: "" });
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <>
            <div className='SignupSection'>
                <div>
                    <h1>Create New Account</h1>
                    <form className='SignupForm' onSubmit={handleSubmit} >
                        <input type="text"
                            id="username"
                            placeholder='username'
                            name="name"
                            value={formData.name}
                            autoComplete='username'
                            onChange={handleChange} />
                        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
                        <br />
                        <input type="email"
                            id="email"
                            placeholder='email'
                            name="email"
                            autoComplete='email'
                            value={formData.email}
                            onChange={handleChange} />
                        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                        <br />
                        <input type="password"
                            id="password"
                            placeholder='password'
                            name="password"
                            autoComplete='current-password'
                            value={formData.password}
                            onChange={handleChange} />
                        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
                        <br />

                        <a href="./" >Already have an account? Login</a>
                        <br /><br />
                        <button type="submit">Signup</button>
                        {message && <p>{message}</p>}
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignupPage