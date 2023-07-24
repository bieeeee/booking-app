import { useContext } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch({type: "LOGOUT"})
  }

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/login")
  }

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Skytail</span>
        </Link>
        {user ?
          <div className="navItems">
            <span>Hello, {user.username}</span>
            <button onClick={handleLogout} className="navButton">Logout</button>
          </div>
          :
          <div className="navItems">
            <button className="navButton">Register</button>
            <button onClick={handleLogin} className="navButton">Login</button>
          </div>
        }
      </div>
    </div>
  )
}

export default Navbar
