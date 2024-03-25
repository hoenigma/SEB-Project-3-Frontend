import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../interfaces/user";
import dogImage from "../assets/dog.jpg";
import "@fortawesome/fontawesome-free/css/all.css";

// interface NavbarProps {
//   user: null | IUser;
//   setUser: Function;
// }

function Navbar() {
  // console.log("user in the navbar:", user);
  // const navigate = useNavigate();

  // function logout() {
  //   localStorage.removeItem("token");
  //   setUser(null);
  //   navigate("/");
  // }

  return (
    <>
      <header>
        <nav className="navbar-is-transparent">
          <div className="container">
            <div className="navbar-menu">
              <div className="navbar-start">
                <img
                  className="image is-64x64"
                  src={dogImage}
                  alt="dog outline"
                />
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
                <Link to="/" className="navbar-item has-text-light">
                  Login
                </Link>
                <Link to="/" className="navbar-item has-text-light">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
