import React, { useEffect, useState } from "react";
import "./Signin.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

export default function Signin() {
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("auth-token") !== null) {
      navigate("/");
    }
  });

  //state for cred
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });
  const inputChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    //disable retuurns true if something is wrong
    if (!disable()) {
      e.preventDefault();
      const response = await fetch(`http://localhost:5000/auth/signin`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: credentials.password,
          email: credentials.email,
        }), // body data type must match "Content-Type" header
      });
      const json = await response.json();
      console.log(json);
      if (json.success) {
        localStorage.setItem("auth-token", json.authtoken);
        navigate("/");
        // showAlert("Login successful", "success");
        toast.success("Login successful")

        // console.log("inside signin")
        // console.log(localStorage.getItem("auth-token"));
      } else {
        // showAlert("invalid credentials", "danger");
        toast.warn("invalid credentials")

      }
    }
    e.preventDefault();
  };

  const disable = () => {
    if (credentials.password.length < 8) {
      //   showAlert("password must be atleat 8 characters", "info");
      toast.info("password must be atleat 8 characters"); 
      return true;
    }
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!credentials.email.match(mailformat)) {
      //   showAlert("invalid email", "info");
      toast.info("invalid email"); 
      return true;
    }
    return false;
  };

  //state for hide password
  const [hidePassword, sethidePassword] = useState(true);
  const handlePassword = (e) => {
    //  e.preventDefault();
    // console.log("pass");
    if (hidePassword === true) sethidePassword(false);
    else sethidePassword(true);
    console.log(hidePassword);
  };
  return (
    <div className="body container my-3">
      <div className="card">
        <h4 className="title">sign-in</h4>
        <form onSubmit={login}>
          <input
            type="email"
            name="email"
            id=""
            className="data"
            placeholder="email"
            onChange={inputChange}
          />
          <input
            type={hidePassword ? "password" : "text"}
            name="password"
            id=""
            className="data"
            placeholder="password"
            onChange={inputChange}
          />
          {hidePassword ? (
            <i className="fa-solid fa-eye eye" onClick={handlePassword}></i>
          ) : (
            <i
              className="fa-solid fa-eye-slash eye"
              onClick={handlePassword}
            ></i>
          )}
          <p className="hide" onClick={handlePassword}>
            {!hidePassword ? "hide" : "view"} password
          </p>
          <input type="submit" className="submit" value="SIGN IN" />
        </form>
        <div className="footer">
          <h6>Don’t have an account?</h6>
          <Link className="signup" to="/signup">
            SIGN UP NOW
          </Link>
        </div>
      </div>
    </div>
  );
}
