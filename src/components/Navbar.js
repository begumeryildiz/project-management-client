import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {

    const { isLoggedIn, user } = useContext(AuthContext);

    return (
        <nav className="Navbar">
            <NavLink to="/">Home</NavLink> |

            {isLoggedIn && (
                <>
                     <NavLink to="/projects">Projects</NavLink> | 
                    <button>Logout</button>
                </>
            )}

            {!isLoggedIn && (
                <>
                    <NavLink to="/signup">Sign Up</NavLink> |
                    <NavLink to="/login">Login</NavLink>
                </>
            )}
        </nav>
    );
}


export default Navbar;