function isMeleeSingles(event) {
  return Number(event.videogame.id) === 1 && event.type === 1;
}

exports.createPages = async ({graphql, actions}) => {
  const {data} = await graphql(`
    query TournamentsQuery {
      smashgg {
        tournaments(
          query: {filter: {isFeatured: true, past: true, videogameIds: [1]}}
        ) {
          nodes {
            id
            numAttendees
            events {
              id
              type
              numEntrants
              videogame {
                id
              }
            }
          }
        }
      }
    }
  `);

  const events = data.smashgg.tournaments.nodes
    .filter(
      tournament =>
        tournament.numAttendees >= 1000 &&
        tournament.events.some(isMeleeSingles)
    )
    .map(tournament => {
      const [event] = tournament.events
        .filter(isMeleeSingles)
        .sort((a, b) => b.numEntrants - a.numEntrants);
      return event;
    });

  const results = {};
  const gamerTags = {};

  for (const event of events) {
    const {data} = await graphql(`
      query EventQuery {
        smashgg {
          event(id: ${event.id}) {
            numEntrants
            standings(query: {}) {
              nodes {
                placement
                entrant {
                  participants {
                    user {
                      id
                      player {
                        gamerTag
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `);

    const {standings, numEntrants} = data.smashgg.event;
    for (const standing of standings.nodes) {
      const {entrant, placement} = standing;
      const [{user}] = entrant.participants;

      if (!gamerTags[user.id]) {
        gamerTags[user.id] = user.player.gamerTag;
      }

      const score = numEntrants - placement;
      results[user.id] =
        user.id in results ? [...results[user.id], score] : [score];
    }
  }

  const players = Object.entries(results)
    .map(([id, scores]) => ({
      id,
      gamerTag: gamerTags[id],
      score: scores.reduce((a, b) => a + b)
    }))
    .sort((a, b) => b.score - a.score);

  actions.createPage({
    path: '/',
    component: require.resolve('./src/templates'),
    context: {
      players
    }
  });
};
