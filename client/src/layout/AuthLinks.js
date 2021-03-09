import React from "react";
import { Link } from "react-router-dom";

const AuthLinks = ({ logout }) => {
  return (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user"></i>
          <span className="hide-sm"> Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to="/login">
          <i className="fas fa-sign-out-alt"></i>
          <span onClick={logout} className="hide-sm">
            {" "}
            Logout
          </span>
        </Link>
      </li>
    </ul>
  );
};

export default AuthLinks;
