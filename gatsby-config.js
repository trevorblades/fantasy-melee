require('dotenv').config();

module.exports = {
  plugins: [
    'gatsby-plugin-chakra-ui',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'SmashGG',
        fieldName: 'smashgg',
        url: 'https://api.smash.gg/gql/alpha',
        headers: {
          Authorization: `Bearer ${process.env.SMASHGG_TOKEN}`
        }
      }
    }
  ]
};
