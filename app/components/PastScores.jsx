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
      <table className="past-scores">
        <tbody>
          {
            pastScores.map( (scoreData, i) =>
              <tr key={i}>
                <td>{scoreData[0]}</td>
                <td>{scoreData[1]}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
};

PastScores.propTypes = propTypes;

export default PastScores;
