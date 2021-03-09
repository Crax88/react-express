import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, Link, Redirect } from "react-router-dom";
import SocialInputs from "./SocialInputs";
import {
  getProfile,
  updateProfile,
} from "../store/sagas/profile/profileAction";
import PropTypes from "prop-types";

const ProfileForm = ({
  id,
  profile,
  loading,
  getProfile,
  updateProfile,
  history,
}) => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
  });
  const [displaySocilaInputs, toggleSocialInput] = useState(false);
  const title =
    history.location.pathname === "create-profile" ? "Create" : "Update";
  useEffect(() => {
    if (!id) return <Redirect to="/login" />;
    if (!loading && !profile.profile) getProfile(id);
    if (!loading && profile.profile) {
      const profilee = profile.profile;
      const curProfile = {};
      for (const key in profilee) {
        if (key in formData && key === "skills") {
          const skills = profilee[key].join(",");
          curProfile[key] = skills;
        } else {
          if (key in formData) curProfile[key] = profilee[key];
        }
      }
      for (const key in profilee.social) {
        if (key in formData) curProfile[key] = profilee.social[key];
      }
      setFormData(curProfile);
    }
  }, [loading, id, getProfile, profile.profile]);
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData, history, title === "Update" ? true : false);
  };
  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  return (
    <>
      <h1 className="large text-primary">{title} your profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required fields</small>
      <form onSubmit={(e) => onSubmit(e)} className="form">
        <div className="form-group">
          <select name="status" value={status} onChange={(e) => onChange(e)}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            value={company}
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="Company"
            name="company"
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            value={website}
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="Website"
            name="website"
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            value={location}
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="Location"
            name="location"
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input
            value={skills}
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="* Skills"
            name="skills"
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            value={githubusername}
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="Github Username"
            name="githubusername"
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea
            value={bio}
            onChange={(e) => onChange(e)}
            placeholder="A short bio of yourself"
            name="bio"
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            onClick={() => toggleSocialInput(!displaySocilaInputs)}
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {displaySocilaInputs && (
          <SocialInputs
            onChange={onChange}
            data={{ twitter, youtube, linkedin, instagram, facebook }}
          />
        )}

        <input value="Send" type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </>
  );
};

ProfileForm.propTypes = {
  id: PropTypes.string.isRequired,
  profile: PropTypes.object,
  loading: PropTypes.bool,
  getProfile: PropTypes.func,
  updateProfile: PropTypes.func,
};

const mapStateToProps = (state) => ({
  id: state.auth.user._id,
  profile: state.profile,
  loading: state.profile.loading,
});

export default connect(mapStateToProps, { getProfile, updateProfile })(
  withRouter(ProfileForm)
);
