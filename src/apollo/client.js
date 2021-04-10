import fetch from "cross-fetch"
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"

export const client = new ApolloClient({
  link: new HttpLink({
    uri:
      "https://k7u3vxfyevg2porbvdv26lnlqy.appsync-api.us-east-1.amazonaws.com/graphql", // ENTER YOUR GRAPHQL ENDPOINT HERE
    fetch,
    headers: {
      "x-api-key": "da2-2cf7tu644zcuvb3xyw5olupcte", // ENTER YOUR API KEY HERE
    },
  }),
  cache: new InMemoryCache(),
})