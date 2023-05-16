import NavButton from "./NavButton";
import './Header.css';
import { useContext, useEffect, useState } from "react";
import { LoggedInContext, usernameInContext } from "./App";
import LogoutButton from "./LogoutButton";
import { useCookies } from "react-cookie";



/**
 * organize the navigation buttons
 * @returns react components of nav buttons
 */
function Header(){

    const [user, setUser] = useState({});
    const [cookies, setCookie] = useCookies(["name"])
    const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);

    useEffect(() =>{
        callGetUser(setUser, cookies.name)
    })


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