import React, { PropTypes } from 'react';

// https://facebook.github.io/react/docs/reusable-components.html
// https://github.com/airbnb/javascript/tree/master/react#ordering
const propTypes = {
  pastScores: PropTypes.array.isRequired,
};

function PastScores({ pastScores }) {
  return (
    <div>
      <h4>Past scores</h4>
      <ul className="past-scores">
        {
          pastScores.map( (scoreData, i) =>
            <li key={i}>
              {scoreData[0]}: {scoreData[1]}
            </li>
          )
        }
      </ul>
    </div>
  );
};

PastScores.propTypes = propTypes;

export default PastScores;
