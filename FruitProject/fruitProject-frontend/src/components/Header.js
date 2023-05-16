import NavButton from "./NavButton";
import './Header.css';
import { useCookies } from "react-cookie";
import { useContext, useEffect, useState } from "react";
import { LoggedInContext, usernameInContext } from "./App";
import { Nav } from "react-bootstrap";
import LogoutButton from "./LogoutButton";



/**
 * organize the navigation buttons
 * @returns react components of nav buttons
 */
function Header(){

    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);
    const [username, setUsername] = useContext(usernameInContext);

    useEffect(() =>{
        callGetUser(setUser, username)
    }, [username])


    return(
        <div>
            <div className="test">
                
                <NavButton to="/" label="Home"/>
                {user.role === "admin" && <NavButton to="/Fruit" label="Fruit"/>}
                <NavButton to="/about" label="About Us"/>
                <NavButton to="/contact" label="Contact Us"/>
                {isLoggedIn && <LogoutButton />}
            </div>
        </div>
    );   
}

async function callGetUser(setUser,username) {
    const response = await fetch("http://localhost:1339/users/" + username, { method: "GET" });
    const result = await response.json();
    setUser(result);
  }

export default Header;