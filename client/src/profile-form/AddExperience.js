import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { addExp } from "../store/sagas/profile/profileAction";
import PropTypes from "prop-types";

const AddExperience = ({ addExp, history }) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });
  const [toDateDisable, toggleDisable] = useState(false);

  const { title, company, location, from, to, current, description } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    addExp(formData, history);
  };
  return (
    <>
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form onSubmit={(e) => onSubmit(e)} className="form">
        <div className="form-group">
          <input
            value={title}
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="* Job Title"
            name="title"
            required
          />
        </div>
        <div className="form-group">
          <input
            value={company}
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="* Company"
            name="company"
            required
          />
        </div>
        <div className="form-group">
          <input
            value={location}
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="Location"
            name="location"
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
              checked={current}
              type="checkbox"
              name="current"
              value={current}
              onChange={(e) => {
                setFormData({ ...formData, current: !current });
                toggleDisable(!toDateDisable);
              }}
            />{" "}
            Current Job
          </p>
        </div>
        <div className="form-group">
          <textarea
            value={description}
            onChange={(e) => onChange(e)}
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
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

AddExperience.propTypes = {
  addExp: PropTypes.func.isRequired,
  history: PropTypes.object,
};

export default connect(null, { addExp })(withRouter(AddExperience));
