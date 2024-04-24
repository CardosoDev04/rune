import React from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {DisplayData} from "./test-components/DisplayData";
import { createHttpLink } from "@apollo/client/link/http";
import { concat } from '@apollo/client/link/core';
import {setContext} from "@apollo/client/link/context";


const handleAuthorization = setContext((_, { headers }) => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMiLCJuYW1lIjoiQ2hhcmxlcyIsImlhdCI6MTcxMzkxNjkyMSwiZXhwIjoxNzEzOTIwNTIxfQ._6Icrq14hV37_7uSQF288Jk_UK3vNt9h_ll6zzShCyc"

    // Check if token exists (optional)
    if (!token) {
        console.error("Missing bearer token in environment variable");
        // Handle the missing token scenario (e.g., redirect to login)
        return { headers }; // Return existing headers without modification
    }

    return {
        headers: {
            ...headers,
            Authorization: `Bearer ${token}`
        }
    };
});

const httpLink = createHttpLink({ uri: 'http://localhost:4000/graphql' });
const authLink = concat(handleAuthorization, httpLink);

function App() {
    const client = new ApolloClient({
        link: authLink,
        cache: new InMemoryCache(),
        uri: "http://localhost:4000/graphql",
    });
  return (
      <ApolloProvider client={client}>
    <div className="App">
        <h1 className={"text-4xl font-semibold"}>Users:</h1>
        <DisplayData/>
    </div>
       </ApolloProvider>
  );
}

export default App;
