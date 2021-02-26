import React from 'react';
import { Link } from 'react-router-dom';
import { useFirebase } from 'react-redux-firebase';

const Navbar = () => {

  const firebase = useFirebase();

    return(
        <div>
        <nav className="navbar navbar-expand-sm navbar-light bg-white">
  <div className="container">
    <Link className="navbar-brand" to="/">
     <img src={require("../../assets/logo.svg")} height="30px" alt="Logo" />

    </Link>

    <div>
      <ul className="navbar-nav mr-auto"></ul>
      <ul className="navbar-nav align-items-center">
        <li className="nav-item">
          <Link to={`/studentForm`} className="btn btn-primary mr-3">
            Add Student
          </Link>
        </li>
        <li className="nav-item dropdown">
          <a
            className="nav-a dropdown-toggle"
            href="!#"
            id="navbarDropdown"
            data-toggle="dropdown"
          >
            <img src={require("../../assets/admin.png")} height="30px" alt="Admin" />

            <span className="ml-2 navbar-text">PM Dev</span>
          </a>
          <div className="dropdown-menu">
            <a className="dropdown-item" href="!#">
              Profile
            </a>
            <Link className="dropdown-item" to="/login" onClick={() => firebase.logout()}>
              Logout
            </Link>
            
          </div>
        </li>
      </ul>
    </div>
  </div>
</nav>
        </div>
    )
}

export default Navbar;