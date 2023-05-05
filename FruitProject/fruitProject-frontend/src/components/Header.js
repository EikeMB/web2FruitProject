import NavButton from "./NavButton";
import './Header.css';
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react"


/**
 * organize the navigation buttons
 * @returns react components of nav buttons
 */
function Header(){
    const [cookies, setCookie] = useCookies (["name"]);

    const [user, setUser] = useState({});

    useEffect(() =>{
        callGetUser(setUser, cookies)
    }, [user])


    return(
        <div>
            <div className="test">
                
                <NavButton to="/" label="Home"/>
                {user.role === "admin" && <NavButton to="/Fruit" label="Fruit"/>}
                <NavButton to="/about" label="About Us"/>
                <NavButton to="/contact" label="Contact Us"/>
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