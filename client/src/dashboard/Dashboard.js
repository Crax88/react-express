import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";
import {
  getProfile,
  deleteExp,
  deleteEdu,
  deleteAccount,
} from "../store/sagas/profile/profileAction";
import PropTypes from "prop-types";

const Dashboard = ({
  getProfile,
  deleteExp,
  deleteEdu,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    if (!profile) getProfile();
  }, [getProfile, deleteExp, deleteEdu, deleteAccount, profile]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <>
          <DashboardActions />
          {profile.experience.length > 0 && (
            <Experience deleteExp={deleteExp} experience={profile.experience} />
          )}
          {profile.education.length > 0 && (
            <Education deleteEdu={deleteEdu} education={profile.education} />
          )}
          <div className="my-2">
            <button onClick={(e) => deleteAccount()} className="btn btn-danger">
              <i className="fas fa-user-minus"></i> Delete My Account
            </button>
          </div>
        </>
      ) : (
        <>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create profile
          </Link>
        </>
      )}
    </>
  );
};

Dashboard.propTypes = {
  getProfile: PropTypes.func.isRequired,
  deleteExp: PropTypes.func.isRequired,
  deleteEdu: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  loading: state.profile.loading,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getProfile,
  deleteExp,
  deleteEdu,
  deleteAccount,
})(Dashboard);
