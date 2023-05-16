import NavButton from "./NavButton";
import './Header.css';
import { useCookies } from "react-cookie";
import { useContext, useEffect, useState } from "react";
import { LoggedInContext } from "./App";
import { Nav } from "react-bootstrap";
import LogoutButton from "./LogoutButton";


/**
 * organize the navigation buttons
 * @returns react components of nav buttons
 */
function Header(){
    const [cookies, setCookie] = useCookies (["name"]);

    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);

    useEffect(() =>{
        callGetUser(setUser, cookies)
    }, [cookies])


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

async function callGetUser(setUser,cookies) {
    const response = await fetch("http://localhost:1339/users/" + cookies.name, { method: "GET" });
    const result = await response.json();
    setUser(result);
  }

export default Header;