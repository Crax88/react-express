import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { initAlert } from "../store/sagas/alert/alertActions";
import { register } from "../store/sagas/auth/authActions";
import PropTypes from "prop-types";

const Register = ({ initAlert, register, isAuth }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    avatar: "",
  });
  const onChange = (e) => {
    if (e.target.name == "avatar") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      initAlert("Passwords do not match", "danger");
    } else {
      register({ name, email, password, confirm, avatar });
    }
  };
  if (isAuth) {
    return <Redirect to="/dashboard" />;
  }
  const { name, email, password, confirm, avatar } = formData;
  return (
    <>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form onSubmit={(e) => onSubmit(e)} className="form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            id="avatar"
            name="avatar"
            type="file"
            placeholder="Upload avatar"
            onChange={(e) => onChange(e)}
          />
          <label htmlFor="avatar">
            {avatar == "" ? "Choose avatar" : avatar.name}
          </label>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirm"
            value={confirm}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type="submit" value="Register" className="btn btn-primary" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </>
  );
};

Register.propTypes = {
  initAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuth: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { initAlert, register })(Register);
