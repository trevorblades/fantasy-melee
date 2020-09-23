import PropTypes from 'prop-types';
import React from 'react';

export default function HomePageTemplate({pageContext}) {
  return (
    <div>
      {pageContext.players.map(player => (
        <li key={player.id}>
          <strong>{player.gamerTag}</strong> {player.score}
        </li>
      ))}
    </div>
  );
}

HomePageTemplate.propTypes = {
  pageContext: PropTypes.object.isRequired
};
