import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProfilesItem = ({ profile }) => {
  return (
    <>
      <div className="profile bg-light">
        <img
          className="round-img"
          src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
          alt=""
        />

        <div>
          <h2>{profile.user.name}</h2>
          <p>
            {profile.status} {profile.company && ` at ${profile.company}`}
          </p>
          <p>{profile.location}</p>
          <Link to={`/profile/${profile._id}`} className="btn btn-primary">
            View Profile
          </Link>
        </div>
        <ul>
          {profile.skills.map((skill, idx) => (
            <li key={`${skill}${idx}`} className="text-primary">
              <i className="fas fa-check"></i> {skill}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

ProfilesItem.propTypes = {
  profile: PropTypes.object,
};

export default ProfilesItem;
