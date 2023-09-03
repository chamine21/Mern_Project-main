import React, { useState } from "react";

import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

import "../components/LandingPage/static/css/log_reg.css";
import { Link } from "react-router-dom";

const Login = () => {
 
  const [errors, setErrors] = useState([]);
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });

  const { email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  axios
    .post("http://localhost:8000/login", inputValue, { withCredentials: true })
    .then((response) => {
      // Set the "currentUser" cookie after successful login
      const result= response.data.user; // Change this line
      // console.log(response);
      // if (user) {
      //   document.cookie = `currentUser=${JSON.stringify(user)}; path=/;`;
      //   console.log(document.cookie);   
        localStorage.setItem("currentUser", JSON.stringify(result));
        window.location.href = "/";
      // }
      
    })
    .catch((error) => {
      console.log(error);
      if (error.response.data.errors) {
        const errorResponse = error.response.data.errors;
        const errorArr = Object.values(errorResponse);
        setErrors(errorArr);
      } else {
        console.log(error);
      }
    })
    .finally(() => {
      setInputValue({
        email: "",
        password: "",
      });
    });
};
  return (
    <div className="body">
      <div className="form_container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {errors.map((error, index) => (
            <p key={index} className="text-danger">
              {error}
            </p>
          ))}
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleOnChange}
            />
          </div>
          <span>
                    Already have an account? <Link to={"/signup"}>Signup</Link>
                </span>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
