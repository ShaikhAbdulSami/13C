import fetch from "cross-fetch"
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"

export const client = new ApolloClient({
  link: new HttpLink({
    uri:
      "https://l3bldsopp5ahnbowk54a4b2iri.appsync-api.us-east-1.amazonaws.com/graphql", // ENTER YOUR GRAPHQL ENDPOINT HERE
    fetch,
    headers: {
      "x-api-key": "da2-7shxxzm55fcf7dllqe24q2gyvi", // ENTER YOUR API KEY HERE
    },
  }),
  cache: new InMemoryCache(),
})