import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, isAuth, loading, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuth && !loading ? <Redirect to="/login" /> : <Component {...props} />
    }
  />
);

PrivateRoute.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  loading: state.auth.loading,
});

export default connect(mapStateToProps)(PrivateRoute);
