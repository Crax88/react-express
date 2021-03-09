import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Navbar from "./layout/Navbar";
import Landing from "./layout/Landing";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Alert from "./layout/Alert";
import Dashboard from "./dashboard/Dashboard";
import ProfileForm from "./profile-form/ProfileForm";
import AddExperience from "./profile-form/AddExperience";
import AddEducation from "./profile-form/AddEducation";
import Profiles from "./profiles/Profiles";
import Profile from "./profiles/Profile";
import PostsList from "./posts/PostsList";
import PrivateRoute from "./routing/PrivateRoute";

import store from "./store/store";

import { setAuthToken } from "./utils/setAuthToken";
import { requestUser } from "./store/sagas/auth/authActions";

import "./App.css";

if (localStorage.getItem("token")) {
  setAuthToken(localStorage.getItem("token"));
}

const App = () => {
  useEffect(() => {
    store.dispatch(requestUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Alert />
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/create-profile" component={ProfileForm} />
            <PrivateRoute path="/edit-profile" component={ProfileForm} />
            <PrivateRoute path="/add-experience" component={AddExperience} />
            <PrivateRoute path="/add-education" component={AddEducation} />
            <PrivateRoute path="/posts" component={PostsList} />
            <Route path="/profiles" component={Profiles} />
            <Route path="/profile/:id" component={Profile} />
          </Switch>
        </section>
      </Router>
    </Provider>
  );
};
export default App;
