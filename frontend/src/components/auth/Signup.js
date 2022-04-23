import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";
import { ToastContainer, toast } from 'react-toastify';

export default function Signup() {
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
    name: "",
    cpassword: "",
  });
  let navigate = useNavigate();
  const inputChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const register = async (e) => {
    if (!disable()) {
      e.preventDefault();
      const response = await fetch(
        `http://localhost:5000/auth/createuser`,
        {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: credentials.password,
            email: credentials.email,
            name: credentials.name,
          }), // body data type must match "Content-Type" header
        }
      );
      const json = await response.json();
      console.log(json);
      if (json.success) {
        localStorage.setItem("auth-token", json.authtoken);
        navigate("/");
        // showAlert("Registration successful", "success");
        toast.success("Registration successful")
      } else {
        // showAlert("invalid credentials", "danger");
        toast.warn("invalid credentials")


      }
    }
    e.preventDefault();
    console.log(credentials);
  };
  const disable = () => {
    //console.log("disable")
    if (credentials.name.length < 1){  
        // showAlert("name must be atleat 1 character", "info");
        toast.info("name must be atleat 1 character"); 

        return true;}
    if (credentials.password.length < 8) {
    //   showAlert("password must be atleat 8 characters", "info");
    toast.info("password must be atleat 8 characters"); 

      return true;
    }
    if (credentials.password !== credentials.cpassword) {
    //   showAlert("password and confirm password doesn't match", "info");
    toast.info("password and confirm password doesn't match"); 

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

  const [hidePassword, sethidePassword] = useState(true);
  const handlePassword = (e) => {
    //  e.preventDefault();
    // console.log("pass");
    if (hidePassword === true) sethidePassword(false);
    else sethidePassword(true);
    console.log(hidePassword);
  };
  
  

  return (
    <div className="nbody container my-3">
      <div className="ncard">
        <h4 className="ntitle">create your account</h4>
        <form onSubmit={register}>
          <input
            type="text"
            name="name"
            id=""
            className="ndata"
            placeholder="name"
            onChange={inputChange}
          />
          <input
            type="email"
            name="email"
            id=""
            className="ndata"
            placeholder="email"
            onChange={inputChange}
          />
          <input
            type={hidePassword ? "password" : "text"}
            name="password"
            id=""
            className="ndata"
            placeholder="password"
            onChange={inputChange}
          />
          <input
            type={hidePassword ? "password" : "text"}
            name="cpassword"
            id=""
            className="ndata"
            placeholder="confirm password"
            onChange={inputChange}
          />
          {hidePassword ? (
            <i className="fa-solid fa-eye neye" onClick={handlePassword}></i>
          ) : (
            <i
              className="fa-solid fa-eye-slash neye"
              onClick={handlePassword}
            ></i>
          )}
          <p className="nhide" onClick={handlePassword}>{!hidePassword ? "hide" : "view"} password</p>
          <input type="submit"  className="nsubmit" value="SIGN UP" />
        </form>
        <div className="nfooter">
          <h6>already had an account?</h6>
          <Link className="nsignin" to="/signin">
            SIGN IN
          </Link>
        </div>
      </div>
    </div>
  );
}

 
