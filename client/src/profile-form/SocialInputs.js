import React from "react";
import PropTypes from "prop-types";

const SocialInputs = ({ onChange, data }) => {
  return (
    <>
      <div className="form-group social-input">
        <i className="fab fa-twitter fa-2x"></i>
        <input
          value={data.twitter || ""}
          onChange={(e) => onChange(e)}
          type="text"
          placeholder="Twitter URL"
          name="twitter"
        />
      </div>

      <div className="form-group social-input">
        <i className="fab fa-facebook fa-2x"></i>
        <input
          value={data.facebook || ""}
          onChange={(e) => onChange(e)}
          type="text"
          placeholder="Facebook URL"
          name="facebook"
        />
      </div>

      <div className="form-group social-input">
        <i className="fab fa-youtube fa-2x"></i>
        <input
          value={data.youtube || ""}
          onChange={(e) => onChange(e)}
          type="text"
          placeholder="YouTube URL"
          name="youtube"
        />
      </div>

      <div className="form-group social-input">
        <i className="fab fa-linkedin fa-2x"></i>
        <input
          value={data.linkedin || ""}
          onChange={(e) => onChange(e)}
          type="text"
          placeholder="Linkedin URL"
          name="linkedin"
        />
      </div>

      <div className="form-group social-input">
        <i className="fab fa-instagram fa-2x"></i>
        <input
          value={data.instagram || ""}
          onChange={(e) => onChange(e)}
          type="text"
          placeholder="Instagram URL"
          name="instagram"
        />
      </div>
    </>
  );
};

SocialInputs.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default SocialInputs;
