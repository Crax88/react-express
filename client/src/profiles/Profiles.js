import React, { useEffect } from "react";
import { getAllProfiles } from "../store/sagas/profile/profileAction";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfilesItem from "./ProfilesItem";
import PropTypes from "prop-types";

const Profiles = ({ profiles, getAllProfiles, loading }) => {
  useEffect(() => {
    if (!profiles) getAllProfiles();
  }, [loading, getAllProfiles, profiles]);
  const profileItems =
    profiles &&
    profiles.length &&
    profiles.map((profile) => (
      <ProfilesItem key={profile.user._id} profile={profile} />
    ));
  return (
    <>
      <h1 className="large text-primary">Developers</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i> Browse and connect with
        developers
      </p>
      <div className="profiles">
        {profiles && !loading && !profiles.length && <p>No profiles yet</p>}
        {profiles && loading && <Spinner />}
        {profiles && profiles.length && profileItems}
      </div>
    </>
  );
};

Profiles.propTypes = {
  profiles: PropTypes.array,
  getAllProfiles: PropTypes.func,
};

const mapStateToProps = (state) => ({
  profiles: state.profile.profiles,
  loading: state.profile.loadnig,
});

export default connect(mapStateToProps, { getAllProfiles })(Profiles);
