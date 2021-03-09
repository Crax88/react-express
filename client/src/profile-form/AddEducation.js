import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { addEdu } from "../store/sagas/profile/profileAction";
import PropTypes from "prop-types";

const AddEducation = ({ addEdu, history }) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });
  const [toDateDisable, toggleDisable] = useState(false);

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    addEdu(formData, history);
  };
  return (
    <>
      <h1 className="large text-primary">Add Your Education</h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc
        that you have attended
      </p>
      <small>* = required field</small>
      <form onSubmit={(e) => onSubmit(e)} className="form">
        <div className="form-group">
          <input
            value={school}
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
          />
        </div>
        <div className="form-group">
          <input
            value={degree}
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
          />
        </div>
        <div className="form-group">
          <input
            value={fieldofstudy}
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="Field Of Study"
            name="fieldofstudy"
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            value={from}
            onChange={(e) => onChange(e)}
            type="date"
            name="from"
          />
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            disabled={toDateDisable ? "disabled" : ""}
            value={to}
            onChange={(e) => onChange(e)}
            type="date"
            name="to"
          />
        </div>
        <div className="form-group">
          <p>
            <input
              value={current}
              onChange={(e) => {
                setFormData({ ...formData, current: !current });
                toggleDisable(!toDateDisable);
              }}
              type="checkbox"
              name="current"
            />{" "}
            Current School
          </p>
        </div>
        <div className="form-group">
          <textarea
            value={description}
            onChange={(e) => onChange(e)}
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </>
  );
};

AddEducation.propTypes = {
  addEdu: PropTypes.func.isRequired,
  history: PropTypes.object,
};

export default connect(null, { addEdu })(withRouter(AddEducation));
