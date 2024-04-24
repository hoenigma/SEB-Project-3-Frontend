import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../interfaces/user";
import logo from "../assets/logo.png";
import "@fortawesome/fontawesome-free/css/all.css";
import React from "react";

interface NavbarProps {
  user: null | IUser;
  setUser: Function;
}

function Navbar({ user, setUser }: NavbarProps) {
  console.log("user in the navbar:", user);

  const navigate = useNavigate();
  const [isActive, setIsActive] = React.useState(false);

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  }

  const toggleNavbar = () => {
    setIsActive(!isActive);
  };
  return (
    <header>
      <nav
        className="navbar-is-transparent"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div
            className={`navbar-menu ${isActive ? "is-active" : "is-active"}`}
          >
            <div className="navbar-brand">
              <img className="image is-64x64" src={logo} alt="dog outline" />
              <a
                role="button"
                className={`navbar-burger ${isActive ? "is-active" : ""}`}
                aria-label="menu"
                aria-expanded={isActive ? "true" : "false"}
                onClick={toggleNavbar}
                style={{ color: "rgb(127, 178, 121)" }}
              >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
            </div>
            <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
              <div className="navbar-start">
                <Link to="/" className="navbar-item has-text-light">
                  <span className="icon-text">
                    <span className="icon">
                      <i className="fas fa-home"></i>
                    </span>
                    <span>Home</span>
                  </span>
                </Link>
                <Link to="/animals" className="navbar-item has-text-light">
                  <span className="icon-text">
                    <span className="icon">
                      <i className="fa fa-paw"></i>
                    </span>
                    <span>All Animals</span>
                  </span>
                </Link>
              </div>
              <div className="navbar-end">
                {!user && (
                  <>
                    <Link to="/login" className="navbar-item has-text-light">
                      Login
                    </Link>
                    <Link to="/signup" className="navbar-item has-text-light">
                      Sign Up
                    </Link>
                  </>
                )}
                {user && (
                  <button
                    onClick={logout}
                    className="button logout has-text-light navbar-item is-ghost"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
//
