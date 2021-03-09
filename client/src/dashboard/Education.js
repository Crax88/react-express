import React from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";

const Education = ({ education, deleteEdu }) => {
  return (
    <>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {education.map((edu) => (
            <tr key={edu._id}>
              <td>{edu.school}</td>
              <td className="hide-sm">{edu.degree}</td>
              <td className="hide-sm">
                <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
                {edu.to === null ? (
                  "Current"
                ) : (
                  <Moment format="YYYY/MM/DD">{edu.to}</Moment>
                )}
              </td>
              <td>
                <button
                  onClick={() => deleteEdu(edu._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEdu: PropTypes.func.isRequired,
};

export default Education;
