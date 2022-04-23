import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  let navigate = useNavigate();
  const logout=()=>{
    // console.log("logout clicked");
    localStorage.removeItem('auth-token')
    navigate("/signin");

  }
  return (
    <>
      <div className="container-fluid Navbar">
        <div className="header">
          <h1 className="logo">DSA-eTracker</h1>
          <h6 className="des">Ace the Coding Interviews</h6>
        </div>
        {localStorage.getItem("auth-token") === null ? (
          <></>
        ) : (
          <div className="profile">
            <Link
              className="dropdown-toggle"
              to="#"
              // role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ color: " #b7bff8" }}
            >
              <span
                className="material-icons-outlined material-icons"
                style={{ fontSize: "40px" }}
              >
                account_circle
              </span>
            </Link>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <Link className="dropdown-item dpd" to="#">
                  Profile
                </Link>
              </li>
              <li>
                <Link className="dropdown-item dpd" to="/signin" onClick={logout}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
