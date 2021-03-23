/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

 module.exports = {
  /* Your site config here */
  plugins: ["gatsby-plugin-typescript",
  `gatsby-plugin-material-ui`,
  {
    resolve: "gatsby-source-graphql",
    options: {
      // This type will contain remote schema Query type
      typeName: "GCMS",
      // This is field under which it's accessible
      fieldName: "get_lollies",
      // Url to query from
      url:
        "https://l3bldsopp5ahnbowk54a4b2iri.appsync-api.us-east-1.amazonaws.com/graphql",
        headers: {
          "x-api-key": "da2-7shxxzm55fcf7dllqe24q2gyvi"
        }
    },
  },],
}
