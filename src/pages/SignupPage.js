import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";



function SignupPage(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();


    const handleSignupSubmit = (e) => {
        e.preventDefault();
        
        const requestBody = { email, password, username }; // Create an object representing the request body

        // Make an axios request to the API
        // If POST request is successful redirect to login page
        // If the request resolves with an error, set the error message in the state
        axios.post(`${process.env.REACT_APP_API_URL}/signup`, requestBody)
            .then((response) => {
                navigate('/login');
            })
            .catch((error) => {
                const errorDescription = error.response.data.errorMessage;
                setErrorMessage(errorDescription);
            })
    };

    return (
        <div className="SignupPage">
            <h1>Sign Up</h1>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <form onSubmit={handleSignupSubmit}>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <button type="submit">Sign Up</button>
            </form>


            <p>Already have account?</p>
            <Link to={"/login"}> Login</Link>
        </div>
    )
}

export default SignupPage;
