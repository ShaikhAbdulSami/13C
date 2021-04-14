import fetch from "cross-fetch"
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"

export const client = new ApolloClient({
  link: new HttpLink({
    uri:
      "https://6nlofoz2onbr3gmfyso4jhebvy.appsync-api.us-east-1.amazonaws.com/graphql", // ENTER YOUR GRAPHQL ENDPOINT HERE
    fetch,
    headers: {
      "x-api-key": "da2-7iamldls7vaidnmjdomsg27sre", // ENTER YOUR API KEY HERE
    },
  }),
  cache: new InMemoryCache(),
})