import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import AuthLinks from "./AuthLinks";
import GuestLinks from "./GuestLinks";
import { logout } from "../store/sagas/auth/authActions";
import PropTypes from "prop-types";

const Navbar = ({ isAuth, logout, loading }) => {
  const links =
    isAuth && !loading ? <AuthLinks logout={logout} /> : <GuestLinks />;
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i>DevConnector
        </Link>
      </h1>
      {!loading && links}
    </nav>
  );
};

Navbar.propTypes = {
  isAuth: PropTypes.bool,
  logout: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  loading: state.auth.loading,
});
export default connect(mapStateToProps, { logout })(Navbar);
