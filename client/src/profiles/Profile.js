import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { initAlert } from "../store/sagas/alert/alertActions";
import { requestGithub } from "../store/sagas/profile/profileAction";
import { Link, Redirect } from "react-router-dom";
import GitHubItems from "./GitHubItems";

import PropTypes from "prop-types";

const Profile = ({ profile, repos, initAlert, requestGithub }) => {
  const [showRepos, toggleShowRepos] = useState(false);
  useEffect(() => {
    if (!profile) {
      initAlert("Profile is unavailable", "primary");
      return <Redirect to="/profiles" />;
    }
    if (profile.githubusername) {
      requestGithub(profile.githubusername);
    }
  }, [profile, repos, initAlert, requestGithub]);

  return (
    <>
      <Link to="/profiles" className="btn">
        Back To Profiles
      </Link>

      <div className="profile-grid my-1">
        <div className="profile-top bg-primary p-2">
          <img
            className="round-img my-1"
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
            alt=""
          />

          <h1 className="large">{profile.user.name}</h1>
          <p className="lead">
            {profile.status || ""} {`at ${profile.company}` || ""}
          </p>
          <p>{profile.location || ""}</p>
          <div className="icons my-1">
            {profile.website && (
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-globe fa-2x"></i>
              </a>
            )}
            {profile.twitter && (
              <a href={profile.twitter}>
                <i className="fab fa-twitter fa-2x"></i>
              </a>
            )}
            {profile.facebook && (
              <a href={profile.facebook}>
                <i className="fab fa-facebook fa-2x"></i>
              </a>
            )}
            {profile.linkedin && (
              <a href={profile.linkedin}>
                <i className="fab fa-linkedin fa-2x"></i>
              </a>
            )}
            {profile.instagram && (
              <a href={profile.instagram}>
                <i className="fab fa-instagram fa-2x"></i>
              </a>
            )}
          </div>
        </div>
        <div className="profile-about bg-light p-2">
          <h2 className="text-primary">{profile.user.name}'s Bio</h2>
          <p>{profile.bio}</p>
          <div className="line"></div>
          <h2 className="text-primary">Skill Set</h2>
          <div className="skills">
            {profile.skills.map((skill, idx) => (
              <div key={skill + idx} className="p-1">
                <i className="fas fa-check"></i> {skill}
              </div>
            ))}
          </div>
        </div>
        <div className="profile-exp bg-white p-2">
          <h2 className="text-primary">Experiences</h2>
          {(profile.experience.length && (
            <>
              {profile.experience &&
                profile.experience.map((exp, idx) => (
                  <div key={exp + idx}>
                    <h3>{exp.company}</h3>
                    <p>
                      {<Moment format="MMM YYYY">{exp.from}</Moment>} -{" "}
                      {exp.to === null ? (
                        "Current"
                      ) : (
                        <Moment format="MMM YYYY">{exp.to}</Moment>
                      )}
                    </p>
                    <p>
                      <strong>Position: </strong>
                      {exp.company}
                    </p>
                    <p>
                      <strong>Description: </strong>
                      {exp.description}
                    </p>
                  </div>
                ))}
            </>
          )) ||
            "No experience was added"}
        </div>
        <div className="profile-edu bg-white p-2">
          <h2 className="text-primary">Education</h2>
          {(profile.education.length &&
            profile.education.map((edu, idx) => (
              <div key={edu + idx}>
                <h3>{edu.school}</h3>
                <p>
                  <Moment format="MMM YYYY">{edu.from}</Moment> -{" "}
                  {edu.to === null ? (
                    "Current"
                  ) : (
                    <Moment format="MMM YYYY">{edu.to}</Moment>
                  )}
                </p>
                <p>
                  <strong>Degree: </strong>
                  {encodeURI.degree}
                </p>
                <p>
                  <strong>Field of Study: </strong>
                  {edu.fieldofstudy}
                </p>
                <p>
                  <strong>Description: </strong>
                  {edu.description}
                </p>
              </div>
            ))) ||
            "No education was added"}
        </div>
      </div>
      {profile.githubusername && !showRepos && (
        <button
          onClick={(e) => toggleShowRepos(!showRepos)}
          className="btn btn-primary"
        >
          Show Github repos
        </button>
      )}
      {showRepos && repos.length && <GitHubItems repos={repos} />}
    </>
  );
};

Profile.propTypes = {
  profile: PropTypes.object,
  initAlert: PropTypes.func,
  requestGithub: PropTypes.func,
};
const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  return {
    profile:
      state.profile.profiles &&
      state.profile.profiles.filter((profile) => profile._id === id)[0],
    repos: state.profile.repos,
  };
};
export default connect(mapStateToProps, { initAlert, requestGithub })(Profile);
