import React, { useState, useEffect } from "react";
import axios from "axios";


const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    const storeToken = (token) => {
        localStorage.setItem('authToken', token);
    }


    const authenticateUser = () => {
        
        const storedToken = localStorage.getItem('authToken'); // Get the stored token from the localStorage

        // If the token exists in the localStorage
        if (storedToken) {
            // We must send the JWT token in the request's "Authorization" Headers
            axios.get(
                `${process.env.REACT_APP_API_URL}/verify`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
                .then((response) => {
                    // If the server verifies that JWT token is valid  
                    const payload = response.data;
                    // Update state variables        
                    setIsLoggedIn(true);
                    setIsLoading(false);
                    setUser(payload);
                })
                .catch((error) => {
                    // If the server sends an error response (invalid token) 
                    // Update state variables         
                    setIsLoggedIn(false);
                    setIsLoading(false);
                    setUser(null);
                });
        } else {
            // If the token is not available (or is removed)
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);
        }
    }


    useEffect(() => {
        authenticateUser();
    }, []);


    return (
        <AuthContext.Provider value={{ isLoggedIn, isLoading, user, storeToken }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthProviderWrapper, AuthContext };
