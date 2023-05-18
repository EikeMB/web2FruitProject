import { useContext } from "react";
import { LoggedInContext } from "./App";
import {useNavigate} from "react-router-dom";
import { useCookies } from "react-cookie";
import "./Logout.css"

function LogoutButton(){
    const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);
    const [cookies, setCookie, removeCookie] = useCookies(["names"]);
    const navigate = useNavigate();

    const logout = async () => {
        const requestOptions = {
            method: "GET",
            credentials: "include",

        };
        const response = await fetch("http://localhost:1339/session/logout", requestOptions);
        if(response.status === 200){
            setIsLoggedIn(false);
            removeCookie("name", )
            navigate("/");
        }
        else if(response.status === 401){
            alert("Already logged out");
            setIsLoggedIn(false);

            navigate("/");
        }
        else{
            alert("something has gone wrong please try again later")
            setIsLoggedIn(false);
        }
    }

    return(
        <button className="logout-btn" onClick={logout}>
            Logout
        </button>
    )
}

export default LogoutButton;