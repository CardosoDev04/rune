import React, {useEffect, useState} from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import { createHttpLink } from "@apollo/client/link/http";
import { concat } from '@apollo/client/link/core';
import {setContext} from "@apollo/client/link/context";
import { UserAuthPage} from "./pages/user-auth/UserAuthPage";
import {createBrowserRouter, RouterProvider } from "react-router-dom";
import {NotFound} from "./pages/404/NotFound";
import {DarkModeToggle} from "./general-components/DarkModeToggle";




const handleAuthorization = setContext((_, { headers }) => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMiLCJuYW1lIjoiQ2hhcmxlcyIsImlhdCI6MTcxMzk5MzAyMiwiZXhwIjoxNzEzOTk2NjIyfQ.eGZPKQ10060t5BoGqvlzOWCj4PG3c8BkSRmvYZ-DF50"

    // Check if token exists (optional)
    if (!token) {
        console.error("Missing bearer token in environment variable");
        // Handle the missing token scenario (e.g., redirect to user-auth)
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


const router = createBrowserRouter([
    {
        path: '/',
        element: <UserAuthPage type={"login"}/>,
        errorElement: <NotFound/>
    },
    {
        path: '/login',
        element: <UserAuthPage type={"login"}/>,
    },
    {
        path: '/register',
        element: <UserAuthPage type={"register"}/>
    }
]);
export const DarkModeContext = React.createContext({
    isDark: false,
    toggleDarkMode: () => {},
});

function App() {


    const[isDark,setIsDark] = useState(false);
    useEffect(() => {
        if(isDark) document.documentElement.classList.add('dark');
        return () => {
            document.documentElement.classList.remove('dark');
        };
    }, [isDark]);

    function toggleDarkMode(){
        console.log("Toggling dark mode...");
       setIsDark(!isDark)
    }

    const client = new ApolloClient({
        link: authLink,
        cache: new InMemoryCache(),
        uri: "http://localhost:4000/graphql",
    });
  return (
      <ApolloProvider client={client}>
          <DarkModeContext.Provider value={{ isDark, toggleDarkMode }}>
          <div className="App">
              <RouterProvider router={router}/>
          </div>
          </DarkModeContext.Provider>
      </ApolloProvider>
  );
}

export default App;
