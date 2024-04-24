import React, {useEffect} from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {DisplayData} from "./test-components/DisplayData";
import { createHttpLink } from "@apollo/client/link/http";
import { concat } from '@apollo/client/link/core';
import {setContext} from "@apollo/client/link/context";
import {LoginPage} from "./pages/login/LoginPage";


const handleAuthorization = setContext((_, { headers }) => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMiLCJuYW1lIjoiQ2hhcmxlcyIsImlhdCI6MTcxMzk5MzAyMiwiZXhwIjoxNzEzOTk2NjIyfQ.eGZPKQ10060t5BoGqvlzOWCj4PG3c8BkSRmvYZ-DF50"

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

    let isDark = true;
    useEffect(() => {
        if(isDark) document.documentElement.classList.add('dark');
        return () => {
            document.documentElement.classList.remove('dark');
        };
    }, [isDark]);

    const client = new ApolloClient({
        link: authLink,
        cache: new InMemoryCache(),
        uri: "http://localhost:4000/graphql",
    });
  return (
      <ApolloProvider client={client}>
    <div className="App">

        <LoginPage/>

    </div>
       </ApolloProvider>
  );
}

export default App;
