import React from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";

const Experience = ({ experience, deleteExp }) => {
  return (
    <>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {experience.map((exp) => {
            return (
              <tr key={exp._id}>
                <td>{exp.company}</td>
                <td className="hide-sm">{exp.title}</td>
                <td className="hide-sm">
                  <Moment format="YYY/MM/DD">{exp.from}</Moment> -{" "}
                  {exp.to === null ? (
                    "Current"
                  ) : (
                    <Moment format="YYYY/MM/DD">{exp.to}</Moment>
                  )}
                </td>
                <td>
                  <button
                    onClick={(e) => deleteExp(exp._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

Experience.propTypes = {
  experience: PropTypes.array,
  deleteExp: PropTypes.func,
};

export default Experience;
