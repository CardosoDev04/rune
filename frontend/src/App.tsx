import React, {useEffect, useLayoutEffect, useState} from 'react';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import {createHttpLink} from "@apollo/client/link/http";
import {concat} from '@apollo/client/link/core';
import {setContext} from "@apollo/client/link/context";
import {UserAuthPage} from "./pages/user-auth/UserAuthPage";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {NotFound} from "./pages/404/NotFound";
import {Dashboard} from "./pages/dashboard/Dashboard";
import Cookies from 'js-cookie';


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
    },
    {
        path: '/dashboard',
        element: <Dashboard/>
    }
]);

export const DarkModeContext = React.createContext({
    isDark: false,
    toggleDarkMode: () => {},
});


function App() {


    const [isDark, setIsDark] = useState(() => {
        const saved = Cookies.get('isDark');
        return saved ? JSON.parse(saved) : true;
    });
    useEffect(() => {
        Cookies.set('isDark', JSON.stringify(isDark));
    }, [isDark]);

    useLayoutEffect(() => {
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
