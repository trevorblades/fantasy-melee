import PropTypes from 'prop-types';
import React from 'react';
import {AspectRatio, Box, SimpleGrid} from '@chakra-ui/core';
import {Helmet} from 'react-helmet';

export default function HomePageTemplate({pageContext}) {
  const {players} = pageContext;
  const scores = players.map(player => player.score);
  const numScores = scores.length;
  const mean = scores.reduce((a, b) => a + b) / numScores;
  const median =
    numScores % 2
      ? scores[(numScores - 1) / 2]
      : (scores[numScores / 2] + scores[numScores / 2 + 1]) / 2;
  return (
    <>
      <Helmet title="Fantasy Melee">
        <link
          rel="icon"
          href="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/rainbow_1f308.png"
        />
      </Helmet>
      <h2>Mean score: {mean}</h2>
      <h2>Total mean budget: {mean * 5}</h2>
      <h2>Median score: {median}</h2>
      <h2>Total median budget: {median * 5}</h2>
      <SimpleGrid spacing="8" minChildWidth="250px">
        {players.map(player => (
          <AspectRatio ratio={3 / 4} key={player.id}>
            <Box bg="gray.100">
              <Box p="4" boxSize="full">
                <strong>{player.gamerTag}</strong> {player.score}
              </Box>
            </Box>
          </AspectRatio>
        ))}
      </SimpleGrid>
    </>
  );
}

HomePageTemplate.propTypes = {
  pageContext: PropTypes.object.isRequired
};
