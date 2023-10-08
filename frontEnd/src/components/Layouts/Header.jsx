import React, { useState, useEffect } from "react";
import { Link , useNavigate} from "react-router-dom";
function Header() {
  const [loginUser, setLoginUser] = useState("");
  const navigate= useNavigate()
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      
      setLoginUser(user);
    }
  });
  const logoutHandler=()=>{
    localStorage.removeItem("user")
    navigate('/login')
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Expense Tracker Management
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="">
                  Link
                </Link>
              </li>
            </ul>

            <ul>
              <li className="nav-item"> <p className="nav-link">{loginUser && loginUser.user.name}</p></li>
              <li className="nav-item">
                <button className="btn btn-primary" onClick={logoutHandler }>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
