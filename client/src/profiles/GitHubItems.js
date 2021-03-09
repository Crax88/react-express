import React from "react";
import PropTypes from "prop-types";

const GitHubItems = ({ repos }) => {
  if (!repos.length) return <p className="lead">User has no repos</p>;
  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">
        <i className="fab fa-github"></i> Github Repos
      </h2>
      {repos.map((repo) => (
        <div key={repo.id} className="repo bg-white my-1 p-1">
          <div>
            <h4>
              <a href={repo.url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
            </h4>
            <p>{repo.description}</p>
          </div>

          <div>
            <ul>
              <li className="badge badge-primary">
                Stars: {repo.stargazers_count}
              </li>
              <li className="badge badge-dark">
                Watchers: {repo.watchers_count}
              </li>
              <li className="badge badge-light">Forks: {repo.forks_counr}</li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

GitHubItems.propTypes = {
  repos: PropTypes.array,
};

export default GitHubItems;
